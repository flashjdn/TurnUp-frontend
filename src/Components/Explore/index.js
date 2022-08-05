import MapContainer from "../MapContainer";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import EventOverlay from "../EventOverlay/index.js";
import { Amplify } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { dummyEvents } from "../../lib/dummyEvents";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../../aws-exports";
import MainEventCard from "../MainEventCard";
Amplify.configure(awsExports);
Amplify.configure(awsconfig);

function Explore(signOut, user) {

  const [eventsArr, setEventsArr] = useState(dummyEvents);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**************************DUMMY DATA ALERT***************************** */
  // const coordinates = { lat: 53.22738449126366, lng: 20.923854902697684 };
  /*_______________________________________________________________________*/
  useEffect(() => {
    let searchResults = [];
    for (let i = 0; i < dummyEvents.length; i++) {
      if (dummyEvents[i].eventName.toLowerCase().includes(userInput) === true) {
        searchResults.push(dummyEvents[i])
      } else if (dummyEvents[i].mainDescription.toLowerCase().includes(userInput) === true) {
        searchResults.push(dummyEvents[i])
      } else if (dummyEvents[i].eventDescription.toLowerCase().includes(userInput) === true) {
        searchResults.push(dummyEvents[i])
      }
    }
    setEventsArr(searchResults);
  }, [userInput]);




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
        setLocation(position);
      }
    }
  }

  function markerClickHandler(markerEventId) {
    for (let i = 0; i < eventsArr.length; i++) {
      if (eventsArr[i].eventId === markerEventId) {
        setPopUp(eventsArr[i]);
        setLocation(userLocation);
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
        markerOnClick={markerClickHandler}
      ></MapContainer>
      <EventOverlay
        onClick={eventClickHandler}
        xClick={xClickReset}
        eventsArr={eventsArr}
        setUserInput={setUserInput}
      />
      {popUp ? (
        <MainEventCard eventObj={popUp} xClick={xClickReset}></MainEventCard>
      ) : null}
    </div>
  );
}

// export default Explore;
export default withAuthenticator(Explore);
// test
// pushing to main
//oh no
