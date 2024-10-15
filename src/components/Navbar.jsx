import { useUser } from "../UserContext";
import { useEffect } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Button } from "@headlessui/react";

export default function Navbar() {
  const { user, setUser } = useUser();

  console.log("context: ", useUser());
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
          setUser({
            email: data.email,
            firstname: data.firstName || "",
            lastname: data.lastName || "",
            picture: data.picture || "",
            name: data.name || "",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching profile info:", error);
      });
  };
  useEffect(() => {
    console.log("user: ", user);
  }, [user]);

  useEffect(() => {
    handleFetchProfile();
  }, []);

  return (
    <div className="w-full h-24 lg:h-20 flex items-center justify-between px-8 border-b bg-white">
      <h1 className="text-2xl font-bold text-black">
        <a href="/">PtC</a>
      </h1>
      <ul className="flex items-center">
        <li className="lg:p-4">
          {user ? (
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex w-full justify-center items-center gap-x-1  lg:gap-x-1.5 rounded-md bg-white  py-1 text-sm  text-gray-900 hover:bg-gray-50">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    alt="user picture"
                    src={
                      user.picture
                        ? user.picture
                        : "https://github.com/Dark-Matter-Labs/ptc-dashboard/blob/main/src/assets/image/user-profile.png?raw=true"
                    }
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
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
