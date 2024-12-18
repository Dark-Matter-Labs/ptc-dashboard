import PropTypes from "prop-types";
import { MultiLocationsMapBox } from "../../components/Common/MultiLocationsMapBox";
import { useEffect, useState } from "react";
import { reverseGeocode } from "../../lib/util";
import { useTranslation } from "react-i18next";

export const LandingMap = ({
  mapSectionRef,
  permissionEngineAPI,
  selectedThemes,
  currentLanguage,
}) => {
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState([]);
  const [topics, setTopics] = useState([]);
  const { t } = useTranslation();

  const loadUserLocation = async () => {
    return await new Promise((resolve, reject) => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const geocode = await reverseGeocode(latitude, longitude);
              setUserLocation({ ...geocode, latitude, longitude });
              resolve({ ...geocode, latitude, longitude });
            },
            (error) => {
              throw error;
            }
          );
        } else {
          throw new Error("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  // Load locations filtered by selected themes
  const loadLocations = async () => {
    try {
      const fetchSpaceOption = {
        page: 1,
        limit: 20,
      };

      if (selectedThemes && selectedThemes.length > 0) {
        fetchSpaceOption.topicIds = selectedThemes.join(",");
      }

      if (userLocation?.bbox) {
        fetchSpaceOption.geometry = userLocation?.bbox?.join(",");
      }

      const response = await permissionEngineAPI.fetchSpaces(fetchSpaceOption);
      console.log("Fetched spaces for locations: ", response);

      let convertedLocations = response;
      if (!convertedLocations || convertedLocations?.length === 0) {
        const { page, limit } = fetchSpaceOption;
        await permissionEngineAPI.fetchSpaces({ page, limit }).then((res) => {
          convertedLocations = res ?? [];
        });
      }

      setLocations(convertedLocations);
    } catch (error) {
      console.error("Error loading locations: ", error);
    }
  };

  // Filter and load locations based on pagination and themes
  const filterLocations = async () => {
    try {
      const params = { page: 1, limit: 10 };
      if (selectedThemes && selectedThemes.length > 0) {
        params.topicIds = selectedThemes;
      }
      const response = await permissionEngineAPI.fetchSpaces(params);
      console.log("Filtered spaces: ", response);

      const convertedLocations = response;
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
            return {
              id: themeId,
              name: response?.translation?.[currentLanguage] ?? response.name,
            };
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
    loadUserLocation();
    loadLocations();
  }, []);

  useEffect(() => {
    loadLocations();
  }, [userLocation]);

  useEffect(() => {
    loadTopics();
    filterLocations();
    console.log("Updated selected themes: ", selectedThemes);
  }, [selectedThemes]);

  useEffect(() => {
    console.log("Updated locations: ", locations);
  }, [locations]);

  return (
    <section
      ref={mapSectionRef}
      data-section="map"
      className="bg-[#F9F3F3] h-max w-11/12 mx-auto rounded-2xl border-2 border-indigo-500/0"
    >
      {/* Header Section */}
      <div className="flex flex-col justify-between items-center p-8">
        <div className="text-[#AF56EF] text-base uppercase mt-2">
        {t("landing.map-explore-space")}
        </div>
        <div className="text-[#431F51] text-3xl mt-1">
        {t("landing.map-discover-unique-spaces")}
        </div>
        <div className="text-[#918C96] font-semibold mt-4">
        {t("landing.map-theme-selection")}
        </div>
        {/* Selected Topics */}
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 w-full">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="rounded-full px-4 py-2 bg-[#431F51] text-white w-fit"
            >
              {topic.translation?.[currentLanguage] ?? topic.name}
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
  currentLanguage: PropTypes.string,
};
