import { useEffect, useState } from "react";
import { Textarea } from "@headlessui/react";
import DateTimePicker from "../../../components/Form/DateTimePicker";
import { EventThemeSelector } from "../../../components/Form/EventThemeSelector";
import { ExcludedThemeDisplay } from "../../../components/Form/ExcludedThemeDisplay";
import { OrganiserNameEmail } from "../../../components/Form/OrganiserNameEmail";
import { SetupRequirements } from "../../../components/Form/SetupRequirements";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import * as Type from "../../../lib/PermissionEngine/type";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import abbrTimezone from "dayjs-abbr-timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(abbrTimezone);

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
  spaceRule,
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
    setNextStepButtonText("Next");
  });

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: smooth scrolling
    });
  }, []);

  useEffect(() => {
    console.log("event data: ", eventData);
    setIsStepComplete((updatedEventData, updatedEventRuleData) => {
      return (
        eventData = updatedEventData,
        eventRuleData = updatedEventRuleData
      ) => {
        let message = "";
        let result = true;
        try {
          if (!eventData.name || eventData.name === "") {
            throw new Error(t("create-event.event-title-error"));
          }
          if (
            !eventData?.topicIds ||
            eventData?.topicIds?.length === 0 ||
            !eventRuleData.topicIds ||
            eventRuleData?.topicIds?.length === 0
          ) {
            throw new Error(t("create-event.event-theme-error"));
          }
          if (!eventData?.startsAt || !eventData?.duration) {
            throw new Error(t("create-event.event-date-error"));
          }
          if (!eventData.details || eventData.details === "") {
            throw new Error(t("create-event.event-description-error"));
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

  const parseTimeManipulation = (manupulation) => {
    const match = manupulation.match(/^(\d+)([dwMyhms]+)$/);
    const numberPart = parseInt(match[1], 10);
    const stringPart = match[2];

    return {
      numberPart,
      stringPart,
    };
  };

  useEffect(() => {
    if (spaceRule) {
      const spaceAvailabilityUnit = spaceRule?.ruleBlocks?.find(
        (item) => item.type === Type.RuleBlockType.spaceAvailabilityUnit
      );
      console.log("spaceAvailabilityUnit", spaceAvailabilityUnit);
      const spaceAvailabilityBuffer = spaceRule?.ruleBlocks?.find(
        (item) => item.type === Type.RuleBlockType.spaceAvailabilityBuffer
      );
      console.log("spaceAvailabilityBuffer", spaceAvailabilityBuffer);

      const parsedSpaceAvailabilityUnit = parseTimeManipulation(
        spaceAvailabilityUnit?.content
      );
      const parsedSpaceAvailabilityBuffer = parseTimeManipulation(
        spaceAvailabilityBuffer?.content
      );
      const time = dayjs();
      const durationAddedTime = time
        .add(
          parsedSpaceAvailabilityUnit.numberPart,
          parsedSpaceAvailabilityUnit.stringPart
        )
        .add(
          parsedSpaceAvailabilityBuffer.numberPart,
          parsedSpaceAvailabilityBuffer.stringPart
        );

      //update event data when title is defined or updated
      updateEventData({
        name: eventTitle,
        details: description,
        startsAt: eventDateTime,
        duration: durationAddedTime.diff(time, "minute") + "m",
      });
      updateEventRuleData({
        name: eventTitle,
        details: description,
      });
    }
  }, [spaceRule, eventTitle, description, eventDateTime]);

  return (
    <div className="p-4 text-left">
      {/* Enter title */}
      <div>
        <label htmlFor="title" className="block mb-2 font-semibold text-xl">
          {t("create-event.event-title")}
        </label>
        <input
          id="title"
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="w-full border rounded p-2"
          placeholder={t("create-event.event-title-placeholder")}
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
        spaceRule={spaceRule}
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
          {t("create-event.event-description")}
        </label>
        <Textarea
          id="event-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2 min-h-3"
          placeholder={t("create-event.event-description-placeholder")}
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
  spaceRule: PropTypes.object,
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
