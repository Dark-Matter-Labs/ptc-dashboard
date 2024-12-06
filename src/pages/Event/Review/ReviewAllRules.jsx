import PropTypes from "prop-types";
import RuleExceptions from "../../Rule/RuleExceptions";
// import RuleExceptions from "./RuleExceptions";
const ReviewAllRules = ({
  t,
  rule,
  ruleAuthor,
  permissionEngineAPI,
  currentLanguage,
}) => {
  console.log("rule: ", rule);
  console.log("rule author: ", ruleAuthor);
  console.log("permissionEngineAPI: ", permissionEngineAPI);
  console.log("currentLanguage: ", currentLanguage);

  return (
    <div className="p-4 space-y-4 text-left">
      <div className="text-2xl block mb-2 font-semibold mt-8">
        {t("review-event.review-the-rules")}
      </div>
      {/* <Rule
        rule={rule}
        ruleAuthor={ruleAuthor}
        permissionEngineAPI={permissionEngineAPI}
        currentLanguage={currentLanguage}
      ></Rule> */}
      <RuleExceptions
        rule={rule}
        ruleAuthor={ruleAuthor}
        currentLanguage={currentLanguage}
        permissionEngineAPI={permissionEngineAPI}
      ></RuleExceptions>
    </div>
  );
};

export default ReviewAllRules;

ReviewAllRules.propTypes = {
  t: PropTypes.func,
  rule: PropTypes.object,
  ruleAuthor: PropTypes.object,
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
};
