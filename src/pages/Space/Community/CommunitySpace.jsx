import { LocationMarkerIcon } from "@heroicons/react/outline";
import { OfficeBuildingIcon, UserIcon } from "@heroicons/react/solid";
import { Button } from "@headlessui/react";
import "../../../assets/css/CommunitySpace.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../useUser";
import { calculateDaysLeft, navigateTo } from "../../../lib/util";
import {
  ApiClient,
  Type,
  SpacePermissionerAPI,
  PermissionRequestAPI,
  SpaceEventAPI,
  PermissionResponseAPI,
  // SpaceAPI,
} from "@dark-matter-labs/ptc-sdk";
import { navigateToBack } from "../../../lib/util";
import MenuDotsVertical from "../../../assets/image/menu-dots-vertical.svg";
import CommunitySpaceSnippetMenu from "./CommunitySpaceSnippetMenu";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { ClockIcon } from "@heroicons/react/solid";

export default function CommunitySpace({ space, spaceOwner, currentLanguage }) {
  const { t } = useTranslation();
  const { user } = useUser();
  const navigate = useNavigate();

  const apiClient = ApiClient.getInstance();
  const spacePermissionerAPI = new SpacePermissionerAPI(apiClient);
  // const spaceAPI = new SpaceAPI(apiClient);
  // const spaceHistoryAPI = new SpaceHistoryAPI(apiClient);
  const spaceEventAPI = new SpaceEventAPI(apiClient);
  const permissionRequestAPI = new PermissionRequestAPI(apiClient);
  const permissionResponseAPI = new PermissionResponseAPI(apiClient);

  const [isSnippetMenuOpen, setIsSnippetMenuOpen] = useState(false);
  const [isPendingRequestsOpen, setIsPendingRequestsOpen] = useState(false);
  // const [isPendingIssuesOpen, setIsPendingIssuesOpen] = useState(false);
  const [pendingRequestCount, setPendingRequestCount] = useState(0);
  const [permissionRequests, setPermissionRequests] = useState([]);
  // const [pendingIssueCount, setPendingIssueCount] = useState(0);
  // const [spaceIssues, setSpaceIssues] = useState([]);

  const thumbnail = space?.spaceImages?.find(
    (item) => item.type === Type.SpaceImageType.thumbnail
  )?.link;

  const cover = space?.spaceImages?.find(
    (item) => item.type === Type.SpaceImageType.cover
  )?.link;

  const topics = space?.spaceTopics?.map((item) => item.topic) ?? [];

  const handleBrowseRule = () => {
    if (user) {
      navigateTo({ navigate, pathname: `/rule/${space.ruleId}` });
    } else {
      alert("Please log in");
    }
  };

  const handleSpaceClick = () => {
    navigateTo({ navigate, pathname: `/space/${space.id}` });
  };

  const toggleSnippetMenuOpen = () => {
    setIsSnippetMenuOpen(!isSnippetMenuOpen);
  };

  const toggleIsPendingRequestsOpen = () => {
    setIsPendingRequestsOpen(!isPendingRequestsOpen);
  };

  // const toggleIsPendingIssuesOpen = () => {
  //   setIsPendingIssuesOpen(!isPendingIssuesOpen);
  // };

  const loadSelfSpacePermissioner = async () => {
    let isSpacePermissioner = false;
    await spacePermissionerAPI
      .findSelf({
        spaceId: space.id,
      })
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          isSpacePermissioner = true;
        }
      })
      .catch(console.error);

    if (isSpacePermissioner === false) {
      navigateToBack();
    }
  };

  const loadPendingRequestCount = async () => {
    await permissionRequestAPI
      .findAll({
        spaceId: space.id,
        statuses: [
          Type.PermissionRequestStatus.pending,
          Type.PermissionRequestStatus.assigned,
          Type.PermissionRequestStatus.assignFailed,
          Type.PermissionRequestStatus.queued,
        ],
      })
      .then((res) => {
        setPendingRequestCount(res.total);
      });
  };

  const loadPermissionRequests = async () => {
    const permissionRequests = await permissionRequestAPI.findAll({
      spaceId: space.id,
      statuses: [Type.PermissionRequestStatus.assigned],
      sortBy: Type.TimeSortBy.timeAsc,
    });

    const detailedData = await Promise.all(
      permissionRequests?.data?.map(async (permissionRequest) => {
        try {
          const spaceEvent = await spaceEventAPI.findOneById(
            permissionRequest.spaceEventId
          );
          const permissionResponse = await permissionResponseAPI.findAll({
            permissionRequestId: permissionRequest.id,
            page: 1,
            limit: 1,
          });
          const votedPermissionResponses = await permissionResponseAPI.findAll({
            permissionRequestId: permissionRequest.id,
            statuses: [
              Type.PermissionResponseStatus.approved,
              Type.PermissionResponseStatus.approvedWithCondition,
              Type.PermissionResponseStatus.rejected,
              Type.PermissionResponseStatus.abstention,
            ],
            page: 1,
            limit: 3,
          });
          console.log("votedPermissionResponses", votedPermissionResponses);
          const daysLeft = calculateDaysLeft(
            permissionResponse?.data?.[0]?.timeoutAt
          );

          return {
            ...permissionRequest,
            spaceEvent,
            daysLeft,
            votedPermissionResponses,
          }; // Include response.name in the permissionRequest object
        } catch (err) {
          console.error(
            `Error fetching details for permissionRequest ${permissionRequest.spaceEventId}:`,
            err
          );
          return { ...permissionRequest, spaceEvent: { name: "Unknown" } }; // Fallback value if fetching details fails
        }
      })
    );

    setPermissionRequests(detailedData);
  };

  useEffect(() => {
    if (space) {
      loadSelfSpacePermissioner();
      loadPendingRequestCount();
      loadPermissionRequests();
    }
  }, [space]);

  return (
    <section className="community-space flex flex-col gap-6 bg-[#F9F3F3]">
      <div className="community-space-data bg-[#FFFFFF]">
        <div className="community-space-image">
          {cover ? (
            <img alt="space cover" src={cover}></img>
          ) : (
            <OfficeBuildingIcon className="text-gray-200" />
          )}
        </div>
        <div className="community-space-snippet">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-4">
              {thumbnail ? (
                <img
                  className="community-space-thumbnail"
                  alt="space thumbnail"
                  src={thumbnail}
                ></img>
              ) : (
                <LocationMarkerIcon className="community-space-thumbnail text-gray-200" />
              )}
              <div className="flex flex-col">
                <h1 onClick={handleSpaceClick}>{space?.name}</h1>

                <div className="community-space-account">
                  {spaceOwner?.image ? (
                    <img
                      className="community-space-owner-thumbnail h-5 w-5 flex-none rounded-full bg-gray-50 mr-1"
                      src={spaceOwner?.image}
                    ></img>
                  ) : (
                    <UserIcon className="h-5 w-5 text-gray-800 mr-1" />
                  )}
                  {spaceOwner?.name}
                </div>
              </div>
            </div>
            <div onClick={toggleSnippetMenuOpen}>
              <div
                className={`w-10 h-10 flex justify-center items-center rounded-md ${isSnippetMenuOpen === true ? "bg-[#F9F3F3]" : ""}`}
              >
                <img src={MenuDotsVertical}></img>
              </div>
              {isSnippetMenuOpen === true ? <CommunitySpaceSnippetMenu /> : ""}
            </div>
          </div>
          <div className="community-space-desc">{space?.details}</div>
          <h3>{t("space.space-keywords")}</h3>
          {topics?.map((topic) => (
            <Button key={topic.id} className="tag" id={topic.id}>
              {topic?.translation[currentLanguage] ?? topic?.name}
            </Button>
          ))}
          <div className="community-space-call-to-action w-full h-[42px] px-[34px] py-2 rounded-[60px] border border-[#2f103a] justify-center items-center gap-1.5 inline-flex">
            <Button
              className="text-center text-[#2f103a] text-sm font-medium font-['Inter'] leading-none"
              onClick={handleBrowseRule}
            >
              {t("space-community.browse-space-rule", {
                spaceName: space?.name ?? "",
              })}
            </Button>
          </div>
        </div>
      </div>
      <div className="requests-and-issues p-6 pb-36 bg-[#FFFFFF] flex flex-col gap-6">
        <div className="requests-and-issues-title">
          <h2>{t("space-community.requests-and-issues")}</h2>
        </div>
        <div className="requests">
          <div className="pending-status">
            <div className="h-[45px] mt-4 w-full p-4 bg-[#af56ef] rounded-[10px] border border-[#e3dee9] flex-col justify-center items-start gap-1.5 inline-flex">
              <div className="h-[24.75px] w-full flex-col justify-start items-start gap-[5px] flex">
                <div className="w-full justify-start items-center gap-[35px] inline-flex">
                  <div className="h-5 w-full justify-between items-center gap-1 flex flex-row">
                    <div>
                      <span className="text-[#f9f3f3] text-sm font-semibold font-['Public Sans'] leading-tight tracking-tight">
                        Pending requests{" "}
                      </span>
                      <span className="text-white text-xs font-semibold font-['Public Sans'] leading-tight">
                        {pendingRequestCount}
                      </span>
                    </div>
                    <div>
                      {isPendingRequestsOpen === true ? (
                        <ChevronUpIcon
                          className="h-6 w-6 text-[#9889A6]"
                          onClick={toggleIsPendingRequestsOpen}
                        />
                      ) : (
                        <ChevronDownIcon
                          className="h-6 w-6 text-[#9889A6]"
                          onClick={toggleIsPendingRequestsOpen}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isPendingRequestsOpen === true && permissionRequests.length > 0
            ? permissionRequests.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    navigateTo({
                      navigate,
                      pathname: `/event/review/${item.spaceEventId}`,
                    });
                  }}
                  className="w-full mt-4 h-[82px] p-4 bg-white rounded-2xl border border-[#e3dee9] flex-col justify-center items-start gap-1.5 inline-flex overflow-hidden"
                >
                  <div className="self-stretch justify-start items-center gap-[53px] inline-flex">
                    <div className="h-5 justify-start items-center gap-1 flex">
                      <div className="text-[#2f103a] text-sm font-semibold font-['Public Sans'] leading-tight tracking-tight">
                        {item?.spaceEvent?.name ?? "Vote"}
                      </div>
                    </div>
                    {/* <div className="justify-center items-center flex">
                      <div className="w-[11px] h-[11px] relative  overflow-hidden" />
                    </div> */}
                  </div>
                  <div className="self-stretch justify-start items-end gap-2 inline-flex">
                    <div className="grow shrink basis-0 h-[18px] justify-start items-center gap-1 flex">
                      <ClockIcon className="h-4 w-4 text-[#9889a6]" />
                      <div className="text-[#9889a6] text-xs font-normal font-['Public Sans'] leading-[18px] tracking-tight">
                        {item.daysLeft !== null && (
                          <span>{item.daysLeft} days left</span>
                        )}
                      </div>
                    </div>
                    <div className="justify-center items-center flex">
                      {item.votedPermissionResponses?.data?.map(
                        (permissionResponse) => (
                          <img
                            key={permissionResponse?.user?.id}
                            className="w-6 h-6 rounded-[100px] border border-white"
                            src={permissionResponse.user.image}
                          />
                        )
                      )}

                      {Number(item.votedPermissionResponses?.total) > 3 ? (
                        <div className="w-6 h-6 p-1 bg-[#e3dee9] rounded-[100px] justify-center items-center gap-2.5 flex overflow-hidden">
                          <div className="text-[#2f103a] text-[10px] font-semibold font-['Public Sans'] tracking-tight">
                            +{item.votedPermissionResponses?.total - 3}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
        {/* <div className="issues">
          <div className="pending-status">
            <div className="h-[45px] w-full p-4 bg-[#af56ef] rounded-[10px] border border-[#e3dee9] flex-col justify-center items-start gap-1.5 inline-flex">
              <div className="h-[24.75px] w-full flex-col justify-start items-start gap-[5px] flex">
                <div className="w-full justify-start items-center gap-[35px] inline-flex">
                  <div className="h-5 w-full justify-between items-center gap-1 flex flex-row">
                    <div>
                      <span className="text-[#f9f3f3] text-sm font-semibold font-['Public Sans'] leading-tight tracking-tight">
                        Pending issues{" "}
                      </span>
                      <span className="text-white text-xs font-semibold font-['Public Sans'] leading-tight">
                        {pendingIssueCount}
                      </span>
                    </div>
                    <div>
                      {isPendingIssuesOpen === true ? (
                        <ChevronUpIcon
                          className="h-6 w-6 text-[#9889A6]"
                          onClick={toggleIsPendingIssuesOpen}
                        />
                      ) : (
                        <ChevronDownIcon
                          className="h-6 w-6 text-[#9889A6]"
                          onClick={toggleIsPendingIssuesOpen}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

CommunitySpace.propTypes = {
  space: PropTypes.object,
  spaceOwner: PropTypes.object,
  spaceRule: PropTypes.object,
  currentLanguage: PropTypes.string,
  permissionEngineAPI: PropTypes.object,
};
