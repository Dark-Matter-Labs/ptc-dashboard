import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { UserProvider } from "./UserProvider";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import SpaceDashboard from "./pages/Space/SpaceDashboard";
import RuleDashboard from "./pages/Rule/RuleDashboard";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Common/Navbar";
import CreateEvent from "./pages/Event/Create/CreateEvent";
import DisplayEvents from "./pages/Event/Display/DisplayEvents";
import DisplayNotifications from "./pages/Event/Display/DisplayNotifications";
import { API } from "./lib/PermissionEngine";
import Landing from "./pages/Landing/Landing";

function App() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [navTitle, setNavTitle] = useState(t("navigation.navigation-title")); // state to track current step
  const location = useLocation();
  const permissionEngineAPI = new API();

  // Determine if Navbar should be shown
  const showNavbar = location.pathname !== "/landing";

  // Reset navTitle when navigating back to "/"
  useEffect(() => {
    if (location.pathname === "/") {
      setNavTitle(t("navigation.navigation-title")); // Reset to default when on home page
      navigate("/landing");
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
        {showNavbar && (
          <Navbar
            navTitle={navTitle}
            currentLanguage={currentLanguage}
            handleChangeLanguage={handleChangeLanguage}
            permissionEngineAPI={permissionEngineAPI}
          />
        )}
        <Routes>
          <Route
            path="/landing"
            element={<Landing permissionEngineAPI={permissionEngineAPI} />}
          />
          <Route
            path="/space/:spaceId"
            element={
              <SpaceDashboard
                permissionEngineAPI={permissionEngineAPI}
                currentLanguage={currentLanguage}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                permissionEngineAPI={permissionEngineAPI}
                currentLanguage={currentLanguage}
              />
            }
          />
          <Route
            path="/profile/events"
            element={
              <DisplayEvents
                permissionEngineAPI={permissionEngineAPI}
                currentLanguage={currentLanguage}
              />
            }
          />
          <Route
            path="/notifications"
            element={
              <DisplayNotifications
                permissionEngineAPI={permissionEngineAPI}
                currentLanguage={currentLanguage}
              />
            }
          />
          <Route
            path="/event/new/:spaceId"
            element={
              <CreateEvent
                setNavTitle={setNavTitle}
                permissionEngineAPI={permissionEngineAPI}
                currentLanguage={currentLanguage}
              />
            }
          />
          <Route
            path="/rule/:ruleId"
            element={
              <RuleDashboard
                setNavTitle={setNavTitle}
                permissionEngineAPI={permissionEngineAPI}
                currentLanguage={currentLanguage}
              />
            }
          />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
