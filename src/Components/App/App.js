import "./App.css";
// import Card from "../Card";
// import Navbar from "../Navbar";
import LandingPage from "../Home";
import Explore from "../Explore";
import Profile from "../Profile";
import NewEventForm from "../AddEventCard";
// import { eventObject } from "../../lib/dummy.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Places from "../Places/places";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-event" element={<NewEventForm></NewEventForm>} />
          <Route path="/places" element={<Places></Places>} />
        </Routes>
      </BrowserRouter>
      {/* <Card path="/card"
        eventName={eventObject.eventName}
        eventDate={eventObject.eventDate}
        eventOrganiser={eventObject.eventOrganiser}


      /> */}
    </div>
  );
}

export default App;
