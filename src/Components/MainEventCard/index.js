import "./index.css";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import FriendsAttending from "../FriendsAttending/index";
import dummyFriends from "../../lib/dummyFriends";
import { Button } from "@mui/material";

function MainEventCard({ eventObj, xClick, userId }) {
  const [expanded, setExpanded] = useState(false);
  const [tags, setTags] = useState(["kids", "dogs", "accessible"]);
  const [organiser, setOrganiser] = useState({
    username: "unknown",
    email: "unknown",
  });

  const [attendingButton, setAttendingButton] = useState("contained");
  const [peopleAttending, setPeopleAttending] = useState(dummyFriends);
  useEffect(() => {
    getTags(eventObj.eventid);
    getOrganiser(eventObj.organiser);
    getPeopleAttending(eventObj.eventid);
  }, [, eventObj.eventid]);

  const getTags = async (eventId) => {
    const res = await fetch(
      `https://turnupdb.herokuapp.com/events/tags/${eventId}`,
      {
        mode: "cors",
      }
    );
    console.log(res);
    const data = await res.json();
    setTags(data);
  };

  const getOrganiser = async (organiserId) => {
    const res = await fetch(
      `https://turnupdb.herokuapp.com/events/organiser/${organiserId}`,
      {
        mode: "cors",
      }
    );
    const data = await res.json();
    setOrganiser(data[0]);
  };

  function checkIfAttending() {}

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getPeopleAttending = async (eventId) => {
    const res = await fetch(
      `https://turnupdb.herokuapp.com/events/attendees/${eventId}`,
      {
        mode: "cors",
      }
    );
    const data = await res.json();
    setPeopleAttending(data);
  };

  async function handleAttendance(eventId, userId) {
    if (userId !== undefined && eventId !== undefined) {
      const attendeeObj = { eventid: eventId.eventid, userid: userId.userid };

      await fetch(`https://turnupdb.herokuapp.com/events/newatt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendeeObj),
      });
    }
  }

  return (
    <div className="main-event-card">
      <CloseIcon
        sx={{ position: "absolute", right: "1rem", top: "1rem" }}
        onClick={xClick}
      ></CloseIcon>
      <header className="main-card-header">
        <img
          src={eventObj.img}
          alt="the event"
          className="main-card-image"
        ></img>

        <h2>{eventObj.eventname}</h2>
      </header>

      <div className="main-bottom">
        <div className="main-info-bar">
          <p className="rating-style">{eventObj.date.substring(0, 10)}</p>
          <p className="rating-style">{eventObj.time.substring(0, 5)}</p>
          <p className="rating-style">{organiser.username}</p>
          <p className="rating-style">{organiser.email}</p>
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
              <Typography>{eventObj.maindescription}</Typography>
            </AccordionDetails>
          </Accordion>

          <div className="main-tag-container">
            {tags.map((item, index) => {
              return (
                <div className="main-tag-box" key={index}>
                  <p>{item.tagname}</p>
                </div>
              );
            })}
          </div>
          <Button
            variant={attendingButton}
            onClick={() => handleAttendance(eventObj, userId)}
            className="attending-btn"
          >
            I'll be there!
          </Button>
          <div className="main-friends-container">
            <FriendsAttending
              attendingGuests={peopleAttending}
            ></FriendsAttending>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainEventCard;
