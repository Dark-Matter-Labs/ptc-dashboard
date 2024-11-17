import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../assets/css/SpaceDashboard.css";
import Activity from "./Activity";
import Space from "./Space";
import Report from "./Report";
import PropTypes from "prop-types";

export default function SpaceDashboard({
  permissionEngineAPI,
  currentLanguage,
}) {
  const navigate = useNavigate();
  let { spaceId } = useParams();
  const [space, setSpace] = useState(null);
  const [spaceOwner, setSpaceOwner] = useState(null);

  const loadSpace = async () => {
    try {
      if (!spaceId || spaceId === "default") {
        const spaces = await permissionEngineAPI.fetchSpaces({
          page: 1,
          limit: 1,
        });
        spaceId = spaces?.[0]?.id;

        navigate(`/space/${spaceId}`);
      }

      if (spaceId && spaceId !== "default") {
        const fetchedSpace = await permissionEngineAPI.fetchSpace(spaceId);
        const fetchedSpaceOwner = await permissionEngineAPI.fetchPublicUserData(
          fetchedSpace?.ownerId
        );
        setSpace(fetchedSpace);
        setSpaceOwner(fetchedSpaceOwner);
      }
    } catch (error) {
      console.error("Error fetching space: ", error);
      navigate("/");
    }
  };

  useEffect(() => {
    console.log("spaceId", spaceId);

    loadSpace();
  }, []);

  return (
    <>
      <Space
        space={space}
        spaceOwner={spaceOwner}
        permissionEngineAPI={permissionEngineAPI}
        currentLanguage={currentLanguage}
      ></Space>
      <Activity spaceId={spaceId}></Activity>
      <Report
        spaceId={spaceId}
        permissionEngineAPI={permissionEngineAPI}
      ></Report>
    </>
  );
}

SpaceDashboard.propTypes = {
  spaceId: PropTypes.string,
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
};
