import PropTypes from "prop-types";
export const VotingSummaryPage = ({ data }) => {
  // Count the number of each vote type based on status
  const agreeCount = data.filter((vote) => vote.status === "approved").length;
  const disagreeCount = data.filter(
    (vote) => vote.status === "rejected"
  ).length;
  const abstentionCount = data.filter(
    (vote) => vote.status === "abstention"
  ).length;

  // Total votes for calculating the percentage
  const totalVotes = agreeCount + disagreeCount + abstentionCount;

  // Calculate the width percentage for each bar
  const getPercentage = (count) => {
    return totalVotes === 0 ? 0 : (count / totalVotes) * 100;
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Voting Summary</h2>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-8">
          <div
            className="bg-green-500 h-8 rounded-full text-white text-center font-semibold"
            style={{ width: `${getPercentage(agreeCount)}%` }}
          >
            {agreeCount} Agree
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-8">
          <div
            className="bg-red-500 h-8 rounded-full text-white text-center font-semibold"
            style={{ width: `${getPercentage(disagreeCount)}%` }}
          >
            {disagreeCount} Disagree
          </div>
        </div>
      </div>

      <div>
        <div className="w-full bg-gray-200 rounded-full h-8">
          <div
            className="bg-gray-500 h-8 rounded-full text-white text-center font-semibold"
            style={{ width: `${getPercentage(abstentionCount)}%` }}
          >
            {abstentionCount} Abstention
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingSummaryPage;

VotingSummaryPage.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};
