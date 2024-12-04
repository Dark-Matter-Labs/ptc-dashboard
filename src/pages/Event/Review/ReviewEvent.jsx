import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../useUser";
import PropTypes from "prop-types";
import { formatDateTime } from "../../../lib/util";
import { useParams } from "react-router-dom";

const ReviewEvent = ({ permissionEngineAPI }) => {
  const { user } = useUser();
  const { spaceEventId } = useParams();
  const { t } = useTranslation();
  const [topics, setTopics] = useState([]);
  const [eventData, setEventData] = useState({});
  const [timeObj, setTimeObj] = useState({ date: null, time: null });

  const fetchEventById = async () => {
    // TODO. add pagination or infinite scroll feature
    await permissionEngineAPI
      .fetchEventById(spaceEventId)
      .then((data) => {
        console.log("event data: ", data);
        setEventData(data);
      })
      .catch((error) => {
        console.error("Error fetching event info:", error);
      });
  };

  const interpretTopics = async () => {
    try {
      console.log("topics: ", eventData.topics);
      const topicPromises = eventData?.topics?.map((item) =>
        permissionEngineAPI.fetchTopicById(item.id)
      );
      const topicData = await Promise.all(topicPromises);
      const topicNames = topicData?.map((topic) => topic.name);
      setTopics(topicNames);
    } catch (error) {
      console.error("Error fetching topics: ", error);
    }
  };

  useEffect(() => {
    fetchEventById();
    console.log("spaceEventId: ", spaceEventId);
  }, []);

  useEffect(() => {
    interpretTopics();
    console.log(
      "start and end: ",
      eventData.startsAt,
      ", ",
      eventData.duration
    );
    if (eventData.startsAt && eventData.duration) {
      setTimeObj(formatDateTime(eventData.startsAt, eventData.duration));
    } else {
      console.warn("Missing start time or duration in eventData");
    }
  }, [eventData]);

  console.log("user: ", user);
  return (
    <div>
      {user ? (
        <div className="p-4 space-y-4 text-left">
          <div className="text-2xl block mb-2 font-semibold mt-8">
            Event Proposal
          </div>
          {/* Title */}
          <div className="py-4">
            <p className="mb-2">{t("review-event.event-title")}</p>
            <div className="text-2xl font-semibold">{eventData.name}</div>
          </div>
          <hr />
          {/* Theme */}
          <div className="py-4">
            <p className="mb-2">{t("review-event.event-theme")}</p>
            <div className="text-2xl font-semibold">
              {topics?.length > 0
                ? topics?.map((topic, index) => (
                    <div key={index} value={topic}>
                      <div className=" cursor-pointer px-4 py-2 rounded-full text-sm font-medium  bg-white text-gray-800 border border-gray-400 w-fit ">
                        {topic}
                      </div>
                    </div>
                  ))
                : "Themes not selected"}
            </div>
          </div>
          {/* Date and Time */}
          <div className="py-4">
            <p className="mb-2">{t("review-event.event-date-time")}</p>
            <div className="flex justify-between gap-4">
              <div className="w-full items-center text-center bg-gray-200 p-2 px-4 rounded-xl text-gray-900">
                {timeObj.date}
              </div>
              <div className="w-full items-center text-center bg-gray-200 p-2 px-4 rounded-xl text-gray-900">
                {timeObj.time}
              </div>
            </div>
          </div>
          <hr />
          {/* Description */}
          <div className="py-4">
            <p className="mb-2">{t("review-event.event-description")}</p>
            <div className="text-2xl font-semibold">{eventData.details}</div>
          </div>
          <hr />
          {/* Organizer name and email */}
          <p className="mb-2">{t("review-event.organizer-name")}</p>
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="mb-2">{t("review-event.organizer-email")}</p>
          <p className="text-xl font-semibold">{user.email}</p>
          <hr className="my-6"></hr>
        </div>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  );
};

export default ReviewEvent;
ReviewEvent.propTypes = {
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
};
