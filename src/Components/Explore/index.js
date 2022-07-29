import MapContainer from "../MapContainer";
import Navbar from "../Navbar";
import { useState } from 'react';
import { DefaultCardExample } from "../Card";


export default function Explore() {

  /**************************DUMMY DATA ALERT***************************** */
  // const coordinates = { lat: 53.22738449126366, lng: 20.923854902697684 };
  /*_______________________________________________________________________*/

  const [location, setLocation] = useState({ lat: 47.60011001977801, lng: 3.533434778585759 })

  window.addEventListener("load", () => {
    navigator.geolocation.getCurrentPosition(positionFound, positionNotFound);
    async function positionFound(position) {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      setLocation({ lat: lat, lng: long })
    }
    function positionNotFound(err) {
      console.log(err);
    }
  });

  return (
    <div>
      <Navbar />
      {/* <MapContainer centerObj={location}></MapContainer> */}
      <DefaultCardExample/>
    </div>
  );
}

// test
