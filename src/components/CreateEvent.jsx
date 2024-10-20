import { useUser } from "../useUser";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Stepper from "./Stepper";

// import { useState, useEffect } from "react";
export default function CreateEvent() {
  const { user } = useUser();
  const steps = 6; // number of steps
  const content = [
    <Step1 key={1} />,
    <Step2 key={2} />,
    <Step3 key={3} />,
    <Step4 key={4} />,
    <Step5 key={5} />,
    <Step6 key={6} />,
  ];

  return (
    <div className="text-center pt-2">
      <h1 className="text-2xl m-4 font-bold">Propose an event</h1>
      <div>
        {user ? (
          <Stepper numSteps={steps} stepContents={content} />
        ) : (
          // user is not logged in
          <div>Please log in.</div>
        )}
      </div>
    </div>
  );
}
