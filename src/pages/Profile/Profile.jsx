import { useUser } from "../../useUser";
import { useEffect } from "react";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { UserIcon, ArrowCircleRightIcon } from "@heroicons/react/solid";
import { ShareIcon, LocationMarkerIcon } from "@heroicons/react/outline";
import { events_data, past_events_data } from "../../eventData";
const cardData = [
  {
    id: 1,
    title: "Cook for Korea",
    description: "Learn how to cook delicious meals in the Open Kitchen.",
    image:
      "https://plus.unsplash.com/premium_photo-1683707120403-9add00a6140e?q=80&w=2371&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Pottery with Pham",
    description: "Unleash your creativity at the Creative Studio.",
    image:
      "https://plus.unsplash.com/premium_photo-1705407454980-4b8b64d068b8?q=80&w=2370&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "7am Yoga Routine",
    description: "Relax and rejuvenate in the Zen Garden.",
    image:
      "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?q=80&w=2370&auto=format&fit=crop",
  },
];
const interests = ["Cooking", "Movies", "Education", "Art", "Music", "Hobby"];
// Reading a8f8520b-bed0-4408-a2f3-9ba00b2fac37
// Dining 29eff517-2963-418b-a240-ce940290c0cd
const badges = [
  { name: "ECO HERO", bgColor: "#71BFA1" },
  { name: "SPACE VOYAGER", bgColor: "#6B52F4" },
  { name: "SPOTLESS HOST", bgColor: "#4283F3" },
  { name: "EVENT ENTHUSIAST", bgColor: "#FF7C7C" },
];
export default function Profile({
  permissionEngineAPI,
  currentLanguage,
  setNavTitle,
}) {
  const { user } = useUser();
  const { t } = useTranslation();
  console.log("user: ", user);
  useEffect(() => {
    if (!i18n) {
      console.error("i18n is not initialized");
    }
    // load profile
    loadProfile();

    //set NavTitle
    setNavTitle(t("profile.title"));
  }, []);

  // TODO. add email subscription control
  return (
    <div className="px-8 pt-8">
      <h1 className="text-2xl font-bold text-black">{t("profile.title")}</h1>
      {user ? (
        <>
          <img
            className="h-120 w-120 flex-none rounded-full bg-gray-50"
            src={user.picture}
            alt="user profile image"
          />
        )}

        <div className="mt-4">
          {profile ? (
            <>
              {/* Profile Details */}
              <>
                <p className="text-lg font-semibold">{profile.name}</p>
                <div className="text-sm text-gray-400 flex gap-1 py-2">
                  <>
                    <UserIcon className="h-5 w-5" />
                  </>
                  <>{profile.type}</>
                </div>
                <p className="text-sm text-gray-600">
                  Hi, I’m new here. Let’s make interesting events in Daegu city
                  together.
                </p>
              </>
              <div className="flex gap-2 justify-between md:justify-start items-center mt-6">
                <div className="text-center w-full md:w-max h-10 px-8 py-2 bg-[#3B3A43] rounded-xl  text-white ">
                  Edit profile
                </div>
                <div className=" bg-[#3B3A43] rounded-xl text-white px-2 py-2 h-10 ">
                  <ShareIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex gap-1 justify-left items-center mt-2">
                <div className=" rounded-xl text-gray-500 px-2 py-2 ">
                  <LocationMarkerIcon className="h-4 w-4" />
                </div>
                <div className="font-semibold">Location</div>
                <div className="ml-2 text-gray-700">Seoul, South Korea</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold  mt-4">
                  Interest
                </div>
                <div className="flex flex-wrap gap-2 py-1">
                  {interests.map((interest, index) => (
                    <div
                      key={index}
                      className="flex items-center cursor-pointer px-4 py-2 rounded-full text-sm font-medium bg-[#6B6C78] text-white"
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold mt-4">Badges</div>
                <div className="flex flex-wrap gap-2 py-1">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`flex items-center cursor-pointer px-4 py-2 rounded-full text-sm font-medium ${badge.bgColor} text-white`}
                    >
                      {badge.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-1 items-center text-gray-400">
                <div className="text-xl">VIEW ALL</div>
                <ArrowCircleRightIcon className="h-5 w-5 text-gray-300" />
              </div>
            </>
          ) : (
            <p>Please log in to see your profile information.</p>
          )}
        </div>
      </div>
    </div>
  );
}
const lightenColor = (color, percent) => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(255 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  const processedColor = `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;

  return processedColor;
};

Profile.propTypes = {
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
};
