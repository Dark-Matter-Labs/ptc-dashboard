import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import VotingSummaryPage from "./VotingSummaryPage";
import { ClockIcon } from "@heroicons/react/solid";

export const DecisionSummary = ({
  permissionResponseAPI,
  t,
  requestId,
  proceedToStep,
  voteHistory,
  eventData,
  daysLeft,
  voters,
}) => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]); // State to store API responses
  const [myLastDecision, setMyLastDecision] = useState(""); // State to store
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
    console.log("voteHistory: ", voteHistory);
    console.log(
      "last decision: ",
      voteHistory[voteHistory.length - 1].decision
    );
    setMyLastDecision(voteHistory[voteHistory.length - 1].decision);
    loadAllResponses();
  }, []);
  return (
    <div className="h-screen">
      <div className="p-4 space-y-4 text-left bg-[#F9F3F3] flex flex-col justify-between h-full gap-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-6 w-6 text-[#57515C]" />
            {daysLeft !== null && <span>{daysLeft} days left</span>}
          </div>

          {voters.length >= 0 && (
            <div className="flex items-center -space-x-2">
              {/* Voter Images */}
              {voters.map((voter) => (
                <div key={voter.id} className="relative">
                  <img
                    src={voter.image}
                    alt={`User ${voter.id}`}
                    className="h-10 w-10 rounded-full border-2 border-white"
                  />
                </div>
              ))}

              {/* Vote Count */}
              <div className="z-10 flex items-center justify-center bg-[#F9F3F3] text-black h-10 rounded-full border-2 border-[#F9F3F3] text-xs font-semibold px-4">
                {voters.length} voted
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="text-2xl block font-semibold mt-4">
            {eventData.name}
          </div>
          <div className="text-base text-gray-500 mt-4">
            {eventData.details}
          </div>{" "}
          <div className="mt-12">
            <VotingSummaryPage
              className=" mt-8"
              data={responses}
              myLastDecision={myLastDecision}
            />
          </div>
        </div>

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
  daysLeft: PropTypes.number,
  voters: PropTypes.arrayOf(PropTypes.object),
};
