import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../useUser";
import PropTypes from "prop-types";

const ReviewEvent = ({ permissionEngineAPI }) => {
  const { user } = useUser();
  const { t } = useTranslation();
  const [topics, setTopics] = useState([]);
  const [eventData, setEventData] = useState({});

  const fetchEventById = async () => {
    // TODO. add pagination or infinite scroll feature
    await permissionEngineAPI
      .fetchEventById("82ac35aa-c30c-4c0c-ac2d-22d78eecd6c0")
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
  }, []);

  useEffect(() => {
    interpretTopics();
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
            <div className="text-2xl font-semibold">{eventData.name}</div>
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
