import PropTypes from "prop-types";
import { useState } from "react";
const mockupdata = [
  {
    id: "1f3b3fa2-47d3-4234-929f-dd3e17f79fa1",
    status: "pending",
    excitements: null,
    worries: null,
  },
  {
    id: "2f3b3fa2-47d3-4234-929f-dd3e17f79fa1",
    status: "pending",
    excitements: null,
    worries: null,
  },
  {
    id: "3f3b3fa2-47d3-4234-929f-dd3e17f79fa1",
    status: "approved",
    user: {
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocI_tzuQLoB6IUa5hx2xCYzkHIziXU1lP_6xCUF69VHapdItWQ=s96-c",
    },
    excitements: ["I love risotto, can't wait to try new recipes!"],
    worries: ["Hope the ingredients provided are high quality."],
  },
  {
    id: "4f3b3fa2-47d3-4234-929f-dd3e17f79fa1",
    status: "rejected",
    user: {
      image: "https://ca.slack-edge.com/T0ACH7MPH-U07GRAN3HU6-a4cfea2b4a9c-512",
    },
    excitements: ["Sounds interesting, but..."],
    worries: ["Not everyone likes risotto."],
  },
  {
    id: "5f3b3fa2-47d3-4234-929f-dd3e17f79fa1",
    status: "abstention",
    user: {
      image: "https://ca.slack-edge.com/T0ACH7MPH-U019L3XRPN3-dade83ee8705-512",
    },
    excitements: ["Could be fun, but unsure."],
    worries: ["Not sure if the workshop is worth my time."],
  },
  {
    id: "6f3b3fa2-47d3-4234-929f-dd3e17f79fa1",
    status: "abstention",
    user: {
      image: "https://ca.slack-edge.com/T0ACH7MPH-U01AQMUSMJL-66d2ddb3fd76-512",
    },
    excitements: ["Learning to cook risotto might be useful."],
    worries: ["I’m not very interested in cooking."],
  },
];

export const VotingSummaryPage = ({ data }) => {
  data = mockupdata;
  // Count the number of each vote type based on status
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Filtered data based on status
  const agreeVotes = data.filter((vote) => vote.status === "approved");
  const disagreeVotes = data.filter((vote) => vote.status === "rejected");
  const abstainVotes = data.filter((vote) => vote.status === "abstention");

  // Count the number of each vote type based on status
  const agreeCount = agreeVotes.length;
  const disagreeCount = disagreeVotes.length;
  const abstentionCount = abstainVotes.length;
  //   const pendingCount = data.filter((vote) => vote.status === "pending").length;

  // Total votes for calculating percentages
  const totalVotes = agreeCount + disagreeCount + abstentionCount;
  const totalMembers = data.length; // equals to agreeCount + disagreeCount + abstentionCount + pendingCount

  // Members who participated
  const membersParticipated = totalVotes;
  const participationPercentage = (
    (membersParticipated / totalMembers) *
    100
  ).toFixed(2);

  // Agreement needed for approval (50%)
  const agreementNeededPercentage = 50;

  // Votes needed for approval (50% of the total votes cast, rounded up)
  const votesNeededForApproval = Math.ceil(totalMembers * 0.5);

  // Calculate the width percentage for each bar
  const getPercentage = (count) => {
    return totalVotes === 0 ? 0 : (count / totalVotes) * 100;
  };

  // Toggle detailed view
  const handleCategoryClick = (category) => {
    let categoryVotes = {
      agree: agreeVotes,
      disagree: disagreeVotes,
      abstain: abstainVotes,
    }[category];

    setSelectedCategory((prev) => (prev === category ? null : category));
    setSelectedUser(categoryVotes.length > 0 ? categoryVotes[0] : null);
  };

  const handleUserClick = (user) => {
    setSelectedUser((prev) => (prev === user ? null : user));
  };

  // Map category to corresponding data
  const categoryDataMap = {
    agree: agreeVotes,
    disagree: disagreeVotes,
    abstain: abstainVotes,
  };

  // Determine the border color based on the category
  const getBorderColor = (category) => {
    switch (category) {
      case "agree":
        return "border-[#35AD66]"; // Green for agree
      case "disagree":
        return "border-[#FFC4B6]"; // Red for disagree
      case "abstain":
        return "border-[#D5CFCF]"; // Gray for abstain
      default:
        return "border-transparent";
    }
  };
  return (
    <div>
      {["agree", "disagree", "abstain"].map((category) => {
        const count = {
          agree: agreeCount,
          disagree: disagreeCount,
          abstain: abstentionCount,
        }[category];
        const bgColor = {
          agree: "bg-[#35AD66]",
          disagree: "bg-[#FFC4B6]",
          abstain: "bg-[#D5CFCF]",
        }[category];
        const BarBgColor = {
          agree: "bg-[#C9EDD7]",
          disagree: "bg-[#FFE4DD]",
          abstain: "bg-[#EDE7E7]",
        }[category];
        const PanelBgColor = {
          agree: "bg-[#EFF9F5]",
          disagree: "bg-[#FFF6F3]",
          abstain: "bg-[#F5F5F7]",
        }[category];
        const label = {
          agree: "Agree",
          disagree: "Disagree",
          abstain: "Abstention",
        }[category];

        return (
          <div key={category} className="mb-4">
            <div
              className={`w-full ${BarBgColor} rounded-full h-12 flex items-center justify-between cursor-pointer`}
              onClick={() => handleCategoryClick(category)}
            >
              <div
                className={`${bgColor} h-12 rounded-full text-black flex items-center font-semibold pl-4`}
                style={{ width: `${getPercentage(count)}%` }}
              >
                {label}
              </div>
              <div className="pr-4">{count} votes</div>
            </div>

            {selectedCategory === category && (
              <div className={`mt-4 p-4 border rounded-md ${PanelBgColor}`}>
                <div className="flex gap-4">
                  {categoryDataMap[category].map((vote) => (
                    <div key={vote.id} className="relative">
                      <img
                        src={vote.user?.image}
                        alt="User"
                        className={`w-16 h-16 rounded-full cursor-pointer  ${
                          selectedUser === vote
                            ? `${getBorderColor(category)} border-4`
                            : "border-transparent"
                        }`}
                        onClick={() => handleUserClick(vote)}
                      />
                    </div>
                  ))}
                </div>

                {selectedUser && (
                  <div className="mt-4 rounded-md">
                    <div className="border bg-white p-2 rounded-md">
                      <strong>Excitements</strong>
                      <div className="list-disc">
                        {selectedUser.excitements.map((item, index) => (
                          <div key={index}>{item}</div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 border bg-white p-2 rounded-md">
                      <strong>Worries</strong>
                      <div className="list-disc">
                        {selectedUser.worries.map((item, index) => (
                          <div key={index}>{item}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
      <div className="mt-8 mb-4">
        <div className="w-full rounded-xl border-2 p-4">
          <div className="flex justify-between">
            <div>Members participated</div>
            <div>{participationPercentage}%</div>
          </div>
          <div className="flex justify-between">
            <div>Agreement needed for approval</div>
            <div>{agreementNeededPercentage}%</div>
          </div>
          <div className="flex justify-between">
            <div>Votes needed for approval</div>
            <div>{votesNeededForApproval} votes</div>
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
