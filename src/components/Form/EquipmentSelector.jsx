import { useState } from "react";
import { SearchIcon, PresentationChartBarIcon } from "@heroicons/react/outline";
const DEBUG = false;
const equipmentOptions = {
  audio: ["4 microphones", "2 mixers", "8 speakers"],
  projector: ["Projector and Screen", "Lighting (adjustable color)", "Pointer"],
};
export const EquipmentSelector = () => {
  const [audioEquipment, setAudioEquipment] = useState([]);
  const [projectorEquipment, setProjectorEquipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleEquipmentChange = (group, item) => {
    const setState =
      group === "audio" ? setAudioEquipment : setProjectorEquipment;
    const state = group === "audio" ? audioEquipment : projectorEquipment;
    if (state.includes(item)) {
      setState(state.filter((eq) => eq !== item));
    } else {
      setState([...state, item]);
    }
  };

  const handleSelectAll = (group) => {
    if (group === "audio") {
      if (audioEquipment.length === equipmentOptions.audio.length) {
        setAudioEquipment([]);
      } else {
        setAudioEquipment(equipmentOptions.audio);
      }
    } else if (group === "projector") {
      if (projectorEquipment.length === equipmentOptions.projector.length) {
        setProjectorEquipment([]);
      } else {
        setProjectorEquipment(equipmentOptions.projector);
      }
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredAudioEquipment = equipmentOptions.audio.filter((item) =>
    item.toLowerCase().includes(searchTerm)
  );
  const filteredProjectorEquipment = equipmentOptions.projector.filter((item) =>
    item.toLowerCase().includes(searchTerm)
  );
  return (
    <div id="setup-equipments" className="border rounded-md h-auto p-4">
      <div className="flex items-center gap-2 py-2 mb-2">
        <PresentationChartBarIcon className="w-4 h-auto" />
        <div className="block font-semibold">Equipment</div>
      </div>

      {DEBUG && (
        <div className="bg-pink-300">
          <p>audio: {audioEquipment}</p>
          <p>proj: {projectorEquipment}</p>
        </div>
      )}
      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          id="search-equipment"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full border rounded-md p-2 mb-4 pl-10"
          placeholder="Search equipment..."
        />
        <SearchIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
      </div>
      {/* Audio Equipment */}
      <div className="mb-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="font-semibold flex-grow">
            Audio Equipment (select all)
          </div>
          <input
            type="checkbox"
            id="audio-select-all"
            checked={audioEquipment.length === equipmentOptions.audio.length}
            onChange={() => handleSelectAll("audio")}
          />
        </div>
        <div className="pl-6">
          {filteredAudioEquipment.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-2 mb-2"
            >
              <label htmlFor={`audio-${index}`} className="flex-grow">
                {item}
              </label>
              <input
                type="checkbox"
                id={`audio-${index}`}
                checked={audioEquipment.includes(item)}
                onChange={() => handleEquipmentChange("audio", item)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Projector Equipment */}
      <div className="mb-4">
        <div className="flex justify-between items-center gap-2 mb-2">
          <label
            htmlFor="projector-select-all"
            className="font-semibold flex-grow"
          >
            Projector and Screen (select all)
          </label>
          <input
            type="checkbox"
            id="projector-select-all"
            checked={
              projectorEquipment.length === equipmentOptions.projector.length
            }
            onChange={() => handleSelectAll("projector")}
          />
        </div>
        <div className="pl-6">
          {filteredProjectorEquipment.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-2 mb-2"
            >
              <label htmlFor={`projector-${index}`} className="flex-grow">
                {item}
              </label>
              <input
                type="checkbox"
                id={`projector-${index}`}
                checked={projectorEquipment.includes(item)}
                onChange={() => handleEquipmentChange("projector", item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
