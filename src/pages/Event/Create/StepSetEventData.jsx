import { useEffect, useState } from "react";
import { Textarea } from "@headlessui/react";
import DateTimePicker from "../../../components/Form/DateTimePicker";
import { EventThemeSelector } from "../../../components/Form/EventThemeSelector";
import { ExcludedThemeDisplay } from "../../../components/Form/ExcludedThemeDisplay";
import { OrganiserNameEmail } from "../../../components/Form/OrganiserNameEmail";
import { SetupRequirements } from "../../../components/Form/SetupRequirements";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const StepSetEventData = ({
  setNavTitle,
  currentStep,
  setIsStepComplete,
  setCurrentStep,
  setNextStepButtonText,
  eventData,
  updateEventData,
  updateEventRuleData,
  spaceId,
  space,
  permissionEngineAPI,
  currentMonth,
  setCurrentMonth,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  idDateTimeDecided,
  setDateTimeDecided,
  selectedTopic,
  setSelectedTopic,
  selectedEquipment,
  setSelectedEquipment,
  currentLanguage,
}) => {
  const { t } = useTranslation();
  const [eventTitle, setEventTitle] = useState(eventData.name);
  const [description, setDescription] = useState(eventData.details);
  const [eventDateTime, setEventDateTime] = useState(eventData.startsAt); // Store event date in ISO strings format

  useEffect(() => {
    setNavTitle(t("create-event.navigation-title"));
    setNextStepButtonText("Next")
  });

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: smooth scrolling
    });
  }, []);

  useEffect(() => {
    setIsStepComplete((updatedEventData, updatedEventRuleData) => {
      return (
        eventData = updatedEventData,
        eventRuleData = updatedEventRuleData
      ) => {
        let message = "";
        let result = true;
        try {
          if (!eventData.name || eventData.name === "") {
            throw new Error("Please set event title");
          }
          if (
            !eventData?.topicIds ||
            eventData?.topicIds?.length === 0 ||
            !eventRuleData.topicIds ||
            eventRuleData?.topicIds?.length === 0
          ) {
            throw new Error("Please select event theme");
          }
          if (!eventData?.startsAt || !eventData?.duration) {
            throw new Error("Please select event date");
          }
          if (!eventData.details || eventData.details === "") {
            throw new Error("Please set event description");
          }
        } catch (error) {
          result = false;
          message = error.message;
        }

        return {
          result,
          message,
        };
      };
    });
  }, []);

  useEffect(() => {
    //update event data when title is defined or updated
    updateEventData({
      name: eventTitle,
      details: description,
      startsAt: eventDateTime,
      // TODO. dynamic duration
      duration: "1h",
    });
  }, [eventTitle, description, eventDateTime]);

  return (
    <div className="p-4 text-left">
      {/* Enter title */}
      <div>
        <label htmlFor="title" className="block mb-2 font-semibold text-xl">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Enter event title"
          required
        ></input>
        <hr className="my-6" />
      </div>
      {/* Event theme */}
      <EventThemeSelector
        updateEventData={updateEventData}
        updateEventRuleData={updateEventRuleData}
        permissionEngineAPI={permissionEngineAPI}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        currentLanguage={currentLanguage}
      />
      {/* Excluded theme */}
      <ExcludedThemeDisplay
        permissionEngineAPI={permissionEngineAPI}
        currentStep={currentStep}
        spaceId={spaceId}
        setCurrentStep={setCurrentStep}
        setNavTitle={setNavTitle}
        updateEventData={updateEventData}
        setNextStepButtonText={setNextStepButtonText}
        currentLanguage={currentLanguage}
      />
      {/* Date  and time picker */}
      <DateTimePicker
        setEventDateTime={setEventDateTime}
        eventDateTime={eventDateTime}
        spaceId={spaceId}
        timezone={space?.timezone}
        permissionEngineAPI={permissionEngineAPI}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        idDateTimeDecided={idDateTimeDecided}
        setDateTimeDecided={setDateTimeDecided}
      />
      {/* Event description */}
      <hr className="my-6" />
      <div>
        <label
          htmlFor="event-description"
          className="block mb-2 font-semibold text-xl"
        >
          Description
        </label>
        <Textarea
          id="event-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2 min-h-3"
          placeholder="Enter event description"
        ></Textarea>
      </div>
      {/* Organizer name and email */}
      <hr className="my-6" />
      <OrganiserNameEmail />
      <SetupRequirements
        spaceId={spaceId}
        updateEventData={updateEventData}
        updateEventRuleData={updateEventRuleData}
        permissionEngineAPI={permissionEngineAPI}
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
      />
    </div>
  );
};

export default StepSetEventData;

StepSetEventData.propTypes = {
  setNavTitle: PropTypes.func.isRequired,
  updateEventData: PropTypes.func.isRequired,
  updateEventRuleData: PropTypes.func.isRequired,
  spaceId: PropTypes.string,
  space: PropTypes.object,
  eventData: PropTypes.object,
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  setNextStepButtonText: PropTypes.func.isRequired,
  setIsStepComplete: PropTypes.func,
  permissionEngineAPI: PropTypes.object,
  currentMonth: PropTypes.object,
  setCurrentMonth: PropTypes.func.isRequired,
  selectedDate: PropTypes.string,
  setSelectedDate: PropTypes.func.isRequired,
  selectedTime: PropTypes.string,
  setSelectedTime: PropTypes.func.isRequired,
  idDateTimeDecided: PropTypes.bool,
  setDateTimeDecided: PropTypes.func.isRequired,
  selectedTopic: PropTypes.object,
  setSelectedTopic: PropTypes.func.isRequired,
  selectedEquipment: PropTypes.object,
  setSelectedEquipment: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string,
};
