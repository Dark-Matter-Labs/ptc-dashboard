import { useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
const Step7 = ({ setNavTitle }) => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submission step 7.");
  };
  useEffect(() => {
    setNavTitle(t("create-event.proposal-final-review"));
  });

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 space-y-4 text-left">
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
      </form>
    </div>
  );
};

export default Step7;

Step7.propTypes = {
  setNavTitle: PropTypes.func.isRequired, // Required
};
