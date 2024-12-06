import PropTypes from "prop-types";
import DisplayAllRules from "../../Rule/DisplayAllRules";
const ReviewAllRules = ({
  t,
  rule,

  permissionEngineAPI,
  proceedToStep,
}) => {
  console.log("rule: ", rule);
  //   console.log("rule author: ", ruleAuthor);
  console.log("permissionEngineAPI: ", permissionEngineAPI);
  //   console.log("currentLanguage: ", currentLanguage);

  return (
    <div className="p-4 space-y-4 text-left">
      <div className="text-2xl block mb-2 font-semibold mt-8">
        {t("review-event.review-the-rules")}
      </div>
      <DisplayAllRules
        rule={rule}
        // ruleAuthor={ruleAuthor}
        // currentLanguage={currentLanguage}
        permissionEngineAPI={permissionEngineAPI}
        proceedToStep={proceedToStep}
      ></DisplayAllRules>
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
