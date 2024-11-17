import { UserIcon } from "@heroicons/react/solid";
// import { PlusIcon } from "@heroicons/react/solid";
// import { LinkIcon } from "@heroicons/react/solid";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { CalendarIcon } from "@heroicons/react/outline";
import { UsersIcon } from "@heroicons/react/outline";
import { Button } from "@headlessui/react";
import "../../assets/css/Space.css";
import PropTypes from "prop-types";
import * as Type from "../../lib/PermissionEngine/type";
import { MapBox } from "../../components/Common/MapBox";
import dayjs from "dayjs";
// import { useEffect, useState } from "react";

export default function Space({ space, spaceOwner, currentLanguage }) {
  const location = {
    longitude: space?.longitude,
    latitude: space?.latitude,
  };
  const thumbnail = space?.spaceImages?.find(
    (item) => item.type === Type.SpaceImageType.thumbnail
  )?.link;

  const cover = space?.spaceImages?.find(
    (item) => item.type === Type.SpaceImageType.cover
  )?.link;

  function capitalizeFirstLetter(str) {
    if (!str) return str; // Return the original string if it's empty
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const topics = space?.spaceTopics?.map((item) => item.topic) ?? [];

  return (
    <section className="space">
      <div className="space-data">
        <div className="space-image">
          {/* First, space image */}
          <img src={cover}></img>
          {/* Second, profile image */}
          <img src={thumbnail}></img>
        </div>
        <div className="space-snippet">
          <h1>{space?.name}</h1>

          <div className="space-account">
            <UserIcon className="h-5 w-5 text-gray-800 mr-1" />
            {spaceOwner?.name}
          </div>
          <div className="space-desc">{space?.details}</div>
          {/* <div className="space-connection">273 Connections</div> */}
          <h3>Space Keywords</h3>
          {topics?.map((topic) => (
            <Button key={topic.id} className="tag" id={topic.id}>
              {topic?.name}
            </Button>
          ))}
          <div className="space-call-to-action">
            {/* <Button className="follow-button" onClick={() => alert("TBD")}>
              <PlusIcon className="h-5 w-5 white mr-1"></PlusIcon>Follow
            </Button> */}
          </div>
        </div>
      </div>
      <div className="space-map">
        <div className="map-image">
          {/* Background, map */}
          {location.longitude && location.latitude ? (
            <MapBox location={location} currentLanguage={currentLanguage} />
          ) : (
            ""
          )}
          <div className="chip">
            {/* Forground, profile image */}
            <img src={thumbnail}></img>
            <div className="chip-content">
              <h1>{space?.name}</h1>
              <div>{space?.address}</div>
            </div>
          </div>
        </div>
        <div className="map-snippet">
          <div className="registration-date">
            <CalendarIcon className="h-5 w-5 white mr-1 text-gray-400"></CalendarIcon>
            <b>Registration date</b>
            {dayjs(space?.createdAt).format("YYYY-MM-DD")}
          </div>
          <div className="space-owner">
            <UsersIcon className="h-5 w-5 white mr-1 text-gray-400"></UsersIcon>
            <b>Space owner</b>
            {spaceOwner?.name}
            <div className="tag">{capitalizeFirstLetter(spaceOwner?.type)}</div>
          </div>
          <hr></hr>
          <div className="address">
            <LocationMarkerIcon className="h-5 w-5 white mr-1 text-gray-400"></LocationMarkerIcon>
            {space?.address}
          </div>
          {/* <div className="website">
            <LinkIcon className="h-5 w-5 white mr-1 text-gray-400"></LinkIcon>
            www.website.com
          </div> */}
        </div>
        <div className="map-call-to-action">
          <Button className="become-steward-button">Become a Steward</Button>
          <Button className="browse-rules-button">Browse Rules</Button>
        </div>
      </div>
    </section>
  );
}

Space.propTypes = {
  space: PropTypes.object,
  spaceOwner: PropTypes.object,
  currentLanguage: PropTypes.string,
};
