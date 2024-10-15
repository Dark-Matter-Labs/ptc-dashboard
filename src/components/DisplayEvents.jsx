import { useUser } from "../UserContext";
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
          {events.map((event) => (
            <>
              <p>
                <b>Event name</b> {event.name}
              </p>
              <p>
                <b>Event status</b> {event.details}
              </p>
            </>
          ))}
        </>
      ) : (
        // user is not logged in
        <p>Please log in.</p>
      )}
    </div>
  );
}
