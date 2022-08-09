import { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
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
} from "react-widgets/Combobox";
import "react-widgets/Combobox/styles.css";

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

        <GoogleMap
          zoom={10}
          centre={center}
          mapContainerClassName="map-container"
        >
          {selected && <MarkerF position={selected} />}
        </GoogleMap>
      </>
    );
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

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.targe.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "ok" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
