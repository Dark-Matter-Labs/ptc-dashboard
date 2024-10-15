import { useUser } from "../UserContext";
import Stepper from "./Stepper";
// import { useState, useEffect } from "react";
export default function CreateEvent() {
  const { user } = useUser();
  const steps = 5; // number of steps
  const content = [
    "Content for Step 1",
    "Content for Step 2",
    "Content for Step 3",
    "Content for Step 4",
    "Content for Step 5",
  ];

  return (
    <div className="pt-8">
      {user ? (
        <div>
          <Stepper numSteps={steps} stepContents={content} />
        </div>
      ) : (
        // user is not logged in
        <p>Please log in.</p>
      )}
    </div>
  );
}
