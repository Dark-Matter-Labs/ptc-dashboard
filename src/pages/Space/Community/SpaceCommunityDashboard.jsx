import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../../assets/css/SpaceCommunityDashboard.css";
import CommunitySpace from "./CommunitySpace";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useSpace } from "../../../useSpace";
import { navigateToBack } from "../../../lib/util";
import { ApiClient, SpaceAPI, UserAPI } from "@dark-matter-labs/ptc-sdk";

export default function SpaceCommunityDashboard({
  setNavTitle,
  currentLanguage,
  setCloseButtonLink,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const apiClient = ApiClient.getInstance();
  const spaceAPI = new SpaceAPI(apiClient);
  const userAPI = new UserAPI(apiClient);

  let { spaceId } = useParams();
  const [space, setSpace] = useState(null);
  const [spaceOwner, setSpaceOwner] = useState(null);
  const { setSpaceId } = useSpace();

  const loadSpace = async () => {
    try {
      const fetchedSpace = await spaceAPI.findOneById(spaceId);
      const fetchedSpaceOwner = await userAPI.findPublicData(
        fetchedSpace?.ownerId
      );
      setSpace(fetchedSpace);
      setSpaceOwner(fetchedSpaceOwner);
      setCloseButtonLink(`/space/${fetchedSpace.id}/community`);
    } catch (error) {
      console.error("Error fetching space: ", error);
      navigateToBack(navigate);
    }
  };

  useEffect(() => {
    setNavTitle(t("space-community.navigation-title"));
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
  }, []);

  return (
    <>
      <CommunitySpace
        space={space}
        spaceOwner={spaceOwner}
        currentLanguage={currentLanguage}
      ></CommunitySpace>
    </>
  );
}

SpaceCommunityDashboard.propTypes = {
  spaceId: PropTypes.string,
  currentLanguage: PropTypes.string,
  setNavTitle: PropTypes.func,
  setCloseButtonLink: PropTypes.func,
  setSpaceId: PropTypes.func,
};
