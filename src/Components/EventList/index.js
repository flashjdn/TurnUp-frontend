import { EventCard } from "../EventCard";
import "./index.css";

function EventList({ eventsArr, onClick }) {
  const eventsArray = [...eventsArr];

  
  return (
    <div className="cards-container">
      {eventsArray.map((item, index) => {
        return <EventCard eventObj={item} key={index} onClick={onClick} />;
      })}
    </div>
  );
}

export default EventList;
