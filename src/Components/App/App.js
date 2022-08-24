import "./App.css";
import LandingPage from "../Home";
import Explore from "../Explore";
import Profile from "../Profile";
import NewEventForm from "../AddEventCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Places from "../Places/places";

function App() {
  //production
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-event" element={<NewEventForm></NewEventForm>} />
          <Route path="/places" element={<Places></Places>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
