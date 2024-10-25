import { useUser } from "../../useUser";
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Button } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import PropTypes from "prop-types";

export default function Navbar({
  navTitle,

  currentLanguage,
  handleChangeLanguage,
}) {
  const { user, setUser } = useUser();
  const { t } = useTranslation();
  const [dynamicTitle, setDynamicTitle] = useState(navTitle);

  useEffect(() => {
    if (!i18n) {
      console.error("i18n is not initialized");
    }
    console.log("in Navbar: ", { navTitle });
  }, []);

  useEffect(() => {
    setDynamicTitle(navTitle);
  }, [navTitle, currentLanguage, t]);

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
          console.log("User not logged in.");
        }
        if (data.email) {
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
    handleFetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-24 lg:h-20 flex items-center justify-between px-8 border-b bg-white">
      <h1 className="text-2xl font-bold text-black">
        <a href="/">{dynamicTitle}</a>
      </h1>
      <ul className="flex items-center">
        <li className="lg:p-4">
          {user ? (
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex w-full justify-center items-center gap-x-1  lg:gap-x-1.5 rounded-md bg-white  py-1 text-sm  text-gray-900 hover:bg-gray-50">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    alt="user picture"
                    src={user?.picture ? user.picture : ""}
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    onError={(e) => {
                      console.log("picture error: ", e);
                      // Fallback image if the user picture fails to load
                      e.target.src =
                        "https://raw.githubusercontent.com/Dark-Matter-Labs/ptc-dashboard/main/src/assets/image/user-profile.png";
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
                  className="lg:ml-3 h-4 text-gray-600 "
                />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() =>
                        handleChangeLanguage(
                          currentLanguage == "en" ? "ko" : "en"
                        )
                      }
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      {currentLanguage === "en" ? (
                        <div className="flex gap-2 items-center">
                          <div>Switch to Korean</div>
                          <img
                            className="w-8 h-8"
                            alt="KO"
                            src="http://purecatamphetamine.github.io/country-flag-icons/3x2/KR.svg"
                          />{" "}
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center">
                          <div>Switch to English</div>
                          <img
                            className="w-6 h-6 "
                            alt="EN"
                            src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
                          />
                        </div>
                      )}
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Log Out
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
    </div>
  );
}

Navbar.propTypes = {
  navTitle: PropTypes.string,
  currentLanguage: PropTypes.string,
  handleChangeLanguage: PropTypes.func,
};
