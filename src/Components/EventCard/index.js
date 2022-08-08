import "./index.css";

export const EventCard = ({ eventObj, onClick }) => {

  const tagsArray = ["kids", "dogs", "accessible"]

  return (
    <>
      <div
        className="card-one"
        onClick={() => {
          onClick({ lng: eventObj.lng, lat: eventObj.lat }, eventObj.eventid);
        }}
      >
        {" "}
        <img
          src={eventObj.eventimg}
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
              <p>{eventObj.distance}</p>
              <p>{eventObj.time}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
