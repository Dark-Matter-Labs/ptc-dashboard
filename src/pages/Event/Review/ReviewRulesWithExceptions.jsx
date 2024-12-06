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
