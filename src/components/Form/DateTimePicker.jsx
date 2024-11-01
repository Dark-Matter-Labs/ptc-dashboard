// SimpleDatePicker.js
import { useState, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";

const DateTimePicker = ({ updateEventData }) => {
  const [eventDateTime, setEventDateTime] = useState(""); // Store event date in ISO strings format
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Default to the current month
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [decided, setDecided] = useState(false);

  // Define non-available days
  const unAvailableDays = [
    "2024-09-21",
    "2024-09-28",
    "2024-10-10",
    "2024-10-25",
    "2024-10-26",
    "2024-10-27",
    "2024-11-07",
    "2024-11-08",
    "2024-11-09",
    "2024-12-18",
    "2024-12-19",
    "2024-12-20",
    "2024-12-23",
    "2024-12-24",
    "2024-12-25",
  ];

  // Function to go to the next month
  const handleNextMonth = (e) => {
    e.preventDefault();
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Function to go to the previous month
  const handlePrevMonth = (e) => {
    e.preventDefault();
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Get all the days in the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Weekday names
  const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  // Time slots array
  const timeSlots = [
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "17:00-18:00",
    "18:00-19:00",
    "19:00-20:00",
    "20:00-21:00",
    "21:00-22:00",
  ];

  // Handle date click
  const handleDateClick = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    console.log("Selected Date (formattedDate): ", formattedDate);
    setSelectedDate(formattedDate);
    if (formattedDate && selectedTime) {
      notifySetter(formattedDate, selectedTime);
    }
  };

  const handleTimeSlotClick = (slot) => {
    console.log("Selected Time Slot: ", slot);
    setSelectedTime(slot);
    if (selectedDate && slot) {
      notifySetter(selectedDate, slot);
    }
  };

  const notifySetter = (date, time) => {
    if (date && time) {
      flagDecision();
      console.log("Setter notified with date and time:", date, time);
      // Format to ISO string
      setEventDateTime(`${date}T${time.split("-")[0]}:00.000Z`);
    }
  };

  const flagDecision = () => {
    console.log("set decided from ", decided, " to ", !decided);
    setDecided(!decided);
  };

  useEffect(() => {
    //update event data when date and time are selected or changed
    updateEventData({
      startsAt: eventDateTime,
      duration: "1h", // Duration is set to 1 hour by default
    });
  }, [eventDateTime]);

  return (
    <div className="text-left">
      <hr className="my-6" />
      {/* Date picker title */}
      <div className="block mb-2 font-semibold">Date and time</div>
      {/* Month and Year Display with Navigation */}
      {!decided && (
        <>
          <div className="border rounded">
            <div className="p-2 ">
              {/* Year */}
              <div className="text-center font-bold text-lg mb-2">
                {format(currentMonth, "yyyy")}
              </div>
              {/* Month Navigation */}
              <div className="flex items-center justify-between">
                <button
                  className="border rounded w-fit py-2 px-2 items-center"
                  onClick={handlePrevMonth}
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <span className="font-semibold">
                  {format(currentMonth, "MMMM")}
                </span>
                <button
                  className="border rounded w-fit py-2 px-2 items-center"
                  onClick={handleNextMonth}
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <hr className="my-2" />

            {/* Calendar */}
            <div className="p-2">
              {/* Weekday Labels */}
              <div className="grid grid-cols-7 text-center font-medium mb-2">
                {weekdays.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              {/* Days of the Month */}
              <div className="grid grid-cols-7 gap-2 text-center">
                {daysInMonth.map((date) => {
                  const formattedDate = format(date, "yyyy-MM-dd");
                  const isUnAvailable = unAvailableDays.includes(formattedDate);
                  return (
                    <button
                      key={date}
                      type="button"
                      // Apply different color if the day is unavailable
                      className={`w-10 h-10 text-center p-2 rounded-full ${
                        formattedDate === selectedDate
                          ? "bg-[#5570F1] text-white" // Selected date style
                          : isUnAvailable
                            ? "bg-white text-gray-300" // unavailable date style
                            : "bg-white text-black" // Available date styling
                      }`}
                      onClick={() => handleDateClick(date)}
                      disabled={isUnAvailable} // Optional: disable click for unavailable days
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Select Date field & Set Date Button - ignore for now casue not much functionality/value */}
            {selectedDate && (
              <>
                <hr className="" />
                <div className="p-4 flex justify-between gap-4">
                  <div className="w-full items-center text-center border-separate bg-gray-600 p-2 px-4 rounded-full text-white">
                    {format(selectedDate, "dd / MM / yyyy")}
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Horizontal Scrollable Time Slots */}
          <div className="flex overflow-x-auto mt-4 space-x-2 w-full">
            {timeSlots.map((slot, index) => {
              // Apply different color if the time slot is selected
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={index}
                  type="button"
                  className={`border p-2 rounded-full min-w-[140px] w-auto text-center ${
                    isSelected
                      ? "bg-[#5570F1] text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleTimeSlotClick(slot)}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Decided Date and Time Display */}
      {decided && selectedTime && selectedDate && (
        <div className="flex justify-between gap-4">
          <button
            onClick={flagDecision}
            className="w-full items-center text-center border-separate bg-gray-600 p-2 px-4 rounded-xl text-white"
          >
            {format(selectedDate, "dd / MM / yyyy")}
          </button>
          <button
            onClick={flagDecision}
            className="w-full items-center text-center border-separate bg-gray-600 p-2 px-4 rounded-xl text-white"
          >
            {selectedTime}
          </button>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;

DateTimePicker.propTypes = {
  updateEventData: PropTypes.func.isRequired,
};
