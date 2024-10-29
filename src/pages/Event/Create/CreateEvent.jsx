import { useUser } from "../../../useUser";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Stepper from "../../../components//Common/Stepper";
import PropTypes from "prop-types";

export default function CreateEvent({ setNavTitle }) {
  const { user } = useUser();
  // const user = { name: "Shu", email: "shu@example.com" };
  const steps = 6; // number of steps
  const content = [
    <Step1 key={1} setNavTitle={setNavTitle} />,
    <Step2 key={2} setNavTitle={setNavTitle} />,
    <Step3 key={3} setNavTitle={setNavTitle} />,
    <Step4 key={4} setNavTitle={setNavTitle} />,
    <Step5 key={5} setNavTitle={setNavTitle} />,
    <Step6 key={6} setNavTitle={setNavTitle} />,
  ];

  return (
    <div className="text-center pt-2">
      <div>
        {user ? (
          <Stepper
            numSteps={steps}
            stepContents={content}
            setNavTitle={setNavTitle}
          />
        ) : (
          // user is not logged in
          <div className="mt-2">Please log in.</div>
        )}
      </div>
    </div>
  );
}
CreateEvent.propTypes = {
  setNavTitle: PropTypes.func,
};
