import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import "../assets/css/Today.css";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { UserCircleIcon } from "@heroicons/react/outline";
import { CogIcon } from "@heroicons/react/outline";
import { ClockIcon } from "@heroicons/react/outline";
export default function Today() {
  return (
    <div className="todays-event">
      <div className="disclosure">
        <Disclosure>
          <DisclosureButton className="group header">
            <div className="title">Today&#39;s events</div>
            <div className="chev">
              <ChevronDownIcon className="w-5 group-data-[open]:rotate-180"></ChevronDownIcon>
            </div>
          </DisclosureButton>
          <DisclosurePanel className="panel">
            <div className="title">04 September 2024</div>
            <div className="card">
              <div className="header">
                <div className="title">Cooking class</div>
                <CogIcon className="h-5 w-5 white mr-1 text-gray-400"></CogIcon>
              </div>
              <div className="content">
                <div className="flex">
                  <ClockIcon className="h-5 w-5 white mr-1 text-gray-400"></ClockIcon>
                  <div className="time">11:00-14:00</div>
                </div>
                <div className="participants">
                  <UserCircleIcon className="h-5 w-5 white mr-1 text-gray-400"></UserCircleIcon>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="header">
                <div className="title">Dm book club</div>
                <CogIcon className="h-5 w-5 white mr-1 text-gray-400"></CogIcon>
              </div>
              <div className="content">
                <div className="flex">
                  <ClockIcon className="h-5 w-5 white mr-1 text-gray-400"></ClockIcon>
                  <div className="time">11:00-14:00</div>
                </div>
                <div className="participants">
                  <UserCircleIcon className="h-5 w-5 white mr-1 text-gray-400"></UserCircleIcon>
                </div>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  );
}
