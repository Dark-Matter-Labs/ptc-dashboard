import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../useUser";
import * as Type from "../../../lib/PermissionEngine/type";
import { parseTimeManipulation } from "../../../lib/util";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import abbrTimezone from "dayjs-abbr-timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(abbrTimezone);

const StepFinalReview = ({
  setIsStepComplete,
  setNavTitle,
  spaceRule,
  eventData,
  eventRuleData,
  agreements,
  permissionEngineAPI,
}) => {
  const { user } = useUser();
  const { t } = useTranslation();
  const [topics, setTopics] = useState([]);
  const [equipments, setEquipments] = useState({});
  const [rule, setRule] = useState({});
  const [hasDisagreement, setHasDisagreement] = useState(false);
  useEffect(() => {
    setNavTitle(t("create-event.proposal-final-review"));
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: smooth scrolling
    });
  }, []);

  const interpretTopics = async () => {
    try {
      const topicPromises = eventData.topicIds.map((id) =>
        permissionEngineAPI.fetchTopicById(id)
      );
      const topicData = await Promise.all(topicPromises);
      const topicNames = topicData.map((topic) => topic.name);
      setTopics(topicNames);
    } catch (error) {
      console.error("Error fetching topics: ", error);
    }
  };

  const interpretRequireEquipmentRuleBlocks = (requireEquipmentRuleBlocks) => {
    // Categorize equipment based on `type`
    // TODO. type here is the type of ruleBlock, not the equipment -> fix needed
    const categorizedEquipment = {};
    requireEquipmentRuleBlocks.forEach((item) => {
      const category = item.type || "uncategorized";
      if (!categorizedEquipment[category]) {
        categorizedEquipment[category] = [];
      }
      categorizedEquipment[category].push(item);
    });

    setEquipments(categorizedEquipment);
  };

  const interpretRule = () => {
    console.log(eventRuleData?.name ?? spaceRule.name);
    setRule({ name: eventRuleData?.name ?? spaceRule.name });
  };

  useEffect(() => {
    interpretTopics();
    interpretRequireEquipmentRuleBlocks(
      eventData.privateRuleBlocks.filter(
        (item) => item.type === Type.RuleBlockType.spaceEventRequireEquipment
      )
    );
    interpretRule();
    const keys = Object.keys(agreements);

    const hasDisagreement = keys.find((key) => {
      const agreement = agreements[key];
      const ruleBlock = spaceRule.ruleBlocks.find(
        (spaceRuleBlock) => spaceRuleBlock.id === key
      );

      return agreement.agree === false && ruleBlock;
    });
    setHasDisagreement(hasDisagreement);
    console.log("eventData:", eventData);
  }, []);

  useEffect(() => {
    console.log("euipments:", equipments);
  }, [equipments]);

  // Helper function to format date and time
  const formatDateTime = (startsAt, duration) => {
    const startDate = dayjs(startsAt).tz("Europe/London").toDate();
    const endDate = dayjs(startDate).tz("Europe/London").toDate();
    const durationInMinutes = parseInt(duration.replace("h", "")) * 60;
    endDate.setMinutes(startDate.getMinutes() + durationInMinutes);

    const date = `${startDate.getDate().toString().padStart(2, "0")} / ${(
      startDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")} / ${startDate.getFullYear()}`;
    // const startTime = startDate.toTimeString().slice(0, 5);
    // const endTime = endDate.toTimeString().slice(0, 5);
    const [startTimeHour, startTimeMinute] = startsAt.split("T")[1].split(":");
    const startTime = [startTimeHour, startTimeMinute].join(":");

    const durationManipulation = parseTimeManipulation(duration);

    const endTime = dayjs(startsAt)
      .tz("Europe/London")
      .add(durationManipulation.numberPart, durationManipulation.stringPart)
      .format("HH:mm");

    return { date, time: `${startTime} - ${endTime}` };
  };

  const { date, time } = formatDateTime(eventData.startsAt, eventData.duration);

  const getFilteredEquipment = (category) => {
    const value = equipments[category];
    console.log("filteredEquipment: ", value);
    return value || [];
  };

  const extractEuipmentQuantity = (content) => {
    const value = content.split("^").pop();
    console.log("content, quantity: ", content, value);
    return value;
  };

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
    <div className="p-4 space-y-4 text-left">
      {/* Final Review */}
      <div>
        {/* Header */}
        <div
          id="risk-assessment"
          className="text-3xl block mb-2 font-semibold "
        >
          {t("rules.proposal-summary")}
        </div>
      </div>
      {/* Title */}
      <div className="py-4">
        <p className="mb-4">{t("create-event.event-title")}</p>
        <div className="text-2xl font-semibold">{eventData.name}</div>
      </div>
      <hr />
      {/* Event themes */}
      <p className="mb-4">{t("create-event.event-theme")}</p>
      <div className="text-base font-semibold flex items-center gap-2">
        {topics.length > 0
          ? topics.map((topic, index) => (
              <div key={index} value={topic}>
                <div className=" cursor-pointer px-4 py-2 rounded-full text-sm font-medium  bg-white text-gray-800 border border-gray-400 w-fit ">
                  {topic}
                </div>
              </div>
            ))
          : "Themes not selected"}
      </div>
      <hr className="my-6"></hr>
      {/* Date and time */}
      <p className="mb-4">{t("create-event.event-date-time")}</p>
      <div className="flex justify-between gap-4">
        <div className="w-full items-center text-center bg-gray-200 p-2 px-4 rounded-xl text-gray-900">
          {date}
        </div>
        <div className="w-full items-center text-center bg-gray-200 p-2 px-4 rounded-xl text-gray-900">
          {time}
        </div>
      </div>
      <hr className="my-6"></hr>
      {/* Event description */}
      <div className="py-4">
        <p className="mb-4">{t("create-event.event-description")}</p>
        <div className="text-base font-semibold">{eventData.details}</div>
      </div>
      <hr />
      {/* Organizer name and email */}
      <p className="mb-4">{t("create-event.organizer-name")}</p>
      <p className="text-xl font-semibold">{user.name}</p>
      <p className="mb-4">{t("create-event.organizer-email")}</p>
      <p className="text-xl font-semibold">{user.email}</p>
      <hr className="my-6"></hr>
      {/* Requested equipments */}
      <p className="mb-4">{t("create-event.equipment")}</p>
      {/* Render all equipment categories */}
      {Object.keys(equipments).map((category, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center justify-between gap-2 mb-2"></div>
          <div className="text-xl font-semibold">
            {getFilteredEquipment(category).map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-2 mb-2"
              >
                <label
                  htmlFor={`${category}-${index}`}
                  className="flex-grow text-base font-semibold"
                >
                  {extractEuipmentQuantity(item.content)} {item.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <hr className="my-6"></hr>
      <p className="mb-4">{t("create-event.rule-template")}</p>
      <div className="rounded-2xl bg-[#3B3A43] px-4 py-8 text-white">
        <div className="flex justify-between items-center gap-2 mb-4">
          <div className="text-xl w-full">{rule.name}</div>
          {hasDisagreement === false ? (
            <div className="rounded-full bg-[#3DD598] px-2 py-1 text-[#3B3A43]">
              Agreed
            </div>
          ) : eventData.requestType === "exceptions" ? (
            <div className="rounded-full bg-[#d5b038] px-2 py-1 text-[#3B3A43]">
              Exceptions
            </div>
          ) : null}
        </div>
        <div className="font-light text-sm">
          Rules for {rule.name} with guidance on noise levels, seating
          arrangements, and lighting.{" "}
        </div>
      </div>
      <hr className="my-6"></hr>
    </div>
  );
};

export default StepFinalReview;
StepFinalReview.propTypes = {
  setNavTitle: PropTypes.func.isRequired, // Required
  agreements: PropTypes.object, // Required
  spaceRule: PropTypes.object, // Required
  eventData: PropTypes.object, // Required
  eventRuleData: PropTypes.object, // Required
  permissionEngineAPI: PropTypes.object, // Required
  setIsStepComplete: PropTypes.func.isRequired, // Required
};
