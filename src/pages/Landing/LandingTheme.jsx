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
      .fetchSpaceAssignedTopics({ page: 1, limit: 20 })
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
      <div className="my-8 mx-auto max-w-max flex flex-col justify-center items-center">
        <span className="uppercase text-xs text-[#CDA5EF]">choose a theme</span>
        <h1 className="text-white text-3xl">관심 주제를 골라보세요.</h1>
      </div>
      <div className="bg-diamond-grid pt-[50px] mb-8 sm:pl-0 sm:pt-0 w-[100vw] sm:w-auto h-[40vh] sm:h-screen md:h-[60vh] overflow-scroll mx-0 md:mx-40">
        <div className="grid grid-cols-12 md:grid-cols-6 gap-20 md:gap-0">
          {topics?.map((topic, index) => {
            if (index % 5 === 0){
              return <Diamond key={topic.id} className="hide" />
            } else {
            return <Diamond
              className={classNames(
                selectedThemes.includes(topic.id)
                  ? `${getColorForIndex(topic.id)} text-[#2F103A]`
                  : selectedThemes.length >= 4
                    ? "bg-[#3A1749] text-[#71597C] cursor-not-allowed"
                    : "bg-[#3A1749] text-white",
                "text-[8px] sm:text-[15px]",
              )}
              onClick={() => handleClick(topic.id)}
              key={topic.id}
              label={topic.name}
            />
            }
        })}
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
