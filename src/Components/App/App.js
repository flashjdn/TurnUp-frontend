import "./App.css";
// import Card from "../Card";
// import Navbar from "../Navbar";
import LandingPage from "../Home";
import Explore from "../Explore";
import Profile from "../Profile";
import NewEventForm from "../AddEventCard";
// import { eventObject } from "../../lib/dummy.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";


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
        </Routes>
      </BrowserRouter>
      {/* <Card path="/card"
        eventName={eventObject.eventName}
        eventDate={eventObject.eventDate}
        eventOrganiser={eventObject.eventOrganiser}


      /> */}

      {/* </header> */}
    </div>
  );
}

export default App;
