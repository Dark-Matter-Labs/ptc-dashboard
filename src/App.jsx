import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import CreateEvent from "./components/CreateEvent";
import DisplayEvents from "./components/DisplayEvents";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <div>
      <UserProvider>
        <Navbar></Navbar>
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
