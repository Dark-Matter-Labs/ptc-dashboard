import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
export const DecisionSummary = ({ t, proceedToStep, voteHistory }) => {
  const navigate = useNavigate();
  return (
    <div className="p-4 space-y-4 text-left">
      <div className="text-2xl block mb-2 font-semibold mt-8">
        Decision Summary
      </div>
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
  proceedToStep: PropTypes.func.isRequired,
  voteHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
};
