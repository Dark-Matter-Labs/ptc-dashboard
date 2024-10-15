import { Tab } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Stepper({ numSteps, stepContents }) {
  let navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const sendRequest = (path) => {
    navigate(path);
  };
  const nextStep = () => {
    setCurrentStep((prev) => (prev < numSteps - 1 ? prev + 1 : prev));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white">
      <Tab.Group selectedIndex={currentStep} onChange={setCurrentStep}>
        {/* Step Dots */}
        <Tab.List className="flex justify-center items-center mb-8 gap-x-2">
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
        </Tab.List>

        {/* Step Content */}
        <Tab.Panels className="min-h-96">
          {stepContents.map((content, index) => (
            <Tab.Panel key={index}>
              <p>{content}</p>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

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
