import { EventCard } from "../EventCard";
import "./index.css";

function EventList({ eventsArr, onClick, userLoc }) {
  const eventsArray = [...eventsArr];

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
