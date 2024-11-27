import PropTypes from "prop-types";

import { MultiLocationsMapBox } from "../../components/Common/MultiLocationsMapBox";
import { useEffect, useState } from "react";
export const LandingMap = ({
  mapSectionRef,
  permissionEngineAPI,
  selectedThemes,
}) => {
  const [locations, setLocations] = useState([]);
  const [topics, setTopics] = useState([]);

  const topicIds = selectedThemes;

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

  const loadTopics = async () => {
    try {
      // Map selected themes to their corresponding topics names
      const mappedTopics = await Promise.all(
        selectedThemes.map(async (themeId) => {
          try {
            const response = await permissionEngineAPI.fetchTopicById(themeId);
            console.log("Fetching topic by id: ", response);
            return { id: themeId, name: response.name };
          } catch (error) {
            console.error("Error fetching topic by id: ", error);
            return null;
          }
        })
      );

      // Remove any null values (failed fetches)
      const validTopics = mappedTopics.filter(Boolean);

      console.log("Mapped topics: ", validTopics);
      setTopics(validTopics); // Update state with the mapped topics
    } catch (error) {
      console.error("Error fetching topics: ", error);
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
    loadLocations();
  }, []);
  useEffect(() => {
    loadTopics();
    console.log("selected themese:  ", selectedThemes);
  }, [selectedThemes]);

  const currentLanguage = "ko";
  return (
    <section
      ref={mapSectionRef}
      data-section="map"
      className="bg-[#F9F3F3] h-max w-11/12 mx-auto rounded-2xl border-2 border-indigo-500/0"
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
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 w-full">
          {topics.map((topic, index) => (
            <div
              key={index}
              className=" rounded-full px-4 py-2 bg-[#433648] text-white w-fit "
            >
              {topic.name}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full border-4 border-indigo-800/0 h-[450px] rounded-2xl overflow-hidden ">
        <MultiLocationsMapBox
          className="w-full h-full"
          locations={locations}
          currentLanguage={currentLanguage}
        />
      </div>
    </section>
  );
};

LandingMap.propTypes = {
  mapSectionRef: PropTypes.object,
  permissionEngineAPI: PropTypes.object,
  selectedThemes: PropTypes.array,
};
