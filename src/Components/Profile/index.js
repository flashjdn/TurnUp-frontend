import Navbar from "../Navbar";
import EventList from "../EventList/index.js";
import { useState } from "react";
import "./index.css";

export default function Profile() {
  const [organisedEvents, setOrganisedEvents] = useState([
    {
      eventName: "Concert for pople who smell bad",
      eventDescription:
        "Bring the stench of rotten cheese and farts with you. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. ",
      eventImg:
        "https://www.mensjournal.com/wp-content/uploads/mf/images-mf-210007-17933.jpg",
      eventTags: ["dog friendly", "lgbt", "clean toilets", "accessibility"],
      eventDistance: "4km away",
      eventTime: "in 2 days",
    },
    {
      eventName: "Grand Fiat Multipla Exhibition",
      eventDescription:
        "It's small, ugly and has performance issues, but i Ilke it. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth",
      eventImg:
        "https://www.carvertical.com/blog/assets/wp-content/uploads/2022/03/11150912/2a6ae38e-a841-43b8-b216-d19bd404c6fe_Fiat-Multipla-min.jpg",
      eventTags: ["dog friendly", "lgbt", "workshop"],
      eventDistance: "10km away",
      eventTime: "in 3 days",
    },
    {
      eventName: "Nick Cage fanclub party",
      eventDescription:
        "Bring your own Nicholas Cage cardboard cutout. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      eventImg:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.dailydot.com%2Fwp-content%2Fuploads%2Fa00%2Fb2%2Fb32e0d39036e2891848a4eed4ee81b72.jpg&f=1&nofb=1",
      eventTags: ["Nick Cage", "lgbt", "meeting"],
      eventDistance: "5km away",
      eventTime: "in 3 days",
    },
  ]);

  return (
    <div>
      <Navbar></Navbar>
      <h1>Profile</h1>
      <div className="profile-container">
        <div className="profile-left-side">
          <div className="profile-info">
            <p>Username: zyxxx123</p>
            <p>Email: xyz@gmail.com</p>
          </div>
          <div className="friends-list">
            <p>
              this neds to be a separate components with separate friends cards
            </p>
          </div>
        </div>
        <div className="profile-right-side">
          <h2>Events you organise:</h2>
          <EventList eventsArr={organisedEvents} />
        </div>
      </div>
    </div>
  );
}
