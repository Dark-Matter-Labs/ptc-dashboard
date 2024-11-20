import { useUser } from "../../../useUser";
import { useState, useEffect } from "react";
// import { CalendarIcon, ClockIcon } from "@heroicons/react/outline";
import { fetchEvents } from "../../../api/api";
import { useTranslation } from "react-i18next";
import { SearchIcon, AdjustmentsIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";

const mockeventdata = [
  {
    id: "8e54ec74-01a7-41f8-878e-e00df536d0f5",
    name: "test Event 3",
    details: "Meeting with John",
    startsAt: "2024-11-15T15:00:00+00:00",
    end: "2024-11-15T16:00:00+00:00",
    status: "pending",
    duration: "2h",
  },
  {
    id: "b7a9f8e2-29c1-4b88-b7b8-9d607af4823e",
    name: "Game night",
    details: "Quarterly team workshop",
    startsAt: "2024-12-01T09:00:00+00:00",
    end: "2024-12-01T12:00:00+00:00",
    status: "granted",
    duration: "4h",
  },
  {
    id: "f14c6b7e-4d59-48a7-b752-67f104b65b3d",
    name: "Berry garden",
    details: "Final submission of project files",
    startsAt: "2024-11-20T10:00:00+00:00",
    end: "2024-11-20T11:30:00+00:00",
    status: "completed",
    duration: "2h",
  },
  {
    id: "cfc92c78-a63d-4f59-8b4a-38ab72a30952",
    name: "Movie night",
    details: "Presentation for client approval",
    startsAt: "2024-11-22T14:00:00+00:00",
    end: "2024-11-22T15:30:00+00:00",
    status: "pending",
    duration: "1h",
  },
  {
    id: "d5b47f6a-fb3f-41c5-8fc5-d1282c0f7d89",
    name: "Open mic",
    details: "Review pull requests and provide feedback",
    startsAt: "2024-11-18T16:00:00+00:00",
    end: "2024-11-18T17:00:00+00:00",
    status: "granted",
    duration: "2h",
  },
  {
    id: "ed7c842e-7917-46e7-8e5b-45f90e3e6fd3",
    name: "Art workshop",
    details: "Team retrospective for the last sprint",
    startsAt: "2024-11-25T11:00:00+00:00",
    end: "2024-11-25T12:30:00+00:00",
    status: "completed",
    duration: "2h",
  },
];

export default function DisplayEvents({ setNavTitle }) {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const { user } = useUser();

  const loadEvents = async () => {
    const data = await fetchEvents();
    setEvents(data);
  };
  useEffect(() => {
    loadEvents();
    setNavTitle(t("events.title"));
  }, []);

  useEffect(() => {
    console.log("events: ", events);
  }, [events]);

  // Helper function to format event date and time
  const formatEventDateTime = (start, duration) => {
    const startDate = new Date(start);
    const durationMs = parseDuration(duration);
    const endDate = durationMs
      ? new Date(startDate.getTime() + durationMs)
      : startDate;

    // Format date as YYYY.M.D
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1; // Months are zero-based
    const day = startDate.getDate();
    const eventDate = `${year}.${month}.${day}`;

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

  // Define background colors for the cards based on the index
  const cardBgColors = [
    "bg-gray-100",
    "bg-blue-100",
    "bg-yellow-100",
    "bg-green-100",
    "bg-purple-100",
  ];
  // Define background colors for status tabs
  const statusBgColors = {
    pending: "bg-yellow-300",
    granted: "bg-green-300",
    completed: "bg-gray-300",
    closed: "bg-red-300",
  };

  return (
    <div className="px-8 pt-8">
      <div className="flex items-center w-full max-w-sm">
        {/* Search Input with Icon */}
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            {/* Search Icon */}
            <SearchIcon className="size-5"></SearchIcon>
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-1 focus:ring-gray-400 focus:outline-none text-sm"
          />
        </div>

        {/* Search Button */}
        <button className="flex gap-2 items-center ml-2 px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-700 focus:ring-1 focus:ring-gray-500">
          {/* Button Icon */}
          <AdjustmentsIcon className="size-4 rotate-90"></AdjustmentsIcon>{" "}
          Filter
        </button>
      </div>
      {user ? (
        events.length > 0 ? (
          <div>
            <div className="mt-8 flex flex-col gap-4 ">
              {events.concat(mockeventdata).map((event, key) => {
                const { eventDate, eventTime } = formatEventDateTime(
                  event.startsAt,
                  event.duration
                );

                const cardBgColor = cardBgColors[key % cardBgColors.length];
                const statusBgColor =
                  statusBgColors[event.status] || "bg-gray-300";
                return (
                  <div
                    key={key}
                    className={`border p-4 shadow rounded-[1rem] ${cardBgColor}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-xl ">{event.name}</div>
                      <div
                        className={`text-sm p-1 px-2 rounded-full ${statusBgColor}`}
                      >
                        {event.status === "granted"
                          ? "Permission granted"
                          : event.status === "completed"
                            ? "Completed"
                            : event.status === "pending"
                              ? "Permision pending"
                              : event.status === "closed"
                                ? "Closed"
                                : "unknown"}
                      </div>
                    </div>

                    <div className="flex items-center">
                      {/* <CalendarIcon className="size-4 text-gray-600 mr-2" /> */}
                      <span>{eventDate}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      {/* <ClockIcon className="size-4 text-gray-600 mr-2" /> */}
                      <span>{eventTime}</span>
                    </div>
                    <div className="mt-8">{event.details}</div>
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
  setNavTitle: PropTypes.func.isRequired, // Required
};
