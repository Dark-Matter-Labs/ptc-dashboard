import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

export default function Navbar() {
  return (
    <div className="w-full h-16 flex items-center justify-between px-8 border-b bg-white">
      <h1 className="text-2xl font-bold text-black">PtC</h1>
      <ul className="flex items-center">
        <li className="p-4">
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="inline-flex w-full justify-center items-center  gap-x-1.5 rounded-md bg-white  py-2 text-sm  text-gray-900 hover:bg-gray-50">
              <div className="flex min-w-0 gap-x-4">
                <img
                  alt=""
                  src="https://s3-alpha-sig.figma.com/img/ba8a/3aab/5d9e1731d686fd3622cb996db5c3c48b?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yx3GsrCMXsSl8ydytQXapRCga2Sx473AdY0pWFXbPKjYAur7rhJ~c5kiJ1cjbc~AKlKdzkBhUiY0eqRix8OALYzdd5lNcD~1SrxQPDc6fMBwx-07DkYRpUU2CDutLUU3NVkkA0JJxnTsBbLCvZuuTJFCK7xxmsR-p1r24tk3a~n4afS69o2LAI9q7tyHeRF106zLGlW4gzh86GgiIw0A52-SNXm56wNHu~2JzsZP3Z7kDhmmuAl-ixHteP7hbiWiXdr0n5BSUAJJ4NybQ4c877pxLGVYtHKEmrK0ORFTd-5DVmlro1L7GQyB5eWmE2mE-DM6a8D-0U62-QJzeqkKrA__"
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
                <div className="text-left">
                  <p className="text-sm leading-6 text-gray-900">
                    Berry Garden
                  </p>
                  <p className="text-xs leading-5 text-gray-500">Space owner</p>
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
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Support
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    License
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </li>
      </ul>
    </div>
  );
}
