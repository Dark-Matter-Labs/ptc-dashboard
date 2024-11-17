import { useEffect, useState } from "react";
import { RadioGroup, Radio } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";

export const EventThemeSelector = ({ permissionEngineAPI }) => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const loadTopics = async () => {
    try {
      const data = await permissionEngineAPI.fetchTopics();
      setTopics(data);
    } catch (error) {
      console.error("Error fetching topics: ", error);
    }
  };

  useEffect(() => {
    loadTopics();
  }, []);

  useEffect(() => {
    if (topics) {
      console.log("the topics: ", topics);
    }
  }, [topics]);

  return (
    <div className="text-left">
      <div htmlFor="themes" className="block mb-2 font-semibold text-xl">
        Themes
      </div>
      <RadioGroup
        id="themes"
        className="mb-2"
        value={selectedTopic}
        onChange={setSelectedTopic}
      >
        <div className="py-1 flex flex-wrap gap-2">
          {topics.map((topic) => (
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
                  <div className="size-4 mr-1">{topic.icon}</div>
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

EventThemeSelector.propTypes = {
  permissionEngineAPI: PropTypes.object,
};
