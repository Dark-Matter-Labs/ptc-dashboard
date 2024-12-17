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

      // Check whether this user is still active in permissioning group
      // call http://localhost/api/v1/permissioner/${sapceId}' . and the data returned is in this
      //       {
      //   "data": [
      //     {
      //       "id": "3dc04b3f-40ba-401d-9490-e865d0c58cdc",
      //       "spaceId": "81787083-80c6-477b-9bd4-af21239ab266",
      //       "userId": "b4cc7df4-3b95-4444-87cd-373d4744b526",
      //       "inviterId": null,
      //       "isActive": true,
      //       "createdAt": "2024-11-27T09:02:46.448Z",
      //       "updatedAt": "2024-11-27T09:02:46.448Z"
      //     },
      //     {
      //       "id": "d8c58aa4-f953-4dd4-ac2a-cc1d8e72d0d7",
      //       "spaceId": "81787083-80c6-477b-9bd4-af21239ab266",
      //       "userId": "44acf9fc-9563-490d-8a86-3402b51c819a",
      //       "inviterId": "b4cc7df4-3b95-4444-87cd-373d4744b526",
      //       "isActive": true,
      //       "createdAt": "2024-12-13T12:10:31.517Z",
      //       "updatedAt": "2024-12-13T12:11:00.439Z"
      //     },
      //     {
      //       "id": "86fe09d5-5bf9-4c62-b45c-84bf64071e8c",
      //       "spaceId": "81787083-80c6-477b-9bd4-af21239ab266",
      //       "userId": "aaa69545-8b51-414a-b5e9-f1fd1fd54f59",
      //       "inviterId": "b4cc7df4-3b95-4444-87cd-373d4744b526",
      //       "isActive": true,
      //       "createdAt": "2024-12-16T12:10:49.014Z",
      //       "updatedAt": "2024-12-16T12:15:18.277Z"
      //     },
      //     {
      //       "id": "006f5b35-4607-47f7-b6d6-0f53cf3e3dc1",
      //       "spaceId": "81787083-80c6-477b-9bd4-af21239ab266",
      //       "userId": "d39fb021-02ea-4f29-a648-fb5ff0b4aa48",
      //       "inviterId": "b4cc7df4-3b95-4444-87cd-373d4744b526",
      //       "isActive": false,
      //       "createdAt": "2024-12-16T12:13:15.883Z",
      //       "updatedAt": "2024-12-17T12:20:01.430Z"
      //     }
      //   ],
      //   "total": 4
      // }
      // check whether user.id exists match with the returned data of "userId" field, and whether isActive: true,
      // only when user is match and is active would the user be able to see the data, so assign the state [isPermissioner] to true

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
