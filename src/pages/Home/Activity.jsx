import { useState, useEffect } from "react";
import "../../assets/css/Activity.css";
import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Today from "./Today";

const events_data = [
  {
    id: "22b08cc4-bb6b-42b4-aa55-73aac3d4d98e",
    name: "Cooking Class",
    space_name: "Open Kitchen",
    picture:
      "https://plus.unsplash.com/premium_photo-1683707120403-9add00a6140e?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "f49c95a5-d8b2-4e47-b6c3-8c676e7ee09b",
    name: "Art Workshop",
    space_name: "Creative Studio",
    picture:
      "https://plus.unsplash.com/premium_photo-1705407454980-4b8b64d068b8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "c7b4c763-8bc2-4b20-abc3-2a5d1a7ed013",
    name: "Yoga Retreat",
    space_name: "Zen Garden",
    picture:
      "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "b8c8f68f-3f7d-4c32-8aa7-87abec9d4b65",
    name: "Photography Basics",
    space_name: "Photo Studio",
    picture:
      "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "6ef2a5e7-295c-41f5-926e-8b44c999c6a6",
    name: "Music Jam Session",
    space_name: "Sound Studio",
    picture:
      "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?q=80&w=2369&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const past_events_data = [
  {
    id: "c8c7b51e-3db9-4679-a7d7-b1c44b7f3e48",
    name: "Wine Tasting",
    space_name: "Elegant Winery",
    picture:
      "https://images.unsplash.com/photo-1513618827672-0d7c5ad591b1?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d25af3e6-062c-44a1-8a95-ec1c7ae7b43a",
    name: "Dance Workshop",
    space_name: "Ballroom Studio",
    picture:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "b1f10f82-0ff8-4d5b-a2f2-cb1e5e9e05f0",
    name: "Pottery Class",
    space_name: "Artisan Workshop",
    picture:
      "https://plus.unsplash.com/premium_photo-1661380954234-13d98a83577c?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "d2a3f5e4-c5e2-4e91-b2b3-8e7b2d66b3ee",
    name: "Gardening Basics",
    space_name: "Community Garden",
    picture:
      "https://plus.unsplash.com/premium_photo-1680286739871-01142bc609df?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "e5f1d64c-f942-4b34-ae6e-8e04d143634e",
    name: "Coding Bootcamp",
    space_name: "Tech Hub",
    picture:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
export default function Activity() {
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
              onClick={() => gotoCreateEvent("/event/new")}
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
