import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

/*passed to props:
 CenterCoord = {
  centerObj: { lat: number; lng: number };
};*/
function MapContainer(props) {
  const mapStyles = {
    height: "100%",
    width: "100%",
    position: "absolute",
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBfoRI7QkmzhSgXHoxVbguowVBzsWAn1G8">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={18}
        center={props.centerObj}
      />
    </LoadScript>
  );
}
export default MapContainer;
