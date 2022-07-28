import MapContainer from "../MapContainer";
import Navbar from "../Navbar";

/**************************DUMMY DATA ALERT***************************** */
const coordinates = { lat: 53.22738449126366, lng: 20.923854902697684 };
/*_______________________________________________________________________*/

export default function Explore() {
  return (
    <div>
      <Navbar />
      <MapContainer centerObj={coordinates}></MapContainer>
    </div>
  );
}

// test
