import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../../../assets/css/SpaceJoinCommunity.css";
import { useTranslation } from "react-i18next";
import {
  PlusIcon,
  MinusIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { SingleSlider } from "../../../components/Common/SingleSlider";
import { ApiClient, SpaceAPI, RuleAPI, Type } from "@dark-matter-labs/ptc-sdk";
import BottomDrawerSpaceJoinCommunity from "../../../components/Common/BottomDrawerSpaceJoinCommunity";
import { navigateTo, navigateToBack } from "../../../lib/util";
import MarkdownRenderer from "../../../components/Common/MarkdownRenderer";

const SpaceJoinCommunity = ({ setNavTitle }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const apiClient = ApiClient.getInstance();
  const spaceAPI = new SpaceAPI(apiClient);
  const ruleAPI = new RuleAPI(apiClient);

  const { spaceId } = useParams();
  const [space, setSpace] = useState(null);
  const [expandedCards, setExpandedCards] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  }); //{0: true, 2: false}
  const [isJoinCommunityDrawerOpen, setIsJoinCommunityDrawerOpen] =
    useState(false);
  const [agreements, setAgreements] = useState({});
  const [joinCommunityRuleBlocks, setJoinCommunityRuleBlocks] = useState([]);

  const loadSpace = async () => {
    try {
      if (!spaceId) {
        throw new Error("There is no spaceId");
      }
      const space = await spaceAPI.findOneById(spaceId);
      console.log("the space: ", space);

      setSpace(space);
    } catch (error) {
      console.error(`Error fetching space`, error);
      navigateToBack(navigate);
    }
  };

  const loadSpaceRule = async () => {
    try {
      if (!spaceId) {
        navigateToBack(navigate);
      }
      const spaceRule = await ruleAPI.findOneBySpaceId(spaceId);
      console.log("the spaceRule: ", spaceRule);

      setJoinCommunityRuleBlocks(
        spaceRule?.ruleBlocks
          ?.filter(
            (item) => item.type === Type.RuleBlockType.spaceJoinCommunity
          )
          ?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) ?? []
      );
    } catch (error) {
      console.error(`Error fetching space rule`, error);
    }
  };

  const toggleExpand = (e, id) => {
    e.preventDefault();

    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggle = (id, isAgree) => {
    console.log(id, isAgree);
    setAgreements((prev) => ({
      ...prev,
      [id]: { ...prev[id], agree: isAgree },
    }));
    console.log("agreements", agreements);
  };

  const handleNextButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      Object.values(agreements).filter((item) => item.agree === true)
        ?.length === joinCommunityRuleBlocks?.length
    ) {
      setIsJoinCommunityDrawerOpen(true);
    } else {
      alert("Please agree to all rules");
    }
  };

  useEffect(() => {
    setNavTitle(t("space-join-community.navigation-title"));
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: smooth scrolling
    });
    loadSpace();
    loadSpaceRule();
  }, [setNavTitle, t]);

  return (
    <div>
      <div className="p-4 space-y-4 text-left mb-8">
        {/* View Terms */}
        <div id="view-terms" className="text-2xl block mb-2 font-semibold">
          {t("space-join-community.title")}
        </div>

        <p className="mb-4">{t("space-join-community.title-description")}</p>

        <div className="flex flex-col gap-4 text-gray-500">
          {joinCommunityRuleBlocks.map((ruleBlock, index) => (
            <div
              key={`${index}`}
              className="bg-white border border-gray-200 shadow rounded-xl p-4 round"
            >
              {/* Header with Title and Expand/Collapse Icon */}
              <button
                onClick={(e) => toggleExpand(e, index)}
                className="w-full flex flex-row justify-between place-items-start md:items-center text-gray-600 hover:text-gray-900 "
              >
                <div className="text-base sm:text-lg text-gray-900 w-full flex flex-col sm:flex-row gap-2 justify-start">
                  <div className="text-left w-full font-semibold text-lg text-gray-700 break-words break-all">
                    {ruleBlock.name}
                  </div>
                </div>

                {agreements[index]?.agree == null ? (
                  <div>
                    {expandedCards[index] ? (
                      <MinusIcon className="w-5 h-5" />
                    ) : (
                      <PlusIcon className="w-5 h-5" />
                    )}
                  </div>
                ) : agreements[index].agree ? (
                  <CheckCircleIcon className="w-7 h-7" color="#32B07D" />
                ) : (
                  <XCircleIcon className="w-7 h-7" color="#FF8577" />
                )}
              </button>
              {/* Content (only visible when expanded) */}
              {expandedCards[index] && (
                <div className="mt-2 text-[#44444F] text-sm">
                  {/* <div className="mt-2">{ruleBlock.content}</div> */}
                  <MarkdownRenderer markdownText={ruleBlock.content} />
                  <SingleSlider
                    id={`${index}`}
                    handleToggle={handleToggle}
                    agree={agreements[index]?.agree}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="p-4">
        <button
          onClick={() =>
            navigateTo({ navigate, pathname: `/space/${spaceId}` })
          }
          className="mt-4 px-6 py-2 border text-black rounded-lg w-full"
        >
          Back
        </button>
        <button
          className="mt-4 px-6 py-2 bg-[#2F103A] text-white rounded-lg w-full"
          onClick={handleNextButtonClick}
        >
          {t("space-join-community.next")}
        </button>
      </div>
      <div className="w-full h-0">
        {isJoinCommunityDrawerOpen ? (
          <BottomDrawerSpaceJoinCommunity
            space={space}
            isJoinCommunityDrawerOpen={isJoinCommunityDrawerOpen}
            setIsJoinCommunityDrawerOpen={setIsJoinCommunityDrawerOpen}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

SpaceJoinCommunity.propTypes = {
  setNavTitle: PropTypes.func.isRequired,
  space: PropTypes.object,
  currentLanguage: PropTypes.string,
};

export default SpaceJoinCommunity;
