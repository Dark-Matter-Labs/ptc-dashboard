import { Slider } from "./Slider";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const AgreeSliderTexts = {
  inactive: "Slide to agree",
  active: "I agree to this term",
};
const DisagreeSliderTexts = {
  inactive: "I need to request an exception",
  active: "I am requesting an exception",
};

export const ToggleSlider = ({ id, handleToggle, agree }) => {
  const [localAgree, setLocalAgree] = useState(agree); // Local state

  // Sync local state with the agree prop only when it changes
  useEffect(() => {
    setLocalAgree(agree);
  }, [agree]);

  // Handle changes to localAgree state
  const handleSlideEnd = (newAgree) => {
    setLocalAgree(newAgree); // Update local state
    handleToggle(id, newAgree); // Notify parent of the change
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <div className="w-full sm:w-5/6 space-y-4">
        <Slider
          text={
            localAgree === true
              ? AgreeSliderTexts.active
              : AgreeSliderTexts.inactive
          }
          onSlideEnd={() => handleSlideEnd(true)} // Agree
          onSlideStart={() => {
            if (localAgree) handleSlideEnd(null); // Reset if currently agreed
          }}
          active={localAgree === true}
          activeTextColor="text-white"
          // do string manipulation in slider for this kind of BgColor
          activeBgColor="bg-[#32B07D]"
        />
        <Slider
          text={
            localAgree === false
              ? DisagreeSliderTexts.active
              : DisagreeSliderTexts.inactive
          }
          onSlideEnd={() => handleSlideEnd(false)} // Disagree
          onSlideStart={() => {
            if (!localAgree) handleSlideEnd(null); // Reset if currently disagreed
          }}
          active={localAgree === false}
          activeBgColor="bg-gray-700"
          activeTextColor="text-white"
          Icon={ExclamationIcon}
        />
      </div>
    </div>
  );
};

ToggleSlider.propTypes = {
  id: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
  agree: PropTypes.bool,
};

// customised ExclamationIcon
export const ExclamationIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Exclamation line */}
    <line x1="12" y1="2" x2="12" y2="14" />
    {/* Exclamation dot */}
    <circle cx="12" cy="20" r="0.5" fill="currentColor" />
  </svg>
);
