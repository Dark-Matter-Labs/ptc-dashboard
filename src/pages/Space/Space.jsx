import {
  LocationMarkerIcon,
  CalendarIcon,
  UsersIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/outline";
import { OfficeBuildingIcon, LinkIcon, UserIcon } from "@heroicons/react/solid";
import { Button } from "@headlessui/react";
import "../../assets/css/Space.css";
import { useRef } from "react";
import PropTypes from "prop-types";
import * as Type from "../../lib/PermissionEngine/type";
import { MapBox } from "../../components/Common/MapBox";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function Space({ space, spaceOwner, currentLanguage }) {
  const addressRef = useRef(null);
  const navigate = useNavigate();
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

  const handleCopyAddress = () => {
    const textToCopy = addressRef.current.innerText; // Get the innerText of the element
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Address copied!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <section className="space">
      <div className="space-data">
        <div className="space-image">
          {/* First, space image */}
          {cover ? (
            <img alt="space cover" src={cover}></img>
          ) : (
            <OfficeBuildingIcon className="text-gray-200" />
          )}

          {/* Second, profile image */}
          {thumbnail ? (
            <img alt="space thumbnail" src={thumbnail}></img>
          ) : (
            <LocationMarkerIcon className="text-gray-200" />
          )}
        </div>
        <div className="space-snippet">
          <h1>{space?.name}</h1>

          <div className="space-account">
            {spaceOwner?.image ? (
              <img
                className="h-5 w-5 flex-none rounded-full bg-gray-50 mr-1"
                src={spaceOwner?.image}
              ></img>
            ) : (
              <UserIcon className="h-5 w-5 text-gray-800 mr-1" />
            )}
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
            <div
              className="chip-content overflow-hidden"
              onClick={handleCopyAddress}
            >
              <h1>{space?.name}</h1>
              <div className="line-clamp-1 text-sm">
                {space?.address}
                <DocumentDuplicateIcon className="inline h-5 w-5 white text-gray-400 align-text-bottom ml-1" />
              </div>
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
          <div className="address" onClick={handleCopyAddress}>
            <LocationMarkerIcon className="h-7 w-7 white mr-1 text-gray-400"></LocationMarkerIcon>
            <div>
              <span ref={addressRef}>
                {space?.address}
                <DocumentDuplicateIcon className="inline h-5 w-5 white text-gray-400 align-text-bottom ml-1" />
              </span>
            </div>
          </div>
          <div className="website">
            {space?.link ? (
              <div className="flex">
                <LinkIcon className="h-5 w-5 white mr-1 text-gray-400"></LinkIcon>
                <a href={space?.link} target="_blank">
                  {space?.link}
                </a>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="map-call-to-action">
          {/* <Button className="become-steward-button" onClick={() => (alert('TBD'))}>Become a Steward</Button> */}
          <Button className="browse-rules-button" onClick={() => (navigate(`/rule/${space.ruleId}`))}>Browse Rules</Button>
        </div>
      </div>
    </section>
  );
}

Space.propTypes = {
  space: PropTypes.object,
  spaceOwner: PropTypes.object,
  spaceRule: PropTypes.object,
  currentLanguage: PropTypes.string,
  permissionEngineAPI: PropTypes.object,
};
