import PropTypes from "prop-types";

import { MultiLocationsMapBox } from "../../components/Common/MultiLocationsMapBox";
import { useEffect, useState } from "react";
export const LandingMap = ({ mapSectionRef, permissionEngineAPI }) => {
  const [locations, setLocations] = useState([]);

  // receive an array of topic id from theme selector
  const topicIds = [
    "e361cb09-e808-479f-b7ee-c2100f2fd4b0", // common
  ];

  // filtered locations
  const loadLocations = async () => {
    try {
      const response = await permissionEngineAPI.filterSpaceByTopics(topicIds);

      const fetchedSpaces = response.data;
      console.log("fetched spaces: ", fetchedSpaces);
      //set locations
      const convertedLocations = fetchedSpaces.map((space) => ({
        latitude: space.latitude,
        longitude: space.longitude,
      }));
      setLocations(convertedLocations);
    } catch (error) {
      console.error("error fetching me: ", error);
    }
  };
  // filtered locations in Daegu
  // const sample_locations = [
  //   { latitude: 35.8709, longitude: 128.6021 },
  //   { latitude: 35.8718, longitude: 128.6005 },
  //   { latitude: 35.8721, longitude: 128.5997 },
  //   { latitude: 35.8702, longitude: 128.6018 },
  //   { latitude: 35.8713, longitude: 128.6026 },
  //   { latitude: 35.872, longitude: 128.6009 },
  //   { latitude: 35.8707, longitude: 128.601 },
  // ];

  useEffect(() => {
    console.log("in landing map useEffect: ");
    loadLocations();
  }, []);

  const currentLanguage = "en";
  return (
    <section
      ref={mapSectionRef}
      data-section="map"
      className="bg-[#252323] h-screen "
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
  permissionEngineAPI: PropTypes.object,
};
