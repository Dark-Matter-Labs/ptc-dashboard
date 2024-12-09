import PropTypes from "prop-types";
import DisplayRulesWithExceptions from "../../Rule/DisplayRulesWithExceptions";
const ReviewRulesWithExceptions = ({
  t,
  rule,
  permissionEngineAPI,
  proceedToStep,
}) => {
  console.log("rule with exeptions: ", rule);

  return (
    <div className="p-4 space-y-4 text-left">
      <div className="text-2xl block mb-2 font-semibold mt-8">
        {t("review-event.review-the-exceptions")}
      </div>
      <DisplayRulesWithExceptions
        rule={rule}
        permissionEngineAPI={permissionEngineAPI}
        proceedToStep={proceedToStep}
      ></DisplayRulesWithExceptions>
      <div className="py-4">
        <button
          onClick={() => proceedToStep(2)}
          className="mt-4 px-6 py-2 border text-black rounded-lg w-full"
        >
          Back
        </button>
        <button
          className="mt-4 px-6 py-2 bg-[#2F103A] text-white rounded-lg w-full"
          onClick={() => proceedToStep(4)}
        >
          {t("review-event.review-agree")}
        </button>
        <button
          className="mt-4 px-6 py-2 bg-[#2F103A] text-white rounded-lg w-full"
          onClick={() => proceedToStep(4)}
        >
          {t("review-event.review-disagree")}
        </button>
        <button
          className="mt-4 px-6 py-2 bg-[#2F103A] text-white rounded-lg w-full"
          onClick={() => proceedToStep(4)}
        >
          {t("review-event.review-abstention")}
        </button>
      </div>
    </div>
  );
};

export default ReviewRulesWithExceptions;

ReviewRulesWithExceptions.propTypes = {
  t: PropTypes.func,
  rule: PropTypes.object,
  permissionEngineAPI: PropTypes.object,
  proceedToStep: PropTypes.func,
};
