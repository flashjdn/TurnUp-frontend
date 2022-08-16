import "./index.css";
import haversineDistance from "../../Models/haversineDistance.js";
import { useEffect, useState } from "react";

export const EventCard = ({ eventObj, onClick, userLoc }) => {
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

  useEffect(() => {
    //getTags(eventObj.eventid);
    if (eventObj.eventid !== undefined) {
      getTags(eventObj.eventid);
    }
  }, []);

  let userDistance = haversineDistance(
    [eventObj.lng, eventObj.lat],
    [userLoc.lng, userLoc.lat],
    false
  );
  //CALCULATE DISTANCE BETWEEN THE USER AND THE EVENT
  return (
    <>
      <div
        className="card-one"
        onClick={() => {
          onClick(
            { lng: Number(eventObj.lng), lat: Number(eventObj.lat) },
            eventObj.eventid
          );
        }}
      >
        {" "}
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
    </>
  );
};
