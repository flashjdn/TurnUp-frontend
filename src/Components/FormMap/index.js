import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useMemo } from "react";

export default function FormMap() {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyDJresVS0RQllmIQivLkPz5xNeP19P4pOQ" })

  if (!isLoaded) return <div>Loading...</div>;
  return <FormMapContainer />;
}

function FormMapContainer() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="form-map-container">
      <MarkerF position={center} />
    </GoogleMap>
  );
}