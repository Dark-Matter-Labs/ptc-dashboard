import PropTypes from "prop-types";
import DisplayAllRules from "../../Rule/DisplayAllRules";
const ReviewAllRules = ({
  t,
  rule,
  proceedToStep,
}) => {
  return (
    <div className="flex flex-col justify-start p-4 space-y-2 text-left h-[90vh]">
      <div className="flex-grow">
        <div className="text-2xl block mb-2 font-semibold mt-8">
          {t("review-event.review-the-rules")}
        </div>
        <DisplayAllRules
          rule={rule}
          proceedToStep={proceedToStep}
        ></DisplayAllRules>
      </div>
      <div className="py-8">
        <button
          onClick={() => proceedToStep(1)}
          className="mt-4 px-6 py-2 border text-black rounded-lg w-full"
        >
          Back
        </button>
        <button
          className="mt-4 px-6 py-2 bg-[#2F103A] text-white rounded-lg w-full"
          onClick={() => proceedToStep(3)}
        >
          {t("review-event.next-step")}
        </button>
      </div>
    </div>
  );
};

export default ReviewAllRules;

ReviewAllRules.propTypes = {
  t: PropTypes.func,
  rule: PropTypes.object,
  //   ruleAuthor: PropTypes.object,
  permissionEngineAPI: PropTypes.object,
  proceedToStep: PropTypes.func,
  //   currentLanguage: PropTypes.string,
};
