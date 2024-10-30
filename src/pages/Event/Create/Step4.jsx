import { useState, useEffect } from "react";
import { SearchIcon, PlusIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const templateOfRules_relevant = [
  {
    id: 0,
    title: "Title of terms 1",
    content: "Content",
    exceptionAdded: true,
  },
  {
    id: 1,
    title: "Title of terms 2",
    content: "Content",
    exceptionAdded: false,
  },
  {
    id: 2,
    title: "Title of terms 3",
    content: "Content",
    exceptionAdded: false,
  },
  {
    id: 3,
    title: "Title of terms 4",
    content: "Content",
    exceptionAdded: false,
  },
];
const templateOfRules_popular = [
  {
    id: 0,
    title: "Title of terms 1",
    content: "Content",
    exceptionAdded: false,
  },
  {
    id: 1,
    title: "Title of terms 2",
    content: "Content",
    exceptionAdded: true,
  },
  {
    id: 2,
    title: "Title of terms 3",
    content: "Content",
    exceptionAdded: false,
  },
  {
    id: 3,
    title: "Title of terms 4",
    content: "Content",
    exceptionAdded: false,
  },
];
const Step4 = ({ setNavTitle }) => {
  const { t } = useTranslation();

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
  return (
    <div className="p-4 space-y-4 text-left">
      {/* Choose Template */}
      <div id="choose-template" className="text-2xl block mb-2 font-semibold ">
        Choose a template of rules
      </div>

      <p className="mb-4">
        The most relevant templates for your event type are shown below. If no
        templates are available, you’ll need to create a new one and submit it
        for review.
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
      <div id="most-relevant-template" className=" block mb-2 font-semibold ">
        Most relevant
      </div>
      <div className="flex overflow-x-auto space-x-4 w-full py-2">
        {templateOfRules_relevant.map((template) => (
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
