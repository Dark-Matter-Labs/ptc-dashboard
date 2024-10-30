import { useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
const Step7 = ({ setNavTitle }) => {
  const { t } = useTranslation();

  useEffect(() => {
    setNavTitle(t("create-event.proposal-final-review"));
  });

  return (
    <div className="p-4 space-y-4 text-left">
      {/* Final Review*/}
      <div>
        <div
          id="risk-assessment"
          className="text-2xl block mb-2 font-semibold "
        >
          Proposal final review
        </div>

        <p className="mb-4">Final review</p>
      </div>

      <hr className="my-6"></hr>
    </div>
  );
};

export default Step7;

Step7.propTypes = {
  setNavTitle: PropTypes.func.isRequired, // Required
};
