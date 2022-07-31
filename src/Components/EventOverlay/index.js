import * as React from "react";
import logo from "../../Assets/turnuplogo.svg";
import "./index.css";
import EventList from "../EventList";
import { useState } from "react";
import { ChildFriendly } from "@mui/icons-material";

export default function EventOverlay() {
  const [eventsArr, setEventsArr] = useState([
    {
      eventName: "Long Gameboy Advance enthusiasts meeting",
      eventDescription:
        "Come see this long boi. On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.",
      eventImg:
        "https://images.nintendolife.com/c23e0dc684e6f/wide-gba.large.jpg",
      eventTags: ["dog friendly", "lgbt", "clean toilets"],
      eventDistance: "2km away",
      eventTime: "tommorow",
    },
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
      eventName: "The return of the banana",
      eventDescription:
        "Banana bending workshop included. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth",
      eventImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdzY_Ofzzp1UTUR3hEGVPOu3urAajfCg2oRg&usqp=CAU",
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
    {
      eventName: "Beer Festival",
      eventDescription:
        "I'm too tired to think of anything funny. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth",
      eventImg:
        "https://p2d7x8x2.stackpathcdn.com/wordpress/wp-content/uploads/2014/10/Craft-Beer.jpg",
      eventTags: ["dog friendly", "lgbt", "alcohol", "festival"],
      eventDistance: "1km away",
      eventTime: "in 4 days",
    },
  ]);
  return (
    <>
      <div className="event-background"></div>
      <div className="background-container">
        <img src={logo} alt="turnup logo" className="event-logo"></img>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        ></input>
        <EventList eventsArr={eventsArr}></EventList>
      </div>
    </>
  );
}
