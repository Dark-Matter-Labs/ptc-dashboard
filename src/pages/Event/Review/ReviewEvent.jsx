import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../useUser";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import EventProposal from "./EventProposal"; // Sub-component for the proposal
import { formatDateTime } from "../../../lib/util";

const ReviewEvent = ({ permissionEngineAPI }) => {
  const { user } = useUser();
  const { spaceEventId } = useParams();
  const { t } = useTranslation();
  const [eventData, setEventData] = useState({});
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
      if (eventData.ruleId) interpretEquipments(eventData.ruleId);
    }
  }, [eventData]);

  const proceedToNextStep = () => setCurrentStep(2); // Move to the review actions step

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
              proceedToNextStep={proceedToNextStep}
            />
          ) : (
            <div>
              {/* Review interaction UI */}
              <h2>Review interaction</h2>
              {/* Add Agree/Reject buttons and actions */}
            </div>
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
};

export default ReviewEvent;
