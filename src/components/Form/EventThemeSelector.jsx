import { useState } from "react";
import { RadioGroup, Radio } from "@headlessui/react";
import {
  ChipIcon,
  XCircleIcon,
  HeartIcon,
  LightBulbIcon,
  ChatAlt2Icon,
  ColorSwatchIcon,
} from "@heroicons/react/solid";
const eventThemes = [
  { name: "Technology", icon: ChipIcon },
  { name: "Health", icon: HeartIcon },
  { name: "Business", icon: LightBulbIcon },
  { name: "Education", icon: ChatAlt2Icon },
  { name: "Art", icon: ColorSwatchIcon },
];

export const EventThemeSelector = () => {
  const [selectedTopic, setSelectedTopic] = useState(eventThemes[0]);

  return (
    <div className="text-left">
      <div htmlFor="themes" className="block mb-2 font-semibold ">
        Themes
      </div>
      <RadioGroup
        id="themes"
        className="mb-2"
        value={selectedTopic}
        onChange={setSelectedTopic}
      >
        <div className="py-1 flex flex-wrap gap-2">
          {eventThemes.map((topic) => (
            <Radio key={topic.name} value={topic}>
              {({ active, checked }) => (
                <div
                  className={`flex items-center cursor-pointer px-4 py-2 rounded-full text-sm font-medium 
                    ${
                      checked
                        ? "bg-gray-600 text-white"
                        : "bg-white text-gray-800 border border-gray-500"
                    }
                    ${active ? "ring-2  ring-blue-500" : ""}`}
                >
                  <topic.icon className="size-4 mr-2" />
                  <span>{topic.name}</span>
                  {checked && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering Radio change
                        setSelectedTopic(null); // Deselect
                      }}
                      className="ml-2 text-white"
                    >
                      <XCircleIcon className="size-4" />
                    </button>
                  )}
                </div>
              )}
            </Radio>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
