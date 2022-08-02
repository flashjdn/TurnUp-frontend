import MapContainer from "../MapContainer";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import EventOverlay from "../EventOverlay/index.js";
import { Amplify } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../../aws-exports";
import MainEventCard from "../MainEventCard";
Amplify.configure(awsExports);
Amplify.configure(awsconfig);

function Explore(signOut, user) {
  const [eventsArr, setEventsArr] = useState([
    {
      eventId: 0,
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
      organiser: "MerryInge",
      email: "M.Inge@gmail.com",
      address: "14 Anis Lane",
      lat: 51.50429287644996,
      lng: -0.07860452094441346,
    },
    {
      eventId: 1,
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
      organiser: "MerryInge",
      email: "M.Inge@gmail.com",
      address: "14 Anis Lane",
      lat: 47.602508712234524,
      lng: 3.5412595468827868,
    },
    {
      eventId: 2,
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
      organiser: "Ben",
      email: "BenDover@gmail.com",
      address: "6 Cocks Close",
      lat: 47.605623195531535,
      lng: 3.5208701897473174,
    },
    {
      eventId: 3,
      eventName: "Nick Cage fanclub party",
      eventDescription: "Bring your own Nicholas Cage cardboard cutout.",
      mainDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      eventImg:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.dailydot.com%2Fwp-content%2Fuploads%2Fa00%2Fb2%2Fb32e0d39036e2891848a4eed4ee81b72.jpg&f=1&nofb=1",
      eventTags: ["Nick Cage", "lgbt", "meeting"],
      eventDistance: "5km away",
      eventTime: "in 3 days",
      rating: 5,
      organiser: "John",
      email: "JohnCena@hotmail.com",
      address: "14 Anis Lane",
      lat: 47.592604513995454,
      lng: 3.53192040563478,
    },
    {
      eventId: 4,
      eventName: "Beer Festival",
      eventDescription: "I'm too tired to think of anything funny.",
      mainDescription:
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth",
      eventImg:
        "https://p2d7x8x2.stackpathcdn.com/wordpress/wp-content/uploads/2014/10/Craft-Beer.jpg",
      eventTags: ["dog friendly", "lgbt", "alcohol", "festival"],
      eventDistance: "1km away",
      eventTime: "in 4 days",
      rating: 1,
      organiser: "Jesus",
      email: "jesus.ch@gmail.com",
      address: "10 Hanus Lane",
      lat: 47.596612205676706,
      lng: 3.5331182122558964,
    },
  ]);

  /**************************DUMMY DATA ALERT***************************** */
  // const coordinates = { lat: 53.22738449126366, lng: 20.923854902697684 };
  /*_______________________________________________________________________*/

  const [location, setLocation] = useState({
    lat: 47.60011001977801,
    lng: 3.533434778585759,
  });

  const [userLocation, setUserLocation] = useState({
    lat: 47.60011001977801,
    lng: 3.533434778585759,
  });
  //This state takes in the object of the event clicked in EventOverlay
  const [popUp, setPopUp] = useState(undefined);

  //This function is passed down the tree to change the index of the even pop up
  function eventClickHandler(position, eventId) {
    for (let i = 0; i < eventsArr.length; i++) {
      if (eventsArr[i].eventId === eventId) {
        setPopUp(eventsArr[i]);
        setLocation({ lat: eventsArr[i].lat, lng: eventsArr[i].lng });
      }
    }
  }

  //function to close the pop up
  function xClickReset() {
    setPopUp(undefined);
    setLocation(userLocation);
  }

  window.addEventListener("load", () => {
    navigator.geolocation.getCurrentPosition(positionFound, positionNotFound);
    async function positionFound(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      console.log("something");
      setUserLocation({ lat: lat, lng: lng });
      setLocation({ lat: lat, lng: lng });
    }
    function positionNotFound(err) {
      console.log(err);
    }
  });

  return (
    <div>
      <Navbar />
      <MapContainer
        centerObj={location}
        eventsArr={eventsArr}
        userLocation={userLocation}
      ></MapContainer>
      <EventOverlay
        onClick={eventClickHandler}
        xClick={xClickReset}
        eventsArr={eventsArr}
      />
      {popUp ? (
        <MainEventCard eventObj={popUp} xClick={xClickReset}></MainEventCard>
      ) : null}
    </div>
  );
}

export default withAuthenticator(Explore);
// test
