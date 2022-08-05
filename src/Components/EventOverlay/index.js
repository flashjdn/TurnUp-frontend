import * as React from "react";
import logo from "../../Assets/turnuplogo.svg";
import "./index.css";
import EventList from "../EventList";
import Searchbar from "../Searchbar";

export default function EventOverlay({ onClick, eventsArr, setUserInput }) {
  return (
    <>
      <div className="event-background"></div>
      <div className="background-container">
        <img src={logo} alt="turnup logo" className="event-logo"></img>
        <Searchbar setUserInput={setUserInput} />
        <div className="event-list-div">
          <EventList eventsArr={eventsArr} onClick={onClick}></EventList>
        </div>
      </div>
    </>
  );
}
