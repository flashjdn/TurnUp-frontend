import Navbar from "../Navbar";
import EventList from "../EventList/index.js";
import FriendsList from "../FriendsList";
import { FriendsCard } from "../FriendsCard";
import { useState } from "react";
import "./index.css";
import { Button } from "@mui/material";

export default function Profile() {
  const [organisedEvents, setOrganisedEvents] = useState([
    {
      eventName: "Long Gameboy Advance enthusiasts meeting",
      eventDescription: "Come see this long boi.",
      mainDescription:
        "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.",
      eventImg:
        "https://images.nintendolife.com/c23e0dc684e6f/wide-gba.large.jpg",
      eventTags: ["dog friendly", "lgbt", "clean toilets"],
      eventDistance: "2km away",
      eventTime: "tomorrow",
      rating: 5,
      organiser: "Ben",
      email: "BenDover@gmail.com",
      address: "6 Cocks Close",
    },
    {
      eventName: "The Melonator World Tour",
      eventDescription: "Embrace the melon, be the melon.",
      mainDescription:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. ",
      eventImg:
        "https://runt-of-the-web.com/wordpress/wp-content/uploads/2016/04/melonator.jpg",
      eventTags: ["dog friendly", "lgbt", "clean toilets", "accessibility"],
      eventDistance: "km away",
      eventTime: "in 2 days",
      rating: 4,
      organiser: "John",
      email: "JohnCena@hotmail.com",
      address: "14 Anis Lane",
    },
    {
      eventName: "The return of the banana",
      eventDescription: "Banana bending workshop included.",
      mainDescription:
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth",
      eventImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdzY_Ofzzp1UTUR3hEGVPOu3urAajfCg2oRg&usqp=CAU",
      eventTags: ["dog friendly", "lgbt", "workshop"],
      eventDistance: "10km away",
      eventTime: "in 3 days",
      rating: 3,
      organiser: "Jesus",
      email: "jesus.ch@gmail.com",
      address: "10 Hanus Lane",
    },
  ]);

  const [user, setUser] = useState({
    id: 0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5GNLQ5Rq4_uCHZY7yxKiYXxjkkhro_aIbGQ&usqp=CAU",
    username: "Billie",
    email: "billie@microsoft.com",
  });
  return (
    <div>
      <Navbar></Navbar>
      <div className="profile-container">
        <div className="profile-left-side">
          <div className="profile-info">
            <img
              src={user.image}
              alt="users profile"
              className="profile-pic"
            ></img>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <Button variant="contained">Create Event</Button>
          </div>
          <div className="friends-list">
            <FriendsList />
          </div>
        </div>
        <div className="profile-right-side">
          <h2>Events you organise:</h2>
          <div className="crea-atten-buttons">
            <Button variant="contained">Events you attend</Button>
            <Button variant="contained">Events you organise</Button>
          </div>
          <EventList eventsArr={organisedEvents} />
        </div>
      </div>
    </div>
  );
}
