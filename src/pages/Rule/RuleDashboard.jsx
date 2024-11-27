import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../assets/css/RuleDashboard.css";
import Rule from "./Rule";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { handleLogin } from "../../lib/util";

export default function RuleDashboard({
  permissionEngineAPI,
  currentLanguage,
  setNavTitle,
}) {
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
      if (error.message === "Error: 401") {
        alert("Please log in");
        handleLogin();
      } else {
        console.error("Error fetching rule: ", error);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    console.log("ruleId", ruleId);

    setNavTitle(t("rule-dashboard.navigation-title"));
    loadRule();
  }, []);

  return (
    <>
      <Rule
        rule={rule}
        ruleAuthor={ruleAuthor}
        permissionEngineAPI={permissionEngineAPI}
        currentLanguage={currentLanguage}
      ></Rule>
    </>
  );
}

RuleDashboard.propTypes = {
  ruleId: PropTypes.string,
  permissionEngineAPI: PropTypes.object,
  currentLanguage: PropTypes.string,
  setNavTitle: PropTypes.func,
};
