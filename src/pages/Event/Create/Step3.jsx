import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";
import {
  fetchSpaceRuleBlocksBySpaceRuleId,
  fetchEventRuleBlocksByEventRuleId,
} from "../../../api/api";

const Step3 = ({
  setNavTitle,
  spaceRuleId,
  setNextStepButtonText,
  templateId,
}) => {
  const { t } = useTranslation();
  const [expandedCards, setExpandedCards] = useState({ 0: false }); //{0: true, 2: false}
  const [spaceRuleBlocks, setSpaceRuleBlocks] = useState([]);
  const [eventRuleBlocks, setEventRuleBlocks] = useState([]);
  const [allRuleBlocks, setAllRuleBlocks] = useState([]);
  const toggleExpand = (e, id) => {
    e.preventDefault();

    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const loadSpaceRuleBlocks = async () => {
    // fetch space rules
    try {
      const data = await fetchSpaceRuleBlocksBySpaceRuleId(spaceRuleId);
      console.log("space rule blocks: ", data);
      setSpaceRuleBlocks(data);
    } catch (error) {
      console.error("Error fetching space rule blocks: ", error);
    }
  };

  const loadEventRuleBlocks = async () => {
    // fetch evnet rules
    try {
      const data = await fetchEventRuleBlocksByEventRuleId(templateId);
      console.log("event rule blocks: ", data);
      setEventRuleBlocks(data);
    } catch (error) {
      console.error("Error fetching space rule blocks: ", error);
    }
  };

  const combineRuleBlocks = () => {
    console.log("combine rule blocks");
    const combinedBlocks = spaceRuleBlocks.concat(eventRuleBlocks);
    setAllRuleBlocks(combinedBlocks);
  };

  useEffect(() => {
    console.log("expanded Cards: ", expandedCards);
  }, [expandedCards]);

  useEffect(() => {
    setNavTitle(t("create-event.an-example-template-title"));
  }, [setNavTitle, t]);

  // Update button text based on agreements
  useEffect(() => {
    setNextStepButtonText("Use this template");
  }, [setNextStepButtonText]);

  useEffect(() => {
    // console.log(templateRuleBlocks);
    loadSpaceRuleBlocks();
    loadEventRuleBlocks();
  }, []);

  useEffect(() => {
    combineRuleBlocks();
  }, [spaceRuleBlocks, eventRuleBlocks]);

  useEffect(() => {
    console.log("allRuleBlocks: ", allRuleBlocks);
  }, [allRuleBlocks]);

  return (
    <div className="p-4 space-y-4 text-left bg-[#fafafb]">
      {/* View Terms */}
      {/* <h1>Template {templateId}</h1> */}
      {/* <div className="text-gray-500 mb-4 flex flex-col ">
        {spaceRuleBlocks.map((block) => (
          <div key={block.id}>
            {block.name}
            <p>{block.content}</p>
          </div>
        ))}
      </div>{" "}
      */}
      <div id="view-terms" className="text-2xl block mb-2 font-semibold">
        Movie night
      </div>
      <p className="mb-4">
        Rules for hosting a movie screening, with guidance on noise levels,
        seating arrangements, and lighting.
      </p>
      <div className="flex flex-col gap-4 text-gray-500">
        {allRuleBlocks.map((block) => (
          <div
            key={block.id}
            className="bg-white border border-gray-200 shadow rounded-[20px] p-4"
          >
            {/* Header with Title and Expand/Collapse Icon */}
            <button
              onClick={(e) => toggleExpand(e, block.id)}
              className="w-full flex gap-2 justify-between items-center text-gray-600 hover:text-gray-900"
            >
              <div className="text-base sm:text-lg text-gray-900 w-full flex flex-col sm:flex-row gap-2 justify-start">
                <div className="whitespace-nowrap text-sm bg-gray-200 rounded-full px-4 py-1 self-start">
                  {ruleTypeInterpreter(block.type)}
                </div>
                <div className="text-left w-full font-semibold text-lg text-gray-700 break-words">
                  {block.name}
                </div>
              </div>
              <div>
                {expandedCards[block.id] ? (
                  <MinusIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <PlusIcon className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {/* Content (only visible when expanded) */}
            {expandedCards[block.id] && (
              <div className="mt-2 text-gray-500 text-sm overflow-auto">
                <p>{block.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Step3.propTypes = {
  setNavTitle: PropTypes.func.isRequired,
  spaceId: PropTypes.string,
  spaceRuleId: PropTypes.string,
  setNextStepButtonText: PropTypes.func.isRequired,
  templateId: PropTypes.string,
};

export default Step3;

function ruleTypeInterpreter(input) {
  if (input.startsWith("space_event:")) {
    return "Event rule";
  } else if (input.startsWith("space:")) {
    return "Space rule";
  } else {
    return "Unknown";
  }
}
