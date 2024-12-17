import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { UserProvider } from "./UserProvider";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSpace } from "./useSpace";
import i18n from "./i18n";
import SpaceDashboard from "./pages/Space/SpaceDashboard";
import RuleDashboard from "./pages/Rule/RuleDashboard";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Common/Navbar";
import CreateEvent from "./pages/Event/Create/CreateEvent";
import DisplayEvents from "./pages/Event/Display/DisplayEvents";
import DisplayNotifications from "./pages/Notification/Display/DisplayNotifications";
import DisplayEventResult from "./pages/Event/Display/DisplayEventResult";
import ReviewEvent from "./pages/Event/Review/ReviewEvent";
import DisplayAssginedEvents from "./pages/Event/Display/DisplayAssginedEvents";
import { API } from "./lib/PermissionEngine";
import Landing from "./pages/Landing/Landing";
import { navigateTo } from "./lib/util";

function App() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [navTitle, setNavTitle] = useState(t("navigation.navigation-title")); // state to track current step
  const location = useLocation();
  const [closeButtonLink, setCloseButtonLink] = useState("/");
  const permissionEngineAPI = new API();
  const { spaceId } = useSpace();

  // Determine if Navbar should be shown
  const showNavbar = location.pathname !== "/landing";

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    localStorage.setItem("i18nextLng", lng); // Store language in localStorage
  };

  // Reset navTitle when navigating back to "/"
  useEffect(() => {
    const pathname = window.localStorage.getItem("pathname");

    if (pathname && location.pathname !== pathname) {
      window.localStorage.removeItem("pathname");
      window.location.href = pathname;
    } else if (pathname && location.pathname === pathname) {
      window.localStorage.removeItem("pathname");
    } else if (location.pathname === "/") {
      navigateTo({ navigate, pathname: "/landing" });
    }

    if (!localStorage.getItem("i18nextLng")) {
      handleChangeLanguage("en");
    }
  }, [location.pathname, t]); // Re-run when the route changes

  useEffect(() => {
    console.log("spaceId:", spaceId);
  }, [spaceId]);
  return (
    <div>
      <UserProvider>
        {showNavbar && (
          <Navbar
            navTitle={navTitle}
            currentLanguage={currentLanguage}
            handleChangeLanguage={handleChangeLanguage}
            permissionEngineAPI={permissionEngineAPI}
            closeButtonLink={closeButtonLink}
            setCloseButtonLink={setCloseButtonLink}
          />
        )}
        <Routes key={spaceId}>
          <Route
            path="/landing"
            element={
              <Landing
                permissionEngineAPI={permissionEngineAPI}
                currentLanguage={currentLanguage}
              />
            }
          />
          <Route
            path="/space/:spaceId"
            element={
              <SpaceDashboard
                setNavTitle={setNavTitle}
                permissionEngineAPI={permissionEngineAPI}
                currentLanguage={currentLanguage}
                setCloseButtonLink={setCloseButtonLink}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                permissionEngineAPI={permissionEngineAPI}
                currentLanguage={currentLanguage}
                setCloseButtonLink={setCloseButtonLink}
              />
            }
          />

          <Route
            path="/profile/events"
            element={
              <DisplayEvents
                permissionEngineAPI={permissionEngineAPI}
                currentLanguage={currentLanguage}
                setCloseButtonLink={setCloseButtonLink}
              />
            }
          />

          <Route
            path="/profile/event/:spaceEventId/result"
            element={
              <DisplayEventResult
                permissionEngineAPI={permissionEngineAPI}
                currentLanguage={currentLanguage}
                setCloseButtonLink={setCloseButtonLink}
              />
            }
          />

          <Route
            path="/events/assigned/:spaceId"
            element={
              <DisplayAssginedEvents
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
                setCloseButtonLink={setCloseButtonLink}
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
                setCloseButtonLink={setCloseButtonLink}
              />
            }
          />
          <Route
            path="/event/review/:spaceEventId"
            element={
              <ReviewEvent
                currentLanguage={currentLanguage}
                permissionEngineAPI={permissionEngineAPI}
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
                setCloseButtonLink={setCloseButtonLink}
              />
            }
          />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
