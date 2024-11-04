import { useEffect, useState } from "react";
import { Slider } from "./Slider";

const AgreeSliderTexts = { inactive: "Slide to agree", active: "I agreed" };
const DisagreeSliderTexts = {
  inactive: "Slide to request for exception",
  active: "Request for exception",
};

export const ToggleSlider = () => {
  const [agree, setAgree] = useState(null); // State to track agreement status

  useEffect(() => {}, [agree]); // Side effect (if needed)

  return (
    <div className="flex flex-col items-center mt-12">
      <div className="w-full sm:w-5/6 space-y-8">
        <Slider
          text={
            agree === true ? AgreeSliderTexts.active : AgreeSliderTexts.inactive
          }
          onSlideEnd={() => {
            setAgree(true); // Seta to agreed
          }}
          onSlideStart={() => {
            if (agree) setAgree(null);
          }}
          active={agree === true}
        />
        <Slider
          text={
            agree === false
              ? DisagreeSliderTexts.active
              : DisagreeSliderTexts.inactive
          }
          onSlideEnd={() => {
            setAgree(false); // Set to requested exception
          }}
          onSlideStart={() => {
            if (!agree) setAgree(null);
          }}
          active={agree === false}
        />
      </div>
      <div className="mt-6 text-lg font-bold">
        Status: {agree === null ? "Undecided" : agree ? "Agreed" : "Disagreed"}
      </div>
    </div>
  );
};
