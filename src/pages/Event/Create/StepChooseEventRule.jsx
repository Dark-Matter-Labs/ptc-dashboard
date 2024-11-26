import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const StepChooseEventRule = ({
  currentStep,
  spaceId,
  spaceRule,
  topicIds,
  setCurrentStep,
  setNavTitle,
  updateEventData,
  updateEventRuleData,
  setNextStepButtonText,
  permissionEngineAPI,
  setIsStepComplete,
  selectedEventRule,
  setSelectedEventRule,
  setAgreements,
  currentLanguage,
}) => {
  const { t } = useTranslation();

  const [releventRules, setRelevantRules] = useState([]);
  const [newestRules, setNewestRules] = useState([]);
  const [popularRules, setPopularRules] = useState([]);

  const handleSelectTemplate = (eventRule) => {
    if (eventRule) {
      updateEventData({
        ruleId: eventRule.id,
      });
      updateEventRuleData({
        ...eventRule,
      });
      setSelectedEventRule(eventRule);
    } else {
      updateEventRuleData({
        name: spaceRule.name,
        ruleBlocks: [],
      });
    }
    notifyParentToNextStep();
  };

  const notifyParentToNextStep = () => {
    const nextStep = currentStep + 1;
    console.log("Notifying parent to next step: ", nextStep);
    setCurrentStep(nextStep);
  };

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

  // Utility function to darken the color
  const darkenColor = (color) => {
    let colorValue = parseInt(color.slice(1), 16); // Remove "#" and parse hex
    const r = (colorValue >> 16) & 0xff;
    const g = (colorValue >> 8) & 0xff;
    const b = colorValue & 0xff;
    return `rgb(${Math.floor(r * 0.8)}, ${Math.floor(g * 0.8)}, ${Math.floor(b * 0.8)})`;
  };

  // Fetch and assign colors to rules by popularity
  const loadRulesByPopularity = async () => {
    try {
      // fetch rules
      const data = await permissionEngineAPI.fetchSpaceApprovedRulesSortBy(
        spaceId,
        "popularity"
      );

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
      // set popularRules
      setPopularRules(rulesWithColorsAndTopics);
    } catch (error) {
      console.error("Error setting rules by popular: ", error);
    }
  };

  const fetchTopicsForRules = async (ruleId) => {
    try {
      const topicNames = permissionEngineAPI
        .fetchTopicsByRuleId(ruleId)
        .then((res) =>
          res.map((item) => {
            if (item.translation?.[currentLanguage]) {
              return item.translation[currentLanguage];
            } else {
              return item.name;
            }
          })
        );
      return topicNames;
    } catch (error) {
      console.log("Failed to fetch topics for popularRules: ", error);
      return [];
    }
  };
  // Load rules by relevance and match colors with rules in popularRules
  const loadRulesByRelevance = async () => {
    // return if topic not selected
    if (topicIds.length == 0) return;

    try {
      // fetch rules
      const data = await permissionEngineAPI.fetchSpaceApprovedRulesByRelevance(
        spaceId,
        topicIds
      );

      // grab color by rule id from popularRules
      const relevantRulesWithColors = data.map((rule) => {
        const popularRule = popularRules.find(
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
      setRelevantRules(relevantRulesWithColorsAndTopics);
    } catch (error) {
      console.error("Error setting rules by relevance: ", error);
    }
  };

  useEffect(() => {
    setNavTitle(t("create-event.navigation-title"));

    updateEventData({
      ruleId: null,
    });
    updateEventRuleData({
      ruleBlocks: [],
      topicIds: [],
      id: null,
      name: null,
    });
    setSelectedEventRule(null);
    setAgreements({});
    loadRulesByPopularity();
  }, []);

  useEffect(() => {
    // console.log("selectedTopics: ", selectedTopics);
    if (topicIds && popularRules) {
      loadRulesByRelevance();
    }
  }, [popularRules]);

  useEffect(() => {
    // console.log("popularRules: ", popularRules);
    // Sort by created date (newest first)
    const sortedByDate = [...popularRules].sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
    );
    setNewestRules(sortedByDate);
  }, [popularRules]);

  useEffect(() => {
    if (selectedEventRule) {
      setNextStepButtonText("Use this template");
    } else {
      setNextStepButtonText("Next");
    }
  }, [selectedEventRule]);

  useEffect(() => {
    setIsStepComplete(() => {
      return () => {
        return {
          result: true,
          message: "",
        };
      };
    });
  }, []);

  return (
    <div className="p-4 text-left">
      {/* Choose Template */}
      <div id="choose-template" className="text-2xl block mb-4 font-semibold ">
        Browse event templates
      </div>
      {releventRules.length != 0 && (
        <>
          <div id="newest-template" className="mt-14 block mb-2 font-semibold ">
            Most relevant
          </div>
          <div className="flex overflow-x-auto space-x-4 w-full py-2">
            {releventRules.map((eventRule) => (
              <div
                key={eventRule.id}
                onClick={() => handleSelectTemplate(eventRule)}
                className={`text-gray-500 flex flex-col justify-between gap-2 flex-shrink-0 w-40 rounded-[20px] p-4 cursor-pointer 
            }`}
                style={{
                  backgroundColor:
                    selectedEventRule === eventRule.id
                      ? darkenColor(eventRule.color)
                      : eventRule.color,
                }}
              >
                <div>
                  <h3 className="text-base font-semibold pb-2 text-gray-600">
                    {eventRule.name}
                  </h3>
                  <div className="text-xs pb-4">
                    Rules for hosting a live podcast event, including noise
                    limits, seating setup, equipment
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {eventRule.topicNames.map((topic, index) => (
                    <div
                      className="bg-white rounded-full text-sm w-fit p-1 px-2 text-gray-700"
                      key={index}
                    >
                      {topic}
                    </div>
                  ))}
                </div>
                {eventRule.exceptionAdded && (
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
        {newestRules.map((eventRule) => (
          <div
            key={eventRule.id}
            onClick={() => handleSelectTemplate(eventRule)}
            className={`text-gray-500 flex flex-col justify-between gap-2 flex-shrink-0 w-40 rounded-[20px] p-4 cursor-pointer 
            }`}
            style={{
              backgroundColor:
                selectedEventRule === eventRule.id
                  ? darkenColor(eventRule.color)
                  : eventRule.color,
            }}
          >
            <div>
              <h3 className="text-base font-semibold pb-2 text-gray-600">
                {eventRule.name}
              </h3>
              <div className="text-xs pb-4">
                Rules for hosting a live podcast event, including noise limits,
                seating setup, equipment
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {eventRule.topicNames.map((topic, index) => (
                <div
                  className="bg-white rounded-full text-sm w-fit p-1 px-2"
                  key={index}
                >
                  {topic}
                </div>
              ))}
            </div>
            {eventRule.exceptionAdded && (
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
        {popularRules.map((eventRule) => (
          <div
            key={eventRule.id}
            onClick={() => handleSelectTemplate(eventRule)}
            className="text-gray-500 flex flex-col justify-between gap-2  flex-shrink-0 w-40 h-fit rounded-[20px] p-4 cursor-pointer"
            style={{
              backgroundColor:
                selectedEventRule === eventRule.id
                  ? darkenColor(eventRule.color)
                  : eventRule.color,
            }}
          >
            <div>
              <h3 className="text-base font-semibold pb-2 text-gray-600">
                {eventRule.name}
              </h3>
              <div className="text-xs pb-4">
                Rules for hosting a live podcast event, including noise limits,
                seating setup, equipment
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {eventRule.topicNames.map((topic, index) => (
                <div
                  className="bg-white rounded-full text-sm w-fit p-1 px-2"
                  key={index}
                >
                  {topic}
                </div>
              ))}
            </div>
            {eventRule.exceptionAdded && (
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
        Original space rule
      </div>
      <div className="flex overflow-x-auto space-x-4 w-full py-2">
        <div
          key={spaceRule.id}
          onClick={() => handleSelectTemplate()}
          className="text-gray-500 flex flex-col justify-between gap-2  flex-shrink-0 w-40 h-fit rounded-[20px] p-4 cursor-pointer"
          style={{
            backgroundColor: "#F7F2DF",
          }}
        >
          <div>
            <h3 className="text-base font-semibold pb-2 text-gray-600">
              {spaceRule.name}
            </h3>
            <div className="text-xs pb-4">{spaceRule.details}</div>
          </div>
          <div className="flex flex-col gap-2">
            {spaceRule.topics.map((topic, index) => (
              <div
                className="bg-white rounded-full text-sm w-fit p-1 px-2"
                key={index}
              >
                {topic.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepChooseEventRule;

StepChooseEventRule.propTypes = {
  currentStep: PropTypes.number.isRequired,
  spaceId: PropTypes.string,
  spaceRule: PropTypes.object,
  topicIds: PropTypes.array,
  setCurrentStep: PropTypes.func.isRequired,
  setNavTitle: PropTypes.func.isRequired,
  updateEventData: PropTypes.func.isRequired,
  updateEventRuleData: PropTypes.func.isRequired,
  setNextStepButtonText: PropTypes.func.isRequired,
  setIsStepComplete: PropTypes.func.isRequired,
  permissionEngineAPI: PropTypes.object,
  selectedEventRule: PropTypes.object,
  setSelectedEventRule: PropTypes.func.isRequired,
  setAgreements: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string,
};
