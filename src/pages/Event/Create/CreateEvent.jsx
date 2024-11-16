import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../../../useUser";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step7 from "./Step7";
import Stepper from "../../../components//Common/Stepper";
import PropTypes from "prop-types";

export default function CreateEvent({
  setNavTitle,
  permissionEngineAPI,
  currentLanguage,
}) {
  const navigate = useNavigate();
  let { spaceId } = useParams();

  const { user } = useUser();
  const [spaceRuleId, setSpaceRuleId] = useState(null);
  const [eventRuleData, setEventRuleData] = useState({
    id: "",
    name: "", // to be collected from form
    spaceId: spaceId,
    ruleBlocks: [],
  });
  const [eventData, setEventData] = useState({
    name: "", // to be collected from form
    spaceId: spaceId,
    ruleId: "",
    duration: "", // to be collected from form
    startsAt: "", // to be collected from form
    externalServiceId: "",
    details: "",
    link: "",
    callbackLink: "",
    images: [],
    topicIds: [],
  });
  const [permissionRequestData, setPermissionRequestData] = useState({
    spaceId: spaceId,
    spaceRuleId: spaceRuleId,
    spaceEventId: "",
    spaceEventRuleId: "",
  });
  const [alertMessage, setAlertMessage] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [nextStepBtnText, setNextStepButtonText] = useState("Next");
  const updateEventRuleData = (newData) => {
    setEventRuleData((prevData) => ({ ...prevData, ...newData }));
  };
  const updateEventData = (newData) => {
    setEventData((prevData) => ({ ...prevData, ...newData }));
  };
  const updatePermissionRequestData = (newData) => {
    setPermissionRequestData((prevData) => ({ ...prevData, ...newData }));
  };

  const loadSpaceRule = async () => {
    try {
      if (!spaceId) {
        navigate(`/`);
      }
      const spaceRule = await permissionEngineAPI.fetchSpaceRule(spaceId);
      console.log("the spaceRule: ", spaceRule);

      setSpaceRuleId(spaceRule.id);
    } catch (error) {
      console.error(`Error fetching space rule`, error);
    }
  };

  useEffect(() => {
    console.log("event data: ", eventData);
    loadSpaceRule();
  }, [eventData]);

  // Define the steps content array
  const content = [
    <Step1
      key={1}
      spaceId={spaceId}
      setNavTitle={setNavTitle}
      updateEventRuleData={updateEventRuleData}
      updateEventData={updateEventData}
      updatePermissionRequestData={updatePermissionRequestData}
      permissionEngineAPI={permissionEngineAPI}
    />,
    <Step2
      key={2}
      spaceId={spaceId}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      setNavTitle={setNavTitle}
      setNextStepButtonText={setNextStepButtonText}
      updateEventRuleData={updateEventRuleData}
      updateEventData={updateEventData}
      updatePermissionRequestData={updatePermissionRequestData}
      permissionEngineAPI={permissionEngineAPI}
    />,
    <Step3
      key={3}
      spaceId={spaceId}
      spaceRuleId={spaceRuleId}
      setNavTitle={setNavTitle}
      setNextStepButtonText={setNextStepButtonText}
      templateId={eventData.templateId}
      permissionEngineAPI={permissionEngineAPI}
      // templateRuleBlocks={eventData.templateRuleBlocks}
    />,
    <Step4
      key={4}
      setNavTitle={setNavTitle}
      spaceRuleId={spaceRuleId}
      setNextStepButtonText={setNextStepButtonText}
      templateId={eventData.templateId}
      templateRuleBlocks={eventData.templateRuleBlocks}
      permissionEngineAPI={permissionEngineAPI}
    />,
    <Step5
      key={5}
      setNavTitle={setNavTitle}
      permissionEngineAPI={permissionEngineAPI}
    />,
    <Step7
      key={7}
      setNavTitle={setNavTitle}
      permissionEngineAPI={permissionEngineAPI}
    />,
  ];

  const handleSubmit = async () => {
    // e.preventDefault(); // Prevent form submission

    console.log("[CreateEvent] form submission: at CreateEvent component");

    // Form validation
    const formData = new FormData();
    if (eventData.spaceId) formData.append("spaceId", eventData.spaceId);
    if (eventData.startsAt) formData.append("startsAt", eventData.startsAt);
    if (eventData.name) formData.append("name", eventData.name);
    if (eventData.duration) formData.append("duration", eventData.duration);
    if (eventData.ruleId) formData.append("ruleId", eventData.ruleId);

    console.log("Form data:", formData);

    //API call to post event
    if (eventData.name && eventData.startsAt && eventData.duration) {
      try {
        const response = await fetch("/api/v1/event", {
          method: "POST",
          headers: {
            accept: "*/*",
          },
          body: formData,
        });
        if (response.ok) {
          const result = await response.json();
          setAlertMessage("Event created successfully!");
          console.log("Event created successfully:", result);
          return { success: true, message: "Event created successfully" };
        } else {
          console.error("Failed to create event:", response.statusText);
          return { success: false, message: "Failed to create event" };
        }
      } catch (error) {
        console.error("Error creating event:", error);
        return { success: false, message: "An unexpected error occurred." };
      }
    } else {
      console.error("Form data is not complete.");
      return { success: false, message: "Form data is not complete." };
    }
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
