import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../assets/css/BrowseRule.css";
import Rule from "./Rule";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useUser } from "../../useUser";
import { navigateToBack } from "../../lib/util";

export default function BrowseRule({
  permissionEngineAPI,
  currentLanguage,
  setNavTitle,
}) {
  const { user } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  let { ruleId } = useParams();
  const [rule, setRule] = useState(null);
  const [ruleAuthor, setRuleAuthor] = useState(null);

  const loadRule = async () => {
    try {
      const fetchedRule = await permissionEngineAPI.fetchRuleByRuleId(ruleId);
      const fetchedRuleAuthor = await permissionEngineAPI.fetchPublicUserData(
        fetchedRule?.authorId
      );

      setRule(fetchedRule);
      setRuleAuthor(fetchedRuleAuthor);
    } catch (error) {
      console.error("Error fetching rule: ", error);
      navigateToBack(navigate);
    }
  };

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: smooth scrolling
    });
  }, []);

  useEffect(() => {
    console.log("ruleId", ruleId);

    setNavTitle(t("browse-rule.navigation-title"));
    loadRule();
  }, []);

  return (
    <>
      {user ? (
        <Rule
          rule={rule}
          ruleAuthor={ruleAuthor}
          permissionEngineAPI={permissionEngineAPI}
          currentLanguage={currentLanguage}
        ></Rule>
      ) : (
        <div className="mt-2">Please log in to see the rule.</div>
      )}
    </>
  );
}

BrowseRule.propTypes = {
  ruleId: PropTypes.string,
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
  setNavTitle: PropTypes.func,
};
