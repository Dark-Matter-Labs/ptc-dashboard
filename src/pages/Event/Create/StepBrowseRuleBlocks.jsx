import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";
import ExclamationSm from "../../../assets/image/exclamation-sm.svg";
import { parseRuleBlockContent } from "../../../lib/util";
import { Type, ApiClient, RuleAPI } from "@dark-matter-labs/ptc-sdk";

const StepBrowseRuleBlocks = ({
  setNavTitle,
  spaceRule,
  eventRuleData,
  spaceRuleBlockExcludedTypes,
  eventRuleBlockPrivateTypes,
  spaceRuleBlockOrderPriority,
  forceStaticNamedSpaceRuleBlocks,
  ruleTypeInterpreter,
  getRuleBlockTypeNameTranslationKey,
  getRuleBlockTypeDescriptionTranslationKey,
  updateEventRuleData,
  setNextStepButtonText,
  setIsStepComplete,
  agreements,
  setAgreements,
}) => {
  const { t } = useTranslation();

  const apiClient = ApiClient.getInstance();
  const ruleAPI = new RuleAPI(apiClient);

  const [expandedCards, setExpandedCards] = useState({ 0: false }); //{0: true, 2: false}
  const spaceRuleBlocks = spaceRule.ruleBlocks;
  const [eventRuleBlocks, setEventRuleBlocks] = useState([]);
  const [allRuleBlocks, setAllRuleBlocks] = useState([]);
  const [ruleBlockContentById, setRuleBlockContentById] = useState({});
  const [ruleBlockContentByHash, setRuleBlockContentByHash] = useState({});

  const toggleExpand = (e, id) => {
    e.preventDefault();

    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const loadEventRuleBlocks = async () => {
    // fetch evnet rules
    try {
      if (eventRuleData.id) {
        const rule = await ruleAPI.findOneById(eventRuleData.id);
        const { ruleBlocks } = rule;

        setEventRuleBlocks(ruleBlocks);
        updateEventRuleData({ ruleBlocks: ruleBlocks });
      } else {
        setEventRuleBlocks([]);
      }
    } catch (error) {
      console.error("Error fetching space rule blocks: ", error);
    }
  };

  const clearCustomRuleBlocks = () => {
    const spaceRuleBlocks = spaceRule.ruleBlocks;
    const originalEventRuleBlocks = eventRuleBlocks.filter(
      (item) => item.id.startsWith("rule-block-") === false
    );
    const originalRuleBlockKeys = [
      ...spaceRuleBlocks,
      ...originalEventRuleBlocks,
    ].map((item) => item.id);

    const filteredAgreements = {};

    originalRuleBlockKeys.forEach((key) => {
      if (agreements[key]) {
        filteredAgreements[key] = agreements[key];
      }
    });

    updateEventRuleData({
      ruleBlocks: originalEventRuleBlocks,
    });
    setEventRuleBlocks(originalEventRuleBlocks);
    setAgreements(filteredAgreements);
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

    const combinedBlocks = filteredSpaceRuleBlocks.concat(
      eventRuleBlocks.filter(
        (item) => eventRuleBlockPrivateTypes.includes(item.type) === false
      )
    );
    setAllRuleBlocks(combinedBlocks);
  };

  useEffect(() => {
    console.log("expanded Cards: ", expandedCards);
  }, [expandedCards]);

  useEffect(() => {
    setNavTitle(t("create-event.navigation-title"));
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: smooth scrolling
    });
  }, [setNavTitle, t]);

  // Update button text based on agreements
  useEffect(() => {
    setNextStepButtonText(t("navigation.use-this-template-button"));
  }, [setNextStepButtonText]);

  useEffect(() => {
    loadEventRuleBlocks();
    clearCustomRuleBlocks();
  }, []);

  useEffect(() => {
    console.log("parse space rule blocks");
    spaceRuleBlocks.forEach(async (ruleBlock) => {
      const content = await parseRuleBlockContent(ruleBlock, t);
      setRuleBlockContentByHash((prev) => ({
        ...prev,
        [ruleBlock.hash]: content,
      }));
    });
    console.log("ruleBlockContentByHash", ruleBlockContentByHash);
    combineRuleBlocks();
  }, [spaceRuleBlocks, eventRuleBlocks]);

  useEffect(() => {
    console.log("allRuleBlocks: ", allRuleBlocks);
    allRuleBlocks.forEach(async (ruleBlock) => {
      const content = await parseRuleBlockContent(ruleBlock, t);

      setRuleBlockContentById((prev) => ({
        ...prev,
        [ruleBlock.id]: content,
      }));
    });
  }, [allRuleBlocks]);

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
                  {ruleBlock.details ? (
                    <p>{ruleBlock.details}</p>
                  ) : forceStaticNamedSpaceRuleBlocks.includes(
                      ruleBlock.type
                    ) ? (
                    <p>
                      {t(
                        getRuleBlockTypeDescriptionTranslationKey(
                          ruleBlock.type
                        )
                      )}
                    </p>
                  ) : (
                    ""
                  )}

                  {/* TODO. parse content by ruleBlock.type */}
                  <div className="mt-2">
                    {ruleBlockContentById[ruleBlock.id]
                      ? ruleBlockContentById[ruleBlock.id]
                      : ruleBlock.content}
                  </div>
                  {ruleBlock.type === Type.RuleBlockType.spaceEventException ? (
                    <div className="mt-2 ml-4 w-[300px] p-0 flex flex-col">
                      <div className="flex flex-row justify-center items-center gap-[5px]">
                        <img
                          className="h-[16px] w-[16px]"
                          src={ExclamationSm}
                        />
                        <div className="text-[#6b6c78] text-left text-[10px] font-inter flex-col left-[21px] top-[5px] leading-auto w-[279px] flex">
                          <p>{t("rules.exception-disclaimer")}:</p>
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
                        {
                          // TODO. dynamic content parsing by original spaceRuleBlock type
                          ruleBlockContentByHash[
                            spaceRuleBlocks.find(
                              (item) =>
                                item.hash ===
                                ruleBlock.content.split(
                                  Type.RuleBlockContentDivider.type
                                )[0]
                            )?.hash
                          ]
                            ? ruleBlockContentByHash[
                                spaceRuleBlocks.find(
                                  (item) =>
                                    item.hash ===
                                    ruleBlock.content.split(
                                      Type.RuleBlockContentDivider.type
                                    )[0]
                                )?.hash
                              ]
                            : ""
                        }
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
  getRuleBlockTypeDescriptionTranslationKey: PropTypes.func.isRequired,
  permissionEngineAPI: PropTypes.object,
  spaceRuleBlockExcludedTypes: PropTypes.array,
  eventRuleBlockPrivateTypes: PropTypes.array,
  spaceRuleBlockOrderPriority: PropTypes.array,
  forceStaticNamedSpaceRuleBlocks: PropTypes.array,
  setIsStepComplete: PropTypes.func.isRequired,
  agreements: PropTypes.object,
  setAgreements: PropTypes.func.isRequired,
};

export default StepBrowseRuleBlocks;
