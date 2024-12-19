import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ApiClient,
  PermissionResponseAPI,
  PermissionRequestAPI,
  SpaceEventAPI,
  UserAPI,
  Type,
} from "@dark-matter-labs/ptc-sdk";
import PropTypes from "prop-types";
import VotingSummaryPage from "../Review/VotingSummaryPage";
import { ClockIcon } from "@heroicons/react/solid";
import { calculateDaysLeft, navigateTo } from "../../../lib/util";
import { useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";

const apiClient = new ApiClient();
const permissionResponseAPI = new PermissionResponseAPI(apiClient);
const permissionRequestAPI = new PermissionRequestAPI(apiClient);
const spaceEventAPI = new SpaceEventAPI(apiClient);
const userAPI = new UserAPI(apiClient);

const DisplayEventResult = () => {
  // Extract spaceEventId from the route parameters
  const { spaceEventId } = useParams();
  const navigate = useNavigate();

  const [me, setMe] = useState(null);
  const [permissionRequest, setPermissionRequest] = useState(null);
  const [responses, setResponses] = useState([]);
  const [eventData, setEventData] = useState({});
  const [statusComment, setStatusComment] = useState("");
  const [daysLeft, setDaysLeft] = useState(null);

  // set request Id through event Id
  const loadPermissionRequest = async () => {
    await permissionRequestAPI
      .findAll({
        spaceEventId,
      })
      .then((res) => {
        if (res.total === 0) {
          throw new Error(
            `There is no permissionRequest with this spaceEventId: ${spaceEventId}`
          );
        } else {
          const fetchedPermissionRequest = res.data?.[0];
          const { status, resolveStatus } = fetchedPermissionRequest;

          setPermissionRequest(res.data?.[0]);

          console.log("resolveStatus", resolveStatus);
          if (resolveStatus) {
            let decision = null;
            switch (resolveStatus) {
              case Type.PermissionRequestResolveStatus.resolveAccepted:
                decision = "approved";
                break;
              case Type.PermissionRequestResolveStatus.resolveRejected:
                decision = "rejected";
                break;
              case Type.PermissionRequestResolveStatus.resolveCancelled:
                decision = "cancelled";
                break;
              case Type.PermissionRequestResolveStatus.resolveDropped:
                decision = "dropped";
                break;
              default:
                break;
            }

            if (["approved", "rejected"].includes(decision)) {
              setStatusComment(
                `The voting period has ended, and a decision has been made. Based on the results below, the event has been ${decision}.`
              );
            } else if (decision === "cancelled") {
              setStatusComment(
                `The permission request has been cancelled by the event organizer.`
              );
            } else if (decision === "dropped") {
              setStatusComment(
                `The voting period has ended, and a decision has been made. Based on the results below, the event has been approved.
                
                But the permission request has been dropped by the event organizer.`
              );
            }
          } else {
            if (status === Type.PermissionRequestStatus.reviewApproved) {
              setStatusComment(
                `The voting period has ended, and a decision has been made. Based on the results below, the event has been approved.`
              );
            } else if (
              status ===
              Type.PermissionRequestStatus.reviewApprovedWithCondition
            ) {
              setStatusComment(
                `The voting period has ended, and a decision has been made. Based on the results below, the event has been approved with condition.`
              );
            } else if (status === Type.PermissionRequestStatus.reviewRejected) {
              setStatusComment(
                `The voting period has ended, and a decision has been made. Based on the results below, the event has been rejected.`
              );
            } else {
              setStatusComment(
                `You can review the decisions of other reviewers on this page. If needed, you may change your vote once before the voting deadline.`
              );
            }
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching request: ", error);
      });
  };
  // load all responses through permissionRequest.id

  const loadAllResposes = async () => {
    /** @type {number|null} */
    let total = null;
    let page = 1;

    while (total === null || total > responses.length) {
      const fetchedResponses = await permissionResponseAPI
        .findAll({
          permissionRequestId: permissionRequest.id,
          page,
          limit: 20,
        })
        .then((res) => {
          console.log("All response data >> : ", res.data);
          // setResponseId(res.data?.[0].id);
          return res;
        })

        .catch((error) => {
          console.error("Error fetching response: ", error);
          return { data: [], total: 0 };
        });

      if (fetchedResponses?.data?.length > 0) {
        page++;
        total = fetchedResponses.total;
        setResponses(
          Array.from(new Set([...responses, ...fetchedResponses.data]))
        );

        if (daysLeft === null) {
          setDaysLeft(calculateDaysLeft(fetchedResponses.data[0].timeoutAt));
        }
      } else {
        break;
      }
    }
  };

  const fetchEvent = async () => {
    try {
      const spaceEvent = await spaceEventAPI.findOneById(spaceEventId);

      if (spaceEvent.organizerId === me.id) {
        setEventData(spaceEvent);
      }
    } catch (error) {
      console.error(`Failed to fetch event`, error);
    }
  };

  const fetchMe = async () => {
    const me = await userAPI.findSelf();
    setMe(me);
  };

  const handleAccept = async () => {
    try {
      await permissionRequestAPI.accept(permissionRequest.id);
      navigateTo({ navigate, pathname: `/profile/events` });
    } catch (error) {
      console.error(error);
      alert(`Failed to accept review results`);
    }
  };

  const handleDropRequest = async () => {
    try {
      await permissionRequestAPI.drop(permissionRequest.id, {
        // TODO. collect user input for drop reason
        resolveDetails: `reason:`,
      });

      navigateTo({ navigate, pathname: `/profile/events` });
    } catch (error) {
      console.error(error);
      alert(`Failed to accept review results`);
    }
  };

  useEffect(() => {
    if (spaceEventId) {
      console.log("spaceEventId:", spaceEventId);
      loadPermissionRequest(spaceEventId);

      fetchMe();
    }
  }, []);

  useEffect(() => {
    if (me) {
      fetchEvent();
    }
  }, [me]);

  useEffect(() => {
    if (permissionRequest?.id) {
      loadAllResposes();
    }
  }, [permissionRequest]);

  useEffect(() => {
    if (responses) {
      console.log("responses:", responses);
    }
  }, [responses]);

  return (
    <div className="h-[100vh] h-fit">
      <div className="p-4 text-left bg-[#e5e7eb] flex flex-col justify-between">
        <div className="flex items-center space-x-2">
          <ClockIcon className="h-6 w-6 text-[#57515C]" />
          {daysLeft !== null && <span>{daysLeft} days left</span>}
        </div>
        <div className="text-2xl block font-semibold mt-4">
          {eventData?.name}
        </div>
        <div className="text-base text-gray-500 mt-4">{statusComment}</div>

        {responses && (
          <div className="mt-12">
            <VotingSummaryPage
              className=" mt-8"
              permissionResponses={responses}
            />
          </div>
        )}
        {!permissionRequest?.resolveStatus ? (
          <div>
            <Button onClick={handleAccept}>Accept</Button>
            <Button onClick={handleDropRequest}>Drop Request</Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DisplayEventResult;

DisplayEventResult.propTypes = {
  permissionEngineAPI: PropTypes.object,
};
