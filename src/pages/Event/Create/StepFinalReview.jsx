import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../useUser";

// const { t } = useTranslation();

const temp_eventData = {
  spaceId: "071ad776-0d37-40a5-8a5b-548f7768621c",
  topicIds: [
    "d61ec038-851f-4039-a88b-960264a4dd80",
    "ac335ffe-3542-45d4-887b-f33010099a82",
  ],
  privateRuleBlocks: [
    {
      content: "5e406587-f7bb-4bd1-b155-24753310bb36^50",
      name: "Foldable seating",
      type: "space_event:require_equipment",
    },
  ],
  startsAt: "2024-11-30T09:00:00.000Z",
  duration: "1h",
  details: "Walk around",
  name: "Daegu Walkers",
  ruleId: "4e283863-5483-491b-b5e9-027e4f245c25",
  requestType: "agreed",
};
const StepFinalReview = ({
  setIsStepComplete,
  setNavTitle,
  eventData,
  permissionEngineAPI,
}) => {
  const { user } = useUser();
  const { t } = useTranslation();
  const [topics, setTopics] = useState([]);
  const [equipments, setEquipments] = useState({});
  const [rule, setRule] = useState({});
  useEffect(() => {
    setNavTitle(t("create-event.proposal-final-review"));
    console.log(temp_eventData.privateRuleBlocks);
    // console.log("temp_eventData: ", temp_eventData);
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

  const interpretEquipments = (arrayofEuipments) => {
    // Categorize equipment based on `type`
    const categorizedEquipment = {};
    arrayofEuipments.forEach((item) => {
      const category = item.type || "uncategorized";
      if (!categorizedEquipment[category]) {
        categorizedEquipment[category] = [];
      }
      categorizedEquipment[category].push(item);
    });

    setEquipments(categorizedEquipment);
  };

  const interpretRule = async (ruleId) => {
    try {
      const data = await permissionEngineAPI.fetchRuleByRuleId(ruleId);
      console.log("[api] rule", data);

      setRule(data);
    } catch (error) {
      console.error("Error fetching rule: ", error);
    }
  };

  useEffect(() => {
    interpretTopics();
    interpretEquipments(eventData.privateRuleBlocks);
    interpretRule(eventData.ruleId);
    console.log("eventData:", eventData);
  }, []);

  useEffect(() => {
    console.log("euipments:", equipments);
  }, [equipments]);

  // Helper function to format date and time
  const formatDateTime = (startsAt, duration) => {
    const startDate = new Date(startsAt);
    const endDate = new Date(startDate);
    const durationInMinutes = parseInt(duration.replace("h", "")) * 60;
    endDate.setMinutes(startDate.getMinutes() + durationInMinutes);

    const date = `${startDate.getDate().toString().padStart(2, "0")} / ${(
      startDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")} / ${startDate.getFullYear()}`;
    const startTime = startDate.toTimeString().slice(0, 5);
    const endTime = endDate.toTimeString().slice(0, 5);

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
          Proposal final review
        </div>
      </div>
      {/* Title */}
      <div className="py-4">
        <p className="mb-4">Event title</p>
        <div className="text-2xl font-semibold">{eventData.name}</div>
      </div>
      <hr />
      {/* Event themes */}
      <p className="mb-4">Event themes</p>
      <div className="text-base font-semibold flex items-center gap-2">
        {topics.length > 0
          ? topics.map((topic, index) => (
              <div key={index} value={topic}>
                <div className=" cursor-pointer px-4 py-2 rounded-full text-sm font-medium  bg-white text-gray-800 border border-gray-400 w-fit ">
                  {topic}
                </div>
              </div>
            ))
          : "Themes not slected"}
      </div>
      <hr className="my-6"></hr>
      {/* Date and time */}
      <p className="mb-4">Date and time</p>
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
        <p className="mb-4">Event description</p>
        <div className="text-base font-semibold">{eventData.details}</div>
      </div>
      <hr />
      {/* Organizer name and email */}
      <p className="mb-4">Organizer name</p>
      <p className="text-xl font-semibold">{user.name}</p>
      <p className="mb-4">Email address</p>
      <p className="text-xl font-semibold">{user.email}</p>
      <hr className="my-6"></hr>
      {/* Requested equipments */}
      <p className="mb-4">Requested equipments</p>
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
      <p className="mb-4">Rules template</p>
      <div className="rounded-2xl bg-[#3B3A43] px-4 py-8 text-white">
        <div className="flex justify-between items-center gap-2 mb-4">
          <div className="text-xl w-full">{rule.name}</div>
          {eventData.requestType ? (
            eventData.requestType === "agreed" ? (
              <div className="rounded-full bg-[#3DD598] px-2 py-1 text-[#3B3A43]">
                Agreed
              </div>
            ) : eventData.requestType === "exceptions" ? (
              <div className="rounded-full bg-[#d5b038] px-2 py-1 text-[#3B3A43]">
                Exceptions
              </div>
            ) : null
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
  eventData: PropTypes.object, // Required
  permissionEngineAPI: PropTypes.object, // Required
  setIsStepComplete: PropTypes.func.isRequired, // Required
};
