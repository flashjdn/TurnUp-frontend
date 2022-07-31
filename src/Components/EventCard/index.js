import "./index.css";
import Image from "../../Assets/road-to-milford-new-zealand-800w.jpeg";

export const EventCard = ({ eventObj, key }) => {
  console.log(eventObj);
  return (
    <>
      <div className="card-one">
        <img
          src={eventObj.eventImg}
          alt="the event"
          className="card-one-image"
        ></img>
        <div className="event-name-box">
          <h2>{eventObj.eventName}</h2>
        </div>
        <div className="bottom-event-section">
          <div className="left-event-section">
            <p className="card-one-text">{eventObj.eventDescription}</p>
            <div className="tags-div">
              {" "}
              {eventObj.eventTags.map((item, index) => {
                return (
                  <div className="tag-box">
                    <p>{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="right-event-section">
            <p>{eventObj.eventDistance}</p>
            <p>{eventObj.eventTime}</p>
          </div>
        </div>
      </div>
    </>
  );
};
