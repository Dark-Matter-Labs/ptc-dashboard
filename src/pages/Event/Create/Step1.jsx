import { useEffect, useState } from "react";
import { Textarea } from "@headlessui/react";
import DateTimePicker from "../../../components/Form/DateTimePicker";
import { EventThemeSelector } from "../../../components/Form/EventThemeSelector";
import { ExcludedThemeDisplay } from "../../../components/Form/ExcludedThemeDisplay";
import { OrganiserNameEmail } from "../../../components/Form/OrganiserNameEmail";
import { SpaceEventAccess } from "../../../components/Form/RuleBlocks/SpaceEventAccess";
import { SetupRequirements } from "../../../components/Form/SetupRequirements";
import { SpaceEventExpectedAttendeeCount } from "../../../components/Form/RuleBlocks/SpaceEventExpectedAttendeeCount";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Step1 = ({ setNavTitle, updateEventData, spaceId }) => {
  const { t } = useTranslation();
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setNavTitle(t("create-event.navigation-title"));
  });
  useEffect(() => {
    //update event data when title is defined or updated
    updateEventData({
      name: eventTitle,
    });
  }, [eventTitle]);

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
        ></input>
        <hr className="my-6" />
      </div>
      {/* Event theme */}
      <EventThemeSelector />
      {/* Excluded theme */}
      <ExcludedThemeDisplay />
      {/* Date  and time picker */}
      <DateTimePicker updateEventData={updateEventData} spaceId={spaceId} />
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
      {/*  Expected attendees */}
      <SpaceEventExpectedAttendeeCount updateEventData={updateEventData} />
      {/*  Space access  */}
      <SpaceEventAccess />
      {/* SetupRequirements - noise level, equipments */}
      <SetupRequirements spaceId={spaceId} updateEventData={updateEventData} />
    </div>
  );
};

export default Step1;

Step1.propTypes = {
  setNavTitle: PropTypes.func.isRequired,
  updateEventData: PropTypes.func.isRequired,
  spaceId: PropTypes.string,
};
