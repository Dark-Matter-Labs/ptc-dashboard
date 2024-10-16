import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { UserProvider } from "./UserProvider";
import { useTranslation } from "react-i18next";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import CreateEvent from "./components/CreateEvent";
import DisplayEvents from "./components/DisplayEvents";

import i18n from "./i18n";

function App() {
  const { t } = useTranslation();
  useEffect(() => {
    if (!i18n) {
      console.error("i18n is not initialized");
    }
  }, []);
  const handleChangeLanguage = (lng) => {
    console.log("calling handleChangeLanguage");

    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <UserProvider>
        <Navbar></Navbar>
        <h1>{t("home.follow-button")}</h1>
        <p>{t("home.availability")}</p>
        {/* <button
          className="p-4 m-2 bg-slate-300"
          onClick={() => handleChangeLanguage("en")}
        >
          English
        </button>
        <button
          className="p-4 m-2 bg-slate-300"
          onClick={() => handleChangeLanguage("ko")}
        >
          Korean
        </button> */}

        <div>
          <button
            className="p-4 m-2 bg-slate-300"
            onClick={() => handleChangeLanguage("en")}
          >
            English
          </button>
          <button
            className="p-4 m-2 bg-slate-300"
            onClick={() => handleChangeLanguage("ko")}
          >
            Korean
          </button>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/event/new" element={<CreateEvent />} />
          <Route path="/events" element={<DisplayEvents />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
