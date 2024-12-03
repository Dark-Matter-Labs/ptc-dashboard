import { useUser } from "../../useUser";
import { useEffect, useState } from "react";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { UserIcon, ArrowCircleRightIcon } from "@heroicons/react/solid";
import { ShareIcon, LocationMarkerIcon } from "@heroicons/react/outline";
const interests = ["Cooking", "Movies", "Education", "Art", "Music", "Hobby"];
const badges = [
  { name: "ECO HERO", bgColor: "bg-[#71BFA1]" },
  { name: "SPOTLESS HOST", bgColor: "bg-[#4283F3]" },
  { name: "SPACE VOYAGER", bgColor: "bg-[#6B52F4]" },
  { name: "EVENT ENTHUSIAST", bgColor: "bg-[#FF7C7C]" },
];
export default function Profile({
  permissionEngineAPI,
  currentLanguage,
  setNavTitle,
}) {
  const { user } = useUser();
  const { t } = useTranslation();
  console.log("user: ", user);
  console.log("currentLanguage: ", currentLanguage);
  const [profile, setProfile] = useState(null);

  const loadProfile = async () => {
    try {
      const me = await permissionEngineAPI.fetchMe();
      setProfile(me);
    } catch (error) {
      console.error("error fetching me: ", error);
    }
  };

  useEffect(() => {
    if (!i18n) {
      console.error("i18n is not initialized");
    }
    // load profile
    loadProfile();

    //set NavTitle
    setNavTitle(t("profile.title"));
  }, []);

  useEffect(() => {
    console.log("updated profile state: ", profile);
  }, [profile]);

  // TODO. add email subscription control
  return (
    <div className="relative mb-28">
      {/* Space Cover Image */}
      <img
        className="h-64 w-full object-cover"
        src="https://s3-alpha-sig.figma.com/img/7a69/ccc2/c686d8b80b324a7e8036f5672361145e?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YONn9j5bfcMkbglxEM0ufRMpdAKHuyfMnfPZWL00Dg5O0Qp83ruFW5UjwSUYXne1IvFDIO3dl-PmNJLkpuNBntpXSqjsN0eVoZgI85mKYEbOR0ktKp1Wr4UITw8FE076jvQotWNHACU7OOfUxQsN~Gr4oiJeJ4Md0IevNg5-BIrKQNYnD1z3lsKEzT2MPOfOwiVHyEV0YVu3WkEu8UezKwUq837hCdUm65sgDslEwq-zStJEY5O05VBdZIhTmGsyHRHdqoIlgtcdYgNmdYPacDaP01UCRmn4iAVk2CagUPMNKWu2nJuIUYgai8YazJeBPO064GSfu1EWVOUK~EbMQQ__"
        alt="space cover"
      ></img>
      {/* Profile Info Section */}
      <div className="relative px-8 pt-8">
        {/* Profile Picture */}
        {profile && (
          <img
            className="absolute top-[-50px] left-8 h-24 w-24 rounded-full border-4 border-white bg-gray-50"
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

Profile.propTypes = {
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
  setNavTitle: PropTypes.func,
};
