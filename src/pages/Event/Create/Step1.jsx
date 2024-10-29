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
  const [eventDate, setEventDate] = useState(new Date().toISOString()); // Store event date in ISO strings format

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("form submission: step 1.");

    // Form validation
    const formData = new FormData();
    formData.append("spaceId", "4509ce64-ebc2-46d8-9ca8-70b6303625b1");
    formData.append("startsAt", eventDate);
    formData.append("name", title);
    formData.append("duration", "1h");
    formData.append("ruleId", "f52f8fee-bf96-4e5c-91c9-b72a80fd75f1");

    console.log("Event details:", {
      title,
      selectedTopic,
      description,
      eventDate,
    });

    console.log("Form data:", formData);

    // API call to create event
    try {
      const response = await fetch("/api/v1/event", {
        method: "POST",
        headers: {
          accept: "*/*",
        },
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Event created successfully:", result);
      } else {
        console.error("Failed to create event:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
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
        {eventDate}
        <SimpleDatePicker onDateChange={setEventDate}></SimpleDatePicker>
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
        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-20 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
          >
            Create event
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1;

Step1.propTypes = {
  setNavTitle: PropTypes.func.isRequired, // Required
};
