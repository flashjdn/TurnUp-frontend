import "./index.css";
import haversineDistance from "../../Models/haversineDistance.js";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export const EventCard = ({ eventObj, onClick, userLoc, whatType, user }) => {
  const [tags, setTags] = useState([]);
  const getTags = async (eventId) => {
    const res = await fetch(
      `https://turnupdb.herokuapp.com/events/tags/${eventId}`,
      {
        mode: "cors",
      }
    );
    const data = await res.json();
    setTags(data);
  };

  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    //getTags(eventObj.eventid);
    if (eventObj.eventid !== undefined) {
      getTags(eventObj.eventid);
    }
  }, [eventObj]);

  //CALCULATE DISTANCE BETWEEN THE USER AND THE EVENT
  let userDistance = haversineDistance(
    [eventObj.lng, eventObj.lat],
    [userLoc.lng, userLoc.lat],
    false
  );

  async function deleteAttendedEvent() {
    await fetch("https://turnupdb.herokuapp.com/events/deluserev", {
      //
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        eventid: Number(eventObj.eventid),
        userid: Number(user.userid),
      }), // body data type must match "Content-Type" header
    });
    setIsDeleted(true);
  }

  async function deleteEvent() {
    await fetch("https://turnupdb.herokuapp.com/events/delev", {
      //
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        eventid: Number(eventObj.eventid),
      }), // body data type must match "Content-Type" header
    });
    await fetch("https://turnupdb.herokuapp.com/events/deltags", {
      //
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        eventid: Number(eventObj.eventid),
      }), // body data type must match "Content-Type" header
    });
    await fetch("https://turnupdb.herokuapp.com/events/delusev", {
      //
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        eventid: Number(eventObj.eventid),
      }), // body data type must match "Content-Type" header
    });

    setIsDeleted(true);
  }

  return (
    <>
      {!isDeleted ? (
        <div
          className="card-one"
          onClick={() => {
            onClick(
              { lng: Number(eventObj.lng), lat: Number(eventObj.lat) },
              eventObj.eventid
            );
          }}
        >
          {whatType === "organised" ? (
            <Button
              onClick={deleteEvent}
              className="remove-event-button"
              sx={{ position: "absolute", right: "20px", top: "20px" }}
              variant="contained"
              size="small"
              color="error"
            >
              Delete event
            </Button>
          ) : null}
          {whatType === "attended" ? (
            <Button
              onClick={deleteAttendedEvent}
              className="remove-event-button"
              sx={{ position: "absolute", right: "20px", top: "20px" }}
              variant="contained"
              size="small"
              color="error"
            >
              I'm not coming
            </Button>
          ) : null}
          <img
            src={eventObj.img}
            alt="the event"
            className="card-one-image"
          ></img>
          <div className="bottom-event-section">
            <div className="event-name-box">
              <h2>{eventObj.eventname}</h2>
            </div>
            <div className="info-split">
              <div className="left-event-section">
                <div className="card-one-text">
                  <p>{eventObj.eventdescription}</p>
                </div>
                <div className="tags-div">
                  {" "}
                  {tags.map((item, index) => {
                    return (
                      <div className="tag-box" key={index}>
                        <p>{item.tagname}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="right-event-section">
                <p>{userDistance.toFixed(1)} km away</p>
                <p>{eventObj.time.substring(0, 5)}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
