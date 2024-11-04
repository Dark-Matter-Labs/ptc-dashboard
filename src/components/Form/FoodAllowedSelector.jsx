import { useState } from "react";
import { HandIcon } from "@heroicons/react/outline";
import { Button } from "@headlessui/react";
const DEBUG = false;
export const FoodAllowedSelector = () => {
  const [foodAllowed, setFoodAllowed] = useState(false);

  return (
    <div
      id="setup-question-about-food"
      className="border rounded-md h-auto p-4"
    >
      <div className="flex items-center gap-2 py-2 mb-2">
        <HandIcon className="w-6 h-auto" />
        <div className="block font-semibold">
          Will food or drinks be served at the event?
        </div>
      </div>
      {DEBUG && (
        <div className="bg-pink-300">
          <p>foodAllowed: {foodAllowed ? "true" : "false"}</p>
        </div>
      )}
      <div className="flex justify-between gap-4">
        <Button
          onClick={() => setFoodAllowed(true)}
          className={`flex-grow border p-4 rounded-[48px] ${foodAllowed ? "bg-slate-500" : ""}`}
        >
          Yes
        </Button>
        <Button
          onClick={() => setFoodAllowed(false)}
          className={`flex-grow p-4 rounded-[48px] ${foodAllowed ? "" : "bg-slate-500"}`}
        >
          No
        </Button>
      </div>
    </div>
  );
};
