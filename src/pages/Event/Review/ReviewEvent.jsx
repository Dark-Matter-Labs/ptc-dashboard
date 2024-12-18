import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../useUser";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import EventProposal from "./EventProposal"; // Sub-component for the proposal
import { formatDateTime } from "../../../lib/util";
import ReviewRulesWithExceptions from "./ReviewRulesWithExceptions";
import ReviewAllRules from "./ReviewAllRules";
import { DecisionSummary } from "./DecisionSummary";
import {
  ApiClient,
  PermissionResponseAPI,
  PermissionRequestAPI,
  SpaceEventAPI,
  TopicAPI,
  RuleAPI,
} from "@dark-matter-labs/ptc-sdk";

const ReviewEvent = () => {
  const { user } = useUser();
  const { spaceEventId } = useParams();
  const { t } = useTranslation();
  const [eventData, setEventData] = useState({});
  const [eventRuleTemplate, setEventRuleTemplate] = useState({});
  const [rule, setRule] = useState({});

  const [currentStep, setCurrentStep] = useState(4); // Step tracking: 1 = proposal, 2 = review actions
  const [topics, setTopics] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [timeObj, setTimeObj] = useState({ date: null, time: null });
  const [requestId, setRequestId] = useState("");
  const [responseId, setResponseId] = useState("");
  const [, setResponses] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);
  const [voters, setVoters] = useState([]);

  const apiClient = new ApiClient();
  const permissionResponseAPI = new PermissionResponseAPI(apiClient);
  const permissionRequestAPI = new PermissionRequestAPI(apiClient);
  const spaceEventAPI = new SpaceEventAPI(apiClient);
  const topicAPI = new TopicAPI(apiClient);
  const ruleAPI = new RuleAPI(apiClient);

  // Function to calculate days left
  const calculateDaysLeft = (timeoutAt) => {
    const currentDate = new Date();
    const targetDate = new Date(timeoutAt);
    const diffTime = targetDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days
    return diffDays;
  };

  // Extract voters' information from responses
  const extractVoters = (responses) => {
    return responses
      .filter(
        (res) =>
          res.status === "approved" ||
          res.status === "rejected" ||
          res.status === "abstention"
      )
      .map((res) => ({
        id: res.user.id,
        image: res.user.image,
      }));
  };

  const loadAllResposes = async () => {
    await permissionResponseAPI
      .findAll({
        permissionRequestId: requestId,
      })
      .then((res) => {
        console.log("All response data >> : ", res.data);
        // setResponseId(res.data?.[0].id);
        setResponses(res.data);

        // Calculate days left and voted count after fetching responses
        if (res.data.length > 0) {
          setDaysLeft(calculateDaysLeft(res.data[0].timeoutAt)); // Assuming all responses share the same timeoutAt
          setVoters(extractVoters(res.data));
        }
      })

      .catch((error) => {
        console.error("Error fetching response: ", error);
      });
  };

  const fetchEventById = async () => {
    try {
      const data = await spaceEventAPI.findOneById(spaceEventId);

      setEventData(data);
    } catch (error) {
      console.error("Error fetching event info:", error);
    }
  };

  const interpretTopics = async (topics) => {
    try {
      const topicPromises = topics?.map((item) =>
        topicAPI.findOneById(item.id)
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
      const data = await ruleAPI.findOneById(ruleId);
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
      const data = await ruleAPI.findOneById(ruleId);
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
      const data = await ruleAPI.findOneById(ruleId);
      setRule(data);
    } catch (error) {
      console.error("Error fetching event rule:", error);
    }
  };

  const loadRequestId = async () => {
    if (spaceEventId) {
      await permissionRequestAPI
        .findAll({
          spaceEventId,
          statuses: ["assigned"],
        })
        .then((res) => {
          setRequestId(res.data?.[0].id);
        })
        .catch((error) => {
          console.error("Error fetching request: ", error);
        });
    }
  };
  const loadResponseId = async () => {
    if (requestId) {
      await permissionResponseAPI
        .findAllSelfResponse({
          permissionRequestId: requestId,
        })
        .then((res) => {
          setResponseId(res.data?.[0].id);
        })

        .catch((error) => {
          console.error("Error fetching response: ", error);
        });
    }
  };
  useEffect(() => {
    if (spaceEventId) {
      console.log("spaceEventId:", spaceEventId);
      loadRequestId(spaceEventId);
    }
  }, []);

  useEffect(() => {
    if (requestId) {
      loadResponseId(requestId);
      loadAllResposes();
    }
  }, [requestId]);

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
            <ReviewAllRules t={t} rule={rule} proceedToStep={proceedToStep} />
          ) : currentStep === 3 ? (
            <ReviewRulesWithExceptions
              t={t}
              rule={rule}
              permissionResponseAPI={permissionResponseAPI}
              proceedToStep={proceedToStep}
              spaceEventId={spaceEventId}
              responseId={responseId}
              requestId={requestId}
              daysLeft={daysLeft}
              voters={voters}
              userId={user.id}
            />
          ) : currentStep === 4 ? (
            <DecisionSummary
              t={t}
              eventData={eventData}
              proceedToStep={proceedToStep}
              permissionResponseAPI={permissionResponseAPI}
              requestId={requestId}
              userId={user.id}
            />
          ) : (
            <div>Step 5</div>
          )}
        </>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  );
};

ReviewEvent.propTypes = {
  currentLanguage: PropTypes.string,
};

export default ReviewEvent;
