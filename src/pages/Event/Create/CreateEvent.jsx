import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../../../useUser";
import StepSetEventData from "./StepSetEventData";
import StepChooseEventRule from "./StepChooseEventRule";
import StepBrowseRuleBlocks from "./StepBrowseRuleBlocks";
import StepCheckRuleBlocks from "./StepCheckRuleBlocks";
import StepFinalReview from "./StepFinalReview";
import Stepper from "../../../components//Common/Stepper";
import * as Type from "../../../lib/PermissionEngine/type";
import PropTypes from "prop-types";

export default function CreateEvent({ setNavTitle, permissionEngineAPI }) {
  const spaceRuleBlockExcludedTypes = [
    Type.RuleBlockType.spaceConsentMethod,
    Type.RuleBlockType.spaceConsentTimeout,
    Type.RuleBlockType.spacePostEventCheck,

    Type.RuleBlockType.spacePrivateGuide,
  ];
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
  function ruleTypeInterpreter(input) {
    if (input.startsWith("space_event:")) {
      return "Event rule";
    } else if (input.startsWith("space:")) {
      return "Space rule";
    } else {
      return "Unknown";
    }
  }
  const getRuleBlockTypeNameTranslationKey = (ruleBlockType) => {
    return `${ruleBlockType.replace(":", "-")}-name`;
  };

  const navigate = useNavigate();
  let { spaceId } = useParams();
  const [space, setSpace] = useState(null);
  const { user } = useUser();
  const [spaceRule, setSpaceRule] = useState(null);
  const [eventRuleData, setEventRuleData] = useState({
    // TODO. declare type for eventRuleData
    // id: null,
    // name: null, // to be collected from form
    // parentRuleId: null,
    spaceId: spaceId,
    ruleBlocks: [],
    target: Type.RuleTarget.spaceEvent,
    topicIds: [],
  });
  const [eventData, setEventData] = useState({
    spaceId: spaceId,
    // TODO. declare type for eventData
    // name: null, // to be collected from form
    // ruleId: null,
    // duration: null, // to be collected from form
    // startsAt: null, // to be collected from form
    // externalServiceId: null,
    // details: null,
    // link: null,
    // callbackLink: null,
    // images: [],
    topicIds: [],
    privateRuleBlocks: [],
  });
  // eslint-disable-next-line no-unused-vars
  const [alertMessage, setAlertMessage] = useState(null);
  const [isStepComplete, setIsStepComplete] = useState(() => {
    return {
      result: true,
      message: "",
    };
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [nextStepBtnText, setNextStepButtonText] = useState("Next");
  const [agreements, setAgreements] = useState({});

  const updateEventRuleData = (newData) => {
    setEventRuleData((prevData) => ({ ...prevData, ...newData }));
  };
  const updateEventData = (newData) => {
    setEventData((prevData) => ({ ...prevData, ...newData }));
  };

  const loadSpace = async () => {
    try {
      if (!spaceId) {
        throw new Error("There is no spaceId");
      }
      const space = await permissionEngineAPI.fetchSpace(spaceId);
      console.log("the space: ", space);

      setSpace(space);
    } catch (error) {
      console.error(`Error fetching space`, error);
      navigate("/");
    }
  };

  const loadSpaceRule = async () => {
    try {
      if (!spaceId) {
        navigate(`/`);
      }
      const spaceRule = await permissionEngineAPI.fetchSpaceRule(spaceId);
      console.log("the spaceRule: ", spaceRule);

      setSpaceRule(spaceRule);
    } catch (error) {
      console.error(`Error fetching space rule`, error);
    }
  };

  useEffect(() => {
    console.log("event data: ", eventData);
    loadSpace();
    loadSpaceRule();
  }, [eventData]);

  // Define the steps content array
  const content = [
    <StepSetEventData
      key={1}
      spaceId={spaceId}
      space={space}
      setNavTitle={setNavTitle}
      eventData={eventData}
      eventRuleData={eventRuleData}
      updateEventRuleData={updateEventRuleData}
      updateEventData={updateEventData}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      setNextStepButtonText={setNextStepButtonText}
      permissionEngineAPI={permissionEngineAPI}
      isStepComplete={isStepComplete}
      setIsStepComplete={setIsStepComplete}
    />,
    <StepChooseEventRule
      key={2}
      spaceId={spaceId}
      spaceRule={spaceRule}
      topicIds={eventData?.topicIds ?? []}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      setNavTitle={setNavTitle}
      setNextStepButtonText={setNextStepButtonText}
      updateEventRuleData={updateEventRuleData}
      updateEventData={updateEventData}
      permissionEngineAPI={permissionEngineAPI}
      isStepComplete={isStepComplete}
      setIsStepComplete={setIsStepComplete}
    />,
    <StepBrowseRuleBlocks
      key={3}
      spaceId={spaceId}
      spaceRule={spaceRule}
      eventRuleData={eventRuleData}
      updateEventRuleData={updateEventRuleData}
      setNavTitle={setNavTitle}
      setNextStepButtonText={setNextStepButtonText}
      permissionEngineAPI={permissionEngineAPI}
      spaceRuleBlockExcludedTypes={spaceRuleBlockExcludedTypes}
      spaceRuleBlockOrderPriority={spaceRuleBlockOrderPriority}
      forceStaticNamedSpaceRuleBlocks={forceStaticNamedSpaceRuleBlocks}
      ruleTypeInterpreter={ruleTypeInterpreter}
      getRuleBlockTypeNameTranslationKey={getRuleBlockTypeNameTranslationKey}
      isStepComplete={isStepComplete}
      setIsStepComplete={setIsStepComplete}
    />,
    <StepCheckRuleBlocks
      key={4}
      setNavTitle={setNavTitle}
      spaceRule={spaceRule}
      eventRuleData={eventRuleData}
      updateEventRuleData={updateEventRuleData}
      setNextStepButtonText={setNextStepButtonText}
      permissionEngineAPI={permissionEngineAPI}
      spaceRuleBlockExcludedTypes={spaceRuleBlockExcludedTypes}
      spaceRuleBlockOrderPriority={spaceRuleBlockOrderPriority}
      forceStaticNamedSpaceRuleBlocks={forceStaticNamedSpaceRuleBlocks}
      ruleTypeInterpreter={ruleTypeInterpreter}
      getRuleBlockTypeNameTranslationKey={getRuleBlockTypeNameTranslationKey}
      isStepComplete={isStepComplete}
      setIsStepComplete={setIsStepComplete}
      agreements={agreements}
      setAgreements={setAgreements}
    />,
    // TODO. StepCheckRisks
    <StepFinalReview
      key={5}
      setNavTitle={setNavTitle}
      permissionEngineAPI={permissionEngineAPI}
      isStepComplete={isStepComplete}
      setIsStepComplete={setIsStepComplete}
    />,
  ];

  const createEventRuleBlocks = async (ruleBlocks) => {
    const newRuleBlocks = [];

    if (ruleBlocks.find((item) => !item.name)) {
      throw new Error("There are ruleBlocks without name");
    }
    if (ruleBlocks.find((item) => !item.type)) {
      throw new Error("There are ruleBlocks without type");
    }
    if (ruleBlocks.find((item) => !item.content)) {
      throw new Error("There are ruleBlocks without content");
    }
    if (
      ruleBlocks.find(
        (item) =>
          item.type === Type.RuleBlockType.spaceEventInsurance && !item.file
      )
    ) {
      throw new Error("spaceEventInsurance ruleBlocks need a file");
    }

    for (const ruleBlock of ruleBlocks) {
      if (ruleBlock.id) {
        newRuleBlocks.push(ruleBlock);
      } else {
        const newRuleBlock =
          await permissionEngineAPI.createRuleBlock(ruleBlock);
        newRuleBlocks.push(newRuleBlock);
      }
    }

    updateEventRuleData({
      ruleBlocks: newRuleBlocks,
    });

    return newRuleBlocks;
  };

  const createEventRule = async (ruleBlocks) => {
    const { name, topicIds } = eventRuleData;

    if (!name) {
      throw new Error("Event rule has no name");
    }

    if (topicIds.find((item) => typeof item !== "string")) {
      throw new Error("There are non-string typed item in topicIds");
    }

    if (ruleBlocks.find((item) => !item.id)) {
      throw new Error(`RuleBlock without id is found`);
    }

    const newEventRule = await permissionEngineAPI.createRule({
      name: eventRuleData.name,
      target: Type.RuleTarget.spaceEvent,
      ruleBlockIds: ruleBlocks.map((item) => item.id),
    });

    updateEventRuleData(newEventRule);
    updateEventData({ ruleId: newEventRule });

    return newEventRule;
  };

  const createEvent = async (eventData) => {
    const {
      name,
      spaceId,
      ruleId,
      duration,
      startsAt,
      externalServiceId,
      details,
      link,
      callbackLink,
      images,
      topicIds,
    } = eventData;

    if (!spaceId) {
      throw new Error("Event has no spaceId");
    }

    if (!ruleId) {
      throw new Error("Event has no ruleId");
    }

    if (!duration) {
      throw new Error("Event has no duration");
    }

    if (!startsAt) {
      throw new Error("Event has no startsAt");
    }

    if (topicIds.find((item) => typeof item !== "string")) {
      throw new Error("There are non-string typed item in topicIds");
    }

    const newEvent = await permissionEngineAPI.createSpaceEvent({
      name,
      spaceId,
      ruleId,
      duration,
      startsAt,
      externalServiceId,
      details,
      link,
      callbackLink,
      images,
      topicIds,
    });

    updateEventData(newEvent);

    return newEvent;
  };

  const createEventPermissionRequest = async (eventData) => {
    const { id } = eventData;

    if (!id) {
      throw new Error("Event not created");
    }

    const newPermissionRequest =
      await permissionEngineAPI.createEventPermissionRequest({
        spaceEventId: id,
      });

    return newPermissionRequest;
  };

  /**
   *
   * @returns Promise<{ success: boolean, message: string, permissionRequest: any }>
   */
  const handleSubmit = async () => {
    // e.preventDefault(); // Prevent form submission

    console.log("[CreateEvent] form submission: at CreateEvent component");
    let result = { success: true, message: "Event created successfully" };

    //API call
    try {
      const spaceEventRuleBlocks = await createEventRuleBlocks([
        ...eventRuleData.ruleBlocks,
        ...eventData.privateRuleBlocks,
      ]);
      const spaceEventRule = await createEventRule(spaceEventRuleBlocks);
      const spaceEvent = await createEvent({
        ...eventData,
        ruleId: spaceEventRule.id,
      });
      const permissionRequest = await createEventPermissionRequest(spaceEvent);
      result.permissionRequest = permissionRequest;
      result.message += `: permission request id (${permissionRequest?.id})`;

      if (!permissionRequest?.id) {
        throw new Error(
          `Failed to create permission request: ${JSON.stringify(permissionRequest)}`
        );
      }
    } catch (error) {
      console.error("Error creating event:", error);
      result = { success: false, message: "An unexpected error occurred." };
    }

    return result;
  };

  useEffect(() => {
    console.log("eventData: ", eventData);
  }, [eventData]);

  return (
    <form className="text-center pt-2">
      {/* {spaceId} */}
      <div>
        {alertMessage && (
          <div className="alert alert-success">{alertMessage}</div>
        )}
        {user ? (
          <Stepper
            currentStep={currentStep}
            eventData={eventData}
            eventRuleData={eventRuleData}
            agreements={agreements}
            isStepComplete={isStepComplete}
            setCurrentStep={setCurrentStep}
            numSteps={content.length} // Dynamically calculate steps
            stepContents={content}
            setNavTitle={setNavTitle}
            handleSubmit={handleSubmit} // Enable form submission at a certain step
            nextStepBtnText={nextStepBtnText}
          />
        ) : (
          // User is not logged in
          <div className="mt-2">Please log in to create an event.</div>
        )}
      </div>
    </form>
  );
}

CreateEvent.propTypes = {
  setNavTitle: PropTypes.func.isRequired, // Required
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
};
