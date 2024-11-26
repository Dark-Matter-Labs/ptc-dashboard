import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const excludedTheme = [{ id: "0", name: "Policital Campaigns", icon: "📢" }];

export const ExcludedThemeDisplay = ({
  permissionEngineAPI,
  currentLanguage,
}) => {
  const [topics, setTopics] = useState([]);

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
    console.log("topics: ", topics);
  }, [topics]);
  return (
    <div className="text-left">
      <div htmlFor="themes" className="block mb-2 font-semibold">
        Excluded themes
      </div>
      <div className="py-1 flex flex-wrap gap-2">
        {excludedTheme?.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center border cursor-pointer px-4 py-2 rounded-full text-sm font-medium text-gray-500"
          >
            <div className="size-4 mr-1">{topic.icon}</div>
            <span>{topic.translation?.[currentLanguage] ?? topic.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

ExcludedThemeDisplay.propTypes = {
  currentStep: PropTypes.number.isRequired,
  spaceId: PropTypes.string,
  setCurrentStep: PropTypes.func.isRequired,
  setNavTitle: PropTypes.func.isRequired,
  updateEventData: PropTypes.func.isRequired,
  setNextStepButtonText: PropTypes.func.isRequired,
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
};
