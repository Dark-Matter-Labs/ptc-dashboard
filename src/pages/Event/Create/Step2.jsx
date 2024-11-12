import { useState, useEffect } from "react";
import {
  SearchIcon,
  PlusIcon,
  AdjustmentsIcon,
} from "@heroicons/react/outline";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { fetchSpaceEventRules, fetchTopics } from "../../../api/api";

const Step2 = ({
  currentStep,
  setCurrentStep,
  setNavTitle,
  updateEventData,
  setNextStepButtonText,
}) => {
  const { t } = useTranslation();
  const [rules, setRules] = useState([]);
  const [topics, setTopics] = useState([]);
  const [templateOfRules_newest, setTemplateOfRules_newest] = useState([]);
  const [templateOfRules_popular, setTemplateOfRules_popular] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
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

  const loadRules = async () => {
    // Define color array
    const colors = [
      "#3b3a43",
      "#a6977a",
      "#8da695",
      "#7e96a3",
      "#988fae",
      "#a38890",
      "#736f6d",
    ];

    try {
      // ?target=space_event
      const data = await fetchSpaceEventRules();
      console.log("fetched data: ", data);
      const rulesWithExtras = data.map((rule, index) => ({
        ...rule,
        popularity: Math.floor(Math.random() * 11), // Random integer between 0 and 10
        color: colors[index % colors.length], // Cycle through colors array
      }));
      console.log("Enhanced rule data: ", rulesWithExtras);
      setRules(rulesWithExtras);
    } catch (error) {
      console.error("Error fetching templates: ", error);
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
    loadRules();
    loadTopics();
  }, []);

  useEffect(() => {
    if (selectedTemplate) {
      setNextStepButtonText("Use this template");
    }
  }, [selectedTemplate]);

  // Sort templates by created date and popularity
  useEffect(() => {
    // Sort by created date (newest first)
    const sortedByDate = [...rules].sort(
      (a, b) => new Date(b.createAt) - new Date(a.createAt)
    );
    setTemplateOfRules_newest(sortedByDate);

    // Sort by popularity (highest first)
    const sortedByPopularity = [...rules].sort(
      (a, b) => b.popularity - a.popularity
    );
    setTemplateOfRules_popular(sortedByPopularity);
  }, [rules]);
  return (
    <div className="p-4 text-left">
      {/* Choose Template */}
      <div id="choose-template" className="text-2xl block mb-4 font-semibold ">
        Browse event templates
      </div>

      <p className="mb-4">
        Search and select from a variety of event templates with pre-set rules
        to suit your event, or customize as needed.
      </p>
      <div className="flex flex-row w-full justify-between gap-2">
        <div className="relative w-full">
          <SearchIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          <input
            id="search-template"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border rounded-md p-2 pl-10"
            placeholder="Search"
          />
        </div>
        <button className="bg-slate-200 flex items-center flex-row gap-2 px-4 w-max rounded">
          <AdjustmentsIcon className="w-5 text-gray-600 rotate-90" />
          <span className="">Filter</span>
        </button>
      </div>
      <div className="flex overflow-x-auto mt-4 space-x-4 w-full">
        {topics.map((topic) => {
          return (
            <div
              className="rounded-full px-4 py-2 bg-slate-200 w-max"
              key={topic.id}
            >
              {topic.name}
            </div>
          );
        })}
      </div>
      <div id="newest-template" className="mt-14 block mb-2 font-semibold ">
        Newest
      </div>
      <div className="flex overflow-x-auto space-x-4 w-full py-2">
        {templateOfRules_newest.map((template) => (
          <div
            key={template.id}
            onClick={() =>
              handleSelectTemplate(template.id, template.ruleBlocks)
            }
            className={`text-white flex-shrink-0 w-40 h-40 border rounded-md p-4 cursor-pointer 
            }`}
            style={{
              backgroundColor:
                selectedTemplate === template.id
                  ? darkenColor(template.color)
                  : template.color,
            }}
          >
            <h3 className="font-bold text-sm">{template.name}</h3>
            <p className="text-sm font-light mt-2 ">
              Popularity: {template.popularity}
            </p>
            <p className="text-sm font-light mt-2 ">
              created at: {format(template.createdAt, "yyyy-MM-dd HH:mm:ss")}
            </p>
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
        {templateOfRules_popular.map((template) => (
          <div
            key={template.id}
            onClick={() =>
              handleSelectTemplate(template.id, template.ruleBlocks)
            }
            className="text-white flex-shrink-0 w-40 h-40 border rounded-md p-4 cursor-pointer"
            style={{
              backgroundColor:
                selectedTemplate === template.id
                  ? darkenColor(template.color)
                  : template.color,
            }}
          >
            <h3 className="font-bold text-sm">{template.name}</h3>
            <p className="text-sm font-light mt-2">
              Popularity: {template.popularity}
            </p>
            <p className="text-sm font-light mt-2">
              created at: {format(template.createdAt, "yyyy/MM/dd HH:mm:ss")}
            </p>
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
  setCurrentStep: PropTypes.func.isRequired,
  setNavTitle: PropTypes.func.isRequired,
  updateEventData: PropTypes.func.isRequired,
  setNextStepButtonText: PropTypes.func.isRequired,
};
