import PropTypes from "prop-types";
import { CheckCircleIcon } from "@heroicons/react/solid";
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
  const [excitements, setExcitements] = useState("");
  const [worries, setWorries] = useState("");
  const handleButtonClicked = (d) => {
    //reset excitements and worries when another button is clicked
    if (decision != "" && d !== decision) {
      setExcitements("");
      setWorries("");
    }
    //set decision accordingly to button clicked
    if (d === "agree") {
      setDecision("agree");
    }
    if (d === "disagree") {
      setDecision("disagree");
    }
    if (d === "abstention") {
      setDecision("abstention");
    }

    setIsDrawerOpen(true);
  };

  useEffect(() => {
    console.log(isDrawerOpen);
  }, [isDrawerOpen]);
  return (
    <div className="flex flex-col justify-start p-4 space-y-2 text-left h-[90vh]">
      <div className="flex-grow">
        <div className="text-2xl block mb-2 font-semibold mt-8">
          {t("review-event.review-the-exceptions")}
          <p>decision: {decision}</p>
          <p>excitements: {excitements}</p>
          <p>worries: {worries}</p>
        </div>
        <DisplayRulesWithExceptions
          rule={rule}
          permissionEngineAPI={permissionEngineAPI}
          proceedToStep={proceedToStep}
        ></DisplayRulesWithExceptions>
      </div>
      <div className="py-8">
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
          {decision === "agree" && excitements && worries ? (
            <CheckCircleIcon className="ml-2 h-6 w-6 inline" />
          ) : (
            ""
          )}
        </button>
        <button
          className="mt-4 px-6 py-2 bg-[#FFF6F3] text-[#F47051] border border-1  border-[#F47051] hover:bg-[#F47051] hover:text-white rounded-full w-full"
          onClick={() => handleButtonClicked("disagree")}
        >
          {t("review-event.review-disagree")}
          {decision === "disagree" && excitements && worries ? (
            <CheckCircleIcon className="ml-2 h-6 w-6 inline" />
          ) : (
            ""
          )}
        </button>
        <button
          className="mt-4 px-6 py-2 bg-[#F5F5F7] text-[#92929D] border border-1  border-[#92929D] hover:bg-[#92929D] hover:text-white rounded-full w-full"
          onClick={() => handleButtonClicked("abstention")}
        >
          {t("review-event.review-abstention")}
          {decision === "abstention" && excitements && worries ? (
            <CheckCircleIcon className="ml-2 h-6 w-6 inline" />
          ) : (
            ""
          )}
        </button>
        {isDrawerOpen ? (
          <BottomDrawerReview
            setIsDrawerOpen={setIsDrawerOpen}
            decision={decision}
            proceedToStep={proceedToStep}
            excitements={excitements}
            worries={worries}
            setDecision={setDecision}
            setWorries={setWorries}
            setExcitements={setExcitements}
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
