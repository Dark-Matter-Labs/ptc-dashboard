import { useContext } from "react";
import { SpaceContext } from "./SpaceProvider";
export function useSpace() {
  return useContext(SpaceContext);
}
