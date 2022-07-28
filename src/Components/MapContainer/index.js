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
/*
const { GoogleMap, LoadScript } = require("../../");
const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const mapContainerStyle = {
  height: "400px",
  width: "800px"
}

const center = {
  lat: -3.745,
  lng: -38.523
}

const options = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1
}

const onLoad = circle => {
  console.log('Circle onLoad circle: ', circle)
}

const onUnmount = circle => {
  console.log('Circle onUnmount circle: ', circle)
}

<ScriptLoaded>
  <GoogleMap
    id="circle-example"
    mapContainerStyle={mapContainerStyle}
    zoom={7}
    center={center}
  >
    <Circle
      // optional
      onLoad={onLoad}
      // optional
      onUnmount={onUnmount}
      // required
      center={center}
      // required
      options={options}
    />
  </GoogleMap>
</ScriptLoaded>*/
