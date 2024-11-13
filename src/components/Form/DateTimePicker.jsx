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
import { fetchAvailability } from "../../api/api";
const DateTimePicker = ({ updateEventData, spaceId }) => {
  const [eventDateTime, setEventDateTime] = useState(""); // Store event date in ISO strings format
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Default to the current month
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [decided, setDecided] = useState(false);

  // availability
  const [availability, setAvailability] = useState([]);

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

  const loadAvailability = async () => {
    try {
      const data = await fetchAvailability(spaceId);
      const parsedAvailability = data.reduce((acc, slot) => {
        const date = format(new Date(slot.startTime), "yyyy-MM-dd");
        const timeSlot =
          format(new Date(slot.startTime), "HH:mm") +
          "-" +
          format(new Date(slot.endTime), "HH:mm");

        if (!acc[date]) acc[date] = [];
        acc[date].push(timeSlot);

        return acc;
      }, {});
      setAvailability(parsedAvailability);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  useEffect(() => {
    //update event data when date and time are selected or changed
    updateEventData({
      startsAt: eventDateTime,
      duration: "1h", // Duration is set to 1 hour by default
    });
  }, [eventDateTime]);

  useEffect(() => {
    // load availability
    loadAvailability();
  }, []);

  useEffect(() => {
    // load availability
    console.log("Parsed availability: ", availability);
  }, [availability]);

  return (
    <div className="text-left">
      <hr className="my-6" />
      <div className="block mb-2 font-semibold text-xl">Date and time</div>
      {!decided && (
        <>
          <div className="border rounded">
            <div className="p-2 ">
              <div className="text-center font-bold text-lg mb-2">
                {format(currentMonth, "yyyy")}
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevMonth}
                  className="border rounded w-fit py-2 px-2 items-center"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <span className="font-semibold">
                  {format(currentMonth, "MMMM")}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="border rounded w-fit py-2 px-2 items-center"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <hr className="my-2" />

            <div className="p-2">
              <div className="grid grid-cols-7 text-center font-medium mb-2">
                {weekdays.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2 text-center">
                {daysInMonth.map((date) => {
                  const formattedDate = format(date, "yyyy-MM-dd");
                  const isAvailable = availability[formattedDate]?.length > 0;

                  return (
                    <button
                      key={date}
                      type="button"
                      className={`w-10 h-10 text-center p-2 rounded-full ${
                        formattedDate === selectedDate
                          ? "bg-[#5570F1] text-white"
                          : isAvailable
                            ? "bg-white text-black"
                            : "bg-white text-gray-300"
                      }`}
                      onClick={() => handleDateClick(date)}
                      disabled={!isAvailable}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {selectedDate && (
            <div className="flex overflow-x-auto mt-4 space-x-2 w-full">
              {(availability[selectedDate] || []).map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  className={`border p-2 rounded-[12px] min-w-[140px] w-auto text-center ${
                    selectedTime === slot
                      ? "bg-[#5570F1] text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleTimeSlotClick(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {decided && selectedDate && selectedTime && (
        <div className="flex justify-between gap-4">
          <button
            onClick={flagDecision}
            className="w-full items-center text-center bg-gray-600 p-2 px-4 rounded-xl text-white"
          >
            {selectedDate}
          </button>
          <button
            onClick={flagDecision}
            className="w-full items-center text-center bg-gray-600 p-2 px-4 rounded-xl text-white"
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
  spaceId: PropTypes.string,
};
