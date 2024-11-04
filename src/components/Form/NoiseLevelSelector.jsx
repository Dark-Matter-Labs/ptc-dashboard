import { useState } from "react";
import { BellIcon } from "@heroicons/react/outline";
const DEBUG = false;
const noiseLevelOptions = [
  {
    title: "High",
    description:
      "Loud activities such as concerts, large crowds, or amplified music with loud speakers.",
  },
  {
    title: "Medium",
    description:
      "Moderate noise such as background music, live speaking, or performances with microphones",
  },
  {
    title: "Low",
    description:
      "Quiet activities such as meetings, workshops, or discussions. Minimal noise, mostly conversational.",
  },
];
export const NoiseLevelSelector = () => {
  const [noiseLevel, setNoiseLevel] = useState(1); // default to medium noise level
  return (
    <div id="setup-noise-level" className="border rounded-md h-auto p-4">
      <div className="flex items-center gap-2 py-2 mb-2">
        <BellIcon className="w-4 h-auto" />
        <div className="block font-semibold">Noise Level</div>
      </div>
      {DEBUG && (
        <div className="bg-pink-300">
          <p>noiseLevel: {noiseLevel}</p>
        </div>
      )}
      <div className="flex flex-col gap-4 lg:flex-row">
        {noiseLevelOptions.map((content, index) => (
          <div
            key={index}
            className={`w-full border border-gray-700 rounded-[80px] sm:rounded-[60px] p-3 text-center lg:text-left lg:rounded-sm ${noiseLevel === index ? "bg-gray-200" : ""}`}
            onClick={() => setNoiseLevel(index)}
          >
            <div className="font-bold mb-1">{content.title}</div>
            <div className="font-sm text-gray-700 px-2.5">
              {content.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
