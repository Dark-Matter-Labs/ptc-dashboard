// SimpleDatePicker.js
import { useState } from "react";
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

const SimpleDatePicker = ({ onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Default to the current month
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

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
  ]; // Example dates

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
    "00:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "17:00-18:00",
    "18:00-19:00",
  ];

  // Handle date click
  const handleDateClick = (date) => {
    console.log("Selected Date:", date);
    const formattedDate = format(date, "yyyy-MM-dd");
    console.log("formattedDate:", formattedDate);
    setSelectedDate(formattedDate);
    if (formattedDate && selectedTime) {
      notifyParent(formattedDate, selectedTime); // Update the parent with the date and time
    }
  };

  const handleTimeSlotClick = (slot) => {
    console.log("Selected Time Slot:", slot);
    setSelectedTime(slot);
    if (selectedDate && slot) {
      notifyParent(selectedDate, slot); // Update the parent with the date and time
    }
  };

  const notifyParent = (date, time) => {
    if (date && time) {
      //   console.log("Parent notified with date and time:", date, time);
      console.log("time, slot:", `${date}T${time.split("-")[0]}:00.000Z`);
      onDateChange(`${date}T${time.split("-")[0]}:00.000Z`); // Format as ISO string
    }
  };

  return (
    <div>
      <div className="block mb-2 font-semibold">Date and time</div>
      {/* Month and Year Display with Navigation */}
      <div className="border rounded">
        <div className="p-2 ">
          <div className="text-center font-bold text-lg mb-2">
            {format(currentMonth, "yyyy")}
          </div>
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
                  className={`p-2 rounded ${
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
        <hr className="" />
        <div className="p-4">
          {/* Selected Date Display */}
          <div className="flex justify-between w-full items-center ">
            <input
              type="text"
              value={selectedDate}
              readOnly
              className="border p-2 rounded w-fit"
              placeholder="Select a date"
            />
            <button
              type="button"
              className=" bg-gray-900 text-white p-2 rounded w-fit"
            >
              Set date
            </button>
          </div>
        </div>
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
                isSelected ? "bg-[#5570F1] text-white" : "bg-white text-black"
              }`}
              onClick={() => handleTimeSlotClick(slot)}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleDatePicker;

SimpleDatePicker.propTypes = {
  onDateChange: PropTypes.func.isRequired, // Required
};
