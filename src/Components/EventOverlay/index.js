import * as React from "react";
import logo from "../../Assets/turnuplogo.svg";
import "./index.css";
import EventList from "../EventList";
import { useState } from "react";
import { ChildFriendly } from "@mui/icons-material";

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
        <EventList eventsArr={eventsArr} onClick={onClick}></EventList>
      </div>
    </>
  );
}
