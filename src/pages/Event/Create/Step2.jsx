import { useEffect } from "react";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Step2 = ({ setNavTitle }) => {
  const { t } = useTranslation();

  useEffect(() => {
    setNavTitle(t("create-event.navigation-title"));
  }, []);

  return <div className="p-4 text-left"></div>;
};

export default Step2;

Step2.propTypes = {
  setNavTitle: PropTypes.func.isRequired,
};
