import { Button, Textarea } from "@headlessui/react";
import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
const StepCheckRisks = ({ setNavTitle }) => {
  const { t } = useTranslation();
  const [riskAssessmentContent, setRiskAssessmentContent] = useState("");

  useEffect(() => {
    setNavTitle(t("create-event.self-risk-assessment"));
  });

  return (
    <div className="p-4 space-y-4 text-left pb-16">
      {/* Risk Assessment*/}
      <div>
        <div
          id="risk-assessment"
          className="text-2xl block mb-2 font-semibold "
        >
          Self-risk assessment
        </div>

        <p className="mb-4">
          Describe any potential safety risks associated with your event and how
          you plan to mitigate them. For example, preventing theft and damage of
          facilities, fire safety, crowd control, etc.
        </p>
        <Textarea
          id="risk-assessment-content"
          value={riskAssessmentContent}
          onChange={(e) => setRiskAssessmentContent(e.target.value)}
          className="w-full border rounded-[12px] p-2 min-h-3 h-40 mb-8"
        ></Textarea>
      </div>
      <hr className="mb-6"></hr>
      <div id="insurabce-information" className="mt-8">
        <div className="mt-8 text-2xl block font-semibold ">
          Insurance Information{" "}
          <span className="text-gray-400 text-sm">(optional)</span>
        </div>
        <p>Upload proof of insurance</p>
      </div>
      <div className="flex justify-between bg-slate-100 rounded-[9px] p-4 place-content-start">
        <div className="flex w-full gap-2 items-center">
          <img
            src="/src/assets/image/pdf-thumb.png"
            className="size-8"
            alt="pdf-thum"
          />
          <div className="flex flex-col">
            <div>Filename.pdf</div>
            <div>Last modified: 2023-07-15</div>
          </div>
        </div>
        <TrashIcon className="text-gray-500 size-6" />
      </div>
      <Button className=" border p-4 rounded-full w-full border-gray-600">
        File upload
      </Button>
    </div>
  );
};

export default StepCheckRisks;

StepCheckRisks.propTypes = {
  setNavTitle: PropTypes.func.isRequired, // Required
};
