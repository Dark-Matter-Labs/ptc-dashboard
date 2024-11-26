import { useState, useRef, useEffect } from "react";
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
}) => {
  const mapRef = useRef();
  const defaultStyle = "mapbox://styles/mapbox/streets-v11";
  //defaultLocation in Daegu
  const defaultLocation = {
    latitude: 51.521646,
    longitude: -0.198941,
  };
  const [viewport] = useState({
    width: option?.width ?? "100%",
    height: option?.height ?? 400,
    initialViewState: {
      zoom: option?.zoom ?? 12,
      latitude: Number(locations[0]?.latitude ?? defaultLocation.latitude),
      longitude: Number(locations[0]?.longitude ?? defaultLocation.longitude),
    },
    mapStyle:
      currentLanguage === "en"
        ? defaultStyle
        : `${defaultStyle}?language=${currentLanguage}`,
    language: currentLanguage,
  });

  useEffect(() => {
    mapRef.current?.setLanguage(currentLanguage);
  }, [currentLanguage]);

  return (
    <Map ref={mapRef} {...viewport} mapboxAccessToken={mapboxgl.accessToken}>
      {/* Add a Marker */}
      {locations.map((loc, index) => (
        <Marker
          key={index}
          latitude={Number(loc?.latitude ?? defaultLocation.latitude)}
          longitude={Number(loc?.longitude ?? defaultLocation.longitude)}
        >
          {/* <LocationMarkerIcon className="h-12 w-12 white mr-1 text-red-600" /> */}
          <img src={MapPinGreenImgSrc} className="h-7 w-7" alt="map pin" />
        </Marker>
      ))}
    </Map>
  );
};

MultiLocationsMapBox.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object),
  option: PropTypes.object,
  handleChangeLanguage: PropTypes.func,
  currentLanguage: PropTypes.string,
};
