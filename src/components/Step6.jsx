import { Button, Textarea } from "@headlessui/react";
import { useState } from "react";
const Step6 = () => {
  const [riskAssessmentContent, setRiskAssessmentContent] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submission.");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 space-y-4 text-left">
        {/* Risk Assessment*/}
        <div>
          <div
            id="risk-assessment"
            className="text-2xl block mb-2 font-semibold "
          >
            Self-risk assessment
          </div>

          <p className="mb-4">
            Describe any potential safety risks associated with your event and
            how you plan to mitigate them. For example, preventing theft and
            damage of facilities, fire safety, crowd control, etc.
          </p>
          <Textarea
            id="risk-assessment-content"
            value={riskAssessmentContent}
            onChange={(e) => setRiskAssessmentContent(e.target.value)}
            className="w-full border rounded p-2 min-h-3 h-40"
          ></Textarea>
        </div>

        <hr className="my-6"></hr>

        <div
          id="insurabce-information"
          className="text-2xl block mb-2 font-semibold "
        >
          Insurance Information
        </div>
        <p className="mb-4">Upload proof of insurance</p>
        <Button className="border p-4 rounded-full w-full">File upload</Button>
      </form>
    </div>
  );
};

export default Step6;
