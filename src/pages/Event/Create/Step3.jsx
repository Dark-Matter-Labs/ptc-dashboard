import { useState, useEffect } from "react";
import {
  BellIcon,
  SearchIcon,
  PresentationChartBarIcon,
  HandIcon,
} from "@heroicons/react/outline";
import { Button } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const DEBUG = false;
const noiseLevelOptions = [
  {
    title: "High",
    description:
      "Loud activities such as concerts, large crowds, or amplified music with loud speakers.",
  },
  {
    title: "Medium",
    description:
      "Moderate noise such as background music, live speaking, or performances with microphones",
  },
  {
    title: "Low",
    description:
      "Quiet activities such as meetings, workshops, or discussions. Minimal noise, mostly conversational.",
  },
];

const equipmentOptions = {
  audio: ["4 microphones", "2 mixers", "8 speakers"],
  projector: ["Projector and Screen", "Lighting (adjustable color)", "Pointer"],
};

const Step3 = ({ setNavTitle }) => {
  const { t } = useTranslation();
  const [audioEquipment, setAudioEquipment] = useState([]);
  const [projectorEquipment, setProjectorEquipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [noiseLevel, setNoiseLevel] = useState(1); // default to medium noise level
  const [foodAllowed, setFoodAllowed] = useState(false);

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

  useEffect(() => {
    setNavTitle(t("create-event.navigation-title"));
  });

  return (
    <div>
      <div className="p-4 space-y-4 text-left">
        {/* Enter title */}
        <div className="block mb-2 font-semibold">Setup Requirements</div>

        <div id="setup-requirements" className="h-auto flex flex-col gap-4">
          <div id="setup-noise-level" className="border rounded-md h-auto p-4">
            <div className="flex items-center gap-2 py-2 mb-2">
              <BellIcon className="w-4 h-auto" />
              <div className="block font-semibold">Noise Level</div>
            </div>
            {DEBUG && (
              <div className="bg-pink-300">
                <p>noiseLevel: {noiseLevel}</p>
              </div>
            )}
            <div className="flex flex-col gap-4 lg:flex-row">
              {noiseLevelOptions.map((content, index) => (
                <div
                  key={index}
                  className={`w-full border border-gray-700 rounded-[80px] sm:rounded-[60px] p-3 text-center lg:text-left lg:rounded-sm ${noiseLevel === index ? "bg-gray-200" : ""}`}
                  onClick={() => setNoiseLevel(index)}
                >
                  <div className="font-bold mb-1">{content.title}</div>
                  <div className="font-sm text-gray-700 px-2.5">
                    {content.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

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
                  checked={
                    audioEquipment.length === equipmentOptions.audio.length
                  }
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
                    projectorEquipment.length ===
                    equipmentOptions.projector.length
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

          <div
            id="setup-question-about-food"
            className="border rounded-md h-auto p-4"
          >
            <div className="flex items-center gap-2 py-2 mb-2">
              <HandIcon className="w-6 h-auto" />
              <div className="block font-semibold">
                Will food or drinks be served at the event?
              </div>
            </div>
            {DEBUG && (
              <div className="bg-pink-300">
                <p>foodAllowed: {foodAllowed ? "true" : "false"}</p>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <Button
                onClick={() => setFoodAllowed(true)}
                className={`flex-grow border p-4 rounded-[48px] ${foodAllowed ? "bg-slate-500" : ""}`}
              >
                Yes
              </Button>
              <Button
                onClick={() => setFoodAllowed(false)}
                className={`flex-grow p-4 rounded-[48px] ${foodAllowed ? "" : "bg-slate-500"}`}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step3;

Step3.propTypes = {
  setNavTitle: PropTypes.func.isRequired, // Required
};
