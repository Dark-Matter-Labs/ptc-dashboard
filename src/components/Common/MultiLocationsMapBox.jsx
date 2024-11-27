import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";
import { accessToken } from "../../lib/mapbox";
import MapPinGreenImgSrc from "../../assets/image/map-pin-green.svg";

mapboxgl.accessToken = accessToken;

export const MultiLocationsMapBox = ({
  option,
  locations,
  currentLanguage,
  permissionEngineAPI,
}) => {
  // const navigate = useNavigate();
  const mapRef = useRef();
  const defaultStyle = "mapbox://styles/mapbox/streets-v11";

  //defaultLocation in Daegu
  const defaultLocation = {
    latitude: 35.8709,
    longitude: 128.6021,
  };
  const [viewport] = useState({
    width: option?.width ?? "100%",
    height: option?.height ?? 400,
    initialViewState: {
      zoom: option?.zoom ?? 11,
      latitude: Number(locations[0]?.latitude ?? defaultLocation.latitude),
      longitude: Number(locations[0]?.longitude ?? defaultLocation.longitude),
    },
    mapStyle:
      currentLanguage === "en"
        ? defaultStyle
        : `${defaultStyle}?language=${currentLanguage}`,
    language: currentLanguage,
  });
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationInfo, setSelectedLocationInfo] = useState(null);

  const loadSpaceInformation = async () => {
    // Fetch space information for the selected location
    try {
      console.log("[MAPBOX] selected space Id: ", selectedLocation.id);
      const spaceInfo = await permissionEngineAPI.fetchSpace(
        selectedLocation.id
      );
      console.log("[MAPBOX] fetched space info: ", spaceInfo);

      // adding images from the space to selected location object
      setSelectedLocationInfo({
        ...selectedLocation,
        image: spaceInfo.spaceImages[0].link,
      });

      console.log("[MAPBOX] adding space photo: ", spaceInfo.spaceImages[0]);
    } catch (error) {
      console.error("Error fetching space information: ", error);
    }
  };
  useEffect(() => {
    mapRef.current?.setLanguage(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    // Fetch space information using locations
    console.log("[MAPBOX] locations: ", locations);
    // loadSpaceInfomation();
    // console.log("(multi map) locations: [after]", locations);
  }, [locations]);

  useEffect(() => {
    // when locatoin is selected, fetch more information for this location
    console.log("[MAPBOX] selected location: ", selectedLocation);
    loadSpaceInformation();
  }, [selectedLocation]);

  useEffect(() => {
    // when locatoin is selected, fetch more information for this location
    console.log("[MAPBOX] selected location info: ", selectedLocationInfo);
  }, [selectedLocationInfo]);

  return (
    <Map ref={mapRef} {...viewport} mapboxAccessToken={mapboxgl.accessToken}>
      {locations.map((loc, index) => (
        <Marker
          key={index}
          latitude={Number(loc?.latitude ?? defaultLocation.latitude)}
          longitude={Number(loc?.longitude ?? defaultLocation.longitude)}
          onClick={(e) => {
            e.originalEvent.stopPropagation(); // Prevent map zoom when clicking a marker
            setSelectedLocation(loc);
          }}
        >
          <img src={MapPinGreenImgSrc} className="h-7 w-7" alt="map pin" />
        </Marker>
      ))}

      {/* Popup Panel at Bottom */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full h-fit bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 bg-gray-300 text-gray-600 font-semibold rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-400 z-40"
            onClick={() => setSelectedLocation(null)}
          >
            close
          </button>

          {/* Image Section */}
          <div className="h-1/3 w-full">
            <img
              src={
                selectedLocationInfo?.image || "https://via.placeholder.com/150"
              }
              alt={selectedLocation.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="h-2/3 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#431F51] ">
                {selectedLocation.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {selectedLocation.details}
              </p>
              {selectedLocation.topics && (
                <div className="mt-4">
                  <div className="font-semibold text-gray-600">
                    이 공간의 키워드
                  </div>
                  <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-y-2 gap-2">
                    {selectedLocation.topics.map((topic, index) => (
                      <div
                        className="bg-[#431F51] px-4 py-2 rounded-full text-white  w-fit"
                        key={index}
                      >
                        {topic.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              className="bg-[#AF56EF] w-full text-white font-semibold rounded-md py-2 px-4 self-start mt-4"
              onClick={() => navigate(`/space/${selectedLocation.id}`)}
            >
              더 보러가기
            </button>
          </div>
        </div>
      )}
    </Map>
  );
};

MultiLocationsMapBox.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object),
  option: PropTypes.object,
  handleChangeLanguage: PropTypes.func,
  currentLanguage: PropTypes.string,
  permissionEngineAPI: PropTypes.object.isRequired,
};
