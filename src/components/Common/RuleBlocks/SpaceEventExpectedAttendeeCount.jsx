import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const SpaceEventExpectedAttendeeCount = ({ updateEventData }) => {
  const [expectedAttendees, setExpectedAttendees] = useState(50);

  const handleAttendeeChange = (increment) => {
    setExpectedAttendees((prev) => Math.max(0, prev + increment)); // Prevent negative values
  };

  useEffect(() => {
    console.log(
      "Updating event data with expectedAttendees:",
      expectedAttendees
    );
    //update event data when expectedAttendees
    updateEventData({
      expectedAttendees: expectedAttendees, // not required as part of eventData
    });
  }, [expectedAttendees]);

  return (
    <div className="text-left">
      <hr className="my-6" />
      <div>
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
      </div>
    </div>
  );
};

SpaceEventExpectedAttendeeCount.propTypes = {
  updateEventData: PropTypes.func.isRequired,
};
