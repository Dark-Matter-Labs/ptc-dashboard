import { Slider } from "./Slider";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export const SingleSlider = ({ id, handleToggle, agree }) => {
  const { t } = useTranslation();
  const [localAgree, setLocalAgree] = useState(agree); // Local state
  const AgreeSliderTexts = {
    inactive: t("rules.toggle-slider-agree-inactive"),
    active: t("rules.toggle-slider-agree-active"),
  };

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
          disagreeCallbackType="disagree"
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
      </div>
    </div>
  );
};

SingleSlider.propTypes = {
  id: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
  agree: PropTypes.bool,
  ruleBlockTarget: PropTypes.string,
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

// customised ExclamationIcon
export const CircleXIcon = (props) => (
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
    {/* X sign */}
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);
