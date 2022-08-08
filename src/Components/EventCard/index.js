import "./index.css";
import haversineDistance from "../../Models/haversineDistance.js";

export const EventCard = ({ eventObj, onClick, userLoc }) => {
  const tagsArray = ["kids", "dogs", "accessible"];
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
                {tagsArray.map((item, index) => {
                  return (
                    <div className="tag-box" key={index}>
                      <p>{item}</p>
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
