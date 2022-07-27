import "./App.css";
import Card from "./Components/Card";
// import LandingPage from "./Components/Home";
import { eventObject } from "./lib/dummy";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <LandingPage /> */}
        <Card
          eventName={eventObject.eventName}
          eventDate={eventObject.eventDate}
          eventOrganiser={eventObject.eventOrganiser}
        
          
        />
      </header>
    </div>
  );
}

export default App;
