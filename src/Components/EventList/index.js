import { EventCard } from "../EventCard";
import "./index.css";
import haversineDistance from "../../Models/haversineDistance";

function EventList({ eventsArr, onClick, userLoc }) {
  const eventsArray = [...eventsArr].sort((a, b) => {
    //this function is going to sort the events based on their distance from the app user
    let userDistanceToA = haversineDistance(
      [a.lng, a.lat],
      [userLoc.lng, userLoc.lat],
      false
    );
    let userDistanceToB = haversineDistance(
      [b.lng, b.lat],
      [userLoc.lng, userLoc.lat],
      false
    );
    //the default output of the sort, if the return is positive, sort A => B, else if its a negative number, sort B => A
    return userDistanceToA - userDistanceToB;
  });

// console.log(eventsArr);

  return (
    <div className="cards-container">
      {eventsArray.map((item, index) => {
        return (
          <EventCard
            eventObj={item}
            key={index}
            onClick={onClick}
            userLoc={userLoc}
          />
        );
      })}
    </div>
  );
}

export default EventList;
