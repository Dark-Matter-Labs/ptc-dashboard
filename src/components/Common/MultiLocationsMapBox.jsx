import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";
import { accessToken } from "../../lib/mapbox";
// import { LocationMarkerIcon } from "@heroicons/react/solid";
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

  const [, setListedLocations] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const loadSpaceInfomation = async () => {
    // Fetch space information using spaceId
    try {
      const spaceInfos = await Promise.all(
        locations.map(async (location) => {
          console.log("space id: ", location.id);
          const spaceInfo = await permissionEngineAPI.fetchSpace(location.id);
          console.log("fetched space info: ", spaceInfo);
          return spaceInfo;
        })
      );

      setListedLocations(spaceInfos);

      // console.log("fetched space infos: ", spaceInfos);
      // const selectedSpaceInfo = selectedLocation
      //   ? spaceInfos.find((info) => info.id === selectedLocation.id)
      //   : null;

      // if (selectedSpaceInfo) {
      //   setSelectedLocation(selectedSpaceInfo);
      //   console.log(
      //     "(multi map) updated selected location: ",
      //     selectedLocation
      //   );
      // }
    } catch (error) {
      console.error("Error fetching space information: ", error);
    }
  };
  useEffect(() => {
    mapRef.current?.setLanguage(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    console.log("(multi map) locations: ", locations);
    loadSpaceInfomation();
  }, [locations]);

  useEffect(() => {
    mapRef.current?.scrollZoom.disable();
    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <Map ref={mapRef} {...viewport} mapboxAccessToken={mapboxgl.accessToken}>
      {/* Add a Marker */}
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
          {/* <LocationMarkerIcon className="h-12 w-12 white mr-1 text-red-600" /> */}
          <img src={MapPinGreenImgSrc} className="h-7 w-7" alt="map pin" />
        </Marker>
      ))}

      {/* Popup Panel at Bottom */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full h-fit bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Image Section */}
          <div className="h-1/3 w-full">
            <img
              src={
                selectedLocation.photos?.[0] ||
                "https://via.placeholder.com/150"
              }
              alt={selectedLocation.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="h-2/3 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {selectedLocation.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {selectedLocation.details}
              </p>
              {selectedLocation.topic?.name && (
                <p className="text-xs text-gray-500 mt-1">
                  Topic: {selectedLocation.topic.name}
                </p>
              )}
            </div>
            <button
              className="bg-[#AF56EF] w-full text-white font-semibold rounded-md py-2 px-4 self-start mt-4"
              onClick={() => navigate(`/space/${selectedLocation.id}`)}
            >
              See More
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
