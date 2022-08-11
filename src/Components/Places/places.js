import React, { useState, useEffect } from "react";

import ReactDOM from "react-dom";

import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

import usePlacesAutocomplete from "use-places-autocomplete";


import "./styles.css";
// import "react-google-places-autocomplete/dist/assets/index.css";

//==================WORKING SEARCHBAR WITH AUTOCOMPLETE========================

export default function Places({ setCoordFunction }) {
  let lat;
  let lng;
  const [rows, setRows] = useState([]);
  const [value, setValue] = useState();
  const [coord, setCoord] = useState({ lat: 0, lng: 0, address: "" });

  const LatLng = { lat, lng };

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
//============================================================================

//====================COMBOBOX EXAMPLE============================================

// import { useState } from "react";
// import {
//   GoogleMap,
//   useLoadScript,
//   LoadScript,
//   MarkerF,
// } from "@react-google-maps/api";
// import { useMemo } from "react";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";

// export default function Places() {
//   // const { isLoaded } = useLoadScript({
//   //   googleMapsApiKey: "AIzaSyDJresVS0RQllmIQivLkPz5xNeP19P4pOQ",
//   //   libraries: ["places"],
//   // });

//   // if (!isLoaded) return <div>Loading...</div>;
//   // return <Map />;

//   // function Map() {
//   const center = useMemo(() => ({ lat: 43.43, lng: -80.49 }), []);
//   const [selected, setSelected] = useState(null);

//   const mapStyles = {
//     height: "90%",
//     width: "90%",
//     position: "absolute",
//   };
//   return (
//     <>
//       <div className="places-container">
//         {<PlacesAutocomplete setSelected={setSelected} />}
//       </div>
//       <LoadScript googleMapsApiKey="AIzaSyDJresVS0RQllmIQivLkPz5xNeP19P4pOQ">
//         <GoogleMap
//           zoom={10}
//           centre={center}
//           mapContainerClassName="map-container"
//           mapContainerStyle={mapStyles}
//         >
//           {selected && <MarkerF position={selected} />}
//         </GoogleMap>
//       </LoadScript>
//     </>
//   );
// }
// // }

// const PlacesAutocomplete = ({ setSelected }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     const results = await getGeocode({ address });
//     const { lat, lng } = await getLatLng(results[0]);
//     setSelected({ lat, lng });
//   };

//   return (
//     <Combobox onSelect={handleSelect}>
//       <ComboboxInput
//         value={value}
//         onChange={(event) => setValue(event.target.value)}
//         disabled={!ready}
//         className="combobox-input"
//         placeholder="search an address"
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "ok" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// }
