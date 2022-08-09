import { useState } from "react";
import { GoogleMap, useLoadScript, LoadScript, MarkerF } from "@react-google-maps/api";
import { useMemo } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";


export default function Places() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDJresVS0RQllmIQivLkPz5xNeP19P4pOQ",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;

  function Map() {
    const center = useMemo(() => ({ lat: 43.43, lng: -80.49 }), {});
    const [selected, setSelected] = useState(null);

    return (
      <>
        <div className="places-container">
          <PlacesAutocomplete setSelected={setSelected} />
        </div>

        <GoogleMap zoom={10} centre={center} mapContainerClassName="map-container">
          {selected && <MarkerF position={selected} />}
        </GoogleMap>
      </>
    )
  }
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  return
  <Combobox>
    <ComboboxInput value={value} onChange={e => setValue(e.targe.value)} disabled={!ready} />
  </Combobox>;
}
