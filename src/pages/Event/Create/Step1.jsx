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

const Step1 = ({ setNavTitle }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [description, setDescription] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // post event to backend, assign event status:
    console.log("form submission: step 1.");
  };

  useEffect(() => {
    setNavTitle(t("create-event.navigation-title"));
  });

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 space-y-4 text-left">
        {/* Enter title */}
        <div>
          <label htmlFor="title" className="block mb-2 font-semibold ">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            {/* <Label className="sr-only">Select a topic</Label> */}
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
        <SimpleDatePicker></SimpleDatePicker>
        <hr className="my-6" />
        {/* Event description */}
        <div>
          <label
            htmlFor="event-description"
            className="block mb-2 font-semibold"
          >
            Event description
          </label>
          <Textarea
            id="event-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2 min-h-3"
          ></Textarea>
        </div>
      </form>
    </div>
  );
};

export default Step1;

Step1.propTypes = {
  setNavTitle: PropTypes.func.isRequired, // Required
};