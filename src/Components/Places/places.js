import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import "./styles.css";

//==================WORKING SEARCHBAR WITH AUTOCOMPLETE========================

export default function Places({ setCoordFunction }) {
  const [rows, setRows] = useState([]);
  const [value, setValue] = useState();
  const [coord, setCoord] = useState({ lat: 0, lng: 0, address: "" });

  useEffect(() => {
    setCoordFunction(coord);
  }, [coord]);

  useEffect(() => {
    if (value) {
      geocodeByAddress(value.label).then((result) => {
        getLatLng(result[0]).then((googleCoord) =>
          setCoord({ ...googleCoord, address: value.value.description })
        );
      });
    }
  }, [value]);

  return (
    <div className="Places">
      <pre hidden>
        Coordinates: {coord.lat}, {coord.lng}
      </pre>
      <div className="places-search">
        <p> Enter your event location:</p>
        <GooglePlacesAutocomplete
          apiKey={"AIzaSyDJresVS0RQllmIQivLkPz5xNeP19P4pOQ"}
          placeholder="Type in an address"
          minLength={2}
          returnKeyType={"default"}
          selectProps={{
            value,
            onChange: setValue,
          }}
          onSelect={(result) => {
            const { description, place_id } = result;
            setRows([{ description, place_id }, ...rows]);
          }}
        />
      </div>
      <pre hidden>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
}
