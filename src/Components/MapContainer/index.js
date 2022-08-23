import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { CircleF, MarkerF } from "@react-google-maps/api";
import marker from "../../Assets/marker.png";
import userLoc from "../../Assets/userLoc.png";

function MapContainer(props) {
  const mapStyles = {
    height: "96%",
    width: "100%",
    position: "relative",
  };

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
    radius: 2000,
    zIndex: 1,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDJresVS0RQllmIQivLkPz5xNeP19P4pOQ">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={props.centerObj}
      >
        <CircleF
          // required
          center={props.userLocation}
          // required
          options={options}
        />

        <MarkerF
          position={props.userLocation}
          icon={userLoc}
          onClick={() => {
            props.markerOnClick(console.log("you clicked the user marker!"));
          }}
        />
        {props.eventsArr.map(function (item, index) {
          return (
            <MarkerF
              key={index}
              clickable
              animation="bounce"
              position={{ lat: Number(item.lat), lng: Number(item.lng) }}
              icon={marker}
              onClick={() => {
                props.markerOnClick(item.eventid);
              }}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
}
export default MapContainer;
