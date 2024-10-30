import { useEffect, useState } from "react";
import { RadioGroup, Radio, Textarea } from "@headlessui/react";
import SimpleDatePicker from "../../../components/Common/DatePicker";
import {
  CalendarIcon,
  UsersIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const topics = [
  { name: "Technology", icon: UsersIcon },
  { name: "Health", icon: CalendarIcon },
  { name: "Business", icon: LocationMarkerIcon },
  { name: "Education", icon: CalendarIcon },
  { name: "Art", icon: UsersIcon },
];

const Step1 = ({ setNavTitle, updateEventData }) => {
  const { t } = useTranslation();
  const [eventTitle, setEventTitle] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [eventDateTime, setEventDateTime] = useState(""); // Store event date in ISO strings format
  const [description, setDescription] = useState("");

  useEffect(() => {
    setNavTitle(t("create-event.navigation-title"));
  });

  useEffect(() => {
    //update event data when date and time are selected or changed
    updateEventData({
      startsAt: eventDateTime,
      duration: "1h", // Duration is set to 1 hour by default
    });
  }, [eventDateTime]);

  useEffect(() => {
    //update event data when title is defined ro updated
    updateEventData({
      name: eventTitle,
    });
  }, [eventTitle]);

  return (
    <div className="p-4 space-y-4 text-left">
      {/* Enter title */}
      <div>
        <label htmlFor="title" className="block mb-2 font-semibold ">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Enter event title"
        ></input>
        <hr className="my-6" />
      </div>
      {/* Select topic */}
      <div>
        <div htmlFor="themes" className="block mb-2 font-semibold ">
          Themes
        </div>
        <RadioGroup
          id="themes"
          className="mb-2"
          value={selectedTopic}
          onChange={setSelectedTopic}
        >
          <div className="py-1 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Radio key={topic.name} value={topic}>
                {({ active, checked }) => (
                  <div
                    className={`flex items-center cursor-pointer px-4 py-2 rounded-full text-sm font-medium 
                    ${
                      checked
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-800 border"
                    }
                    ${active ? "ring-2  ring-blue-500" : ""}`}
                  >
                    <topic.icon className="size-4 mr-2" />
                    <span>{topic.name}</span>
                  </div>
                )}
              </Radio>
            ))}
          </div>
        </RadioGroup>
        <hr className="my-6" />
      </div>
      {/* Date Picker */}
      <SimpleDatePicker onDateChange={setEventDateTime}></SimpleDatePicker>
      <hr className="my-6" />
      {/* Event description */}
      <div>
        <label htmlFor="event-description" className="block mb-2 font-semibold">
          Event description
        </label>
        <Textarea
          id="event-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2 min-h-3"
        ></Textarea>
      </div>
    </div>
  );
};

export default Step1;

Step1.propTypes = {
  setNavTitle: PropTypes.func.isRequired,
  updateEventData: PropTypes.func.isRequired,
};
