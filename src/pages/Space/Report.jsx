import { Button } from "@headlessui/react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import "../../assets/css/Report.css";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { BellIcon } from "@heroicons/react/solid";
import { MusicNoteIcon } from "@heroicons/react/solid";
import { BookOpenIcon } from "@heroicons/react/solid";
import { FireIcon } from "@heroicons/react/solid";
import { SparklesIcon } from "@heroicons/react/solid";
import { SunIcon } from "@heroicons/react/solid";

export default function Report() {
  return (
    <section className="home-report">
      <div className="damage-report">
        <div className="disclosure">
          <Disclosure>
            <DisclosureButton className="group header">
              <div className="title">Damage Report</div>
              <div className="chev">
                <ChevronDownIcon className="w-5 group-data-[open]:rotate-180"></ChevronDownIcon>
              </div>
            </DisclosureButton>
            <DisclosurePanel className="panel">
              <div className="card">
                <div className="card-header">
                  <BellIcon className="h-6 w-6"></BellIcon>
                </div>
                <div className="card-content">
                  <div className="content-title">Toilet</div>
                  <div className="content-description">7 days estimated</div>
                </div>
                <div className="card-tail">Under repairing</div>
              </div>
              <div className="card">
                <div className="card-header">
                  <BellIcon className="h-6 w-6"></BellIcon>
                </div>
                <div className="card-content">
                  <div className="content-title">Keyboard</div>
                  <div className="content-description">5 days estimated</div>
                </div>
                <div className="card-tail">Under repairing</div>
              </div>
              <div className="card">
                <div className="card-header">
                  <BellIcon className="h-6 w-6"></BellIcon>
                </div>
                <div className="card-content">
                  <div className="content-title">Controller</div>
                  <div className="content-description">3 days estimated</div>
                </div>
                <div className="card-tail">Under repairing</div>
              </div>
              <Button className="damage-report-button">Report an issue</Button>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
      <div className="permission-statistics">
        <div className="disclosure">
          <Disclosure>
            <DisclosureButton className="group header">
              <div className="title">Permission Statistics</div>
              <div className="chev">
                <ChevronDownIcon className="w-5 group-data-[open]:rotate-180"></ChevronDownIcon>
              </div>
            </DisclosureButton>
            <DisclosurePanel className="panel">
              <div className="title">Number of permissions</div>
              <div className="flex space-x-1">
                <div className="card bg-emerald-400">
                  <div className="card-header">Permissions granted</div>
                  <div className="card-content">25</div>
                </div>
                <div className="card bg-slate-300">
                  <div className="card-header">Permissions requested</div>
                  <div className="card-content">49</div>
                </div>
              </div>
              <div className="title">Permissioning group</div>
              <div className="flex">
                <div className="card bg-slate-300">
                  <div className="card-header">Permissions granted</div>
                  <div className="card-content">25</div>
                </div>
                <div className="card bg-emerald-400">
                  <div className="card-header">Permissions requested</div>
                  <div className="card-content">49</div>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
      <div className="interest-category">
        <div className="disclosure">
          <Disclosure>
            <DisclosureButton className="group header">
              <div className="title">Interest Category</div>
              <div className="chev">
                <ChevronDownIcon className="w-5 group-data-[open]:rotate-180"></ChevronDownIcon>
              </div>
            </DisclosureButton>
            <DisclosurePanel className="panel">
              <div className="card">
                <div className="card-header bg-purple-200">
                  <MusicNoteIcon className="h-6 w-6 text-purple-600"></MusicNoteIcon>
                </div>
                <div className="card-content">
                  <div className="content-title">Music</div>
                  <div className="content-description">35 Times</div>
                </div>
                <div className="card-tail">205 members</div>
              </div>
              <div className="card">
                <div className="card-header bg-orange-200">
                  <BookOpenIcon className="h-6 w-6 text-orange-600"></BookOpenIcon>
                </div>
                <div className="card-content">
                  <div className="content-title">Books</div>
                  <div className="content-description">27 Times</div>
                </div>
                <div className="card-tail">131 members</div>
              </div>
              <div className="card">
                <div className="card-header bg-green-200">
                  <FireIcon className="h-6 w-6 text-green-600"></FireIcon>
                </div>
                <div className="card-content">
                  <div className="content-title">Cooking</div>
                  <div className="content-description">19 Times</div>
                </div>
                <div className="card-tail">120 members</div>
              </div>
              <div className="card">
                <div className="card-header bg-pink-200">
                  <SparklesIcon className="h-6 w-6 text-pink-600"></SparklesIcon>
                </div>
                <div className="card-content">
                  <div className="content-title">Party</div>
                  <div className="content-description">12 Times</div>
                </div>
                <div className="card-tail">92 members</div>
              </div>
              <div className="card">
                <div className="card-header bg-blue-200">
                  <SunIcon className="h-6 w-6 text-blue-600"></SunIcon>
                </div>
                <div className="card-content">
                  <div className="content-title">Meditation</div>
                  <div className="content-description">8 Times</div>
                </div>
                <div className="card-tail">76 members</div>
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
    </section>
  );
}
