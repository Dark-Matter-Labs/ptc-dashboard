import { useState, useEffect } from "react";
import { SearchIcon, PlusIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const templates = [
  {
    id: 0,
    title: "template 1",
    content: "CreatedAt 2024-11-01 // Popularity: 5",
    createdAt: "2024-11-01T12:58:48.537Z",
    popularity: 5,
    exceptionAdded: true,
  },
  {
    id: 1,
    title: "template 2",
    content: "CreatedAt 2024-11-12 // Popularity: 7",
    createdAt: "2024-11-12T12:58:48.537Z",
    popularity: 7,
    exceptionAdded: false,
  },
  {
    id: 2,
    title: "template 3",
    content: "CreatedAt 2024-11-03 // Popularity: 1",
    createdAt: "2024-11-03T12:58:48.537Z",
    popularity: 1,
    exceptionAdded: false,
  },
  {
    id: 3,
    title: "template 4",
    content: "CreatedAt 2024-11-11 // Popularity: 11",
    createdAt: "2024-11-11T12:58:48.537Z",
    popularity: 11,
    exceptionAdded: false,
  },
  {
    id: 4,
    title: "template 5",
    content: "CreatedAt 2024-11-21 // Popularity: 25",
    createdAt: "2024-11-21T12:58:48.537Z",
    popularity: 25,
    exceptionAdded: false,
  },
  {
    id: 5,
    title: "template 6",
    content: "Content 2024-11-17 // Popularity: 2",
    createdAt: "2024-11-17T12:58:48.537Z",
    popularity: 2,
    exceptionAdded: false,
  },
];
const Step4 = ({ setNavTitle }) => {
  const { t } = useTranslation();
  const [templateOfRules_newest, setTemplateOfRules_newest] = useState([]);
  const [templateOfRules_popular, setTemplateOfRules_popular] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleCreateNewTemplate = (e) => {
    console.log(e);
  };
  useEffect(() => {
    setNavTitle(t("create-event.navigation-title"));
  });

  // Sort templates by created date and popularity
  useEffect(() => {
    // Sort by created date (newest first)
    const sortedByDate = [...templates].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setTemplateOfRules_newest(sortedByDate);

    // Sort by popularity (highest first)
    const sortedByPopularity = [...templates].sort(
      (a, b) => b.popularity - a.popularity
    );
    setTemplateOfRules_popular(sortedByPopularity);
  }, [templates]);
  return (
    <div className="p-4 space-y-4 text-left">
      {/* Choose Template */}
      <div id="choose-template" className="text-2xl block mb-2 font-semibold ">
        Browse event templates
      </div>

      <p className="mb-4">
        Search and select from a variety of event templates with pre-set rules
        to suit your event, or customize as needed.
      </p>
      <div className="relative mb-4">
        <input
          id="search-template"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full border rounded-md p-2 mb-4 pl-10"
          placeholder="Search template..."
        />
        <SearchIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
      </div>
      <div id="newest-template" className=" block mb-2 font-semibold ">
        Newest
      </div>
      <div className="flex overflow-x-auto space-x-4 w-full py-2">
        {templateOfRules_newest.map((template) => (
          <div
            key={template.id}
            onClick={() => handleSelectTemplate(template.id)}
            className={`flex-shrink-0 w-40 border rounded-md p-4 cursor-pointer  ${
              selectedTemplate === template.id
                ? "bg-[#92929D] text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <h3
              className={`font-bold text-sm ${
                selectedTemplate === template.id
                  ? "text-white"
                  : " text-gray-800 "
              }`}
            >
              {template.title}
            </h3>
            <p className="text-sm font-light mt-2 mb-8">{template.content}</p>
            {template.exceptionAdded && (
              <span
                className={`text-sm mt-2 p-1 px-2 rounded-2xl  bg-gray-200 text-gray-400 `}
              >
                Exception added
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="my-6" />
      <div id="most-popular-template" className=" block mb-2 font-semibold ">
        Most popular
      </div>
      <div className="flex overflow-x-auto space-x-4 w-full py-2">
        {templateOfRules_popular.map((template) => (
          <div
            key={template.id}
            onClick={() => handleSelectTemplate(template.id)}
            className={`flex-shrink-0 w-40 border rounded-md p-4 cursor-pointer  ${
              selectedTemplate === template.id
                ? "bg-[#92929D] text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <h3
              className={`font-bold text-sm ${
                selectedTemplate === template.id
                  ? "text-white"
                  : " text-gray-800 "
              }`}
            >
              {template.title}
            </h3>
            <p className="text-sm font-light mt-2 mb-8">{template.content}</p>
            {template.exceptionAdded && (
              <span
                className={`text-sm mt-2 p-1 px-2 rounded-2xl  bg-gray-200 text-gray-400 `}
              >
                Exception added
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="my-6" />
      <div id="create-new-template" className=" block mb-2 font-semibold ">
        Create a new one from scratch
      </div>
      <div
        onClick={() => handleCreateNewTemplate()}
        className="bg-gray-100 w-40 h-40 border rounded-md cursor-pointer flex justify-center items-center"
      >
        <PlusIcon className="w-5 h-5 mx-auto my-auto text-gray-500"></PlusIcon>
      </div>
    </div>
  );
};

export default Step4;
Step4.propTypes = {
  setNavTitle: PropTypes.func.isRequired, // Required
};
