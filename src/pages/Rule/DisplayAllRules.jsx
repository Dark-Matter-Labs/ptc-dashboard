import "../../assets/css/Rule.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import * as Type from "../../lib/PermissionEngine/type";
import { useTranslation } from "react-i18next";
import { parseRuleBlockContent } from "../../lib/util";

export default function DisplayAllRules({ rule, permissionEngineAPI }) {
  const { t } = useTranslation();

  const [expandedCards, setExpandedCards] = useState({ 0: false }); //{0: true, 2: false}
  const [ruleBlocks, setRuleBlocks] = useState([]);
  const [ruleBlockContentById, setRuleBlockContentById] = useState({});

  const spaceRuleBlockOrderPriority = [
    Type.RuleBlockType.spaceExcludedTopic,
    Type.RuleBlockType.spaceCancelDeadline,
    Type.RuleBlockType.spaceAllowedEventAccessType,
    Type.RuleBlockType.spaceMaxAttendee,
    Type.RuleBlockType.spaceMaxNoiseLevel,
    Type.RuleBlockType.spacePrePermissionCheck,
    Type.RuleBlockType.spaceGeneral,
    Type.RuleBlockType.spaceAvailability,
    Type.RuleBlockType.spaceAvailabilityUnit,
    Type.RuleBlockType.spaceMaxAvailabilityUnitCount,
    Type.RuleBlockType.spaceAvailabilityBuffer,
    Type.RuleBlockType.spaceGuide,
  ];
  const forceStaticNamedSpaceRuleBlocks = [
    Type.RuleBlockType.spaceConsentMethod,
    Type.RuleBlockType.spaceConsentTimeout,
    Type.RuleBlockType.spaceExcludedTopic,
    Type.RuleBlockType.spaceCancelDeadline,
    Type.RuleBlockType.spaceAllowedEventAccessType,
    Type.RuleBlockType.spaceMaxAttendee,
    Type.RuleBlockType.spaceMaxNoiseLevel,
    Type.RuleBlockType.spaceAvailability,
    Type.RuleBlockType.spaceAvailabilityUnit,
    Type.RuleBlockType.spaceMaxAvailabilityUnitCount,
    Type.RuleBlockType.spaceAvailabilityBuffer,
  ];

  const toggleExpand = (e, id) => {
    e.preventDefault();

    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const ruleTypeInterpreter = (input) => {
    if (input.startsWith("space_event:")) {
      return "Event rule";
    } else if (input.startsWith("space:")) {
      return "Space rule";
    } else {
      return "Unknown";
    }
  };

  const getRuleBlockTypeNameTranslationKey = (ruleBlockType) => {
    return `${ruleBlockType.replace(":", "-")}-name`;
  };

  const getRuleBlockTypeDescriptionTranslationKey = (ruleBlockType) => {
    return `${ruleBlockType.replace(":", "-")}-description`;
  };

  useEffect(() => {
    setRuleBlocks(
      rule?.ruleBlocks
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
        })
    );
  }, [rule]);

  useEffect(() => {
    ruleBlocks?.forEach(async (ruleBlock) => {
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
  }, [ruleBlocks]);

  // console.log("ruleBlockContentById: ", ruleBlockContentById);

  return (
    <div>
      <div className="flex flex-col gap-4 p-2 mb-20 text-gray-500">
        {ruleBlocks?.map((ruleBlock) => {
          // console.log("ruleBlock: ", index, "::", ruleBlock);
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
                <div className="text-base sm:text-lg text-gray-900 w-full flex flex-row gap-2 justify-start">
                  <div className="whitespace-nowrap text-sm bg-[#E4DEE9] rounded-full px-4 py-1 self-start">
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
                <div className="mt-2 text-sm overflow-auto">
                  {ruleBlock.details ? (
                    <p className="mt-2">{ruleBlock.details}</p>
                  ) : forceStaticNamedSpaceRuleBlocks.includes(
                      ruleBlock.type
                    ) ? (
                    <p className="mt-2">
                      {t(
                        getRuleBlockTypeDescriptionTranslationKey(
                          ruleBlock.type
                        )
                      )}
                    </p>
                  ) : (
                    ""
                  )}

                  <div className="mt-2  text-gray-600">
                    {ruleBlockContentById[ruleBlock.id]
                      ? ruleBlockContentById[ruleBlock.id]
                      : ruleBlock.content}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

DisplayAllRules.propTypes = {
  rule: PropTypes.object,
  ruleAuthor: PropTypes.object,
  spaceRule: PropTypes.object,
  currentLanguage: PropTypes.string,
  permissionEngineAPI: PropTypes.object,
};
