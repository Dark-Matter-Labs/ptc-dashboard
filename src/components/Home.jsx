import "../assets/css/Home.css";
import { Button } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/solid";
import { LinkIcon } from "@heroicons/react/solid";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { CalendarIcon } from "@heroicons/react/outline";
import { UsersIcon } from "@heroicons/react/outline";

export default function Home() {
  return (
    <div className="home-section">
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
    </div>
  );
}

// <div className="flex flex-wrap gap-x-5 w-full lg:mt-10 md:mt-0">
//   <div className="w-full lg:w-3/5  overflow-hidden lg:h-72 lg:rounded-r-lg border-2 lg:border-red-400  md:border-green-400 border-blue-400 bg-slate-400">
//     {/* <div className="h-24 w-24 ml-8 mt-12 rounded-full overflow-hidden ">
//       <img src="https://s3-alpha-sig.figma.com/img/ba8a/3aab/5d9e1731d686fd3622cb996db5c3c48b?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yx3GsrCMXsSl8ydytQXapRCga2Sx473AdY0pWFXbPKjYAur7rhJ~c5kiJ1cjbc~AKlKdzkBhUiY0eqRix8OALYzdd5lNcD~1SrxQPDc6fMBwx-07DkYRpUU2CDutLUU3NVkkA0JJxnTsBbLCvZuuTJFCK7xxmsR-p1r24tk3a~n4afS69o2LAI9q7tyHeRF106zLGlW4gzh86GgiIw0A52-SNXm56wNHu~2JzsZP3Z7kDhmmuAl-ixHteP7hbiWiXdr0n5BSUAJJ4NybQ4c877pxLGVYtHKEmrK0ORFTd-5DVmlro1L7GQyB5eWmE2mE-DM6a8D-0U62-QJzeqkKrA__"></img>
//     </div> */}
//     <img
//       className="object-cover"
//       src="https://s3-alpha-sig.figma.com/img/7a69/ccc2/c686d8b80b324a7e8036f5672361145e?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Bnq-lg9xa8u-g0AZ~DV3Oq~6lOE1Fgm6peov2QRgkKmRWDieoOLSgapHhNtlz7bwTqE9B9-i6OsO2W-e~PHOw0ne4qjxQ-tlbQ1fra-So4zjHDA9xsXAzafCaZjlgyZq4cx-Y-cMjL0Vwn3GWRaaLQDy7oTjzXMPazrCQ-UBZwOQJ4nVmdxonumfwLeVyXmNQTPFWsVGZUwdeshNX~anhXZ8fzZrvNfopglTuAW5XNwe5w-VvUjWil3GuuNI-9hfwqnPfAVCbuVLzMQSmpOsSIxXY7sgXnw6DioDHJMvEuh48zpC-Kj96mesRJHVEI12y44hr8tArFv5RDbltdYDXw__"
//     />{" "}
//   </div>
//   <div className="w-full lg:w-2/5 overflow-hidden lg:h-72  lg:rounded-lg border border-red-400  bg-slate-800">
//     <img
//       className="object-cover"
//       src="https://s3-alpha-sig.figma.com/img/aaec/7450/6dd7ef8fa20171555328653494da5e14?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ofQ8a57WtgjVZTSwqZCxd~ZgbuISnHLRhqIzpHghzJ~fSQFrDUOLZGh~3jaKDnuDW5ynvhoT146mst8ot0VDbJlntk7KrrWndsrRGIZ44j0~9cYhsO62M6uPl8ku6WHfpxb8VOAA2suGUoKT1WW9sAJyQjU1Pnv8Dy59pJv3GBsMn6pU-~Utt09HlD~mIG1V0H7~eE5hcaBmSv5RnWWuf6M9QeHlnlhx~wOYT9RugKV8m6WtiYFWW-8OxOInvU8BXzDTYc4-kmgRCCA220tCaWYckQSZiQer3-4EF5jeQ09OkmY7QchA6X4jZjI6AvXGGWGvL-iewY6FDjVTPPVb1A__"
//     />
//   </div>
// </div>;
