import { useState } from "react";
import { Input } from "@headlessui/react";

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

const eventTypes = [
  {
    title: "Public Free Event",
    description: "Free & open to everyone.",
    imageUrl:
      "https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Public Paid Event",
    description: "Anyone can buy tickets",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1664298449164-c5355bd3b328?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Private Free Event",
    description: "Invitation only.",
    imageUrl:
      "https://images.unsplash.com/photo-1621857093087-7daa85ab14a6?q=80&w=2390&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Private Paid Event",
    description: "Only invited can buy tickets.",
    imageUrl:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const nationalCodes = [
  { name: "United Kingdom", code: "+44" },
  { name: "Korea", code: "+82" },
  { name: "United States", code: "+1" },
  { name: "Australia", code: "+61" },
  { name: "India", code: "+91" },
  // Add more national codes as needed
];

const Step2 = () => {
  const [organizerName, setOrganizerName] = useState("");
  const [selectedCode, setSelectedCode] = useState(nationalCodes[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expectedAttendees, setExpectedAttendees] = useState(50);
  const [selectedEventType, setSelectedEventType] = useState(null);

  const handleAttendeeChange = (increment) => {
    setExpectedAttendees((prev) => Math.max(0, prev + increment)); // Prevent negative values
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submission.");
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4  ">
      <div className="text-left">
        {/* Enter title */}
        <label htmlFor="organizer-name" className="block mb-2 font-semibold ">
          Organizer name
        </label>
        <input
          id="organizer-name"
          type="text"
          value={organizerName}
          onChange={(e) => setOrganizerName(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Enter event organizer's name"
        ></input>
        <div className="my-6" />
        {/* Event description */}
        <div htmlFor="contact-information" className="block mb-2 font-semibold">
          Contact information
        </div>
        <div id="contact-information" className="flex flex-row">
          <Listbox
            value={selectedCode}
            onChange={setSelectedCode}
            className="flex-1"
          >
            <div className="relative">
              <ListboxButton className="w-full border rounded p-2 flex justify-between items-center">
                <span>{selectedCode.code}</span>
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              </ListboxButton>
              <ListboxOptions className="absolute z-10 mt-1 w-max bg-white origin- border rounded shadow-lg">
                {nationalCodes.map((code) => (
                  <ListboxOption
                    key={`${code.name} ${code.code}`}
                    value={code}
                    className={({ active, selected }) => `
                  cursor-pointer select-none relative px-4 py-2 ${
                    active ? "bg-blue-600 text-gray-600" : "text-gray-600"
                  }
                  ${selected ? "font-semibold bg-slate-100" : "font-normal"}
                `}
                  >
                    {code.name} ({code.code})
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
          <Input
            id="phone-number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-4 w-full border rounded p-2 min-h-3"
            placeholder="1234-5678"
          ></Input>
        </div>

        <hr className="my-6" />
        {/* Select topic */}
        <div htmlFor="expected-attendee" className="block mb-2 font-semibold ">
          Expected attendees
        </div>
        <div
          id="expected-attendee"
          className="w-full flex justify-between items-center space-x-2"
        >
          <div>Maximum</div>
          <div id="expected-attendee" className="flex items-center">
            <button
              type="button"
              onClick={() => handleAttendeeChange(-1)}
              className="border border-gray-700  text-gray-700 rounded-full px-4 py-2 focus:outline-none"
            >
              -
            </button>
            <input
              id="expected-attendee-number"
              type="number"
              value={expectedAttendees}
              readOnly
              className="text-center w-8 mx-2"
            />
            <button
              type="button"
              onClick={() => handleAttendeeChange(1)}
              className="border border-gray-700  text-gray-700 rounded-full px-4 py-2 focus:outline-none"
            >
              +
            </button>
          </div>
        </div>

        <hr className="my-6" />
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Event Type</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {eventTypes.map((eventType, index) => (
              <div
                key={index}
                className={`flex border rounded-lg cursor-pointer transition duration-200 hover:shadow-lg ${
                  selectedEventType === index
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedEventType(index)}
              >
                <img
                  src={eventType.imageUrl}
                  alt={eventType.title}
                  className="w-1/3 h-auto object-cover rounded-l-lg"
                />
                <div className="w-2/3 p-4">
                  <h3 className="text-lg font-bold">{eventType.title}</h3>
                  <p className="text-gray-600">{eventType.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Step2;
