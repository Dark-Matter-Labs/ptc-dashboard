import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../useUser";
import PropTypes from "prop-types";
const ReviewEvent = ({ permissionEngineAPI }) => {
  const { user } = useUser();
  const { t } = useTranslation();
  const [eventData, setEventData] = useState({
    name: "Test Event Name",
    // ruleId: null,
    // duration: null, // to be collected from form
    // startsAt: null, // to be collected from form
    // externalServiceId: null,
    // details: null,
    // link: null,
    // callbackLink: null,
    // images: [],
    // topicIds: [],
    // privateRuleBlocks: [],
    // requestType: null,
  });

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

  useEffect(() => {
    fetchEventById();
  }, []);

  console.log("user: ", user);
  return (
    <div>
      {user ? (
        <div className="p-4 space-y-4 text-left">
          <div className="text-2xl block mb-2 font-semibold mt-8">
            Review Event
          </div>
          {/* Title */}
          <div className="py-4">
            {/* <p className="mb-4">{t("create-event.event-title")}</p> */}
            <div className="text-2xl font-semibold">{eventData.name}</div>
          </div>
          <hr />
          {/* Organizer name and email */}
          <p className="mb-4">{t("create-event.organizer-name")}</p>
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="mb-4">{t("create-event.organizer-email")}</p>
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
