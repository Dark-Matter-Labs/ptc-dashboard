import { useState, useRef, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import PropTypes from "prop-types";
import { accessToken } from "../../lib/mapbox";
import { LocationMarkerIcon } from "@heroicons/react/solid";

mapboxgl.accessToken = accessToken;

export const MapBox = ({ option, location, currentLanguage }) => {
  const mapRef = useRef();
  const defaultStyle = "mapbox://styles/mapbox/streets-v11";
  const defaultLocation = {
    latitude: 51.543062515009375,
    longitude: -0.05558636578220514,
  };
  const [viewport] = useState({
    width: option?.width ?? "100%",
    height: option?.height ?? 400,
    initialViewState: {
      zoom: option?.zoom ?? 14,
      latitude: Number(location?.latitude ?? defaultLocation.latitude),
      longitude: Number(location?.longitude ?? defaultLocation.longitude),
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
      <Marker
        latitude={Number(location?.latitude ?? defaultLocation.latitude)}
        longitude={Number(location?.longitude ?? defaultLocation.longitude)}
      >
        <LocationMarkerIcon className="h-12 w-12 white mr-1 text-red-600"/>
      </Marker>
    </Map>
  );
};

MapBox.propTypes = {
  location: PropTypes.object,
  option: PropTypes.object,
  handleChangeLanguage: PropTypes.func,
  currentLanguage: PropTypes.string,
};
