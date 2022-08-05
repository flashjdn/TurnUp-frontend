import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { CircleF, MarkerF } from "@react-google-maps/api";
//import { useState } from "react";

/*passed to props:
 CenterCoord = {
  centerObj: { lat: number; lng: number };
};*/

function MapContainer(props) {
  const mapStyles = {
    height: "94vh",
    width: "100%",
    position: "absolute",
  };
  //const [mapState, setMapState] = useState(null);

  const options = {
    strokeColor: "#006390",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#fbb02d",
    fillOpacity: 0.15,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 4000,
    zIndex: 1,
  };

  const onLoad = (circle) => {
    console.log("Circle onLoad circle: ", circle);
  };

  const onUnmount = (circle) => {
    console.log("Circle onUnmount circle: ", circle);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDJresVS0RQllmIQivLkPz5xNeP19P4pOQ">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={14}
        center={props.centerObj}
      >
        {console.log(props.centerObj)}
        {console.log(props.userLocation)}
        <CircleF
          // optional
          onLoad={onLoad}
          // optional
          onUnmount={onUnmount}
          // required
          center={props.centerObj}
          // required
          options={options}
        />

        <MarkerF
          //onLoad={onLoad}
          position={props.userLocation}
          icon="https://i.postimg.cc/DfXqkmRL/human-location-svgrepo-com.png"
        />
        {props.eventsArr.map(function (item, index) {
          return (
            <MarkerF
              key={index}
              position={{ lat: item.lat, lng: item.lng }}
              //onLoad={onLoad}
              icon="https://i.postimg.cc/3x9Q98BD/placeholder-svgrepo-com.png"
              onClick={() => {
                props.markerOnClick(item.eventId);
              }}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
}
export default MapContainer;

//{ lat: 50.993625146749665, lng: - 0.11788521861601084 }
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
