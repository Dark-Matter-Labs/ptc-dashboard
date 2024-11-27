import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Textarea } from "@headlessui/react";
import {
  PlusIcon,
  MinusIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";
import { ToggleSlider } from "../../../components/Common/ToggleSlider";
import * as Type from "../../../lib/PermissionEngine/type";
import ExclamationSm from "../../../assets/image/exclamation-sm.svg";
import BottomDrawer from "../../../components/Common/BottomDrawer";
import { parseRuleBlockContent } from "../../../lib/util";

const StepCheckRuleBlocks = ({
  setNavTitle,
  spaceRule,
  eventData,
  eventRuleData,
  spaceRuleBlockExcludedTypes,
  eventRuleBlockPrivateTypes,
  spaceRuleBlockOrderPriority,
  forceStaticNamedSpaceRuleBlocks,
  ruleTypeInterpreter,
  getRuleBlockTypeNameTranslationKey,
  getRuleBlockTypeDescriptionTranslationKey,
  updateEventRuleData,
  updateEventData,
  setIsStepComplete,
  setNextStepButtonText,
  permissionEngineAPI,
  agreements,
  setAgreements,
}) => {
  const { t } = useTranslation();
  const [expandedCards, setExpandedCards] = useState({ 0: true }); //{0: true, 2: false}
  const spaceRuleBlocks = spaceRule.ruleBlocks;
  const [eventRuleBlocks, setEventRuleBlocks] = useState([]);
  const [allRuleBlocks, setAllRuleBlocks] = useState([]);
  const [ruleBlockContentById, setRuleBlockContentById] = useState({});
  const [ruleBlockContentByHash, setRuleBlockContentByHash] = useState({});
  const [isAddCustomRuleBlockOpen, setIsAddCustomRuleBlockOpen] =
    useState(false);

  const toggleExpand = (e, id) => {
    e.preventDefault();

    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggle = (id, isAgree) => {
    setAgreements((prev) => ({
      ...prev,
      [id]: { ...prev[id], agree: isAgree },
    }));
  };

  const handleAgreeAll = (e) => {
    e.preventDefault();
    // Set all rule blocks to agree (for debugging purposes)
    const newAgreements = {};
    allRuleBlocks.forEach((ruleBlock) => {
      newAgreements[ruleBlock.id] = { agree: true };
    });
    setAgreements(newAgreements);
  };

  const handleException = (id, desiredValue, reason) => {
    setAgreements((prev) => ({
      ...prev,
      [id]: { ...prev[id], desiredValue, reason },
    }));
  };

  const handleAddCustomRuleBlockClicked = () => {
    setIsAddCustomRuleBlockOpen(true);
  };

  useEffect(() => {
    console.log(isAddCustomRuleBlockOpen);
    // setIsAddCustomRuleBlockOpen(false);
  }, [isAddCustomRuleBlockOpen]);

  useEffect(() => {
    console.log("expanded Cards: ", expandedCards);
    console.log("agreements: ", agreements);
  }, [expandedCards, agreements]);

  useEffect(() => {
    setNavTitle(t("create-event.navigation-title"));
  }, [setNavTitle, t]);

  // Update button text based on agreements
  useEffect(() => {
    const keys = Object.keys(agreements);
    const hasDisagreement = keys.find((key) => {
      const agreement = agreements[key];
      const ruleBlock = spaceRuleBlocks.find(
        (spaceRuleBlock) => spaceRuleBlock.id === key
      );

      return agreement.agree === false && ruleBlock;
    });
    console.log("hasDisagreements? ::: ", hasDisagreement);
    if (hasDisagreement) {
      setNextStepButtonText(t("navigation.request-exception-button"));
      updateEventData({ requestType: "exceptions" });
    } else {
      setNextStepButtonText(t("navigation.next-button"));
      updateEventData({ requestType: "agreed" });
    }
  }, [agreements, setNextStepButtonText]);

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

    const combinedBlocks = filteredSpaceRuleBlocks.concat(
      eventRuleData.ruleBlocks.filter(
        (item) => eventRuleBlockPrivateTypes.includes(item.type) === false
      )
    );
    // open all blocks
    combinedBlocks.map((item) => {
      setExpandedCards((prev) => ({ ...prev, [item.id]: true }));
    });
    setAllRuleBlocks(combinedBlocks);
  };

  useEffect(() => {
    loadEventRuleBlocks();
  }, []);

  useEffect(() => {
    console.log("parse space rule blocks");
    spaceRuleBlocks.forEach(async (ruleBlock) => {
      const content = await parseRuleBlockContent(
        permissionEngineAPI,
        ruleBlock,
        t
      );
      setRuleBlockContentByHash((prev) => ({
        ...prev,
        [ruleBlock.hash]: content,
      }));
    });
    console.log("ruleBlockContentByHash", ruleBlockContentByHash);
    combineRuleBlocks();
  }, [spaceRuleBlocks, eventRuleBlocks]);

  useEffect(() => {
    setIsStepComplete(
      (updatedEventData, updatedEventRuleData, updatedAgreements) => {
        return (
          // eslint-disable-next-line no-unused-vars
          _eventData = updatedEventData,
          eventRuleData = updatedEventRuleData,
          agreements = updatedAgreements
        ) => {
          let message = "";
          let result = true;
          try {
            if (!eventRuleData.name || eventRuleData.name === "") {
              throw new Error("Please select a rule template");
            }

            const agreementKeys = Object.keys(agreements);

            if (agreementKeys.length !== allRuleBlocks.length) {
              throw new Error(
                "Please answer to all the rule blocks in the list"
              );
            }

            for (const key of agreementKeys) {
              const ruleBlock = [
                ...spaceRuleBlocks,
                ...eventRuleData.ruleBlocks,
              ].find((item) => item.id === key);
              console.log(key, ruleBlock);
              const agreement = agreements[key];
              if (agreement.agree == null) {
                throw new Error(
                  t("rule-block-response-error")
                );
              } else if (
                agreement.agree === false &&
                ruleBlock.type.startsWith("space:")
              ) {
                const { desiredValue, reason } = agreement;
                if (!reason) {
                  throw new Error(t("rules.exception-reason-error"));
                } else {
                  // Add exception rule block for space rule
                  updateEventRuleData({
                    name: eventData.name,
                    ruleBlocks: [
                      ...eventRuleData.ruleBlocks,
                      {
                        name: `Exception-${ruleBlock.name}`,
                        type: Type.RuleBlockType.spaceEventException,
                        content: [ruleBlock.hash, desiredValue, reason].join(
                          Type.RuleBlockContentDivider.type
                        ),
                      },
                    ],
                  });
                }
              } else if (
                agreement.agree === false &&
                ruleBlock.type.startsWith("space_event:")
              ) {
                // Delete event rule
                updateEventRuleData({
                  name: eventData.name,
                  ruleBlocks: eventRuleData.ruleBlocks.filter(
                    (item) => item.id !== key
                  ),
                });
              }
            }
          } catch (error) {
            result = false;
            message = error.message;
          }

          return {
            result,
            message,
          };
        };
      }
    );
  }, [allRuleBlocks]);

  useEffect(() => {
    console.log("allRuleBlocks: ", allRuleBlocks);
    allRuleBlocks.forEach(async (ruleBlock) => {
      const content = await parseRuleBlockContent(
        permissionEngineAPI,
        ruleBlock,
        t
      );

      setRuleBlockContentById((prev) => ({
        ...prev,
        [ruleBlock.id]: content,
      }));
    });
  }, [allRuleBlocks]);

  return (
    <div>
      <div className="p-4 space-y-4 text-left">
        {/* View Terms */}
        <div id="view-terms" className="text-2xl block mb-2 font-semibold">
          {eventRuleData?.name}
        </div>

        <p className="mb-4">{eventRuleData.details}</p>
        {window.location.host === "localhost" ? (
          <button
            onClick={(e) => handleAgreeAll(e)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Agree to All Rules
          </button>
        ) : (
          ""
        )}

        <div className="flex flex-col gap-4 text-gray-500">
          {allRuleBlocks.map((ruleBlock, index) => (
            <div
              key={ruleBlock.id ?? `rule-block-${index}`}
              className="bg-white border border-gray-200 shadow rounded-xl p-4 round"
            >
              {/* Header with Title and Expand/Collapse Icon */}
              <button
                onClick={(e) => toggleExpand(e, ruleBlock.id)}
                className="w-full flex flex-row justify-between place-items-start md:items-center text-gray-600 hover:text-gray-900 "
              >
                <div className="text-base sm:text-lg text-gray-900 w-full flex flex-col sm:flex-row gap-2 justify-start">
                  <div className="whitespace-nowrap text-sm bg-gray-200 rounded-full px-4 py-1 self-start">
                    {ruleTypeInterpreter(ruleBlock.type)}
                  </div>
                  <div className="text-left w-full font-semibold text-lg text-gray-700 break-words break-all">
                    {ruleBlock.name}
                  </div>
                </div>

                {agreements[ruleBlock.id]?.agree == null ? (
                  <div>
                    {expandedCards[ruleBlock.id] ? (
                      <MinusIcon className="w-5 h-5" />
                    ) : (
                      <PlusIcon className="w-5 h-5" />
                    )}
                  </div>
                ) : agreements[ruleBlock.id].agree ? (
                  <CheckCircleIcon className="w-7 h-7" color="#32B07D" />
                ) : ruleBlock.type.startsWith("space:") ? (
                  <ExclamationCircleIcon className="w-7 h-7" />
                ) : (
                  <XCircleIcon className="w-7 h-7" color="#FF8577" />
                )}
              </button>
              {/* Content (only visible when expanded) */}
              {expandedCards[ruleBlock.id] && (
                <div className="mt-2 text-gray-400 break-all">
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
                  {/* TODO. dynamic content parsing by ruleBlock type */}
                  <div className="mt-2">
                    {ruleBlockContentById[ruleBlock.id]
                      ? ruleBlockContentById[ruleBlock.id]
                      : ruleBlock.content}
                  </div>
                  <ToggleSlider
                    id={ruleBlock.id ?? `rule-block-${index}`}
                    handleToggle={handleToggle}
                    agree={agreements[ruleBlock.id]?.agree}
                    ruleBlockTarget={ruleBlock.type.split(":")[0]}
                  />

                  {agreements[ruleBlock.id]?.agree === false &&
                  ruleBlock.type.split(":")[0] === Type.RuleTarget.space ? (
                    <Textarea
                      id={`space-rule-exception-reason-${agreements[ruleBlock.id]}`}
                      value={agreements[ruleBlock.id]?.reason}
                      onChange={(e) =>
                        handleException(ruleBlock.id, false, e.target.value)
                      }
                      className="w-full border rounded p-2 min-h-3 mt-2"
                      placeholder={t("rules.exception-reason-placeholder")}
                    ></Textarea>
                  ) : (
                    ""
                  )}
                </div>
              )}
              {ruleBlock.type === Type.RuleBlockType.spaceEventException ? (
                <div className="mt-2 ml-4 w-[300px] p-0 flex flex-col">
                  <div className="flex flex-row justify-center items-center gap-[5px]">
                    <img className="h-[16px] w-[16px]" src={ExclamationSm} />
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
          ))}
          <div
            onClick={handleAddCustomRuleBlockClicked}
            className="bg-white border border-dashed border-gray-200 rounded-xl p-6 round flex items-center justify-center mb-24"
          >
            <img
              className="w-[45.55px] h-[18px] top-[38px] left-[58.5px]"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAASCAYAAADLw4ffAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACTSURBVHgB7ZYxDoAgDEVbuYBH8Ah6AxnYPYo38SzODHoUvYEjAwnWwb2JCa1JX1K6dHiBwAeBQYxxQcTJOTd47y9QQsOc60spXc65B0Vw5VVi8lKYvBS/lsdned5xajN8gHLgqJ0D786f8BHKgTal1EJFkDNEJ7NRG6l8CGEHJdiFlcLkpTB5KbjyK9VF//kDFHEDbSci7pHSsJkAAAAASUVORK5CYII="
            />
            <div className="left-[97.58px] top-[24px] w-[174px] h-[45px] text-gray-400 text-left font-inter text-[12px] tracking-[0.1px] leading-none flex items-center justify-center">
            {t("rules.new-rule-review-message")}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-0">
        {isAddCustomRuleBlockOpen ? (
          <BottomDrawer
            isAddCustomRuleBlockOpen={isAddCustomRuleBlockOpen}
            setIsAddCustomRuleBlockOpen={setIsAddCustomRuleBlockOpen}
            eventRuleBlocks={eventRuleBlocks}
            setEventRuleBlocks={setEventRuleBlocks}
            updateEventRuleData={updateEventRuleData}
            allRuleBlocks={allRuleBlocks}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

StepCheckRuleBlocks.propTypes = {
  setNavTitle: PropTypes.func.isRequired,
  spaceRule: PropTypes.object,
  eventData: PropTypes.object,
  eventRuleData: PropTypes.object,
  setNextStepButtonText: PropTypes.func.isRequired,
  setIsStepComplete: PropTypes.func.isRequired,
  updateEventRuleData: PropTypes.func.isRequired,
  updateEventData: PropTypes.func.isRequired,
  ruleTypeInterpreter: PropTypes.func.isRequired,
  getRuleBlockTypeNameTranslationKey: PropTypes.func.isRequired,
  getRuleBlockTypeDescriptionTranslationKey: PropTypes.func.isRequired,
  permissionEngineAPI: PropTypes.object,
  spaceRuleBlockExcludedTypes: PropTypes.array,
  eventRuleBlockPrivateTypes: PropTypes.array,
  spaceRuleBlockOrderPriority: PropTypes.array,
  forceStaticNamedSpaceRuleBlocks: PropTypes.array,
  agreements: PropTypes.object,
  setAgreements: PropTypes.func.isRequired,
};

export default StepCheckRuleBlocks;
