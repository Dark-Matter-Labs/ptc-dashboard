import PropTypes from "prop-types";

import { MultiLocationsMapBox } from "../../components/Common/MultiLocationsMapBox";
export const LandingMap = ({ mapSectionRef }) => {
  // receive an array of topic id (family, friends, hobby, common)
  // const topicIds = [
  //   "009bdd05-6a8c-4b8e-9b50-f19583c7b0c2",
  //   "97459921-e485-40b8-8787-3b8e9ab6c32c",
  //   "ab246c90-e6be-4f46-8cc6-2f840d945ffc",
  //   "17f8122d-e62e-4e96-9720-dca6fe59893d",
  // ];

  // filtered locations in Seoul

  // filtered locations in Daegu
  const locations = [
    { latitude: 35.8709, longitude: 128.6021 },
    { latitude: 35.8718, longitude: 128.6005 },
    { latitude: 35.8721, longitude: 128.5997 },
    { latitude: 35.8702, longitude: 128.6018 },
    { latitude: 35.8713, longitude: 128.6026 },
    { latitude: 35.872, longitude: 128.6009 },
    { latitude: 35.8707, longitude: 128.601 },
  ];

  const currentLanguage = "en";
  return (
    <section
      ref={mapSectionRef}
      data-section="map"
      className="bg-[#F9F3F3] h-screen "
    >
      <div className="flex flex-col justify-between items-center p-8">
        <div className="text-[#AF56EF] text-base uppercase mt-2">
          Explore spaces
        </div>
        <div className="text-[#431F51] text-3xl mt-1">
          다양한 공간을 둘러보세요.
        </div>
        <div className="text-[#918C96] font-semibold mt-4">
          선택한 키워드입니다.
        </div>
      </div>
      <MultiLocationsMapBox
        locations={locations}
        currentLanguage={currentLanguage}
      />
    </section>
  );
};

LandingMap.propTypes = {
  mapSectionRef: PropTypes.object,
};
