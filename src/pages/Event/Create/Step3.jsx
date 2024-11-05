import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  PlusIcon,
  MinusIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";
import { ToggleSlider } from "../../../components/Common/ToggleSlider";

const template_terms = [
  {
    id: 0,
    title: "Shared responsibility",
    content:
      "All users of the space are responsible for maintaining cleanliness and order. Any damages must be reported immediately to the management.",
  },
  {
    id: 1,
    title: "Supported event types",
    content:
      "The space is available for use from 8 AM to 10 PM. All activities must conclude by the designated closing time to ensure proper cleaning and preparation for the next day.",
  },
  {
    id: 2,
    title: "Space theme",
    content:
      "This space is dedicated to fostering creativity, expression, and community connection through diverse cultural and artistic initiatives.",
  },
  {
    id: 3,
    title: "Maximum Capacity",
    content:
      "The space can accommodate up to 50 people. For safety and comfort, please do not exceed this limit.",
  },
  {
    id: 4,
    title: "Noise levels",
    content:
      "Please maintain noise at a moderate level to respect other users. Loud music and disruptive noise are not allowed unless pre-approved.",
  },
  {
    id: 5,
    title: "Equipment",
    content:
      "Equipment provided in the space is for user convenience. Handle all items with care, and report any damages or malfunctions to management immediately.",
  },
  {
    id: 6,
    title: "Accountability",
    content:
      "All users are accountable for their behavior within the space. Misconduct, such as harassment or disruptive actions, may lead to removal from the premises.",
  },
  {
    id: 7,
    title: "Food and drinks",
    content:
      "In case of an emergency, please follow the posted evacuation procedures and contact management for assistance.",
  },
];

const Step3 = ({
  setNavTitle,
  setNextStepButtonText,
  templateId,
  templateRuleBlocks,
}) => {
  const { t } = useTranslation();
  const [expandedCards, setExpandedCards] = useState({ 0: true }); //{0: true, 2: false}
  const [agreements, setAgreements] = useState({});

  const toggleExpand = (e, id) => {
    e.preventDefault();

    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggle = (id, isAgree) => {
    setAgreements((prev) => ({
      ...prev,
      [id]: { ...prev[id], agree: isAgree },
    }));
  };

  useEffect(() => {
    console.log("expanded Cards: ", expandedCards);
    console.log("agreements: ", agreements);
  }, [expandedCards, agreements]);

  useEffect(() => {
    setNavTitle(t("create-event.an-example-template-title"));
  }, [setNavTitle, t]);

  // Update button text based on agreements
  useEffect(() => {
    const hasDisagreement = Object.values(agreements).some(
      (agreement) => agreement.agree === false
    );
    setNextStepButtonText(hasDisagreement ? "request exception" : "next");
  }, [agreements, setNextStepButtonText]);

  useEffect(() => {
    console.log(templateRuleBlocks);
  }, []);
  return (
    <div className="p-4 space-y-4 text-left">
      {/* View Terms */}
      <h1>Template {templateId}</h1>
      <div className="text-gray-500 mb-4 flex flex-col ">
        {templateRuleBlocks.map((block) => (
          <p key={block.id}>{block.name}</p>
        ))}
      </div>
      <div id="view-terms" className="text-2xl block mb-2 font-semibold">
        Movie night
      </div>

      <p className="mb-4">
        Rules for hosting a movie screening, with guidance on noise levels,
        seating arrangements, and lighting.
      </p>

      <div className="flex flex-col gap-4 text-gray-500">
        {template_terms.map((term) => (
          <div
            key={term.id}
            className="bg-white border border-gray-200 shadow rounded-xl p-4 round"
          >
            {/* Header with Title and Expand/Collapse Icon */}
            <button
              onClick={(e) => toggleExpand(e, term.id)}
              className="w-full flex flex-row justify-between items-center text-gray-600 hover:text-gray-900 "
            >
              <div className="text-left  font-bold text-lg text-gray-900 w-full">
                {term.title}
              </div>

              {agreements[term.id]?.agree == null ? (
                <div>
                  {expandedCards[term.id] ? (
                    <MinusIcon className="w-5 h-5" />
                  ) : (
                    <PlusIcon className="w-5 h-5" />
                  )}
                </div>
              ) : agreements[term.id].agree ? (
                <CheckCircleIcon className="w-7 h-7" color="#32B07D" />
              ) : (
                <ExclamationCircleIcon className="w-7 h-7" />
              )}
            </button>
            <p># {term.id} </p>
            <p>
              Status:{" "}
              {agreements[term.id]?.agree == null
                ? "Undecided"
                : agreements[term.id].agree
                  ? "Agreed"
                  : "Disagreed"}
            </p>
            {/* Content (only visible when expanded) */}
            {expandedCards[term.id] && (
              <div className="mt-2 text-gray-400">
                <p>{term.content}</p>

                <ToggleSlider
                  id={term.id}
                  handleToggle={handleToggle}
                  agree={agreements[term.id]?.agree}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Step3.propTypes = {
  setNavTitle: PropTypes.func.isRequired,
  setNextStepButtonText: PropTypes.func.isRequired,
  templateId: PropTypes.string,
  templateRuleBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
      authorId: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      details: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      isPublic: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ),
};

export default Step3;
