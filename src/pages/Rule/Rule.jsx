import { CalendarIcon, UsersIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/solid";
import { Button } from "@headlessui/react";
import "../../assets/css/Rule.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import * as Type from "../../lib/PermissionEngine/type";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { parseRuleBlockContent, capitalizeFirstLetter } from "../../lib/util";

export default function Rule({
  rule,
  ruleAuthor,
  currentLanguage,
  permissionEngineAPI,
}) {
  const { t } = useTranslation();
  const [expandedCards, setExpandedCards] = useState({ 0: false }); //{0: true, 2: false}
  const [ruleBlocks, setRuleBlocks] = useState([]);
  const [ruleBlockContentById, setRuleBlockContentById] = useState({});
  const topics = rule?.topics ?? [];

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
        ruleBlock
      );

      setRuleBlockContentById((prev) => ({
        ...prev,
        [ruleBlock.id]: content,
      }));
    });
  }, [ruleBlocks]);

  return (
    <section className="rule">
      <div className="rule-data">
        <div className="rule-snippet">
          <h1>{rule?.name}</h1>

          <div className="rule-account">
            {ruleAuthor?.image ? (
              <img
                className="h-5 w-5 flex-none rounded-full bg-gray-50 mr-1"
                src={ruleAuthor?.image}
              ></img>
            ) : (
              <UserIcon className="h-5 w-5 text-gray-800 mr-1" />
            )}
            {ruleAuthor?.name}
          </div>
          <div className="rule-desc">{rule?.details}</div>
          <h3>{t("rule-dashboard.rule-keywords")}</h3>
          {topics?.map((topic) => (
            <Button key={topic.id} className="tag" id={topic.id}>
              {topic.translation?.[currentLanguage] ?? topic.name}
            </Button>
          ))}
          <div className="rule-call-to-action"></div>
        </div>
      </div>
      <div className="rule-metadata">
        <div className="metadata-snippet">
          <div className="registration-date">
            <CalendarIcon className="h-5 w-5 white mr-1 text-gray-400"></CalendarIcon>
            <b>{t("rule-dashboard.registration-date")}</b>
            {dayjs(rule?.createdAt).format("YYYY-MM-DD")}
          </div>
          <div className="rule-author">
            <UsersIcon className="h-5 w-5 white mr-1 text-gray-400"></UsersIcon>
            <b>{t("rule-dashboard.rule-author")}</b>
            {ruleAuthor?.name}
            <div className="tag">{capitalizeFirstLetter(ruleAuthor?.type)}</div>
          </div>
          <hr></hr>
        </div>
      </div>

      <p className="mb-4">{rule?.details}</p>
      <div className="flex flex-col gap-4 p-2 mb-20 text-gray-500">
        {ruleBlocks?.map((ruleBlock) => {
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

                  <div className="mt-2">
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
    </section>
  );
}

Rule.propTypes = {
  rule: PropTypes.object,
  ruleAuthor: PropTypes.object,
  spaceRule: PropTypes.object,
  currentLanguage: PropTypes.string,
  permissionEngineAPI: PropTypes.object,
};
