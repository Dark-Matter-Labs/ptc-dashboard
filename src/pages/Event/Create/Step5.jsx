import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
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

const Step5 = ({ setNavTitle }) => {
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

  return (
    <div className="p-4 space-y-4 text-left">
      {/* View Terms */}
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
              <div>
                {expandedCards[term.id] ? (
                  <MinusIcon className="w-5 h-5" />
                ) : (
                  <PlusIcon className="w-5 h-5" />
                )}
              </div>
            </button>

            {/* Content (only visible when expanded) */}
            {expandedCards[term.id] && (
              <div className="mt-2 text-gray-400">
                <p>{term.content}</p>

                {/* Toggle Buttons */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="mr-2 text-gray-700">Agree</span>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreements[term.id]?.agree || false}
                      onChange={() => handleToggle(term.id, true)}
                      className="sr-only"
                    />
                    <div
                      className={`w-10 h-6 rounded-full transition-colors ${
                        agreements[term.id]?.agree
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                          agreements[term.id]?.agree
                            ? "translate-x-4"
                            : "translate-x-0"
                        }`}
                      ></div>
                    </div>
                  </label>
                  <span className="mr-2 ml-6 text-gray-700">Disagree</span>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!agreements[term.id]?.agree || false}
                      onChange={() => handleToggle(term.id, false)}
                      className="sr-only"
                    />
                    <div
                      className={`w-10 h-6 rounded-full transition-colors ${
                        !agreements[term.id]?.agree
                          ? "bg-red-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                          !agreements[term.id]?.agree
                            ? "translate-x-4"
                            : "translate-x-0"
                        }`}
                      ></div>
                    </div>
                  </label>
                </div>

                {/*Toggle Slider*/}
                <ToggleSlider />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Step5.propTypes = {
  setNavTitle: PropTypes.func.isRequired,
};

export default Step5;
