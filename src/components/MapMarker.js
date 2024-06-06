import { Marker, Popup } from "react-leaflet";

function MapMarker({ position }) {
  return (
    <Marker position={position}>
      <Popup>Selected Location</Popup>
    </Marker>
  );
}

export default MapMarker;
