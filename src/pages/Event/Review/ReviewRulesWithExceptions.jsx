import PropTypes from "prop-types";
import DisplayRulesWithExceptions from "../../Rule/DisplayRulesWithExceptions";
import BottomDrawerReview from "../../../components/Common/BottomDrawerReview";
import { useState, useEffect } from "react";
const ReviewRulesWithExceptions = ({
  t,
  rule,
  permissionEngineAPI,
  proceedToStep,
}) => {
  console.log("rule with exeptions: ", rule);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [decision, setDecision] = useState(""); //agree, disagree, abstention
  const handleButtonClicked = (decision) => {
    if (decision === "agree") setDecision("agree");
    if (decision === "disagree") setDecision("disagree");
    if (decision === "abstention") setDecision("abstention");
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    console.log(isDrawerOpen);
  }, [isDrawerOpen]);
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
          className="mt-4 px-6 py-2 bg-[#EFF9F5] text-[#35AD66] border border-1  border-[#35AD66] hover:bg-[#35AD66] hover:text-white rounded-full w-full"
          onClick={() => handleButtonClicked("agree")}
        >
          {t("review-event.review-agree")}
        </button>
        <button
          className="mt-4 px-6 py-2 bg-[#FFF6F3] text-[#F47051] border border-1  border-[#F47051] hover:bg-[#F47051] hover:text-white rounded-full w-full"
          onClick={() => handleButtonClicked("disagree")}
        >
          {t("review-event.review-disagree")}
        </button>
        <button
          className="mt-4 px-6 py-2 bg-[#F5F5F7] text-[#92929D] border border-1  border-[#92929D] hover:bg-[#92929D] hover:text-white rounded-full w-full"
          onClick={() => handleButtonClicked("abstention")}
        >
          {t("review-event.review-abstention")}
        </button>
        {isDrawerOpen ? (
          <BottomDrawerReview
            setIsDrawerOpen={setIsDrawerOpen}
            decision={decision}
          />
        ) : (
          ""
        )}
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
