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
  eventData,
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
    <div className="h-screen">
      <div className="p-4 space-y-4 text-left bg-[#F9F3F3] flex flex-col justify-between h-full gap-10">
        <div>
          <div className="text-2xl block font-semibold mt-4">
            {eventData.name}
          </div>
          <div className="text-base text-gray-500 mt-4">
            {eventData.details}
          </div>{" "}
          <div className="mt-12">
            <VotingSummaryPage className=" mt-8" data={responses} />
          </div>
        </div>
        {/* Voting Summary */}

        {/* Buttons */}
        <div className="my-4">
          <button
            onClick={() => navigate("/community")}
            className="mt-4 px-6 py-2 border border-1 border-gray-400 text-black rounded-lg w-full"
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
    </div>
  );
};

DecisionSummary.propTypes = {
  t: PropTypes.func.isRequired,
  permissionResponseAPI: PropTypes.object.isRequired,
  proceedToStep: PropTypes.func.isRequired,
  voteHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
  requestId: PropTypes.string,
  eventData: PropTypes.object.isRequired,
};
