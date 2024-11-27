import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { useTranslation } from "react-i18next";

import { API } from "../../lib/PermissionEngine";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const colors = ["bg-[#F57051]", "bg-white", "bg-[#35AD66]", "bg-[#AF56F0]"];

const Diamond = ({ label, onClick, className }) => {
  return (
    <div className={`diamond text-[11px] ${className}`} onClick={onClick}>
      {label && <span>{label}</span>}
    </div>
  );
};

Diamond.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export const LandingTheme = ({
  themeSectionRef,
  selectedThemes,
  setSelectedThemes,
}) => {
  // const { t } = useTranslation();
  const [topics, setTopics] = useState();
  const permissionEngineAPI = new API();

  const fetchTopics = async () => {
    await permissionEngineAPI
      .fetchTopics({ page: 1, limit: 20 })
      .then((data) => {
        setTopics(data);
      });
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleClick = (index) => {
    setSelectedThemes((prev) => {
      // Check if the index is already in the array
      if (prev.includes(index)) {
        // Remove the index (deselect the div)
        return prev.filter((i) => i !== index);
      } else {
        // Add the index if less than 4 items are selected
        if (prev.length < 4) {
          return [...prev, index];
        }
        // Otherwise, do nothing if limit reached
        return prev;
      }
    });
  };

  const getColorForIndex = (index) => {
    const position = selectedThemes.indexOf(index);
    return position !== -1 ? colors[position] : "";
  };

  return (
    <section ref={themeSectionRef} data-section="theme" className="">
      <div className="mt-8 text-white text-3xl mx-auto max-w-max">
        <h1>Theme Section</h1>
      </div>
      <div className="bg-diamond-grid my-20 h-screen overflow-scroll mx-0 sm:mx-40">
        <div className=" grid grid-cols-4 sm:grid-cols-6 gap-0">
          {topics?.map((topic) => (
            <Diamond
              className={classNames(
                selectedThemes.includes(topic.id)
                  ? `${getColorForIndex(topic.id)} text-[#2F103A]`
                  : selectedThemes.length >= 4
                    ? "bg-[#3A1749] text-[#71597C] cursor-not-allowed"
                    : "bg-[#3A1749] text-white",
                "",
              )}
              onClick={() => handleClick(topic.id)}
              key={topic.id}
              label={topic.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

LandingTheme.propTypes = {
  themeSectionRef: PropTypes.object,
  selectedThemes: PropTypes.array,
  setSelectedThemes: PropTypes.func,
};
