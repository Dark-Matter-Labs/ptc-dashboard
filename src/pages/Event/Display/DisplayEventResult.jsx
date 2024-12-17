import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ApiClient,
  PermissionResponseAPI,
  PermissionRequestAPI,
} from "@dark-matter-labs/ptc-sdk";
import PropTypes from "prop-types";
import VotingSummaryPage from "../Review/VotingSummaryPage";
const apiClient = new ApiClient();
const permissionResponseAPI = new PermissionResponseAPI(apiClient);
const permissionRequestAPI = new PermissionRequestAPI(apiClient);

const DisplayEventResult = ({ permissionEngineAPI }) => {
  // Extract spaceEventId from the route parameters
  const { spaceEventId } = useParams();
  const [me, setMe] = useState(null);
  const [requestId, setRequestId] = useState("");
  const [responses, setResponses] = useState(null);
  const [, setEvents] = useState([]);
  const [eventData, setEventData] = useState({});
  // set request Id through event Id
  const loadRequestId = async () => {
    if (spaceEventId) {
      await permissionRequestAPI
        .findAll({
          spaceEventId,
          statuses: ["assigned"],
        })
        .then((res) => {
          setRequestId(res.data?.[0].id);
        })
        .catch((error) => {
          console.error("Error fetching request: ", error);
        });
    }
  };
  // load all responses through requestId

  const loadAllResposes = async () => {
    await permissionResponseAPI
      .findAll({
        permissionRequestId: requestId,
      })
      .then((res) => {
        console.log("All response data >> : ", res.data);
        // setResponseId(res.data?.[0].id);
        setResponses(res.data);
      })

      .catch((error) => {
        console.error("Error fetching response: ", error);
      });
  };
  const fetchEvents = async () => {
    // TODO. add pagination or infinite scroll feature
    await permissionEngineAPI
      .fetchEvents({ page: 1, limit: 20, organizerId: me?.id })
      .then((data) => {
        console.log("event data: ", data);
        setEvents(data);
        // Use find to get the object with the matching id
        const thisEvent = data.find((e) => e.id === spaceEventId);

        if (!thisEvent) {
          console.warn(`No event found with id: ${spaceEventId}`);
        } else {
          console.log("This event's data >> : ", thisEvent);
        }

        setEventData(thisEvent);
      })
      .catch((error) => {
        console.error("Error fetching event info:", error);
      });
  };
  const fetchMe = async () => {
    const me = await permissionEngineAPI.fetchMe();
    setMe(me);
  };
  useEffect(() => {
    if (spaceEventId) {
      console.log("spaceEventId:", spaceEventId);
      loadRequestId(spaceEventId);

      fetchMe();
    }
  }, []);
  useEffect(() => {
    if (me) {
      fetchEvents();
    }
  }, [me]);

  useEffect(() => {
    if (requestId) {
      loadAllResposes();
    }
  }, [requestId]);
  useEffect(() => {
    if (responses) {
      console.log("responses:", responses);
    }
  }, [responses]);

  return (
    <div className="h-[100vh] h-fit">
      <div className="p-4 text-left bg-[#e5e7eb] flex flex-col justify-between">
        <div className="text-2xl block font-semibold mt-4">
          {eventData?.name}
        </div>
        <div className="text-base text-gray-500 mt-4">
          The voting period has ended, and a decision has been made.
        </div>

        {responses && (
          <div className="mt-12">
            <VotingSummaryPage className=" mt-8" data={responses} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayEventResult;

DisplayEventResult.propTypes = {
  permissionEngineAPI: PropTypes.object,
};
