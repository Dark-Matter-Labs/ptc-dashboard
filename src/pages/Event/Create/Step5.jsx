import { useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
const template_terms = [
  {
    id: 0,
    title: "Responsibility Sharing",
    content:
      "All users of the space are responsible for maintaining cleanliness and order. Any damages must be reported immediately to the management.",
  },
  {
    id: 1,
    title: "Usage Hours",
    content:
      "The space is available for use from 8 AM to 10 PM. All activities must conclude by the designated closing time to ensure proper cleaning and preparation for the next day.",
  },
  {
    id: 2,
    title: "Reservation Policy",
    content:
      "All users must reserve the space at least 24 hours in advance. Cancellations must be made at least 12 hours prior to the reservation time.",
  },
  {
    id: 3,
    title: "Noise Levels",
    content:
      "Please keep noise to a minimum to ensure a comfortable environment for all users. Loud music or disruptive activities are not permitted.",
  },
  {
    id: 4,
    title: "Food and Beverages",
    content:
      "Consumption of food and beverages is allowed, provided that users clean up after themselves. No alcoholic beverages are allowed without prior permission.",
  },
  {
    id: 5,
    title: "Behavior Expectations",
    content:
      "All users are expected to behave respectfully towards others. Harassment or disruptive behavior will not be tolerated and may result in expulsion from the space.",
  },
  {
    id: 6,
    title: "Equipment Usage",
    content:
      "Users must handle all equipment with care. Any malfunctions or damages must be reported to the management immediately.",
  },
  {
    id: 7,
    title: "Emergency Procedures",
    content:
      "In case of an emergency, please follow the posted evacuation procedures and contact management for assistance.",
  },
  {
    id: 8,
    title: "Liability Waiver",
    content:
      "All users must sign a liability waiver before using the space. Management is not responsible for any injuries or damages incurred during usage.",
  },
  {
    id: 9,
    title: "Feedback and Suggestions",
    content:
      "Users are encouraged to provide feedback and suggestions for improving the space. Please contact management with any comments.",
  },
];

const Step5 = ({ setNavTitle }) => {
  const { t } = useTranslation();

  useEffect(() => {
    setNavTitle(t("create-event.an-example-template-title"));
  });

  return (
    <div className="p-4 space-y-4 text-left">
      {/* View Terms */}
      <div id="view-terms" className="text-2xl block mb-2 font-semibold ">
        View Terms
      </div>

      <p className="mb-4">
        You can agree to and use a template to receive automatic approval. If
        you need to request exceptions to any rules, your request will be sent
        to the Permissioning Group for review.
      </p>

      <div className="flex flex-col gap-4 text-gray-500">
        {template_terms.map((term) => (
          <div
            key={term.id}
            className="bg-white border border-gray-300  rounded-md p-4"
          >
            <h3 className="font-bold text-lg text-gray-900">{term.title}</h3>
            <p className="text-gray-400">{term.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step5;
Step5.propTypes = {
  setNavTitle: PropTypes.func.isRequired, // Required
};
