import { useUser } from "../../../useUser";
import { useState, useEffect } from "react";
import { CalendarIcon, ClockIcon } from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { navigateTo } from "../../../lib/util";

export default function DisplayAssignedEvents({ permissionEngineAPI }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [assignedRequests, setAssignedRequests] = useState([]);
  const [isPermissioner, setIsPermissioner] = useState(false);
  const [me, setMe] = useState(null);
  const { user } = useUser();
  let { spaceId } = useParams();

  const fetchMe = async () => {
    const me = await permissionEngineAPI.fetchMe();
    setMe(me);
  };

  const fetchAssignedEvents = async () => {
    // TODO. add pagination or infinite scroll feature
    console.log("fetchAssignedEvents");

    try {
      // Fetch assigned events
      const data = await permissionEngineAPI.fetchAssignedEvent(spaceId);
      console.log(">>> Assigned event data: ", data);

      // Fetch details for each event concurrently
      const detailedData = await Promise.all(
        data.map(async (event) => {
          try {
            const eventDetails = await permissionEngineAPI.fetchEventById(
              event.spaceEventId
            );
            return { ...event, name: eventDetails.name }; // Include response.name in the event object
          } catch (err) {
            console.error(
              `Error fetching details for event ${event.spaceEventId}:`,
              err
            );
            return { ...event, name: "Unknown" }; // Fallback value if fetching details fails
          }
        })
      );

      // Update state with detailed data
      setAssignedRequests(detailedData);
    } catch (error) {
      console.error("Error fetching event info:", error);
      navigate("/"); // Handle navigation in case of errors
    }
  };
  const validatePermission = async () => {
    try {
      const permissionData =
        await permissionEngineAPI.fetchPermissioners(spaceId);

      const isValid = permissionData.some(
        (item) => item.userId === me.id && item.isActive
      );
      console.log("all permissioners: ", permissionData, "isValid: ", isValid);
      setIsPermissioner(isValid);
    } catch (error) {
      // user is not allowed to fetch permissioners
      console.error("Error fetching permissioners:", error);
      setIsPermissioner(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    if (me) {
      fetchAssignedEvents();
      // setIsPermissioner(false);
      validatePermission();
      console.log("me: ", me);
    }
  }, [me]);

  return (
    <div className="px-8 pt-8 mb-24">
      <h1 className="text-2xl font-bold text-black">
        {t("events.assigned-events")}
      </h1>

      {user ? (
        isPermissioner ? (
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
                          {request.name}
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
          <p> Please join the permissioning group.</p>
        )
      ) : (
        // Please log in
        <p>{t("login-error")}</p>
      )}
    </div>
  );
}

DisplayAssignedEvents.propTypes = {
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
};
