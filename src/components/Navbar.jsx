import { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Button } from "@headlessui/react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const handleLogin = () => {
    console.log("call handleLogin");
    window.location.href = "/api/v1/auth/google";
  };
  const handleLogout = async () => {
    console.log("call handleLogout");
    setUser(null);
    try {
      const response = await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: {
          Accept: "*/*",
        },
      });

      if (response.ok) {
        console.log("Logout successful");
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
    fetch("/api/v1/auth/profile")
      .then((response) => response.json())
      .then((data) => {
        console.log("direct fetching profile, ", data);
        setUser({
          email: data.email,
          firstname: data.firstName,
          lastname: data.lastName,
          picture: data.picture,
          name: data.name,
        });
      })
      .catch((error) => {
        console.error("Error fetching profile info:", error);
      });
  };
  useEffect(() => {
    console.log("call hanldeFetchProfile when first load/call back");
    handleFetchProfile();
  }, []);

  useEffect(() => {
    console.log("user: ", user);
  }, [user]);
  return (
    <div className="w-full h-16 flex items-center justify-between px-8 border-b bg-white">
      <h1 className="text-2xl font-bold text-black">PtC</h1>
      <ul className="flex items-center">
        <li className="p-4">
          {user ? (
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex w-full justify-center items-center  gap-x-1.5 rounded-md bg-white  py-2 text-sm  text-gray-900 hover:bg-gray-50">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    alt=""
                    src={user.picture}
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  />
                  <div className="text-left">
                    <p className="text-sm leading-6 text-gray-900">
                      {user.firstname}
                    </p>
                    <p className="text-xs leading-5 text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="ml-3 h-4 text-gray-600"
                />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  {/* <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Settings
                  </a>
                </MenuItem> */}
                  <MenuItem>
                    <Button
                      onClick={handleFetchProfile}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Fetch Profile
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

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return null; // Return null if the cookie is not found
// }
