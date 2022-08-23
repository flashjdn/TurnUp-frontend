import "./index.css";
import haversineDistance from "../../Models/haversineDistance.js";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

export const EventCard = ({ eventObj, onClick, userLoc, whatType, user }) => {
  const [tags, setTags] = useState([]);

  const [isDeleted, setIsDeleted] = useState(false);

  //get tags after event object is loaded, otherwise the tags break
  useEffect(() => {
    if (eventObj.eventid !== undefined) {
      getTags(eventObj.eventid);
    }
  }, [eventObj]);

  //the function calculates the distance between user and event in km. More info in the folder Models
  let userDistance = haversineDistance(
    [eventObj.lng, eventObj.lat],
    [userLoc.lng, userLoc.lat],
    false
  );

  //eventObj.date comes as yyyy-mm-dd + TIMEZONE. This snippet rearanges it to dd-mm-yyyy
  const [year, month, day] = eventObj.date.substring(0, 10).split("-");
  const adjustedDate = [day, month, year].join("-");

  //function definitions for this component:
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

  async function deleteAttendedEvent() {
    await fetch("https://turnupdb.herokuapp.com/events/deluserev", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        eventid: Number(eventObj.eventid),
        userid: Number(user.userid),
      }),
    });
    setIsDeleted(true);
  }

  async function deleteEvent() {
    await fetch("https://turnupdb.herokuapp.com/events/delev", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        eventid: Number(eventObj.eventid),
      }),
    });
    await fetch("https://turnupdb.herokuapp.com/events/deltags", {
      //
      method: "DELETE",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        eventid: Number(eventObj.eventid),
      }),
    });
    await fetch("https://turnupdb.herokuapp.com/events/delusev", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        eventid: Number(eventObj.eventid),
      }),
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
                <p>{adjustedDate}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
