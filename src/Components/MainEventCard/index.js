import "./index.css";
import StarIcon from "@mui/icons-material/Star";

function MainEventCard({ eventObj }) {
  console.log(eventObj);
  return (
    <div className="main-event-card">
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
          <div className="another-div">
            <p>{eventObj.mainDescription}</p>
          </div>
          <div className="main-tag-container">
            {eventObj.eventTags.map((item, index) => {
              return (
                <div className="main-tag-box" key={index}>
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainEventCard;
