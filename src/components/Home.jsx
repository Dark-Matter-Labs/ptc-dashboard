import "../assets/css/Home.css";
import { useUser } from "../UserContext";
import Activity from "./Activity";
import Space from "./Space";
import Report from "./Report";

export default function Home() {
  const { user } = useUser();
  return (
    <>
      <Space></Space>
      <Activity></Activity>
      <Report></Report>
    </>
  );
}
