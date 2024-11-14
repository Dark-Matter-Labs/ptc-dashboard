import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  fetchTopics,
  fetchSpaceRulesSortBy,
  fetchSpaceRulesByRelevance,
  fetchTopicsByRuleId,
} from "../../../api/api";

const Step2 = ({
  currentStep,
  spaceId,
  setCurrentStep,
  setNavTitle,
  updateEventData,
  setNextStepButtonText,
}) => {
  const { t } = useTranslation();

  const [rules_relevent, setRules_relevant] = useState([]);
  const [rules_newest, setRules_newest] = useState([]);
  const [rules_popular, setRules_popular] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleSelectTemplate = (templateId, templateRuleBlocks) => {
    console.log("Selected template: ", templateId);
    console.log("Selected template rule block: ", templateRuleBlocks);

    updateEventData({
      templateId: templateId,
      templateRuleBlocks: templateRuleBlocks,
    });
    setSelectedTemplate(templateId);
    notifyParentToNextStep();
  };

  const notifyParentToNextStep = () => {
    const nextStep = currentStep + 1;
    console.log("Notifying parent to next step: ", nextStep);
    setCurrentStep(nextStep);
  };

  const handleCreateNewTemplate = (e) => {
    console.log(e);
  };

  // Utility function to darken the color
  const darkenColor = (color) => {
    let colorValue = parseInt(color.slice(1), 16); // Remove "#" and parse hex
    const r = (colorValue >> 16) & 0xff;
    const g = (colorValue >> 8) & 0xff;
    const b = colorValue & 0xff;
    return `rgb(${Math.floor(r * 0.8)}, ${Math.floor(g * 0.8)}, ${Math.floor(b * 0.8)})`;
  };

  const handleTopicSelection = (topicID) => {
    setSelectedTopics((prevTopics) =>
      prevTopics.includes(topicID)
        ? prevTopics.filter((id) => id !== topicID)
        : [...prevTopics, topicID]
    );
  };

  // Fetch and assign colors to rules by popularity
  const loadRulesByPopularity = async () => {
    // Define color array
    const colors = [
      "#f8eafa",
      "#dff7f5",
      "#f5f7df",
      "#ffeede",
      "#dfe2f7",
      "#e3edf0",
      "#dfeaf7",
      "#f7dfe0",
    ];

    try {
      // fetch rules
      const data = await fetchSpaceRulesSortBy(spaceId, "popularity");
      console.log("fetched space rules data, set by popularity: ", data);

      //asign color
      const rulesWithColors = data.map((rule, index) => ({
        ...rule,
        color: colors[index % colors.length], // Cycle through colors array
      }));

      // assign related topics
      const rulesWithColorsAndTopics = await Promise.all(
        rulesWithColors.map(async (rule) => {
          const topicNames = await fetchTopicsForRules(rule.id);
          return { ...rule, topicNames: topicNames };
        })
      );
      console.log("rulesWithColorsAndTopics: ", rulesWithColorsAndTopics);
      // set rules_popular
      setRules_popular(rulesWithColorsAndTopics);
    } catch (error) {
      console.error("Error setting rules by popular: ", error);
    }
  };

  const fetchTopicsForRules = async (ruleId) => {
    try {
      const topicNames = fetchTopicsByRuleId(ruleId);
      return topicNames;
    } catch (error) {
      console.log("Failed to fetch topics for rules_popular: ", error);
      return [];
    }
  };
  // Load rules by relevance and match colors with rules in rules_popular
  const loadRulesByRelevance = async () => {
    // return if topic not selected
    if (selectedTopics.length == 0) return;

    try {
      // fetch rules
      const data = await fetchSpaceRulesByRelevance(spaceId, selectedTopics);

      // grab color by rule id from rules_popular
      const relevantRulesWithColors = data.map((rule) => {
        const popularRule = rules_popular.find(
          (popular) => popular.id === rule.id
        );
        return popularRule ? { ...rule, color: popularRule.color } : rule;
      });

      // assign related topics
      const relevantRulesWithColorsAndTopics = await Promise.all(
        relevantRulesWithColors.map(async (rule) => {
          const topicNames = await fetchTopicsForRules(rule.id);
          return { ...rule, topicNames: topicNames };
        })
      );

      // set rules_relevant
      setRules_relevant(relevantRulesWithColorsAndTopics);
    } catch (error) {
      console.error("Error setting rules by relevance: ", error);
    }
  };

  const loadTopics = async () => {
    try {
      const data = await fetchTopics();
      setTopics(data);
    } catch (error) {
      console.error("Error fetching topics: ", error);
    }
  };

  useEffect(() => {
    setNavTitle(t("create-event.navigation-title"));
    loadRulesByPopularity();
    loadTopics();
  }, []);

  useEffect(() => {
    // console.log("selectedTopics: ", selectedTopics);
    loadRulesByRelevance();
  }, [selectedTopics]);

  useEffect(() => {
    console.log("rules_popular: ", rules_popular);
    // Sort by created date (newest first)
    const sortedByDate = [...rules_popular].sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
    );
    setRules_newest(sortedByDate);
  }, [rules_popular]);

  useEffect(() => {
    if (selectedTemplate) {
      setNextStepButtonText("Use this template");
    }
  }, [selectedTemplate]);

  return (
    <div className="p-4 text-left">
      {/* Choose Template */}
      <div id="choose-template" className="text-2xl block mb-4 font-semibold ">
        Browse event templates
      </div>
      <div className="flex overflow-x-auto mt-4 space-x-4 w-full">
        {topics.map((topic) => {
          return (
            <div
              className={`rounded-full px-4 py-2 w-max cursor-pointer ${selectedTopics.includes(topic.id) ? "bg-gray-400" : "bg-slate-200"}`}
              key={topic.id}
              onClick={() => handleTopicSelection(topic.id)}
            >
              {topic.name}
            </div>
          );
        })}
      </div>
      {rules_relevent.length != 0 && (
        <>
          <div id="newest-template" className="mt-14 block mb-2 font-semibold ">
            Most relevant
          </div>
          <div className="flex overflow-x-auto space-x-4 w-full py-2">
            {rules_relevent.map((template) => (
              <div
                key={template.id}
                onClick={() =>
                  handleSelectTemplate(template.id, template.ruleBlocks)
                }
                className={`text-gray-500 flex flex-col justify-between gap-2 flex-shrink-0 w-40 rounded-[20px] p-4 cursor-pointer 
            }`}
                style={{ backgroundColor: template.color || "#000" }}
              >
                <div>
                  <h3 className="text-base font-semibold pb-2 text-gray-600">
                    {template.name}
                  </h3>
                  <div className="text-xs pb-4">
                    Rules for hosting a live podcast event, including noise
                    limits, seating setup, equipment
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {template.topicNames.map((topic, index) => (
                    <div
                      className="bg-white rounded-full text-sm w-fit p-1 px-2 text-gray-700"
                      key={index}
                    >
                      {topic}
                    </div>
                  ))}
                </div>
                {template.exceptionAdded && (
                  <span
                    className={`text-sm mt-2 p-1 px-2 rounded-2xl  bg-gray-200 text-gray-400 `}
                  >
                    Exception added
                  </span>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <div id="newest-template" className="mt-14 block mb-2 font-semibold ">
        Newest
      </div>
      <div className="flex overflow-x-auto space-x-4 w-full py-2">
        {rules_newest.map((template) => (
          <div
            key={template.id}
            onClick={() =>
              handleSelectTemplate(template.id, template.ruleBlocks)
            }
            className={`text-gray-500 flex flex-col justify-between gap-2 flex-shrink-0 w-40 rounded-[20px] p-4 cursor-pointer 
            }`}
            style={{
              backgroundColor:
                selectedTemplate === template.id
                  ? darkenColor(template.color)
                  : template.color,
            }}
          >
            <div>
              <h3 className="text-base font-semibold pb-2 text-gray-600">
                {template.name}
              </h3>
              <div className="text-xs pb-4">
                Rules for hosting a live podcast event, including noise limits,
                seating setup, equipment
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {template.topicNames.map((topic, index) => (
                <div
                  className="bg-white rounded-full text-sm w-fit p-1 px-2"
                  key={index}
                >
                  {topic}
                </div>
              ))}
            </div>
            {template.exceptionAdded && (
              <span
                className={`text-sm mt-2 p-1 px-2 rounded-2xl  bg-gray-200 text-gray-400 `}
              >
                Exception added
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="my-6" />
      <div id="most-popular-template" className=" block mb-2 font-semibold ">
        Most popular
      </div>
      <div className="flex overflow-x-auto space-x-4 w-full py-2">
        {rules_popular.map((template) => (
          <div
            key={template.id}
            onClick={() =>
              handleSelectTemplate(template.id, template.ruleBlocks)
            }
            className="text-gray-500 flex flex-col justify-between gap-2  flex-shrink-0 w-40 h-fit rounded-[20px] p-4 cursor-pointer"
            style={{
              backgroundColor:
                selectedTemplate === template.id
                  ? darkenColor(template.color)
                  : template.color,
            }}
          >
            <div>
              <h3 className="text-base font-semibold pb-2 text-gray-600">
                {template.name}
              </h3>
              <div className="text-xs pb-4">
                Rules for hosting a live podcast event, including noise limits,
                seating setup, equipment
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {template.topicNames.map((topic, index) => (
                <div
                  className="bg-white rounded-full text-sm w-fit p-1 px-2"
                  key={index}
                >
                  {topic}
                </div>
              ))}
            </div>
            {template.exceptionAdded && (
              <span
                className={`text-sm mt-2 p-1 px-2 rounded-2xl  bg-gray-200 text-gray-400 `}
              >
                Exception added
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="my-6" />
      <div id="create-new-template" className=" block mb-2 font-semibold ">
        Create a new one from scratch
      </div>
      <div
        onClick={() => handleCreateNewTemplate()}
        className="bg-gray-100 w-40 h-40 border rounded-md cursor-pointer flex justify-center items-center"
      >
        <PlusIcon className="w-5 h-5 mx-auto my-auto text-gray-500"></PlusIcon>
      </div>
    </div>
  );
};

export default Step2;
Step2.propTypes = {
  currentStep: PropTypes.number.isRequired,
  spaceId: PropTypes.string,
  setCurrentStep: PropTypes.func.isRequired,
  setNavTitle: PropTypes.func.isRequired,
  updateEventData: PropTypes.func.isRequired,
  setNextStepButtonText: PropTypes.func.isRequired,
};
