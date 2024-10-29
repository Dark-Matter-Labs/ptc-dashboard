import { Tab } from "@headlessui/react";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Stepper({ numSteps, stepContents, setNavTitle }) {
  let navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const sendRequest = (path) => {
    navigate(path);
  };
  const nextStep = async () => {
    const nextCurrentStep = currentStep + 1;
    if (nextCurrentStep < numSteps) {
      setCurrentStep(nextCurrentStep);
    }
  };

  return (
    <div className="w-full lg:w-3/4 mx-auto p-4 bg-white mb-24">
      <TabGroup
        selectedIndex={currentStep}
        onChange={(index) => {
          setCurrentStep(index);
          setNavTitle(`Step ${index + 1}`); // Update the title when tabs are clicked directly
        }}
      >
        {/* Step Dots */}
        <TabList className="flex justify-center items-center mb-8 gap-x-2">
          {Array.from({ length: numSteps }, (_, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                selected
                  ? "w-2 h-2 rounded-full bg-gray-500"
                  : "w-1.5 h-1.5 rounded-full bg-gray-300"
              }
            >
              <span className="sr-only">Step {index + 1}</span>
            </Tab>
          ))}
        </TabList>

        {/* Step Content */}
        <TabPanels className="min-h-96">
          {stepContents.map((content, index) => (
            <TabPanel key={index}>
              <div>{content}</div>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>

      {/* Next Button */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-100 shadow-lg p-4">
        {currentStep < numSteps - 1 ? (
          <button
            onClick={nextStep}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => sendRequest("/")}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Send request
          </button>
        )}
      </div>
    </div>
  );
}

export default Stepper;

Stepper.propTypes = {
  numSteps: PropTypes.number,
  stepContents: PropTypes.array,
  setNavTitle: PropTypes.func,
  handleSubmit: PropTypes.func,
};
