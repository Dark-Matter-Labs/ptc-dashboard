import { useEffect, useState } from "react";
import { RadioGroup, Radio } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export const EventThemeSelector = ({
  updateEventData,
  updateEventRuleData,
  permissionEngineAPI,
  selectedTopic,
  setSelectedTopic,
  currentLanguage,
}) => {
  const { t } = useTranslation();
  const [topics, setTopics] = useState([]);
  const loadTopics = async () => {
    try {
      const data = await permissionEngineAPI.fetchTopics({
        page: 1,
        limit: 20,
      });
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
    if (selectedTopic) {
      console.log("selectedTopic", selectedTopic);
      updateEventData({
        topicIds: [selectedTopic.id],
      });
      updateEventRuleData({
        topicIds: [selectedTopic.id],
      });
    }
  }, [topics, selectedTopic]);

  return (
    <div className="text-left">
      <div htmlFor="themes" className="block mb-2 font-semibold text-xl">
        {t("create-event.themes")}
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
                  {/* <div className="size-4 mr-1">{topic.icon}</div> */}
                  <span>
                    {topic.translation?.[currentLanguage] ?? topic.name}
                  </span>
                  {checked && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
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
  updateEventData: PropTypes.func.isRequired,
  updateEventRuleData: PropTypes.func.isRequired,
  permissionEngineAPI: PropTypes.object,
  selectedTopic: PropTypes.object,
  setSelectedTopic: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string,
};
