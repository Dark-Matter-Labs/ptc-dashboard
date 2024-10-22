import { Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "./UserProvider";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import CreateEvent from "./components/CreateEvent";
import DisplayEvents from "./components/DisplayEvents";

function App() {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [navTitle, setNavTitle] = useState(t("navigation.navigation-title")); // state to track current step
  const location = useLocation();

  // Reset navTitle when navigating back to "/"
  useEffect(() => {
    if (location.pathname === "/") {
      setNavTitle(t("navigation.navigation-title")); // Reset to default when on home page
    } else if (location.pathname === "/event/new") {
      console.log("at route /event/new, ", t("create-event.navigation-title"));
      setNavTitle(t("create-event.navigation-title")); // Reset to default when on home page
    }
  }, [location.pathname, t]); // Re-run when the route changes

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    localStorage.setItem("i18nextLng", lng); // Store language in localStorage
  };
  return (
    <div>
      <UserProvider>
        <Navbar
          navTitle={navTitle}
          currentLanguage={currentLanguage}
          handleChangeLanguage={handleChangeLanguage}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/event/new"
            element={<CreateEvent setNavTitle={setNavTitle} />}
          />
          <Route path="/events" element={<DisplayEvents />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
