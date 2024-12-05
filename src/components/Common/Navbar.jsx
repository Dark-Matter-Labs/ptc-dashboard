import { useUser } from "../../useUser";
import { useEffect, useState, useRef } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon, XIcon, MenuIcon } from "@heroicons/react/solid";
import {
  HomeIcon,
  UserIcon,
  BellIcon,
  CalendarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ArrowLeftIcon,
  LocationMarkerIcon,
  ExternalLinkIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { Button } from "@headlessui/react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import { Notification } from "./Notification";

export default function Navbar({
  navTitle,
  currentLanguage,
  handleChangeLanguage,
  closeButtonLink,
}) {
  const { user, setUser } = useUser();
  const { t } = useTranslation();
  const [dynamicTitle, setDynamicTitle] = useState(navTitle);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const webSocket = useRef(null);

  const handleCloseButton = () => {
    window.location.href = closeButtonLink;
  };
  const handleLogin = () => {
    console.log("call handleLogin");
    window.location.href = "/api/v1/auth/google";
  };
  const handleLogout = async () => {
    console.log("call handleLogout");

    try {
      const response = await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: {
          Accept: "*/*",
        },
      });

      if (response.ok) {
        console.log("Logout successful");
        setUser(null);
        window.location.href = "/";
      } else {
        console.error("Logout failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const handleFetchProfile = () => {
    console.log("call hanldeFetchProfile");
    fetch("/api/v1/auth/profile", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Unauthorized") {
          handleLogin();
        } else if (data.email) {
          const newUser = {
            email: data.email,
            firstname: data.firstName || "",
            lastname: data.lastName || "",
            picture: data.picture || "",
            name: data.name || "",
          };
          setUser(newUser);
          console.log("Fetched user:", newUser);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile info:", error);
      });
  };

  useEffect(() => {
    setDynamicTitle(navTitle);
  }, [navTitle, currentLanguage, t]);

  useEffect(() => {
    handleFetchProfile();

    if (!i18n) {
      console.error("i18n is not initialized");
    }
    console.log("in Navbar: ", { navTitle }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!webSocket.current) {
      webSocket.current = io(`${window.location.origin}:3000`, {
        transports: ["websocket"],
        withCredentials: true,
        autoConnect: true,
      });

      webSocket.current.on("connect", () => {
        console.log(
          "webSocket.current.connected",
          webSocket.current?.connected,
          webSocket.current?.id
        );
      });

      webSocket.current.on("disconnect", () => {
        console.log("webSocket disconnected");
        webSocket.current = null;
      });

      // Listen for notifications
      webSocket.current.on("receive_notification", (message) => {
        try {
          // try to parse message
          message = JSON.parse(message);
          // eslint-disable-next-line no-unused-vars
        } catch (e) {
          /* empty */
        }
        setNotifications((prev) => [...prev, message]);
        setTimeout(() => {
          // Notifications: remove the first item
          setNotifications(notifications.slice(1));
        }, 4000);
      });
    }

    return () => {
      if (webSocket.current && webSocket.current.connected) {
        webSocket.current.disconnect();
      }
    };
  }, [notifications]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="w-full h-24 lg:h-20 flex items-center justify-between px-6 bg-white sticky top-0 z-10">
      {/* Test notification handling */}
      <div className="w-full h-auto absolute left-0 flex justify-center items-center">
        {notifications
          .filter((item) => item.subject)
          .map((content, index) =>
            content.subject ? (
              <Notification
                key={index}
                subject={content.subject}
                html={content.html}
                text={content.text}
              />
            ) : (
              ""
            )
          )}
      </div>

      {/* Dropdown Menu  */}
      <ul
        className={`flex items-center ${navTitle == t("navigation.navigation-title") ? "order-1 lg:order-2" : "order-1"}`}
      >
        <li>
          {user ? (
            <Menu as="div" className="relative inline-block text-left">
              {/* Menu button */}
              <MenuButton className="inline-flex w-full justify-center items-center gap-x-1 lg:gap-x-1.5 rounded-md bg-white py-1 text-xs  text-gray-700">
                <div className="flex min-w-0 gap-x-4 ">
                  <div
                    onClick={toggleSidebar}
                    className="lg:hidden rounded focus:outline-none"
                  >
                    <MenuIcon className=" w-6 h-6 text-gray-700 md:hidden " />
                  </div>
                  <img
                    alt="user picture"
                    src={
                      user?.picture
                        ? user.picture
                        : "https://permissioning-the-city.s3.ap-northeast-2.amazonaws.com/0e92e6a3-56b8-40f7-ac9a-7688bc36ed21_user-profile.png"
                    }
                    className="hidden md:block h-12 w-12 flex-none rounded-full bg-gray-50"
                    onError={(e) => {
                      console.log("picture error: ", e);
                      // Fallback image if the user picture fails to load
                      e.target.src =
                        "https://permissioning-the-city.s3.ap-northeast-2.amazonaws.com/0e92e6a3-56b8-40f7-ac9a-7688bc36ed21_user-profile.png";
                    }}
                  />
                  <div className="text-left hidden lg:block md:block">
                    <p className="text-sm leading-6 text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs leading-5 text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="lg:ml-3 h-4 w-4  text-gray-600 hidden md:block  "
                />
              </MenuButton>

              {/* Overlay with Transition */}
              {sidebarOpen && (
                <div
                  className="fixed inset-0 bg-[#FAFAFB] transition-all duration-1000  z-10 opacity-85"
                  onClick={toggleSidebar}
                />
              )}

              {/* Sidebar */}
              <div
                className={`fixed flex inset-0 lg:hidden transform ${
                  sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform z-50 `}
                onClick={toggleSidebar}
              >
                <div
                  className="w-5/6 bg-white h-full shadow-lg py-6 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()} // Prevent close on sidebar click
                >
                  {/* Profile Info */}
                  <div className="flex items-center gap-4 pl-8">
                    <img
                      alt="User"
                      src={
                        user?.picture ||
                        "https://permissioning-the-city.s3.ap-northeast-2.amazonaws.com/0e92e6a3-56b8-40f7-ac9a-7688bc36ed21_user-profile.png"
                      }
                      className="h-16 w-16 rounded-full bg-gray-100"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {user?.name || "Guest"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email || ""}
                      </p>
                    </div>
                  </div>
                  <hr className="my-4" />
                  {/* Sidebar Links */}
                  <div>
                    <a
                      href="/landing"
                      className={`pl-8 space-y-8 py-4 flex items-center gap-3 text-gray-900 ${location.pathname === "/" ? "bg-slate-200" : "text-gray-900"}`}
                    >
                      <HomeIcon className="w-4 h-4 text-gray-400 "></HomeIcon>
                      {t("navigation.find-space")}
                    </a>
                    <a
                      href="/profile"
                      className={`pl-8 space-y-8 py-4 flex items-center gap-3 text-gray-900 ${location.pathname === "/profile" ? "bg-slate-200" : "text-gray-900"}`}
                    >
                      <UserIcon className="w-4 h-4 text-gray-400 "></UserIcon>
                      {t("navigation.profile")}
                    </a>
                    <a
                      href="/notifications"
                      className={`pl-8 flex py-4 items-center gap-3 text-gray-900 ${location.pathname === "/notifications" ? "bg-slate-200" : "text-gray-900"}`}
                    >
                      <BellIcon className="w-4 h-4 text-gray-400 "></BellIcon>
                      {t("navigation.notifications")}
                    </a>
                    <a
                      href="/profile/events"
                      className={`pl-8 space-y-8 py-4 flex items-center gap-3 text-gray-900 ${location.pathname === "/events" ? "bg-slate-200" : "text-gray-900"}`}
                    >
                      <CalendarIcon className="w-4 h-4 text-gray-400 "></CalendarIcon>
                      {t("navigation.my-events")}
                    </a>
                    <a
                      href="/community"
                      className={`pl-8 py-4  flex items-center gap-3 text-gray-900 ${location.pathname === "/community" ? "bg-slate-200" : "text-gray-900"}`}
                    >
                      <UserGroupIcon className="w-4 h-4 text-gray-400 "></UserGroupIcon>
                      {t("navigation.my-community")}
                    </a>
                    <a
                      href="/space"
                      className={`pl-8 py-4  flex items-center gap-3 text-gray-900 ${location.pathname === "/space" ? "bg-slate-200" : "text-gray-900"}`}
                    >
                      <LocationMarkerIcon className="w-4 h-4 text-gray-400 "></LocationMarkerIcon>
                      {t("navigation.my-space")}
                    </a>

                    {/* Language Disclosure */}
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <DisclosureButton className="pl-8 py-4  flex items-center justify-between w-full text-left pr-8 text-gray-700 hover:text-gray-900">
                            <div className="flex items-center gap-3 text-gray-900">
                              <GlobeAltIcon className="w-4 h-4 text-gray-400 "></GlobeAltIcon>
                              <span>{t("navigation.language")}</span>
                            </div>
                            <ChevronDownIcon
                              className={`w-4 h-4 text-gray-400 transform ${open ? "rotate-180" : ""}`}
                            />
                          </DisclosureButton>
                          <DisclosurePanel className="ml-8">
                            <button
                              onClick={() => handleChangeLanguage("en")}
                              className={`flex gap-4 w-full text-left mt-4 ${
                                currentLanguage === "en"
                                  ? "text-gray-800 "
                                  : "text-gray-400"
                              } hover:bg-gray-100 rounded-md`}
                            >
                              English
                              <img
                                className={`w-6 h-6 ${currentLanguage === "en" ? "opacity-100" : "opacity-50"}`}
                                alt="EN"
                                src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
                              />
                            </button>
                            <button
                              onClick={() => handleChangeLanguage("ko")}
                              className={`flex gap-4 w-full text-left mt-4 ${
                                currentLanguage === "ko"
                                  ? "text-gray-800 "
                                  : "text-gray-400"
                              } hover:bg-gray-100 rounded-md`}
                            >
                              Korean
                              <img
                                className={`w-6 h-6 ${currentLanguage === "ko" ? "opacity-100" : "opacity-50"}`}
                                alt="KO"
                                src="http://purecatamphetamine.github.io/country-flag-icons/3x2/KR.svg"
                              />{" "}
                            </button>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                  <hr className="my-4" />
                  <h1 className="ml-8 mb-2">Links</h1>
                  <a
                    href="/"
                    className="pl-8 py-4 flex items-center gap-3 text-gray-900"
                  >
                    <ExternalLinkIcon className="w-4 h-4 text-gray-400 "></ExternalLinkIcon>
                    {t("navigation.view-calendar")}
                  </a>
                  <a
                    href="/event/new"
                    className={`pl-8 py-4 flex items-center gap-3 text-gray-900 ${location.pathname === "/event/new" ? "bg-slate-200" : "text-gray-900"}`}
                  >
                    <PlusCircleIcon className="w-4 h-4 text-gray-400 "></PlusCircleIcon>
                    {t("navigation.propose-event")}
                  </a>

                  <hr className="font-semibold mt-4" />
                  <Button
                    onClick={handleLogout}
                    className="py-4 pl-8 flex items-center gap-3 text-red-500 hover:text-red-700"
                  >
                    <ArrowLeftIcon className="w-4 h-4 text-gray-400 transform" />
                    {t("navigation.logout")}
                  </Button>
                </div>
                <Button onClick={toggleSidebar} className="h-fit mt-4 ml-2">
                  <XIcon className="p-2 h-10 w-10 text-gray-800 "></XIcon>
                </Button>
              </div>

              {/* Menu Items */}
              <MenuItems
                transition
                className="hidden lg:block absolute lg:right-0 z-10 mt-2 w-56 origin-top-left lg:origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      {t("navigation.profile")}
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <DisclosureButton className="px-4 py-2 text-sm flex items-center justify-between w-full text-left pr-8 text-gray-700 hover:text-gray-900">
                            <span>{t("navigation.language")}</span>

                            <ChevronDownIcon
                              className={`w-4 h-4 text-gray-400 transform ${open ? "rotate-180" : ""}`}
                            />
                          </DisclosureButton>
                          <DisclosurePanel className="ml-8">
                            <button
                              onClick={() => handleChangeLanguage("en")}
                              className={`flex gap-4 w-full text-sm text-left mt-4 ${
                                currentLanguage === "en"
                                  ? "text-gray-800 "
                                  : "text-gray-400"
                              } hover:bg-gray-100 rounded-md`}
                            >
                              English
                              <img
                                className={`w-6 h-6 ${currentLanguage === "en" ? "opacity-100" : "opacity-50"}`}
                                alt="EN"
                                src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
                              />
                            </button>
                            <button
                              onClick={() => handleChangeLanguage("ko")}
                              className={`flex gap-4 w-full text-sm text-left mt-4 ${
                                currentLanguage === "ko"
                                  ? "text-gray-800 "
                                  : "text-gray-400"
                              } hover:bg-gray-100 rounded-md`}
                            >
                              Korean
                              <img
                                className={`w-6 h-6 ${currentLanguage === "ko" ? "opacity-100" : "opacity-50"}`}
                                alt="KO"
                                src="http://purecatamphetamine.github.io/country-flag-icons/3x2/KR.svg"
                              />{" "}
                            </button>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  </MenuItem>

                  <MenuItem>
                    <Button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      {t("navigation.logout")}
                    </Button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          ) : (
            <Button
              onClick={handleLogin}
              className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Log In
            </Button>
          )}
        </li>
      </ul>
      {/* Title */}
      <h1
        className={`text-2xl font-bold text-black ${
          navTitle == t("navigation.navigation-title")
            ? "lg:order-1 order-2"
            : "order-2"
        }`}
      >
        {dynamicTitle === t("navigation.navigation-title") ? (
          <a href="/">{dynamicTitle}</a>
        ) : (
          <>{dynamicTitle}</> //deactive link to home
        )}
      </h1>
      {/* Close Button for smaller screens */}
      {navTitle !== t("navigation.navigation-title") && (
        <button onClick={handleCloseButton} className=" text-gray-700 order-3">
          <XIcon className="h-4 w-4 text-gray-600" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

Navbar.propTypes = {
  navTitle: PropTypes.string,
  currentLanguage: PropTypes.string,
  handleChangeLanguage: PropTypes.func,
  closeButtonLink: PropTypes.string,
  setCloseButtonLink: PropTypes.func,
};
