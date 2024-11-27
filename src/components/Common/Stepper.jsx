import { Tab } from "@headlessui/react";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function Stepper({
  currentStep,
  setCurrentStep,
  isStepComplete,
  agreements,
  eventData,
  eventRuleData,
  numSteps,
  stepContents,
  setNavTitle,
  handleSubmit,
  nextStepBtnText,
}) {
  let navigate = useNavigate();

  const { t } = useTranslation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendRequest = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (isSubmitting === true) {
      return;
    } else {
      setIsSubmitting(true);
    }

    if (currentStep + 1 === numSteps) {
      console.log("Submitting at final review... currentStep ", currentStep);

      try {
        const result = await handleSubmit();

        console.log(
          "[Stepper] Submitting at final review... success: ",
          result
        );
        if (result.success) {
          setShowSuccessModal(true); // Show the success modal on successful submission
        } else {
          setErrorMessage(result.message);
        }
      } catch (error) {
        console.error("Error submitting at final review:", error);
        setErrorMessage(
          "There was an error creating the event. Please try again."
        );
      } finally {
        // setIsSubmitting(false);
      }
    }
  };

  const nextStep = (e) => {
    e.preventDefault(); // Prevent form submission
    if (isStepComplete) {
      console.log("isStepComplete", isStepComplete);
      const completed = isStepComplete(eventData, eventRuleData, agreements);

      if (completed.result === false) {
        alert(completed.message);
        return;
      }

      const nextCurrentStep = currentStep + 1;
      if (nextCurrentStep < numSteps) {
        setCurrentStep(nextCurrentStep);
      }
    }
  };

  const prevStep = (e) => {
    e.preventDefault(); // Prevent form submission

    const prevStep = currentStep - 1;
    if (prevStep >= 0) {
      setCurrentStep(prevStep);
    }
  };

  return (
    <div className="w-full lg:w-3/4 mx-auto p-4 bg-white mb-24">
      {/* Modal for success confirmation */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white m-4 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">
            {t("create-event.event-created-success")}
            </h2>
            <p className="mb-6">
            {t("create-event.event-created-continue")}
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/profile/events");
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              {t("navigation.confirm-button")}
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <p className="mb-6 text-red-500">{errorMessage}</p>
            <div className="flex w-full justify-between gap-2">
              <button
                onClick={() => setErrorMessage(null)} // Close the modal
                className="px-4 py-2 w-full bg-slate-600 text-white rounded-md"
              >
                Continue
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
                className="px-4 py-2 w-full bg-gray-100 text-black rounded-md"
              >
                {t("navigation.cancel-button")}
              </button>
            </div>
          </div>
        </div>
      )}
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
        {/* first step */}
        {currentStep === 0 && (
          <button
            onClick={nextStep}
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-md"
          >
            {nextStepBtnText}
          </button>
        )}
        {/* In-between steps*/}
        {currentStep > 0 && currentStep < numSteps - 1 && (
          <div className="flex flex-col gap-2">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="w-full px-4 py-2 bg-white text-gray-500 rounded-md border border-gray-500"
            >
              {t("navigation.back-button")}
            </button>
            {/* hide Next button in step 1 */}
            {currentStep != 1 && (
              <button
                onClick={nextStep}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md"
              >
                {nextStepBtnText}
              </button>
            )}
          </div>
        )}
        {/* last step */}
        {currentStep === numSteps - 1 && (
          <div className="flex flex-col gap-2">
            {" "}
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="w-full px-4 py-2 bg-white text-gray-400 rounded-md border border-gray-400"
            >
              {t("navigation.back-button")}
            </button>
            <button
              onClick={sendRequest}
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md"
            >
              {t("navigation.send-request")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stepper;

Stepper.propTypes = {
  currentStep: PropTypes.number,
  setCurrentStep: PropTypes.func,
  numSteps: PropTypes.number,
  stepContents: PropTypes.array,
  setNavTitle: PropTypes.func,
  handleSubmit: PropTypes.func,
  isStepComplete: PropTypes.func,
  nextStepBtnText: PropTypes.string,
  eventData: PropTypes.object,
  eventRuleData: PropTypes.object,
  agreements: PropTypes.object,
};
