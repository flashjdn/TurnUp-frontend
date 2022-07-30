import { EventCard } from "../EventCard";
import "./index.css";

function EventList({ eventsArr }) {
  console.log(eventsArr);
  const eventsArray = [...eventsArr];
  return (
    <div className="cards-container">
      {eventsArray.map((item, index) => {
        return <EventCard eventObj={item} key={index} />;
      })}
    </div>
  );
}

export default EventList;
