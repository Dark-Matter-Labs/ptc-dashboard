import { EquipmentSelector } from "./EquipmentSelector";
import PropTypes from "prop-types";

export const SetupRequirements = ({ spaceId, updateEventData, updateEventRuleData, permissionEngineAPI }) => {
  return (
    <div className="text-left">
      <hr className="my-6" />

      {/* Setup Requirements */}
      <div className="block mb-2 font-semibold text-xl">Setup Requirements</div>
      <div id="setup-requirements" className="h-auto flex flex-col gap-4">
        {/* Noise level selector*/}
        {/* Equipment selector */}
        <EquipmentSelector
          spaceId={spaceId}
          updateEventData={updateEventData}
          updateEventRuleData={updateEventRuleData}
          permissionEngineAPI={permissionEngineAPI}
        />
        {/* Food Allowed selector */}
      </div>
    </div>
  );
};

SetupRequirements.propTypes = {
  spaceId: PropTypes.string,
  updateEventData: PropTypes.func.isRequired,
  updateEventRuleData: PropTypes.func.isRequired,
  permissionEngineAPI: PropTypes.object,
};
