import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";
import { accessToken } from "../../lib/mapbox";
import MapPinGreenImgSrc from "../../assets/image/map-pin-green.svg";
import { navigateTo } from "../../lib/util";
import { useTranslation } from "react-i18next";

mapboxgl.accessToken = accessToken;

export const MultiLocationsMapBox = ({
  option,
  locations,
  currentLanguage,
  permissionEngineAPI,
}) => {
  const mapRef = useRef();
  const defaultStyle = "mapbox://styles/mapbox/streets-v11";

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [viewLocation, setViewLocation] = useState({
    latitude: locations?.[0]?.latitude ?? 0,
    longitude: locations?.[0]?.longitude ?? 0,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [closestLocation, setClosestLocation] = useState(null);
  const [selectedLocationInfo, setSelectedLocationInfo] = useState(null);
  const [viewport] = useState({
    width: option?.width ?? "100%",
    height: option?.height ?? 400,
    initialViewState: {
      zoom: option?.zoom ?? 11,
      latitude: Number(viewLocation.latitude),
      longitude: Number(viewLocation.longitude),
    },
    mapStyle:
      currentLanguage === "en"
        ? defaultStyle
        : `${defaultStyle}?language=${currentLanguage}`,
    language: currentLanguage,
  });

  const loadSpaceInformation = async () => {
    if (!selectedLocation?.id) {
      return;
    }
    // Fetch space information for the selected location
    try {
      console.log("[MAPBOX] selected space Id: ", selectedLocation?.id);
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

  const loadCenterLocation = () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const closestLocationResult = findClosestLocation(position.coords);
            setClosestLocation(closestLocationResult);
            mapRef.current?.setCenter([
              Number(closestLocationResult?.longitude ?? longitude),
              Number(closestLocationResult?.latitude ?? latitude),
            ]);
            console.log("closestLocation", closestLocation);
          },
          (error) => {
            console.error(error);
            mapRef.current?.setCenter([
              Number(locations?.[0]?.longitude ?? 0),
              Number(locations?.[0]?.latitude ?? 0),
            ]);
          }
        );
      } else {
        throw new Error("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      console.error(error);
      mapRef.current?.setCenter([
        Number(locations?.[0]?.longitude ?? 0),
        Number(locations?.[0]?.latitude ?? 0),
      ]);
    }
  };

  const calculateDistance = (userLocation, markerLocation) => {
    const toRadians = (deg) => (deg * Math.PI) / 180;

    const R = 6371e3; // Earth's radius in meters
    const lat1 = toRadians(userLocation.latitude);
    const lat2 = toRadians(Number(markerLocation.latitude));
    const deltaLat = toRadians(
      Number(markerLocation.latitude) - userLocation.latitude
    );
    const deltaLng = toRadians(
      Number(markerLocation.longitude) - userLocation.longitude
    );

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    return distance;
  };

  // Function to find the closest marker
  const findClosestLocation = (userLocation) => {
    let closestLocation = null;
    let shortestDistance = Infinity;

    locations?.forEach((location) => {
      const distance = calculateDistance(userLocation, location);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestLocation = location;
      }
    });

    return closestLocation;
  };

  useEffect(() => {
    mapRef.current?.setLanguage(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    // Fetch space information using locations
    console.log("[MAPBOX] locations: ", locations);
    setViewLocation({
      latitude: closestLocation?.latitude ?? locations?.[0]?.latitude ?? 0,
      longitude: closestLocation?.longitude ?? locations?.[0]?.longitude ?? 0,
    });
    mapRef.current?.setCenter([
      Number(viewLocation?.longitude ?? 0),
      Number(viewLocation?.latitude ?? 0),
    ]);
    loadCenterLocation();
  }, [locations, closestLocation]);

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
      {locations?.map((loc, index) => (
        <Marker
          key={index}
          latitude={Number(loc?.latitude ?? viewLocation.latitude)}
          longitude={Number(loc?.longitude ?? viewLocation.longitude)}
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
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full h-full bg-white shadow-lg rounded-lg overflow-scroll">
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
          <div
            className="h-full p-4 flex flex-col justify-between overflow-scroll"
            style={{
              height: "60vh",
              minHeight: "60vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div className="flex flex-row justify-between">
                <h3 className="text-2xl font-bold text-[#431F51] ">
                  {selectedLocation.name}
                </h3>
                {/* Close Button */}
                <button
                  className="top-2 right-2 bg-gray-300 text-gray-600 font-semibold rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-400 z-40"
                  onClick={() => setSelectedLocation(null)}
                >
                  close
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                {selectedLocation.details}
              </p>
              {selectedLocation.topics && (
                <div className="mt-4">
                  <div className="font-semibold text-gray-600">
                  {t("landing.map-space-keyword")}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-y-2 gap-2">
                    {selectedLocation.topics.map((topic, index) => (
                      <div
                        className="bg-[#431F51] px-4 py-2 rounded-full text-white  w-fit"
                        key={index}
                      >
                        {topic.translation[currentLanguage] ?? topic.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              className="bg-[#AF56EF] w-full text-white font-semibold rounded-md py-2 px-4 self-start mt-4"
              onClick={() =>
                navigateTo({
                  navigate,
                  pathname: `/space/${selectedLocation.id}`,
                })
              }
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
