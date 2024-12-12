import { createContext, useState } from "react";
export const SpaceContext = createContext();
import PropTypes from "prop-types";
export function SpaceProvider({ children }) {
  const [spaceId, setSpaceId] = useState("");
  return (
    <SpaceContext.Provider value={{ spaceId, setSpaceId }}>
      {children}
    </SpaceContext.Provider>
  );
}

SpaceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
