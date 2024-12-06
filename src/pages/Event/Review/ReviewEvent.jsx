import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../useUser";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import EventProposal from "./EventProposal"; // Sub-component for the proposal
import { formatDateTime } from "../../../lib/util";
import ReviewRulesWithExceptions from "./ReviewRulesWithExceptions";
import ReviewAllRules from "./ReviewAllRules";
const ReviewEvent = ({ permissionEngineAPI }) => {
  const { user } = useUser();
  const { spaceEventId } = useParams();
  const { t } = useTranslation();
  const [eventData, setEventData] = useState({});
  const [eventRuleTemplate, setEventRuleTemplate] = useState({});
  const [rule, setRule] = useState({});

  const [currentStep, setCurrentStep] = useState(1); // Step tracking: 1 = proposal, 2 = review actions
  const [topics, setTopics] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [timeObj, setTimeObj] = useState({ date: null, time: null });

  const fetchEventById = async () => {
    try {
      const data = await permissionEngineAPI.fetchEventById(spaceEventId);
      console.log("event: ", data);
      setEventData(data);
    } catch (error) {
      console.error("Error fetching event info:", error);
    }
  };

  const interpretTopics = async (topics) => {
    try {
      const topicPromises = topics?.map((item) =>
        permissionEngineAPI.fetchTopicById(item.id)
      );
      const topicData = await Promise.all(topicPromises);
      setTopics(topicData?.map((topic) => topic.name));
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const interpretEquipments = async (ruleId) => {
    if (!ruleId) return;

    try {
      const data = await permissionEngineAPI.fetchRuleByRuleId(ruleId);
      const equipmentList = data?.ruleBlocks
        ?.filter((rule) => !rule.isPublic)
        .map((rule) => ({
          name: rule.name,
          quantity: rule.content.split("^")[1],
        }));
      setEquipments(equipmentList);
    } catch (error) {
      console.error("Error fetching equipment rules:", error);
    }
  };

  const interpretEventRuleTemplate = async (ruleId) => {
    if (!ruleId) return;

    try {
      const data = await permissionEngineAPI.fetchRuleByRuleId(ruleId);
      const hasException = data?.ruleBlocks?.some((rule) =>
        rule.type.includes("exception")
      );

      setEventRuleTemplate({
        name: data.name,
        hasException,
      });
    } catch (error) {
      console.error("Error fetching event rule template:", error);
    }
  };

  const interpretRule = async (ruleId) => {
    if (!ruleId) return;

    try {
      const data = await permissionEngineAPI.fetchRuleByRuleId(ruleId);
      console.log("rule: ", data);
      setRule(data);
    } catch (error) {
      console.error("Error fetching event rule:", error);
    }
  };

  // const interpretRuleAuthor = async (authorId) => {
  //   if (!authorId) return;

  //   try {
  //     const data = await permissionEngineAPI.fetchPublicUserData(authorId);
  //     console.log("author: ", data);
  //   } catch (error) {
  //     console.error("Error fetching event rule author:", error);
  //   }
  // };
  useEffect(() => {
    fetchEventById();
  }, []);

  useEffect(() => {
    if (eventData) {
      if (eventData.topics) interpretTopics(eventData.topics);
      if (eventData.startsAt && eventData.duration) {
        const formattedTime = formatDateTime(
          eventData.startsAt,
          eventData.duration
        );
        setTimeObj(formattedTime);
      }
      if (eventData.ruleId) {
        interpretEquipments(eventData.ruleId);
        interpretEventRuleTemplate(eventData.ruleId);
        interpretRule(eventData.ruleId);
      }
    }
  }, [eventData]);

  // useEffect(() => {
  //   console.log("rule: ", rule);
  //   // interpretRuleAuthor(rule.authorId);
  // }, [rule]);

  const proceedToStep = (step) => setCurrentStep(step);
  return (
    <div>
      {user ? (
        <>
          {currentStep === 1 ? (
            <EventProposal
              t={t}
              user={user}
              eventData={eventData}
              topics={topics}
              equipments={equipments}
              timeObj={timeObj}
              proceedToStep={() => proceedToStep(2)}
              eventRuleTemplate={eventRuleTemplate}
            />
          ) : currentStep === 2 ? (
            <ReviewAllRules
              t={t}
              rule={rule}
              permissionEngineAPI={permissionEngineAPI}
              proceedToStep={proceedToStep}
            />
          ) : currentStep === 3 ? (
            <ReviewRulesWithExceptions
              t={t}
              rule={rule}
              permissionEngineAPI={permissionEngineAPI}
              proceedToStep={proceedToStep}
            />
          ) : (
            <div>Step 3 </div>
          )}
        </>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  );
};

ReviewEvent.propTypes = {
  permissionEngineAPI: PropTypes.object.isRequired,
  currentLanguage: PropTypes.string,
};

export default ReviewEvent;
