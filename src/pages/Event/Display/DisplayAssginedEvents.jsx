import { useUser } from "../../../useUser";
import { useState, useEffect } from "react";
import { CalendarIcon, ClockIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { navigateTo, navigateToBack } from "../../../lib/util";

export default function DisplayAssignedEvents({ permissionEngineAPI }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [assignedRequests, setAssignedRequests] = useState([]);
  const [me, setMe] = useState(null);
  const { user } = useUser();

  const fetchMe = async () => {
    const me = await permissionEngineAPI.fetchMe();
    setMe(me);
  };

  const fetchAssignedEvents = async () => {
    // TODO. add pagination or infinite scroll feature
    await permissionEngineAPI
      .fetchAssignedEvent("8b1403f3-1840-40be-bfc1-3013ef36b640")
      .then((data) => {
        console.log(">>> assigned event data: ", data);
        setAssignedRequests(data);
      })
      .catch((error) => {
        console.error("Error fetching event info:", error);
        navigateToBack(navigate);
      });
  };

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    if (me) {
      fetchAssignedEvents();
    }
  }, [me]);

  return (
    <div className="px-8 pt-8 mb-24">
      <h1 className="text-2xl font-bold text-black">
        {t("events.assigned-events")}
      </h1>
      {user ? (
        assignedRequests.length > 0 ? (
          <div>
            <p>
              {t("events.you-have")}
              {assignedRequests.length == 1
                ? ` 1 ${t("events.event")}.`
                : ` ${assignedRequests.length} ${t("events.events")}.`}
            </p>
            <div className="mt-8 flex flex-col gap-4 ">
              {assignedRequests.map((request, key) => {
                let eventStatusColor = "bg-yellow-300";

                return (
                  <div
                    key={key}
                    onClick={() =>
                      navigateTo({
                        navigate,
                        pathname: `/event/review/${request.spaceEventId}`,
                      })
                    }
                    className="border p-4 shadow rounded-[1rem] bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-xl ">
                        {request.spaceEventId}
                      </div>
                      <div
                        className={`${eventStatusColor} text-sm p-1 px-4 rounded-full`}
                      >
                        {t(`${request.status}`)}
                      </div>
                    </div>
                    <hr className="my-2" />

                    <div className="flex items-center">
                      <CalendarIcon className="size-4 text-gray-600 mr-2" />
                      <span>{request.createdAt}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <ClockIcon className="size-4 text-gray-600 mr-2" />
                      <span>{request.updatedAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p>{t("events.no-events")}</p>
        )
      ) : (
        // user is not logged in
        <p>{t("login-error")}</p>
      )}
    </div>
  );
}

DisplayAssignedEvents.propTypes = {
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
};
