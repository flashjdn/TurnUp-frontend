import MapContainer from "../MapContainer";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import EventOverlay from "../EventOverlay/index.js";
import { Amplify } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);
Amplify.configure(awsconfig);

function Explore(signOut, user) {
  /**************************DUMMY DATA ALERT***************************** */
  // const coordinates = { lat: 53.22738449126366, lng: 20.923854902697684 };
  /*_______________________________________________________________________*/

  const [location, setLocation] = useState({
    lat: 47.60011001977801,
    lng: 3.533434778585759,
  });

  function loadLocation() {
    window.addEventListener("load", () => {
      navigator.geolocation.getCurrentPosition(positionFound, positionNotFound);
      async function positionFound(position) {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        setLocation({ lat: lat, lng: long });
      }
      function positionNotFound(err) {
        console.log(err);
      }
    });
    console.log("map loaded");
  };

  useEffect(() => {
    loadLocation()
  }, []);

  return (
    <div>
      <Navbar />
      <MapContainer centerObj={location}></MapContainer>
      <EventOverlay />
    </div>
  );
}

export default withAuthenticator(Explore);
// test
