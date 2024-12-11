import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../assets/css/SpaceDashboard.css";
import Activity from "./Activity";
import Space from "./Space";
import Report from "./Report";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useSpace } from "../../useSpace";
export default function SpaceDashboard({
  permissionEngineAPI,
  currentLanguage,
  setNavTitle,
  setCloseButtonLink,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let { spaceId } = useParams();
  const [space, setSpace] = useState(null);
  const [spaceOwner, setSpaceOwner] = useState(null);
  // const [tempSpaceId, setTempSpaceId] = useState(null);
  const { setSpaceId } = useSpace();

  const loadSpace = async () => {
    try {
      const fetchedSpace = await permissionEngineAPI.fetchSpace(spaceId);
      const fetchedSpaceOwner = await permissionEngineAPI.fetchPublicUserData(
        fetchedSpace?.ownerId
      );
      setSpace(fetchedSpace);
      setSpaceOwner(fetchedSpaceOwner);
      setCloseButtonLink(`/space/${fetchedSpace.id}`);
      console.log(fetchedSpace);
    } catch (error) {
      console.error("Error fetching space: ", error);
      navigate("/");
    }
  };

  useEffect(() => {
    setNavTitle(t("navigation.navigation-title"));
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: smooth scrolling
    });
  }, []);

  useEffect(() => {
    loadSpace();
    console.log("spaceId:", spaceId);
    setSpaceId(spaceId);
    // setTempSpaceId(spaceId);
  }, []);

  // useEffect(() => {
  //   console.log("setspaceId:", spaceId);
  //   setSpaceId(spaceId);
  // }, [tempSpaceId]);
  return (
    <>
      <Space
        space={space}
        spaceOwner={spaceOwner}
        permissionEngineAPI={permissionEngineAPI}
        currentLanguage={currentLanguage}
      ></Space>
      <Activity
        space={space}
        permissionEngineAPI={permissionEngineAPI}
      ></Activity>
      <Report space={space} permissionEngineAPI={permissionEngineAPI}></Report>
    </>
  );
}

SpaceDashboard.propTypes = {
  spaceId: PropTypes.string,
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
  setNavTitle: PropTypes.func,
  setCloseButtonLink: PropTypes.func,
  setSpaceId: PropTypes.func,
};
