import { useState, useEffect } from "react";
import { SearchIcon, PresentationChartBarIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import * as Type from "../../lib/PermissionEngine/type";

export const EquipmentSelector = ({
  spaceId,
  updateEventData,
  permissionEngineAPI,
  selectedEquipment,
  setSelectedEquipment,
}) => {
  const [allEquipment, setAllEquipment] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleEquipmentChange = (category, item) => {
    setSelectedEquipment((prev) => {
      const selectedInCategory = prev[category] || [];
      if (selectedInCategory.includes(item)) {
        return {
          ...prev,
          [category]: selectedInCategory.filter((eq) => eq !== item),
        };
      } else {
        return {
          ...prev,
          [category]: [...selectedInCategory, item],
        };
      }
    });
  };

  const handleSelectAll = (category) => {
    setSearchTerm("");
    setSelectedEquipment((prev) => {
      const isAllSelected =
        (selectedEquipment[category] || []).length ===
        (allEquipment[category] || []).length;
      return {
        ...prev,
        [category]: isAllSelected ? [] : allEquipment[category],
      };
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const loadEquipments = async () => {
    try {
      const data = await permissionEngineAPI.fetchEquipment(spaceId);
      console.log("[api] space equipment", data);

      // Categorize equipment based on `type`
      const categorizedEquipment = {};
      data.forEach((item) => {
        const category = item.type || "uncategorized";
        if (!categorizedEquipment[category]) {
          categorizedEquipment[category] = [];
        }
        categorizedEquipment[category].push(item);
      });

      console.log("Categorized Equipment:", categorizedEquipment);
      setAllEquipment(categorizedEquipment);
    } catch (error) {
      console.error("Error fetching equipment: ", error);
    }
  };

  useEffect(() => {
    loadEquipments();
  }, [spaceId]);

  useEffect(() => {
    const selectedSpaceEquipments = [];
    Object.values(selectedEquipment).map((categoryEquipments) =>
      selectedSpaceEquipments.push(...categoryEquipments)
    );
    updateEventData({
      privateRuleBlocks: selectedSpaceEquipments.map((spaceEquipment) => {
        return {
          name: spaceEquipment.name,
          type: Type.RuleBlockType.spaceEventRequireEquipment,
          content: [spaceEquipment.id, spaceEquipment.quantity].join(
            Type.RuleBlockContentDivider.type
          ),
        };
      }),
    });
  }, [selectedEquipment]);

  const getFilteredEquipment = (category) => {
    return (allEquipment[category] || []).filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
  };

  return (
    <div id="setup-equipments" className="border rounded-md h-auto p-4">
      <div className="flex items-center gap-2 py-2 mb-2">
        <PresentationChartBarIcon className="w-4 h-auto" />
        <div className="block font-semibold">Equipment</div>
      </div>

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

      {/* Render all equipment categories */}
      {Object.keys(allEquipment).map((category) => (
        <div key={category} className="mb-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="font-semibold flex-grow">
              {category.charAt(0).toUpperCase() + category.slice(1)} Equipment
              (select all)
            </div>
            <input
              type="checkbox"
              id={`${category}-select-all`}
              checked={
                selectedEquipment[category]?.length ===
                allEquipment[category]?.length
              }
              onChange={() => handleSelectAll(category)}
            />
          </div>
          <div className="pl-6">
            {getFilteredEquipment(category).map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-2 mb-2"
              >
                <label htmlFor={`${category}-${index}`} className="flex-grow">
                  {item.quantity} {item.name}
                </label>
                <input
                  type="checkbox"
                  id={`${category}-${index}`}
                  checked={
                    !!(selectedEquipment[category] || []).find(
                      (selectedItem) => selectedItem.id === item.id
                    )
                  }
                  onChange={() => handleEquipmentChange(category, item)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

EquipmentSelector.propTypes = {
  spaceId: PropTypes.string.isRequired,
  updateEventData: PropTypes.func.isRequired,
  updateEventRuleData: PropTypes.func.isRequired,
  permissionEngineAPI: PropTypes.object,
  selectedEquipment: PropTypes.object,
  setSelectedEquipment: PropTypes.func.isRequired,
};
