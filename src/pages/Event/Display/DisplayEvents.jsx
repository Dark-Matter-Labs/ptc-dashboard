import { useUser } from "../../../useUser";
import { useState, useEffect } from "react";
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

  return (
    <div className="px-8 pt-8">
      <h1 className="text-2xl font-bold text-black">Event Page</h1>
      {user ? (
        <>
          <p> Here are all events:</p>
          <div className="mt-8 flex flex-col gap-4 ">
            {events.map((event, key) => (
              <div key={key} className="border p-4">
                <div className="gap-4">
                  <b>Event name</b> {event.name}
                </div>
                <hr />{" "}
                <div className="gap-4">
                  <b>Event time</b> {event.startsAt}
                </div>
                <div className="gap-4">
                  <b>Event duration</b> {event.duration}
                </div>
                <hr />
                <div className="gap-4">
                  <b>Event status</b> {event.details}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // user is not logged in
        <p>Please log in.</p>
      )}
    </div>
  );
}
