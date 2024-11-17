import { NoiseLevelSelector } from "./NoiseLevelSelector";
import { EquipmentSelector } from "./EquipmentSelector";
import { FoodAllowedSelector } from "./FoodAllowedSelector";
import PropTypes from "prop-types";
export const SetupRequirements = ({ spaceId, updateEventData }) => {
  return (
    <div className="text-left">
      <hr className="my-6" />

      {/* Setup Requirements */}
      <div className="block mb-2 font-semibold text-xl">Setup Requirements</div>
      <div id="setup-requirements" className="h-auto flex flex-col gap-4">
        {/* Noise level selector*/}
        <NoiseLevelSelector />
        {/* Equipment selector */}
        <EquipmentSelector
          spaceId={spaceId}
          updateEventData={updateEventData}
        />
        {/* Food Allowed selector */}
        <FoodAllowedSelector />
      </div>
    </div>
  );
};

SetupRequirements.propTypes = {
  spaceId: PropTypes.string,
  updateEventData: PropTypes.func.isRequired,
};
