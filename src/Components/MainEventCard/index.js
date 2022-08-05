import "./index.css";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import FriendsAttending from "../FriendsAttending/index";
import { useState } from "react";

function MainEventCard({ eventObj, xClick }) {
  console.log(eventObj);
  const [friendsAttending, setFriendsAttending] = useState([
    {
      profilePic:
        "https://i.pinimg.com/474x/fa/ba/54/faba5498b3167071dc93e22f3ce1e22a.jpg",
    },
    {
      profilePic:
        "https://i.pinimg.com/236x/63/a6/2d/63a62da7a2ad9a32e7db5f8079a770c9.jpg",
    },
  ]);
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
