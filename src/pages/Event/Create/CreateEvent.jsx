import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../../../useUser";
import StepSetEventData from "./StepSetEventData";
import StepChooseEventRule from "./StepChooseEventRule";
import StepBrowseRuleBlocks from "./StepBrowseRuleBlocks";
import StepCheckRuleBlocks from "./StepCheckRuleBlocks";
import StepFinalReview from "./StepFinalReview";
import Stepper from "../../../components//Common/Stepper";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { navigateToBack } from "../../../lib/util";
import {
  ApiClient,
  RuleAPI,
  RuleBlockAPI,
  SpaceEventAPI,
  PermissionRequestAPI,
  Type,
} from "@dark-matter-labs/ptc-sdk";

export default function CreateEvent({
  setNavTitle,
  permissionEngineAPI,
  currentLanguage,
}) {
  const { t } = useTranslation();

  const apiClient = ApiClient.getInstance();
  const ruleAPI = new RuleAPI(apiClient);
  const ruleBlockAPI = new RuleBlockAPI(apiClient);
  const spaceEventAPI = new SpaceEventAPI(apiClient);
  const permissionRequestAPI = new PermissionRequestAPI(apiClient);

  const spaceRuleBlockExcludedTypes = [
    Type.RuleBlockType.spaceConsentMethod,
    Type.RuleBlockType.spaceConsentTimeout,
    Type.RuleBlockType.spacePostEventCheck,
    Type.RuleBlockType.spacePrivateGuide,

    // TODO. temporary exclude for workshop
    // Type.RuleBlockType.spaceAvailability,
    Type.RuleBlockType.spaceAvailabilityUnit,
    Type.RuleBlockType.spaceMaxAvailabilityUnitCount,
    Type.RuleBlockType.spaceAvailabilityBuffer,
    Type.RuleBlockType.spaceJoinCommunity,
  ];
  const eventRuleBlockPrivateTypes = [
    Type.RuleBlockType.spaceEventRequireEquipment,
    Type.RuleBlockType.spaceEventInsurance,
    Type.RuleBlockType.spaceEventSelfRiskAssesment,
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
      return t("rules.rule-type-event-rule");
    } else if (input.startsWith("space:")) {
      return t("rules.rule-type-space-rule");
    } else {
      return t("rules.rule-type-unknown");
    }
  }
  const getRuleBlockTypeNameTranslationKey = (ruleBlockType) => {
    return `${ruleBlockType.replace(":", "-")}-name`;
  };

  const getRuleBlockTypeDescriptionTranslationKey = (ruleBlockType) => {
    return `${ruleBlockType.replace(":", "-")}-description`;
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
    // details: null,
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
    // endsAt: null, // to be collected from form
    // externalServiceId: null,
    // details: null,
    // link: null,
    // callbackLink: null,
    // images: [],
    topicIds: [],
    privateRuleBlocks: [],
    requestType: null,
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

  // for DateTimePicker
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Default to the current month
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [idDateTimeDecided, setDateTimeDecided] = useState(false);

  // for EventThemeSelector
  const [selectedTopic, setSelectedTopic] = useState(null);

  // for EquipmentSelector
  const [selectedEquipment, setSelectedEquipment] = useState({});

  // for StepChooseEventRule
  const [selectedEventRule, setSelectedEventRule] = useState(null);

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
      navigateToBack(navigate);
    }
  };

  const loadSpaceRule = async () => {
    try {
      if (!spaceId) {
        navigateToBack(navigate);
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
  }, [eventData]);

  useEffect(() => {
    console.log("isStepComplete: ", isStepComplete);
  }, [isStepComplete]);

  useEffect(() => {
    setNavTitle(t("create-event.navigation-title"));
    loadSpace();
    loadSpaceRule();
  }, []);

  // Define the steps content array
  const content = [
    <StepSetEventData
      key={1}
      spaceId={spaceId}
      space={space}
      spaceRule={spaceRule}
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
      currentMonth={currentMonth}
      setCurrentMonth={setCurrentMonth}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      selectedTime={selectedTime}
      setSelectedTime={setSelectedTime}
      idDateTimeDecided={idDateTimeDecided}
      setDateTimeDecided={setDateTimeDecided}
      selectedTopic={selectedTopic}
      setSelectedTopic={setSelectedTopic}
      selectedEquipment={selectedEquipment}
      setSelectedEquipment={setSelectedEquipment}
      currentLanguage={currentLanguage}
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
      selectedEventRule={selectedEventRule}
      setSelectedEventRule={setSelectedEventRule}
      setAgreements={setAgreements}
      currentLanguage={currentLanguage}
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
      eventRuleBlockPrivateTypes={eventRuleBlockPrivateTypes}
      spaceRuleBlockOrderPriority={spaceRuleBlockOrderPriority}
      forceStaticNamedSpaceRuleBlocks={forceStaticNamedSpaceRuleBlocks}
      ruleTypeInterpreter={ruleTypeInterpreter}
      getRuleBlockTypeNameTranslationKey={getRuleBlockTypeNameTranslationKey}
      getRuleBlockTypeDescriptionTranslationKey={
        getRuleBlockTypeDescriptionTranslationKey
      }
      isStepComplete={isStepComplete}
      setIsStepComplete={setIsStepComplete}
      agreements={agreements}
      setAgreements={setAgreements}
      currentLanguage={currentLanguage}
    />,
    <StepCheckRuleBlocks
      key={4}
      setNavTitle={setNavTitle}
      spaceRule={spaceRule}
      eventData={eventData}
      eventRuleData={eventRuleData}
      updateEventRuleData={updateEventRuleData}
      updateEventData={updateEventData}
      setNextStepButtonText={setNextStepButtonText}
      permissionEngineAPI={permissionEngineAPI}
      spaceRuleBlockExcludedTypes={spaceRuleBlockExcludedTypes}
      eventRuleBlockPrivateTypes={eventRuleBlockPrivateTypes}
      spaceRuleBlockOrderPriority={spaceRuleBlockOrderPriority}
      forceStaticNamedSpaceRuleBlocks={forceStaticNamedSpaceRuleBlocks}
      ruleTypeInterpreter={ruleTypeInterpreter}
      getRuleBlockTypeNameTranslationKey={getRuleBlockTypeNameTranslationKey}
      getRuleBlockTypeDescriptionTranslationKey={
        getRuleBlockTypeDescriptionTranslationKey
      }
      isStepComplete={isStepComplete}
      setIsStepComplete={setIsStepComplete}
      agreements={agreements}
      setAgreements={setAgreements}
      currentLanguage={currentLanguage}
    />,
    // TODO. StepCheckRisks
    <StepFinalReview
      key={5}
      setNavTitle={setNavTitle}
      permissionEngineAPI={permissionEngineAPI}
      isStepComplete={isStepComplete}
      setIsStepComplete={setIsStepComplete}
      eventData={eventData}
      eventRuleData={eventRuleData}
      spaceRule={spaceRule}
      agreements={agreements}
      currentLanguage={currentLanguage}
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
      if (ruleBlock.id && ruleBlock.id.startsWith("rule-block-") === false) {
        newRuleBlocks.push(ruleBlock);
      } else {
        if (ruleBlock.id && ruleBlock.id.startsWith("rule-block-") === true) {
          delete ruleBlock.id;
        }

        const newRuleBlock = await ruleBlockAPI.create(ruleBlock);
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

    const newEventRule = await ruleAPI.create({
      name: eventRuleData.name,
      details: eventRuleData.details,
      topicIds: eventRuleData.topicIds,
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

    const newEvent = await spaceEventAPI.create({
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
      await permissionRequestAPI.spaceEventPermissionRequest({
        spaceEventId: id,
      });

    return newPermissionRequest?.data?.permissionRequest;
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
        ...eventRuleData.ruleBlocks.filter((item) =>
          item.type.startsWith("space_event:")
        ),
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

  useEffect(() => {
    console.log("agreements: ", agreements);
  }, [agreements]);

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
