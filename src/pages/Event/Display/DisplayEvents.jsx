import { useUser } from "../../../useUser";
import { useState, useEffect } from "react";
import { CalendarIcon, ClockIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import * as Type from "../../../lib/PermissionEngine/type";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import abbrTimezone from "dayjs-abbr-timezone";
import { navigateToBack } from "../../../lib/util";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(abbrTimezone);

export default function DisplayEvents({ permissionEngineAPI }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [me, setMe] = useState(null);
  const { user } = useUser();

  const fetchMe = async () => {
    const me = await permissionEngineAPI.fetchMe();
    setMe(me);
  };

  const fetchEvents = async () => {
    // TODO. add pagination or infinite scroll feature
    await permissionEngineAPI
      .fetchEvents({ page: 1, limit: 20, organizerId: me?.id })
      .then((data) => {
        console.log("event data: ", data);
        setEvents(data);
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
      fetchEvents();
    }
  }, [me]);

  // Helper function to format event date and time
  const formatEventDateTime = (start, duration) => {
    const startDate = dayjs(start).tz("Europe/London").toDate();
    const durationMs = parseDuration(duration);
    const endDate = durationMs
      ? dayjs(startDate.getTime() + durationMs)
          .tz("Europe/London")
          .toDate()
      : startDate;

    // Format date as YYYY-MM-DD
    const eventDate = startDate.toLocaleDateString();

    // Format start time and end time as HH:MM
    const startTime = dayjs(startDate).tz("Europe/London").format("HH:mm A");
    const endTime = dayjs(endDate).tz("Europe/London").format("HH:mm A");

    return { eventDate, eventTime: `${startTime} - ${endTime}` };
  };

  // Helper function to parse duration and calculate end time
  const parseDuration = (duration) => {
    const durationRegex = /(\d+)([dwMyhms])/;
    const match = duration.match(durationRegex);

    if (!match) return null;

    const value = parseInt(match[1], 10);
    const unit = match[2];

    let milliseconds = 0;

    switch (unit) {
      case "d":
        milliseconds = value * 24 * 60 * 60 * 1000;
        break;
      case "w":
        milliseconds = value * 7 * 24 * 60 * 60 * 1000;
        break;
      case "M":
        milliseconds = value * 30 * 24 * 60 * 60 * 1000; // approx. month as 30 days
        break;
      case "y":
        milliseconds = value * 365 * 24 * 60 * 60 * 1000; // approx. year as 365 days
        break;
      case "h":
        milliseconds = value * 60 * 60 * 1000;
        break;
      case "m":
        milliseconds = value * 60 * 1000;
        break;
      case "s":
        milliseconds = value * 1000;
        break;
      default:
        return null;
    }

    return milliseconds;
  };

  return (
    <div className="px-8 pt-8 mb-24">
      <h1 className="text-2xl font-bold text-black">{t("events.my-events")}</h1>
      {user ? (
        events.length > 0 ? (
          <div>
            <p>
              {t("events.you-have")}
              {events.length == 1
                ? ` 1 ${t("events.event")}.`
                : ` ${events.length} ${t("events.events")}.`}
            </p>
            <div className="mt-8 flex flex-col gap-4 ">
              {events.map((event, key) => {
                const { eventDate, eventTime } = formatEventDateTime(
                  event.startsAt,
                  event.duration
                );
                let eventStatusColor = "bg-yellow-300";

                switch (event.status) {
                  case Type.SpaceEventStatus.permissionRejected:
                  case Type.SpaceEventStatus.cancelled:
                    eventStatusColor = "bg-red-300";
                    break;
                  case Type.SpaceEventStatus.permissionGranted:
                    eventStatusColor = "bg-[#3DD598]";
                    break;
                  case Type.SpaceEventStatus.complete:
                  case Type.SpaceEventStatus.completeWithIssueResolved:
                    eventStatusColor = "bg-gray-600";
                    break;
                  case Type.SpaceEventStatus.completeWithIssue:
                  case Type.SpaceEventStatus.running:
                  case Type.SpaceEventStatus.closed:
                  case Type.SpaceEventStatus.permissionRequested:
                  case Type.SpaceEventStatus.pending:
                  default:
                    break;
                }
                return (
                  <div
                    key={key}
                    className="border p-4 shadow rounded-[1rem] bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-xl ">{event.name}</div>
                      <div
                        className={`${eventStatusColor} text-sm p-1 px-4 rounded-full`}
                      >
                        {t(`events.${event.status}`)}
                      </div>
                    </div>
                    <hr className="my-2" />

                    <div className="flex items-center">
                      <CalendarIcon className="size-4 text-gray-600 mr-2" />
                      <span>{eventDate}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <ClockIcon className="size-4 text-gray-600 mr-2" />
                      <span>{eventTime}</span>
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

DisplayEvents.propTypes = {
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
};
