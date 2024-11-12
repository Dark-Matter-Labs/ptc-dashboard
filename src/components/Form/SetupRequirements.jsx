import { NoiseLevelSelector } from "./NoiseLevelSelector";
import { EquipmentSelector } from "./EquipmentSelector";
import { FoodAllowedSelector } from "./FoodAllowedSelector";

export const SetupRequirements = () => {
  return (
    <div className="text-left">
      <hr className="my-6" />

      {/* Setup Requirements */}
      <div className="block mb-2 font-semibold text-xl">Setup Requirements</div>
      <div id="setup-requirements" className="h-auto flex flex-col gap-4">
        {/* Noise level selector*/}
        <NoiseLevelSelector />
        {/* Equipment selector */}
        <EquipmentSelector />
        {/* Food Allowed selector */}
        <FoodAllowedSelector />
      </div>
    </div>
  );
};
