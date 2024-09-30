import { useState } from "react";
import "../assets/css/Home.css";
import { Button } from "@headlessui/react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { UserIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/solid";
import { LinkIcon } from "@heroicons/react/solid";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { CalendarIcon } from "@heroicons/react/outline";
import { UsersIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/outline";
import { CogIcon } from "@heroicons/react/outline";
import { ClockIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

export default function Home() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  return (
    <>
      <section className="home-header">
        <div className="space">
          <div className="space-image">
            {/* First, space image */}
            <img src="https://s3-alpha-sig.figma.com/img/7a69/ccc2/c686d8b80b324a7e8036f5672361145e?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Bnq-lg9xa8u-g0AZ~DV3Oq~6lOE1Fgm6peov2QRgkKmRWDieoOLSgapHhNtlz7bwTqE9B9-i6OsO2W-e~PHOw0ne4qjxQ-tlbQ1fra-So4zjHDA9xsXAzafCaZjlgyZq4cx-Y-cMjL0Vwn3GWRaaLQDy7oTjzXMPazrCQ-UBZwOQJ4nVmdxonumfwLeVyXmNQTPFWsVGZUwdeshNX~anhXZ8fzZrvNfopglTuAW5XNwe5w-VvUjWil3GuuNI-9hfwqnPfAVCbuVLzMQSmpOsSIxXY7sgXnw6DioDHJMvEuh48zpC-Kj96mesRJHVEI12y44hr8tArFv5RDbltdYDXw__"></img>
            {/* Second, profile image */}
            <img src="https://s3-alpha-sig.figma.com/img/ba8a/3aab/5d9e1731d686fd3622cb996db5c3c48b?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yx3GsrCMXsSl8ydytQXapRCga2Sx473AdY0pWFXbPKjYAur7rhJ~c5kiJ1cjbc~AKlKdzkBhUiY0eqRix8OALYzdd5lNcD~1SrxQPDc6fMBwx-07DkYRpUU2CDutLUU3NVkkA0JJxnTsBbLCvZuuTJFCK7xxmsR-p1r24tk3a~n4afS69o2LAI9q7tyHeRF106zLGlW4gzh86GgiIw0A52-SNXm56wNHu~2JzsZP3Z7kDhmmuAl-ixHteP7hbiWiXdr0n5BSUAJJ4NybQ4c877pxLGVYtHKEmrK0ORFTd-5DVmlro1L7GQyB5eWmE2mE-DM6a8D-0U62-QJzeqkKrA__"></img>
          </div>
          <div className="space-snippet">
            <h1>Berry Garden</h1>

            <div className="space-account">
              <UserIcon className="h-5 w-5 text-gray-800 mr-1" />
              Berrylover
            </div>
            <div className="space-desc">
              Simple description of the space and message from the space owner
            </div>
            <div className="space-connection">273 Connections</div>
            <h3>Space Keywords</h3>
            <Button className="tag">MUSIC ENVENTS</Button>
            <Button className="tag">COOKING</Button>
            <Button className="tag">SEMINAR</Button>
            <div className="space-call-to-action">
              <Button className="follow-button">
                <PlusIcon className="h-5 w-5 white mr-1"></PlusIcon>Follow
              </Button>
            </div>
          </div>
        </div>
        <div className="map">
          <div className="map-image">
            {/* Background, map image */}
            <img src="https://s3-alpha-sig.figma.com/img/aaec/7450/6dd7ef8fa20171555328653494da5e14?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=P7kFn4DeKTu8Ft6yOgVMitDlTlA83IJG1QBU89rqqK11uNePJSpYOQDj4mpv54OrA4TBjdefI-A7H48iQ8yUIXt-HgzZCCmlr1OwQAbrcdYNzV-UkXYINhZvDhJO9Eco7ruwOyowPJNFlcaIwvCcF9TKe4ikG2kR1jUdpr2-mWtHjNVnif-6UPN2DmcetacCRgTmzSscxfWmXM8nTGitBnzVXPKUuN6z3YwXZciEAM~kUzOtQ5bjJIwCj7ubH5jXKUxI6Oh7ppLHPuKi7CV9FR6z6jH7VnfDHIDzk-~fYednks2cpaReAuJMIuKBP4eI9KS4-TLJbM~ATwWH5jALmA__"></img>
            <div className="chip">
              {/* Forground, profile image */}
              <img src="https://s3-alpha-sig.figma.com/img/ba8a/3aab/5d9e1731d686fd3622cb996db5c3c48b?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yx3GsrCMXsSl8ydytQXapRCga2Sx473AdY0pWFXbPKjYAur7rhJ~c5kiJ1cjbc~AKlKdzkBhUiY0eqRix8OALYzdd5lNcD~1SrxQPDc6fMBwx-07DkYRpUU2CDutLUU3NVkkA0JJxnTsBbLCvZuuTJFCK7xxmsR-p1r24tk3a~n4afS69o2LAI9q7tyHeRF106zLGlW4gzh86GgiIw0A52-SNXm56wNHu~2JzsZP3Z7kDhmmuAl-ixHteP7hbiWiXdr0n5BSUAJJ4NybQ4c877pxLGVYtHKEmrK0ORFTd-5DVmlro1L7GQyB5eWmE2mE-DM6a8D-0U62-QJzeqkKrA__"></img>
              <div className="chip-content">
                <h1>berrygarden</h1>
                <div>88, Gongpyeong-ro, Jung-gu, Daegu</div>
              </div>
            </div>
          </div>
          <div className="map-snippet">
            <div className="registration-date">
              <CalendarIcon className="h-5 w-5 white mr-1 text-gray-400"></CalendarIcon>
              <b>Registration date</b>2024.09.23
            </div>
            <div className="space-owner">
              <UsersIcon className="h-5 w-5 white mr-1 text-gray-400"></UsersIcon>
              <b>Space owner</b>Daegu City
              <div className="tag">Government</div>
            </div>
            <hr></hr>
            <div className="address">
              <LocationMarkerIcon className="h-5 w-5 white mr-1 text-gray-400"></LocationMarkerIcon>
              What3words address
            </div>
            <div className="website">
              <LinkIcon className="h-5 w-5 white mr-1 text-gray-400"></LinkIcon>
              www.website.com
            </div>
          </div>
          <div className="map-call-to-action">
            <Button className="become-steward-button">Become a Steward</Button>
            <Button className="browse-rules-button">Browse Rules</Button>
          </div>
        </div>
      </section>
      <section className="home-availability">
        <div className="availability">
          <h1>Availability</h1>
          <div className="permissioning-container">
            <div className="permissioning">
              <h1>Availability</h1>
              <div>Available to register for activities</div>
              <Button className="get-permission-button">Get permission</Button>
            </div>
          </div>
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
        </div>
        <div className="activity">
          <div className="upcoming-activity">
            <h1>Upcoming activity</h1>
            <div className="scroll-container">
              <div className="card">
                <div className="card-image">
                  <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
                </div>
                <div className="card-title">Cooking class</div>
                <div className="card-date">2024.8.12</div>
              </div>
              <div className="card">
                <div className="card-image">
                  <img src="https://s3-alpha-sig.figma.com/img/d098/ee3b/6c2b37f58d15cb93e78d348bbe7c1aa6?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SetPzCP-2gX7uU-~J86pgcDzm51dT3LGGBXCbyoTn8Cfp2d69pZps3oKbX~LSP19EgKuumlXeHf2cp5KM-2aL~gQqQDxhdtJa5BZjR-6H0UrXBurpr9NRWJLhFiu8M1Y39CbGpDXt7MsTPakYEhFb7Y8W8F3tQlZz6WSuUhGlwGnS0Zv-wZLrbCCMFMFqM4wXxBOE6AqzJ4c4eC-MnvutY5JoLAzZjeZyeRpVpcuzBhXLzCcYgMEwjcA4jKxB2BOYvpDjROLEXBTSZ2oQ6E~XCz941YfwciAlMVzgUk6XZHla45uuumXNQ20jAK2cOmqiHwCSDLJgJnUy33CTOMFgw__"></img>
                </div>
                <div className="card-title">Cooking class</div>
                <div className="card-date">2024.8.12</div>
              </div>
              <div className="card">
                <div className="card-image">
                  <img src="https://s3-alpha-sig.figma.com/img/ce3c/09c8/715591a35943d80c1ea8bd1b71db844d?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G~CvYPfpjC1kSvC0SHoy0oq7htWywXk7HqUal0nafQd79COeB0v7G61GaSbWcV84O9BuRzukY5pI2vWp2tBPwYWt21bAeuHai5vkFKcG2pWlk5lgFaTH68wrn-GbyCokePQDsOO4rhGR9pAlQnxP~l15T38Zj-mRV127pCS7WW3ygRFlZq0jp6u2FWj5mYSc6Cn7ukRgsxpX8trj8Az5nCDMrRZWnWe8bPUUBYcAePK4LhKe1b9JvzwOND6KfJ1IecJITzigdfoCZZUhlDr7-MR85udjkwgc6T5uFfS-H9uxV~Tg1NeExQrBe9Tn-fkBhflLG1du2w56wmai381wzA__"></img>
                </div>
                <div className="card-title">Cooking class</div>
                <div className="card-date">2024.8.12</div>
              </div>
              <div className="card">
                <div className="card-image">
                  <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
                </div>
                <div className="card-title">Cooking class</div>
                <div className="card-date">2024.8.12</div>
              </div>
              <div className="card">
                <div className="card-image">
                  <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
                </div>
                <div className="card-title">Cooking class</div>
                <div className="card-date">2024.8.12</div>
              </div>
              <div className="card">
                <div className="card-image">
                  <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
                </div>
                <div className="card-title">Cooking class</div>
                <div className="card-date">2024.8.12</div>
              </div>
              <div className="card">
                <div className="card-image">
                  <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
                </div>
                <div className="card-title">Cooking class</div>
                <div className="card-date">2024.8.12</div>
              </div>
            </div>
          </div>
          <div className="past-activity">
            <h1>Past activity</h1>
            <div className="scroll-container">
              <div className="card">
                <div className="card-image">
                  <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
                </div>
                <div className="card-title">Cooking class</div>
                <div className="card-date">2024.8.12</div>
              </div>
              <div className="card">
                <div className="card-image">
                  <img src="https://s3-alpha-sig.figma.com/img/d098/ee3b/6c2b37f58d15cb93e78d348bbe7c1aa6?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SetPzCP-2gX7uU-~J86pgcDzm51dT3LGGBXCbyoTn8Cfp2d69pZps3oKbX~LSP19EgKuumlXeHf2cp5KM-2aL~gQqQDxhdtJa5BZjR-6H0UrXBurpr9NRWJLhFiu8M1Y39CbGpDXt7MsTPakYEhFb7Y8W8F3tQlZz6WSuUhGlwGnS0Zv-wZLrbCCMFMFqM4wXxBOE6AqzJ4c4eC-MnvutY5JoLAzZjeZyeRpVpcuzBhXLzCcYgMEwjcA4jKxB2BOYvpDjROLEXBTSZ2oQ6E~XCz941YfwciAlMVzgUk6XZHla45uuumXNQ20jAK2cOmqiHwCSDLJgJnUy33CTOMFgw__"></img>
                </div>
                <div className="card-title">Cooking class</div>
                <div className="card-date">2024.8.12</div>
              </div>
              <div className="card">
                <div className="card-image">
                  <img src="https://s3-alpha-sig.figma.com/img/ce3c/09c8/715591a35943d80c1ea8bd1b71db844d?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=G~CvYPfpjC1kSvC0SHoy0oq7htWywXk7HqUal0nafQd79COeB0v7G61GaSbWcV84O9BuRzukY5pI2vWp2tBPwYWt21bAeuHai5vkFKcG2pWlk5lgFaTH68wrn-GbyCokePQDsOO4rhGR9pAlQnxP~l15T38Zj-mRV127pCS7WW3ygRFlZq0jp6u2FWj5mYSc6Cn7ukRgsxpX8trj8Az5nCDMrRZWnWe8bPUUBYcAePK4LhKe1b9JvzwOND6KfJ1IecJITzigdfoCZZUhlDr7-MR85udjkwgc6T5uFfS-H9uxV~Tg1NeExQrBe9Tn-fkBhflLG1du2w56wmai381wzA__"></img>
                </div>
                <div className="card-title">Cooking class</div>
                <div className="card-date">2024.8.12</div>
              </div>
              <div className="card">
                <div className="card-image">
                  <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
                </div>
                <div className="card-title">Cooking class</div>
                <div className="card-date">2024.8.12</div>
              </div>
              <div className="card">
                <div className="card-image">
                  <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
                </div>
                <div className="card-title">Cooking class</div>
                <div className="card-date">2024.8.12</div>
              </div>
              <div className="card">
                <div className="card-image">
                  <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
                </div>
                <div className="card-title">Cooking class</div>
                <div className="card-date">2024.8.12</div>
              </div>
              <div className="card">
                <div className="card-image">
                  <img src="https://s3-alpha-sig.figma.com/img/39b3/d91c/f4ee7fa94c87ba6c92f862f6af225046?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oM5qrPhbOnpzMlJqkeDO51PemRGABFwsjZ4NQMb8vksHDe8taf33ewAviJMwas32e9PYqjxLGJFkYHu9ntGb6VmsgQ1ADHjChfpGAzTt-qh1t0JrMZdM3oGu~JdNX0GyiSwboWHmHObkLTFcpAReLlMqJLDjsdUUk-XXMJUUYXVPyMZ3tnMa6VrZ1qOhMSCbQTij-i6bYsW07CmrNn-8fusT1Mi2-2DjGlzGi~2bBrOZfPZwjhMzgv-LngjDdZeIUNCMEWKd6ASlmOyE~cq7eL-swkZIVr-FN98rM5eJrh4JXNZoIUgo0L9SWSIz3z3ZG-m1qkGPPL63zc2ZNb2Akg__"></img>
                </div>
                <div className="card-title">Cooking class</div>
                <div className="card-date">2024.8.12</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-report">
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <ListboxButton>{selectedPerson.name}</ListboxButton>
          <ListboxOptions>
            {people.map((person) => (
              <ListboxOption
                key={person.id}
                value={person}
                disabled={person.unavailable}
              >
                {person.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
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
      </section>
    </>
  );
}
