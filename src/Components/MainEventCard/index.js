import "./index.css"
import StarIcon from "@mui/icons-material/Star";

function MainEventCard ({eventObj, key}) {

    return (
        <div className="main-event-card">
        <img
          src={eventObj.eventImg}
          alt="the event"
          className="main-card-image"
        ></img>
         <h2>{eventObj.eventName}</h2>
         <div>
            <p>{eventObj.rating}</p>
            <StarIcon />
         </div>
         <p>{eventObj.mainDescription}</p>
         {eventObj.eventTags.map((item, index) => {
                return (
                  <div className="tag-box" key={index}>
                    <p>{item}</p>
                  </div>
                );
              })}
              <p>{eventObj.eventDistance}</p>
            <p>{eventObj.eventTime}</p>

        </div> 


)};
export default MainEventCard;