import { useUser } from "../../../useUser";
import { useState, useEffect } from "react";
import { CalendarIcon, MailOpenIcon, MailIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import * as Type from "../../../lib/PermissionEngine/type";

export default function DisplayNotifications({ permissionEngineAPI }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [me, setMe] = useState(null);
  const { user } = useUser();

  const fetchMe = async () => {
    const me = await permissionEngineAPI.fetchMe();
    setMe(me);
  };

  const fetchNotification = async () => {
    // TODO. add pagination or infinite scroll feature
    await permissionEngineAPI
      .fetchNotification({ page: 1, limit: 20 })
      .then((data) => {
        console.log("notification data: ", data);
        setNotifications(data);
      })
      .catch((error) => {
        console.error("Error fetching notification info:", error);
        navigate("/");
      });
  };

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    if (me) {
      fetchNotification();
    }
  }, [me]);

  useEffect(() => {
    notifications.map((notification) => {
      if (notification.status !== Type.UserNotificationStatus.complete) {
        permissionEngineAPI.updateNotificationToComplete(notification.id);
      }
    });
  }, [notifications]);

  // Helper function to format notification date and time
  const formatDateTime = (time) => {
    const date = new Date(time);

    // Format date as YYYY-MM-DD 00:00:00
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();

    return [dateString, timeString].join(" ");
  };

  return (
    <div className="px-8 pt-8 mb-24">
      <h1 className="text-2xl font-bold text-black">My notifications</h1>
      {user ? (
        notifications.length > 0 ? (
          <div>
            <p>
              you have
              {notifications.length == 1
                ? " 1 notification."
                : ` ${notifications.length} notifications.`}
            </p>
            <div className="mt-8 flex flex-col gap-4 ">
              {notifications.map((notification, key) => {
                const dateTimeString = formatDateTime(notification.createdAt);
                return (
                  <div
                    key={key}
                    className="border p-4 shadow rounded-[1rem] bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-xl ">
                        {notification.subjectPart}
                      </div>
                      {notification.status ===
                      Type.UserNotificationStatus.complete ? (
                        <MailOpenIcon className="size-4 text-gray-600 mr-2" />
                      ) : (
                        <MailIcon className="size-4 text-red-400 mr-2" />
                      )}
                    </div>
                    <hr className="my-2" />

                    <div className="flex items-center">
                      <CalendarIcon className="size-4 text-gray-600 mr-2" />
                      <span>{dateTimeString}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            notification?.htmlPart ?? notification?.textPart,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p>You have no notifications.</p>
        )
      ) : (
        // user is not logged in
        <p>Please log in.</p>
      )}
    </div>
  );
}

DisplayNotifications.propTypes = {
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
};
