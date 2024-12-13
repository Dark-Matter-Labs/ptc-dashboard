import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import VotingSummaryPage from "./VotingSummaryPage";

export const DecisionSummary = ({
  permissionResponseAPI,
  t,
  requestId,
  proceedToStep,
  voteHistory,
}) => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]); // State to store API responses

  const loadAllResponses = async () => {
    if (requestId) {
      await permissionResponseAPI
        .findAll({
          permissionRequestId: requestId,
        })
        .then((res) => {
          console.log("All response data: ", res.data);
          setResponses(res.data);
        })

        .catch((error) => {
          console.error("Error fetching response: ", error);
        });
    }
  };
  useEffect(() => {
    console.log("requestId: ", requestId);

    loadAllResponses();
  }, []);
  return (
    <div className="p-4 space-y-4 text-left">
      <div className="text-2xl block mb-2 font-semibold mt-8">
        Decision Summary
      </div>
      {/* Voting Summary */}
      <VotingSummaryPage data={responses} />
      {/* Buttons */}
      <div className="py-4">
        <button
          onClick={() => navigate("/community")}
          className="mt-4 px-6 py-2 border text-black rounded-lg w-full"
        >
          Community dashboard
        </button>
        <button
          disabled={voteHistory.length === 2}
          className={`mt-4 px-6 py-2  rounded-lg w-full  ${
            voteHistory.length === 2
              ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
              : "bg-[#2F103A] text-white"
          }`}
          onClick={() => proceedToStep(3)}
        >
          {t("review-event.change-my-decision")}
        </button>
      </div>
    </div>
  );
};

DecisionSummary.propTypes = {
  t: PropTypes.func.isRequired,
  permissionResponseAPI: PropTypes.object.isRequired,
  proceedToStep: PropTypes.func.isRequired,
  voteHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
  requestId: PropTypes.string,
};
