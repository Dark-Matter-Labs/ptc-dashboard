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

  // Helper function to map fetched spaces to locations
  // const mapSpacesToLocations = (spaces) =>
  //   spaces.map((space) => ({
  //     latitude: space.latitude,
  //     longitude: space.longitude,
  //   }));

  // Load locations filtered by selected themes
  const loadLocations = async () => {
    try {
      const response =
        await permissionEngineAPI.filterSpaceByTopics(selectedThemes);
      console.log("Fetched spaces for locations: ", response.data);

      const convertedLocations = response.data;
      setLocations(convertedLocations);
    } catch (error) {
      console.error("Error loading locations: ", error);
    }
  };

  // Filter and load locations based on pagination and themes
  const filterLocations = async () => {
    try {
      const response = await permissionEngineAPI.fetchSpaces({
        page: 1,
        limit: 10,
        topicIds: selectedThemes || [],
      });
      console.log("Filtered spaces: ", response.data);

      const convertedLocations = response.data;
      setLocations(convertedLocations);
    } catch (error) {
      console.error("Error filtering locations: ", error);
    }
  };

  // Load topics based on selected themes
  const loadTopics = async () => {
    try {
      const mappedTopics = await Promise.all(
        selectedThemes.map(async (themeId) => {
          try {
            const response = await permissionEngineAPI.fetchTopicById(themeId);
            console.log(`Fetched topic (${themeId}): `, response);
            return { id: themeId, name: response.name };
          } catch (error) {
            console.error(`Error fetching topic (${themeId}): `, error);
            return null;
          }
        })
      );

      const validTopics = mappedTopics.filter(Boolean);
      console.log("Mapped topics: ", validTopics);
      setTopics(validTopics);
    } catch (error) {
      console.error("Error loading topics: ", error);
    }
  };

  // Effects
  useEffect(() => {
    loadLocations();
  }, []);

  useEffect(() => {
    loadTopics();
    filterLocations();
    console.log("Updated selected themes: ", selectedThemes);
  }, [selectedThemes]);

  useEffect(() => {
    console.log("Updated locations: ", locations);
  }, [locations]);

  const currentLanguage = "ko";

  return (
    <section
      ref={mapSectionRef}
      data-section="map"
      className="bg-[#F9F3F3] h-max w-11/12 mx-auto rounded-2xl border-2 border-indigo-500/0"
    >
      {/* Header Section */}
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
        {/* Selected Topics */}
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 w-full">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="rounded-full px-4 py-2 bg-[#431F51] text-white w-fit"
            >
              {topic.name}
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full border-4 border-indigo-800/0 h-[450px] rounded-2xl overflow-hidden">
        <MultiLocationsMapBox
          permissionEngineAPI={permissionEngineAPI}
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
  permissionEngineAPI: PropTypes.object.isRequired,
  selectedThemes: PropTypes.array.isRequired,
};
