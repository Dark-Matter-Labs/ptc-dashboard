import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";
import * as Type from "../../../lib/PermissionEngine/type";
import ExclamationSm from "../../../assets/image/exclamation-sm.svg";

const StepBrowseRuleBlocks = ({
  setNavTitle,
  spaceRule,
  eventRuleData,
  spaceRuleBlockExcludedTypes,
  spaceRuleBlockOrderPriority,
  forceStaticNamedSpaceRuleBlocks,
  ruleTypeInterpreter,
  getRuleBlockTypeNameTranslationKey,
  updateEventRuleData,
  setNextStepButtonText,
  permissionEngineAPI,
}) => {
  const { t } = useTranslation();
  const [expandedCards, setExpandedCards] = useState({ 0: false }); //{0: true, 2: false}
  const spaceRuleBlocks = spaceRule.ruleBlocks;
  const [eventRuleBlocks, setEventRuleBlocks] = useState([]);
  const [allRuleBlocks, setAllRuleBlocks] = useState([]);
  const toggleExpand = (e, id) => {
    e.preventDefault();

    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const loadEventRuleBlocks = async () => {
    // fetch evnet rules
    try {
      if (eventRuleData.id) {
        const data = await permissionEngineAPI.fetchRuleBlocksByRuleId(
          eventRuleData.id
        );
        console.log("event rule blocks: ", data);
        setEventRuleBlocks(data);
        updateEventRuleData({ ruleBlocks: data });
      } else {
        setEventRuleBlocks([]);
      }
    } catch (error) {
      console.error("Error fetching space rule blocks: ", error);
    }
  };

  const combineRuleBlocks = () => {
    console.log("combine rule blocks");
    const filteredSpaceRuleBlocks = spaceRuleBlocks
      .filter(
        (item) => spaceRuleBlockExcludedTypes.includes(item.type) === false
      )
      .filter(
        // hide exception raised space rules by the event rule
        (item) =>
          !eventRuleBlocks.find((eventRuleBlock) =>
            eventRuleBlock.content.startsWith(item.hash)
          )
      )
      .map((item) => {
        if (forceStaticNamedSpaceRuleBlocks.includes(item.type)) {
          item.name = t(getRuleBlockTypeNameTranslationKey(item.type));
        }
        return item;
      })
      .sort((a, b) => {
        // Get the index of the item types from the priority array
        const indexA = spaceRuleBlockOrderPriority.indexOf(a.type);
        const indexB = spaceRuleBlockOrderPriority.indexOf(b.type);

        // Sort based on the index values
        return indexA - indexB;
      });

    const combinedBlocks = filteredSpaceRuleBlocks.concat(eventRuleBlocks);
    setAllRuleBlocks(combinedBlocks);
  };

  useEffect(() => {
    console.log("expanded Cards: ", expandedCards);
  }, [expandedCards]);

  useEffect(() => {
    setNavTitle(t("create-event.navigation-title"));
  }, [setNavTitle, t]);

  // Update button text based on agreements
  useEffect(() => {
    setNextStepButtonText("Use this template");
  }, [setNextStepButtonText]);

  useEffect(() => {
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
      <div id="view-terms" className="text-2xl block mb-2 font-semibold">
        {eventRuleData?.name}
      </div>
      <p className="mb-4">{eventRuleData.details}</p>
      <div className="flex flex-col gap-4 text-gray-500">
        {allRuleBlocks.map((ruleBlock) => {
          return (
            <div
              key={ruleBlock.id}
              className="bg-white border border-gray-200 shadow rounded-[20px] p-4"
            >
              {/* Header with Title and Expand/Collapse Icon */}
              <button
                onClick={(e) => toggleExpand(e, ruleBlock.id)}
                className="w-full flex gap-2 justify-between place-items-start md:items-center text-gray-600 hover:text-gray-900"
              >
                <div className="text-base sm:text-lg text-gray-900 w-full flex flex-col sm:flex-row gap-2 justify-start">
                  <div className="whitespace-nowrap text-sm bg-gray-200 rounded-full px-4 py-1 self-start">
                    {ruleTypeInterpreter(ruleBlock.type)}
                  </div>
                  <div className="text-left w-full font-semibold text-lg text-gray-700 break-words break-all">
                    {ruleBlock.name}
                  </div>
                </div>
                <div>
                  {expandedCards[ruleBlock.id] ? (
                    <MinusIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <PlusIcon className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Content (only visible when expanded) */}
              {expandedCards[ruleBlock.id] && (
                <div className="mt-2 text-gray-500 text-sm overflow-auto">
                  <p>{ruleBlock.content}</p>
                  {ruleBlock.type === Type.RuleBlockType.spaceEventException ? (
                    <div className="mt-2 ml-4 w-[300px] p-0 flex flex-col">
                      <div className="flex flex-row justify-center items-center gap-[5px]">
                        <img
                          className="h-[16px] w-[16px]"
                          src={ExclamationSm}
                        />
                        <div className="text-[#6b6c78] text-left text-[10px] font-inter flex-col left-[21px] top-[5px] leading-auto w-[279px] flex">
                          <p>This rule has modified the original space rule:</p>
                        </div>
                      </div>
                      <div className="flex flex-col ml-6">
                        <p>
                          <strong>
                            {forceStaticNamedSpaceRuleBlocks.includes(
                              spaceRuleBlocks.find(
                                (item) =>
                                  item.hash ===
                                  ruleBlock.content.split(
                                    Type.RuleBlockContentDivider.type
                                  )[0]
                              )?.type
                            )
                              ? t(
                                  getRuleBlockTypeNameTranslationKey(
                                    spaceRuleBlocks.find(
                                      (item) =>
                                        item.hash ===
                                        ruleBlock.content.split(
                                          Type.RuleBlockContentDivider.type
                                        )[0]
                                    )?.type
                                  )
                                )
                              : spaceRuleBlocks.find(
                                  (item) =>
                                    item.hash ===
                                    ruleBlock.content.split(
                                      Type.RuleBlockContentDivider.type
                                    )[0]
                                )?.name}
                          </strong>
                        </p>
                        <p>
                          {
                            // TODO. dynamic content parsing by original spaceRuleBlock type
                            spaceRuleBlocks.find(
                              (item) =>
                                item.hash ===
                                ruleBlock.content.split(
                                  Type.RuleBlockContentDivider.type
                                )[0]
                            )?.content
                          }
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

StepBrowseRuleBlocks.propTypes = {
  setNavTitle: PropTypes.func.isRequired,
  spaceId: PropTypes.string,
  spaceRule: PropTypes.object,
  eventRuleData: PropTypes.object,
  setNextStepButtonText: PropTypes.func.isRequired,
  updateEventRuleData: PropTypes.func.isRequired,
  ruleTypeInterpreter: PropTypes.func.isRequired,
  getRuleBlockTypeNameTranslationKey: PropTypes.func.isRequired,
  permissionEngineAPI: PropTypes.object,
  spaceRuleBlockExcludedTypes: PropTypes.array,
  spaceRuleBlockOrderPriority: PropTypes.array,
  forceStaticNamedSpaceRuleBlocks: PropTypes.array,
};

export default StepBrowseRuleBlocks;
