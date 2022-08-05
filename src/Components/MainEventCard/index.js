import "./index.css";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import FriendsAttending from "../FriendsAttending/index";
import dummyFriends from "../../lib/dummyFriends";

function MainEventCard({ eventObj, xClick }) {
  console.log(eventObj);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [friendsAttending, setFriendsAttending] = useState(dummyFriends);

  return (
    <div className="main-event-card">
      <CloseIcon
        sx={{ position: "absolute", right: "1rem", top: "1rem" }}
        onClick={xClick}
      ></CloseIcon>
      <header className="main-card-header">
        <img
          src={eventObj.eventImg}
          alt="the event"
          className="main-card-image"
        ></img>

        <h2>{eventObj.eventName}</h2>
      </header>

      <div className="main-bottom">
        <div className="main-info-bar">
          <p className="rating-style">{eventObj.eventDistance}</p>
          <p className="rating-style">{eventObj.eventTime}</p>
          <p className="rating-style">{eventObj.organiser}</p>
          <p className="rating-style">{eventObj.email}</p>
          <p className="rating-style">{eventObj.address}</p>
          <div className="rating-style">
            <p>{eventObj.rating}</p>
            <StarIcon />
          </div>
        </div>
        <div className="main-right-container">
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ color: "text.secondary" }}>
                Description
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{eventObj.mainDescription}</Typography>
            </AccordionDetails>
          </Accordion>

          <div className="main-tag-container">
            {eventObj.eventTags.map((item, index) => {
              return (
                <div className="main-tag-box" key={index}>
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
          <div className="main-friends-container">
            <FriendsAttending
              attendingFriends={friendsAttending}
            ></FriendsAttending>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainEventCard;
