import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

export const Slider = ({ text, onSlideEnd, onSlideStart, active }) => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(0); // Start with initial position
  const [bgColor, setBgColor] = useState("bg-gray-300"); // Initial background color
  const sliderRef = useRef(null); // Reference for the slider to get its width

  // Set the initial position based on the active prop
  useEffect(() => {
    if (active) {
      setPosition(sliderRef.current.offsetWidth - 40); // Move handle to the end if active
      setBgColor("bg-green-500"); // Change background color to green if active
    } else {
      setPosition(0); // Reset to start if not active
      setBgColor("bg-gray-300"); // Change background color to gray if not active
    }
  }, [active]);

  const handleDrag = (e) => {
    // Determine the clientX based on the event type (mouse or touch)
    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;

    const sliderWidth = sliderRef.current.offsetWidth; // Get slider width
    const newPos = Math.min(
      Math.max(clientX - sliderRef.current.getBoundingClientRect().left, 0),
      sliderWidth - 40
    ); // Limit to slider width

    // Set background color based on position
    if (newPos > sliderWidth / 2) {
      setBgColor("bg-green-500"); // Change to green if dragged to agree
    } else {
      setBgColor("bg-gray-300"); // Change to gray if not
    }

    setPosition(newPos);
  };

  const handleDragEnd = () => {
    if (position > sliderRef.current.offsetWidth / 2) {
      // Threshold to consider as "slid to agree"
      onSlideEnd(); // Call the onSlideEnd callback
      setPosition(sliderRef.current.offsetWidth - 40); // Move handle to the right end position
      setBgColor("bg-green-500"); // Ensure the background is green
    } else {
      setPosition(0); // Reset to the start if not agreed
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
    console.log(dragging, position);
  }, [dragging, position]);

  return (
    <div
      className={`relative w-full h-12 rounded-full overflow-hidden cursor-pointer transition-colors duration-300 ${bgColor}`}
      ref={sliderRef} // Set ref for width calculations
      onMouseMove={dragging ? handleDrag : null}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd} // End dragging if mouse leaves the slider
      onTouchMove={dragging ? handleDrag : null}
      onTouchEnd={handleDragEnd}
    >
      <div className="ml-7 absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-700 font-semibold">
        {text}
      </div>
      <div
        className="absolute top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md transition-all duration-300"
        style={{ left: position }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
    </div>
  );
};

Slider.propTypes = {
  text: PropTypes.string.isRequired,
  onSlideEnd: PropTypes.func.isRequired,
  onSlideStart: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};
