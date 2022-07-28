import "./App.css";
import Card from "../Card";
import LandingPage from "./Components/Home";
import Explore from "./Components/Explore";
import Profile from "./Components/Profile";
import { eventObject } from "./lib/dummy";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      {/* <Card path="/card"
        eventName={eventObject.eventName}
        eventDate={eventObject.eventDate}
        eventOrganiser={eventObject.eventOrganiser}


      /> */}

      {/* </header> */}
    </div >
  );
}

export default App;
