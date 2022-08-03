import * as React from "react";
import logo from "../../Assets/turnuplogo.svg";
import "./index.css";
import EventList from "../EventList";

export default function EventOverlay({ onClick, eventsArr }) {
  return (
    <>
      <div className="event-background"></div>
      <div className="background-container">
        <img src={logo} alt="turnup logo" className="event-logo"></img>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        ></input>
        <div className="event-list-div">
          <EventList eventsArr={eventsArr} onClick={onClick}></EventList>
        </div>
      </div>
    </>
  );
}
