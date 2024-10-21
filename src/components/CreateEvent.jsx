import { useUser } from "../useUser";
import Step1 from "./Step1";
import Stepper from "./Stepper";

// import { useState, useEffect } from "react";
export default function CreateEvent() {
  const { user } = useUser();
  const steps = 5; // number of steps
  const content = [
    <Step1 key={1} />,
    "Content for Step 2",
    "Content for Step 3",
    "Content for Step 4",
    "Content for Step 5",
  ];

  return (
    <div className="text-center pt-2">
      <h1 className="text-2xl m-4 font-bold">Propose an event</h1>
      <div className="">
        {user ? (
          <div>
            <Stepper numSteps={steps} stepContents={content} />
          </div>
        ) : (
          // user is not logged in
          <p>Please log in.</p>
        )}
      </div>
    </div>
  );
}
