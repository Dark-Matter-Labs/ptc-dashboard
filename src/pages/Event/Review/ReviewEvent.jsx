import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../useUser";
const ReviewEvent = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  const [eventData] = useState({
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
