import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { navigateTo } from "../../../lib/util";

const EventProposal = ({
  t,
  eventData,
  topics,
  equipments,
  user,
  timeObj,
  proceedToStep,
  eventRuleTemplate,
}) => {
  const navigate = useNavigate();
  return (
    <div className="p-4 space-y-4 text-left">
      <div className="text-2xl block mb-2 font-semibold mt-8">
        {t("review-event.event-proposal")}
      </div>
      {/* Title */}
      <div className="py-4">
        <p className="mb-2 text-[#7E3B96]">{t("review-event.event-title")}</p>
        <div className="text-2xl font-semibold">{eventData.name}</div>
      </div>
      <hr />
      {/* Theme */}
      <div className="py-4">
        <p className="mb-2 text-[#7E3B96]">{t("review-event.event-theme")}</p>
        <div className="text-2xl font-semibold">
          {topics.length > 0
            ? topics.map((topic, index) => (
                <div
                  key={index}
                  className="cursor-pointer px-4 py-2 rounded-full text-sm font-medium bg-[#9977B6] text-white border border-gray-400 w-fit"
                >
                  {topic}
                </div>
              ))
            : t("review-event.no-themes")}
        </div>
      </div>
      <hr />
      {/* Date and Time */}
      <div className="py-4">
        <p className="mb-2 text-[#7E3B96]">
          {t("review-event.event-date-time")}
        </p>
        <div className="flex justify-between gap-4">
          <div className="w-full items-center text-center bg-[#F7EDFF] p-2 px-4 rounded-xl text-gray-900">
            {timeObj.date}
          </div>
          <div className="w-full items-center text-center bg-[#F7EDFF] p-2 px-4 rounded-xl text-gray-900">
            {timeObj.time}
          </div>
        </div>
      </div>
      <hr />
      {/* Description */}
      <div className="py-4">
        <p className="mb-2 text-[#7E3B96]">
          {t("review-event.event-description")}
        </p>
        <div className="text-2xl font-semibold">{eventData.details}</div>
      </div>
      <hr />
      {/* Organizer name and email */}
      <p className="mb-2 text-[#7E3B96]">{t("review-event.organizer-name")}</p>
      <p className="text-xl font-semibold">{user.name}</p>
      <p className="mb-2 text-[#7E3B96]">{t("review-event.organizer-email")}</p>
      <p className="text-xl font-semibold">{user.email}</p>
      <hr className="my-6"></hr>
      {/* Equipment */}
      <div className="py-4">
        <p className="mb-2 text-[#7E3B96]">
          {t("review-event.requested-equipment")}
        </p>
        <ul>
          {equipments.length > 0
            ? equipments.map((equipment, index) => (
                <li
                  key={index}
                  className="text-gray-800 text-2xl font-semibold"
                >
                  {equipment.name} - {equipment.quantity}
                </li>
              ))
            : t("review-event.no-equipment")}
        </ul>
      </div>
      {/* Event Rule Template */}
      <div className="py-4">
        <p className="mb-2 text-[#7E3B96]">
          {t("review-event.rules-template")}
        </p>
        <div className="rounded-2xl bg-[#56106F] px-4 py-8 text-white">
          <div className="flex justify-between  gap-2 mb-4 items-start">
            <div className="text-2xl w-full">{eventRuleTemplate.name}</div>
            {eventRuleTemplate.hasException && (
              <div
                className="flex-grow rounded-full bg-[#EBD4FF] px-2 py-1 text-[#7E3B96]"
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                Exception added
              </div>
            )}
          </div>
          <div className="font-light text-sm">
            Rule template for {eventRuleTemplate.name} about {eventData.details}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="py-4">
        <button
          onClick={() => navigateTo({ navigate, pathname: "/events/assigned" })}
          className="mt-4 px-6 py-2 border text-black rounded-lg w-full"
        >
          Back
        </button>
        <button
          className="mt-4 px-6 py-2 bg-[#2F103A] text-white rounded-lg w-full"
          onClick={() => proceedToStep(2)}
        >
          {t("review-event.next-step")}
        </button>
      </div>
    </div>
  );
};

EventProposal.propTypes = {
  t: PropTypes.func.isRequired,
  eventData: PropTypes.object.isRequired,
  topics: PropTypes.array.isRequired,
  equipments: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  timeObj: PropTypes.object.isRequired,
  eventRuleTemplate: PropTypes.object.isRequired,
  proceedToStep: PropTypes.func.isRequired,
};

export default EventProposal;
