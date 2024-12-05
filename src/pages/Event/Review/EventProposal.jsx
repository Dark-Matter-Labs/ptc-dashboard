import PropTypes from "prop-types";
const EventProposal = ({
  t,
  eventData,
  topics,
  equipments,
  user,
  timeObj,
  proceedToNextStep,
}) => {
  return (
    <div className="p-4 space-y-4 text-left">
      <div className="text-2xl block mb-2 font-semibold mt-8">
        {t("review-event.event-proposal")}
      </div>
      {/* Title */}
      <div className="py-4">
        <p className="mb-2">{t("review-event.event-title")}</p>
        <div className="text-2xl font-semibold">{eventData.name}</div>
      </div>
      <hr />
      {/* Theme */}
      <div className="py-4">
        <p className="mb-2">{t("review-event.event-theme")}</p>
        <div className="text-2xl font-semibold">
          {topics.length > 0
            ? topics.map((topic, index) => (
                <div
                  key={index}
                  className="cursor-pointer px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-800 border border-gray-400 w-fit"
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
        <p className="mb-2">{t("review-event.event-date-time")}</p>
        <div className="flex justify-between gap-4">
          <div className="w-full items-center text-center bg-gray-200 p-2 px-4 rounded-xl text-gray-900">
            {timeObj.date}
          </div>
          <div className="w-full items-center text-center bg-gray-200 p-2 px-4 rounded-xl text-gray-900">
            {timeObj.time}
          </div>
        </div>
      </div>
      <hr />
      {/* Description */}
      <div className="py-4">
        <p className="mb-2">{t("review-event.event-description")}</p>
        <div className="text-2xl font-semibold">{eventData.details}</div>
      </div>
      <hr />
      {/* Organizer name and email */}
      <p className="mb-2">{t("review-event.organizer-name")}</p>
      <p className="text-xl font-semibold">{user.name}</p>
      <p className="mb-2">{t("review-event.organizer-email")}</p>
      <p className="text-xl font-semibold">{user.email}</p>
      <hr className="my-6"></hr>
      {/* Equipment */}
      <div className="py-4">
        <p className="mb-2">{t("review-event.requested-equipment")}</p>
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
      {/* Next Step Button */}
      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
        onClick={proceedToNextStep}
      >
        {t("review-event.next-step")}
      </button>
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
  proceedToNextStep: PropTypes.func.isRequired,
};

export default EventProposal;
