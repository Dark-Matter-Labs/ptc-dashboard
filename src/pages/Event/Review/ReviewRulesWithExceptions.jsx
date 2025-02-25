import PropTypes from "prop-types";
import { CheckCircleIcon } from "@heroicons/react/solid";
import DisplayRulesWithExceptions from "../../Rule/DisplayRulesWithExceptions";
import BottomDrawerReview from "../../../components/Common/BottomDrawerReview";
import { useState, useEffect } from "react";

const ReviewRulesWithExceptions = ({
  t,
  rule,
  permissionResponseAPI,
  proceedToStep,
  responseId,
  requestId,
  daysLeft,
  voters,
  userId,
}) => {
  console.log("rule with exeptions: ", rule);
  const [responses, setResponses] = useState([]); // State to store API responses
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [decision, setDecision] = useState(""); //agree, disagree, abstention
  const [excitements, setExcitements] = useState("");
  const [worries, setWorries] = useState("");
  const [voteHistory, setVoteHistory] = useState([]);
  const handleResponseSubmittion = async () => {
    try {
      let response = null;

      switch (decision) {
        case "agree":
          response = await permissionResponseAPI.approve(responseId, {
            excitements: excitements.trim(),
            worries: worries.trim(),
          });
          break;
        case "disagree":
          response = await permissionResponseAPI.reject(responseId, {
            excitements: excitements.trim(),
            worries: worries.trim(),
          });
          break;
        case "abstention":
          response = await permissionResponseAPI.abstention(responseId, {
            excitements: excitements.trim(),
            worries: worries.trim(),
          });
          break;
        default:
          break;
      }

      console.log("permission response posted, response,", response);
    } catch (error) {
      console.error("Error posting permission response:", error);
    }
  };
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

  const handleSubmitButtonClicked = (e) => {
    e.preventDefault();

    // todo: post permissionresponse here
    console.log("let's proceed with the responseId,", responseId);
    handleResponseSubmittion();
    alert("Your vote has been submited.");

    proceedToStep(4);
  };
  const loadAllResponses = async () => {
    if (requestId) {
      await permissionResponseAPI
        .findAll({
          permissionRequestId: requestId,
        })
        .then((res) => {
          console.log("All response data:", res.data);

          setResponses(res.data);
        })

        .catch((error) => {
          console.error("Error fetching response: ", error);
        });
    }
  };
  const loadVoteHistory = async () => {
    console.log("Loading Vothisory, need user id: ", userId);
    // fetch my id
    // for each response, filter if user.id === userId
    const myResponse = responses.find((response) => {
      if (response.user.id === userId) return response.voteHistory;
    });

    console.log("extracted my vote history: ", myResponse.voteHistory);
    // assign response.votHistory to voteHistory using setVoteHistory
    setVoteHistory(myResponse.voteHistory || []);
  };
  useEffect(() => {
    console.log("voteHistory: ", voteHistory);
    loadVoteHistory();
  }, [responses]);
  useEffect(() => {
    loadAllResponses();
  }, []);

  return (
    <div className="flex flex-col justify-start p-4 space-y-2 text-left h-[90vh]">
      <div className="flex-grow">
        <div className="text-2xl block mb-2 font-semibold mt-8">
          {t("review-event.review-the-exceptions")}
        </div>

        <DisplayRulesWithExceptions
          rule={rule}
          proceedToStep={proceedToStep}
        ></DisplayRulesWithExceptions>
      </div>
      <div className="py-8">
        <button
          disabled={voteHistory.length >= 2}
          className={`mt-4 px-6 py-2 rounded-full w-full border border-1 ${
            voteHistory.length >= 2
              ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed" // Disabled styles
              : decision === "agree" && excitements && worries
                ? "bg-[#35AD66] text-white"
                : "bg-[#EFF9F5] text-[#35AD66] border-[#35AD66] hover:bg-[#35AD66] hover:text-white"
          }`}
          onClick={() => handleButtonClicked("agree")}
        >
          {t("review-event.review-agree")}
          {decision === "agree" && excitements && worries ? (
            <CheckCircleIcon className="ml-2 h-6 w-6 inline text-white" />
          ) : (
            ""
          )}
        </button>
        <button
          disabled={voteHistory.length >= 2}
          className={`mt-4 px-6 py-2 rounded-full w-full border border-1 ${
            voteHistory.length >= 2
              ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed" // Disabled styles
              : decision === "disagree" && excitements && worries
                ? "bg-[#F47051] text-white border-[#F47051]"
                : "bg-[#FFF6F3] text-[#F47051] border-[#F47051] hover:bg-[#F47051] hover:text-white"
          }`}
          onClick={() => handleButtonClicked("disagree")}
        >
          {t("review-event.review-disagree")}
          {decision === "disagree" && excitements && worries && (
            <CheckCircleIcon className="ml-2 h-6 w-6 inline text-white" />
          )}
        </button>

        <button
          disabled={voteHistory.length >= 2}
          className={`mt-4 px-6 py-2 rounded-full w-full border border-1 ${
            voteHistory.length >= 2
              ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed" // Disabled styles
              : decision === "abstention" && excitements && worries
                ? "bg-[#92929D] text-white border-[#92929D]"
                : "bg-[#F5F5F7] text-[#92929D] border-[#92929D] hover:bg-[#92929D] hover:text-white"
          }`}
          onClick={() => handleButtonClicked("abstention")}
        >
          {t("review-event.review-abstention")}
          {decision === "abstention" && excitements && worries && (
            <CheckCircleIcon className="ml-2 h-6 w-6 inline text-white" />
          )}
        </button>
        <div className="my-4"></div>
        <button
          onClick={() => proceedToStep(2)}
          className="mt-4 px-6 py-2 border text-black rounded-lg w-full"
        >
          Back
        </button>
        {decision && excitements && worries && (
          <>
            <button
              className="mt-4 px-6 py-2 bg-[#2F103A] text-white rounded-lg w-full"
              onClick={(e) => handleSubmitButtonClicked(e)}
            >
              {t("review-event.submit")}
            </button>
            {voteHistory.length == 1 && (
              <p>You had voted once. This is your final decision. </p>
            )}
          </>
        )}
        {voteHistory.length >= 2 && (
          <button
            className="mt-4 px-6 py-2 bg-[#2F103A] text-white rounded-lg w-full"
            onClick={() => proceedToStep(4)}
          >
            Go to decision summary
          </button>
        )}
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
            daysLeft={daysLeft}
            voters={voters}
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
  permissionResponseAPI: PropTypes.object,
  proceedToStep: PropTypes.func,
  voteHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
  setVoteHistory: PropTypes.func,
  spaceEventId: PropTypes.string,
  responseId: PropTypes.string,
  requestId: PropTypes.string,
  daysLeft: PropTypes.number,
  voters: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.string,
};
