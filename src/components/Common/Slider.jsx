import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { CheckIcon } from "@heroicons/react/solid";

const offset = 5;
const intialPosition = 0 + offset;
export const Slider = ({
  text,
  onSlideEnd,
  onSlideStart,
  active,
  activeBgColor,
  activeTextColor,
  disagreeCallbackType,
  Icon,
}) => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(intialPosition); // Start with initial position
  const [bgColor, setBgColor] = useState("bg-gray-300"); // Initial background color
  const [textColor, setTextColor] = useState("bg-gray-300"); // Initial background color
  const sliderRef = useRef(null); // Reference for the slider to get its width

  // Set the initial position based on the active prop
  useEffect(() => {
    if (active) {
      setPosition(sliderRef.current.offsetWidth - 40 - offset); // Move handle to the end if active
      if (activeBgColor) {
        setBgColor(activeBgColor);
      } else {
        setBgColor("bg-[#32B07D]"); // Change to green if dragged to agree
      } // Change background color to green if active
    } else {
      setPosition(intialPosition); // Reset to start if not active
      setBgColor(
        disagreeCallbackType === "delete" ? "bg-[#FDBF59]" : "bg-gray-300"
      ); // Change background color to gray if not active
      setTextColor(disagreeCallbackType === "delete" ? "ml-9 text-deleteSliderInActive" : "ml-9 text-gray-700")
    }
  }, [active]);

  const handleDrag = (e) => {
    // Determine the clientX based on the event type (mouse or touch)
    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;

    const sliderWidth = sliderRef.current.offsetWidth; // Get slider width
    const newPos = Math.min(
      Math.max(clientX - sliderRef.current.getBoundingClientRect().left, 0),
      sliderWidth - 40 - 2 * offset
    ); // Limit to slider width

    // Set background color based on position
    if (newPos > sliderWidth / 2) {
      if (activeBgColor) {
        setBgColor(activeBgColor);
      } else {
        setBgColor("bg-[#32B07D]"); // Change to green if dragged to agree
      }
    } else {
      setBgColor("bg-gray-300"); // Change to gray if not
    }

    setPosition(newPos);
  };

  const handleDragEnd = () => {
    if (position > sliderRef.current.offsetWidth / 2) {
      // Threshold to consider as "slid to agree"
      onSlideEnd(); // Call the onSlideEnd callback
      setPosition(sliderRef.current.offsetWidth - 40 - offset); // Move handle to the right end position
      if (activeBgColor) {
        setBgColor(activeBgColor);
      } else {
        setBgColor("bg-[#32B07D]"); // Change to green if dragged to agree
      } // Ensure the background is green
    } else {
      setPosition(intialPosition); // Reset to the start if not agreed
      onSlideStart(); // Call the onSlideStart callback
      setBgColor("bg-gray-300"); // Ensure the background is gray
    }
    setDragging(false);
  };

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleTouchStart = () => {
    setDragging(true);
  };

  useEffect(() => {
    // Effect to monitor dragging and position
  }, [position]);

  return (
    <div
      className={`relative w-full h-12 rounded-full overflow-hidden cursor-pointer transition-colors duration-300 ${bgColor} shadow-inner`}
      style={{
        boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.2)", // Inner shadow style
      }}
      ref={sliderRef} // Set ref for width calculations
      onMouseMove={dragging ? handleDrag : null}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd} // End dragging if mouse leaves the slider
      onTouchMove={dragging ? handleDrag : null}
      onTouchEnd={handleDragEnd}
    >
      <div
        className={`text-sm absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-700 font-semibold ${active ? activeTextColor : textColor}`}
      >
        {text}
      </div>
      <div
        className={`shadow-lg absolute top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full  transition-all duration-300 }`}
        style={{ left: position }} // Position the handle based on state
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {Icon ? (
          <Icon className={`p-2 size-10 ${active ? toText(bgColor) : ""}`} />
        ) : (
          <CheckIcon
            className={`p-2 size-10 ${active ? toText(bgColor) : ""}`}
          />
        )}
      </div>
    </div>
  );
};

function toText(bgcolor) {
  const string = bgcolor.replace("bg-", "text-");
  return string;
}

Slider.propTypes = {
  text: PropTypes.string.isRequired,
  onSlideEnd: PropTypes.func.isRequired,
  onSlideStart: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  activeBgColor: PropTypes.string,
  activeTextColor: PropTypes.string,
  disagreeCallbackType: PropTypes.string,
  Icon: PropTypes.elementType,
};
