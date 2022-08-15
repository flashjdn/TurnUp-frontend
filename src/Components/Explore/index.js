import MapContainer from "../MapContainer";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import EventOverlay from "../EventOverlay/index.js";
import { Amplify } from "aws-amplify";
import awsconfig from "../../aws-exports";
// import { dummyEvents } from "../../lib/dummyEvents";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../../aws-exports";
import MainEventCard from "../MainEventCard";
import { Auth } from "aws-amplify";
import { NewInfoBox } from "../NewInfoBox/index.js";
import Mask from "../Mask";
import "./styles.css";
Amplify.configure(awsExports);
Amplify.configure(awsconfig);

function Explore(signOut, user) {
  const [newUser, setNewUser] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [loadedUser, setLoadedUser] = useState({ userid: 0 });
  async function getUserFromAuth() {
    let userInfo = await Auth.currentUserInfo();
    setUserEmail(userInfo.attributes.email);
  }
  useEffect(() => {
    getUserFromAuth();
  }, []);

  useEffect(() => {
    isUserNew(userEmail);
  }, [userEmail]);
  async function isUserNew(email) {
    if (email !== "") {
      const res = await fetch(
        `https://turnupdb.herokuapp.com/events/userem/${email}`,
        {
          mode: "cors",
        }
      );
      const data = await res.json();
      if (data.length === 0) {
        setNewUser(true);
      } else {
        setLoadedUser(data[0]);
      }
    }
  }

  function submitNewUser() {
    setNewUser(false);
  }

  const [eventsArr, setEventsArr] = useState([
    {
      eventId: 10,
      eventName: "Bank Robbery",
      eventDescription: "Looking for a crew, hit me up.",
      mainDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      eventImg:
        "https://www.deweybrinkleylaw.com/wp-content/uploads/2016/04/bigstock-Hooded-Robber-With-A-Gun-And-A-78546158-768x513.jpg",
      eventTags: ["robbery", "accessible", "meeting", "recurring"],
      date: "2022-08-09",
      time: "20:00",
      rating: 1,
      organiser: "BePhucDat214",
      email: "bpd@gmail.com",
      address: "La Caixa Bank",
      lat: 28.41635985131634,
      lng: -16.547548522601453,
    },
  ]);
  const [userInput, setUserInput] = useState("");

  //this is the state that holds ALL the events loaded from the database. eventsArr is the one that is getting modified by search
  const [loadedEvents, setLoadedEvents] = useState([
    {
      eventid: 10,
      eventname: "Bank Robbery",
      eventdescription: "Looking for a crew, hit me up.",
      maindescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      img: "https://www.deweybrinkleylaw.com/wp-content/uploads/2016/04/bigstock-Hooded-Robber-With-A-Gun-And-A-78546158-768x513.jpg",
      eventtags: ["robbery", "accessible", "meeting", "recurring"],
      date: "2022-08-09",
      time: "20:00",
      rating: 1,
      organiser: "BePhucDat214",
      email: "bpd@gmail.com",
      address: "La Caixa Bank",
      lat: 28.41635985131634,
      lng: -16.547548522601453,
    },
  ]);

  useEffect(() => {
    let searchResults = [];
    for (let i = 0; i < loadedEvents.length; i++) {
      if (
        loadedEvents[i].eventname.toLowerCase().includes(userInput) === true
      ) {
        searchResults.push(loadedEvents[i]);
      } else if (
        loadedEvents[i].maindescription.toLowerCase().includes(userInput) ===
        true
      ) {
        searchResults.push(loadedEvents[i]);
      } else if (
        loadedEvents[i].eventdescription.toLowerCase().includes(userInput) ===
        true
      ) {
        searchResults.push(loadedEvents[i]);
      }
    }
    setEventsArr(searchResults);
  }, [userInput]);

  function loadPosition() {
    console.log("start of function for location");
    navigator.geolocation.getCurrentPosition(positionFound, positionNotFound);
    async function positionFound(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      setUserLocation({ lat: lat, lng: lng });
      setLocation({ lat: lat, lng: lng });
    }
    function positionNotFound(err) {
      console.log(err);
    }
  }

  const getEvents = async () => {
    const res = await fetch(`https://turnupdb.herokuapp.com/events/all`, {
      mode: "cors",
    });
    const data = await res.json();
    setEventsArr(data);
    setLoadedEvents(data);
  };

  const [location, setLocation] = useState({
    lat: 51.496681,
    lng: -0.050417,
  });

  const [userLocation, setUserLocation] = useState({
    lat: null,
    lng: null,
  });
  //This state takes in the object of the event clicked in EventOverlay
  const [popUp, setPopUp] = useState(undefined);

  //This function is passed down the tree to change the index of the even pop up
  function eventClickHandler(position, eventId) {
    for (let i = 0; i < eventsArr.length; i++) {
      if (eventsArr[i].eventid === eventId) {
        setPopUp(eventsArr[i]);
        setLocation(position);
      }
    }
  }

  function markerClickHandler(markerEventId) {
    for (let i = 0; i < eventsArr.length; i++) {
      if (eventsArr[i].eventid === markerEventId) {
        setPopUp(eventsArr[i]);
      }
    }
  }

  //function to close the pop up
  function xClickReset() {
    setPopUp(undefined);
    setLocation(userLocation);
  }

  useEffect(() => {
    getEvents();
    loadPosition();
  }, []);

  // {userLocation.lat ? true : false}

  return (
    <>
      <Mask loaded={userLocation.lat ? true : false} />
      <div className="explore">
        <Navbar />
        {newUser ? (
          <NewInfoBox
            closingFunction={submitNewUser}
            newUserEmail={userEmail}
          />
        ) : null}
        <MapContainer
          centerObj={location}
          eventsArr={eventsArr}
          userLocation={userLocation}
          markerOnClick={markerClickHandler}
        ></MapContainer>
        <EventOverlay
          onClick={eventClickHandler}
          xClick={xClickReset}
          eventsArr={eventsArr}
          setUserInput={setUserInput}
          userLoc={userLocation}
        />
        {popUp ? (
          <MainEventCard
            eventObj={popUp}
            xClick={xClickReset}
            userId={loadedUser}
          ></MainEventCard>
        ) : null}
      </div>
    </>
  );
}

// export default Explore;
export default withAuthenticator(Explore);
// test
// pushing to main
//oh no
// oh dear
