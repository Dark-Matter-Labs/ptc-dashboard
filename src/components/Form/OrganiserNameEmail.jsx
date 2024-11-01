import { useState, useEffect } from "react";
import { Input } from "@headlessui/react";

export const OrganiserNameEmail = () => {
  const [organizerName, setOrganizerName] = useState(""); // should be populated with user's name
  const [emailAddress, setEmailAddress] = useState(""); // should be populated with user's email
  const handleFetchMe = () => {
    console.log("Fetching user data...");
    fetch("/api/v1/user/me", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User (me)  data fetched:", data);

        // Populate form fields with user data
        // organiser's name
        setOrganizerName(data.name);
        // organizer's email
        setEmailAddress(data.email);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
  useEffect(() => {
    handleFetchMe();
  }, []);
  return (
    <div className="text-left">
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
      {/* Email address */}
      <div htmlFor="email-adress" className="block mb-2 font-semibold">
        Email address
      </div>

      <Input
        id="email-adress"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        className="flex-4 w-full border rounded p-2 min-h-3"
        placeholder="Valid email address"
      ></Input>
    </div>
  );
};
