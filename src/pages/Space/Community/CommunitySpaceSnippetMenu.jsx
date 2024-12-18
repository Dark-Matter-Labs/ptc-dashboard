import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import GroupFillIcon from "../../../assets/image/group-fill.svg";
import BlankFillIcon from "../../../assets/image/blank-fill.svg";
import LeaveIcon from "../../../assets/image/leave.svg";

export default function CommunitySpaceSnippetMenu() {
  const { t } = useTranslation();

  const handleMembersClick = () => {
    alert("TBD");
  };
  const handleCommunityPolicyClick = () => {
    alert("TBD");
  };

  const handleLeaveClick = () => {
    alert("TBD");
  };

  return (
    <div className="absolute mt-2 right-6 w-[201px] h-auto px-4 py-3 bg-white rounded-xl border border-[#3b3a43]/10 justify-start items-start gap-1 inline-flex flex-col">
      <div className="flex-row justify-center items-center gap-1 inline-flex">
        <div className="px-2 py-1 rounded-[7px] justify-start items-start gap-3 inline-flex">
          <img className="w-6 h-6" src={GroupFillIcon} />
        </div>
        <div
          onClick={handleMembersClick}
          className="w-full text-[#2f103a] text-sm font-normal font-['Inter']"
        >
          {t("space-community.members")}
        </div>
      </div>
      <div className="flex-row justify-center items-center gap-1 inline-flex">
        <div className="px-2 py-1 rounded-[7px] justify-start items-start gap-3 inline-flex">
          <img className="w-5 h-5" src={BlankFillIcon} />
        </div>
        <div
          onClick={handleCommunityPolicyClick}
          className="w-full text-[#2f103a] text-sm font-normal font-['Inter']"
        >
          {t("space-community.community-policy")}
        </div>
      </div>
      <div className="flex-row justify-center items-center gap-1 inline-flex">
        <div className="px-2 py-1 rounded-[7px] justify-start items-start gap-3 inline-flex">
          <img className="w-4 h-4" src={LeaveIcon} />
        </div>
        <div
          onClick={handleLeaveClick}
          className="w-full text-[#2f103a] text-sm font-normal font-['Inter']"
        >
          {t("space-community.leave-the-community")}
        </div>
      </div>
    </div>
  );
}

CommunitySpaceSnippetMenu.propTypes = {
  space: PropTypes.object,
  currentLanguage: PropTypes.string,
};
