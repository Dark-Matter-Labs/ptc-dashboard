// useUser.jsx
import { useContext } from "react";
import { UserContext } from "./UserProvider"; // Import UserContext from UserProvider.jsx

export const useUser = () => {
  return useContext(UserContext);
};
