import { useEffect } from "react";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { OrganiserNameEmail } from "../../../components/Form/OrganiserNameEmail";
import { SpaceEventAccess } from "../../../components/Form/RuleBlocks/SpaceEventAccess";
import { SpaceEventExpectedAttendeeCount } from "../../../components/Form/RuleBlocks/SpaceEventExpectedAttendeeCount";

const Step2 = ({ setNavTitle, updateEventData }) => {
  const { t } = useTranslation();

  useEffect(() => {
    setNavTitle(t("create-event.navigation-title"));
  }, []);

  return (
    <div className="p-4 text-left">
      {/* Organizer name and email */}
      <OrganiserNameEmail />

      {/*  Expected attendees */}
      <SpaceEventExpectedAttendeeCount updateEventData={updateEventData} />

      {/*  Space access  */}
      <SpaceEventAccess />
    </div>
  );
};

export default Step2;

Step2.propTypes = {
  setNavTitle: PropTypes.func.isRequired,
  updateEventData: PropTypes.func.isRequired,
};
