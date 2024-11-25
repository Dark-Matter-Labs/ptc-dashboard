import { useState, useEffect } from "react";
import "../../assets/css/Activity.css";
import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Today from "./Today";
import PropTypes from "prop-types";

import { events_data, past_events_data } from "../../eventData";

export default function Activity({ spaceId }) {
  const [events, setEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data);
    //     setEvents(data);
    //   });

    setEvents(events_data);
    setPastEvents(past_events_data);
  }, [events]);

  const gotoCreateEvent = (path) => {
    navigate(path);
  };
  return (
    <section className="home-availability">
      <div className="availability">
        <h1>Availability</h1>
        <div className="permissioning-container">
          <div className="permissioning">
            <h1>Availability</h1>
            <div>Available to register for activities</div>
            <Button
              onClick={() => gotoCreateEvent(`/event/new/${spaceId}`)}
              className="get-permission-button"
            >
              Get permission
            </Button>
          </div>
        </div>
        <Today></Today>
      </div>
      <div className="activity">
        <div className="upcoming-activity">
          <h1>Upcoming activity</h1>
          <div className="scroll-container">
            {" "}
            {events.map((event) => (
              <div className="card" key={event.id}>
                <div className="card-image">
                  <img src={event.picture}></img>
                </div>
                <div className="card-title">{event.name}</div>
                <div className="card-date">{event.space_name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="past-activity">
          <h1>Past activity</h1>
          <div className="scroll-container">
            {pastEvents.map((event) => (
              <div key={event.id} className="card">
                <div className="card-image">
                  <img src={event.picture}></img>
                </div>
                <div className="card-title">{event.name}</div>
                <div className="card-date">{event.space_name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
Activity.propTypes = {
  spaceId: PropTypes.string,
};
