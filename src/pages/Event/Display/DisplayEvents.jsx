import { useUser } from "../../../useUser";
import { useState, useEffect } from "react";
import { CalendarIcon, ClockIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";

export default function DisplayEvents() {
  const [events, setEvents] = useState([]);
  const { user } = useUser();
  const fetchEvents = () => {
    console.log("call fetching events data");
    fetch("/api/v1/event", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Unauthorized") {
          console.log("User not logged in.");
        }
        console.log("event data: ", data);
        setEvents(data.data);
      })
      .catch((error) => {
        console.error("Error fetching profile info:", error);
      });
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  // Helper function to format event date and time
  const formatEventDateTime = (start, duration) => {
    const startDate = new Date(start);
    const durationMs = parseDuration(duration);
    const endDate = durationMs
      ? new Date(startDate.getTime() + durationMs)
      : startDate;

    // Format date as YYYY-MM-DD
    const eventDate = startDate.toLocaleDateString();

    // Format start time and end time as HH:MM
    const startTime = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

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
    <div className="px-8 pt-8">
      <h1 className="text-2xl font-bold text-black">My events</h1>
      {user ? (
        events.length > 0 ? (
          <div>
            <p>
              you have
              {events.length == 1 ? " 1 event." : ` ${events.length} events.`}
            </p>
            <div className="mt-8 flex flex-col gap-4 ">
              {events.map((event, key) => {
                const { eventDate, eventTime } = formatEventDateTime(
                  event.startsAt,
                  event.duration
                );
                return (
                  <div
                    key={key}
                    className="border p-4 shadow rounded-[1rem] bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-xl ">
                        {key} - {event.name}
                      </div>
                      <div className="bg-yellow-300 text-sm p-1 px-2 rounded-full">
                        {event.status}
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
          <p>You have no events.</p>
        )
      ) : (
        // user is not logged in
        <p>Please log in.</p>
      )}
    </div>
  );
}

DisplayEvents.propTypes = {
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
};
