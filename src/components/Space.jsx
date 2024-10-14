import { UserIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/solid";
import { LinkIcon } from "@heroicons/react/solid";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { CalendarIcon } from "@heroicons/react/outline";
import { UsersIcon } from "@heroicons/react/outline";
import { Button } from "@headlessui/react";
import "../assets/css/Space.css";
export default function Space() {
  return (
    <section className="space">
      <div className="space-data">
        <div className="space-image">
          {/* First, space image */}
          <img src="https://plus.unsplash.com/premium_photo-1670315264879-59cc6b15db5f?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
          {/* Second, profile image */}
          <img src="https://images.unsplash.com/uploads/1411901100260f56b39b9/ab70b250?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
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
      <div className="space-map">
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
  );
}
