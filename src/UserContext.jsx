import { createContext, useState, useContext } from "react";

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext in any component
export const useUser = () => useContext(UserContext);

// Context provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Manage user state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
