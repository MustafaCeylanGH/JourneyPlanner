import { MapContainer, TileLayer } from "react-leaflet";
import styles from "./Map.module.css";
import { useContext, useEffect, useState } from "react";
import { getLocation } from "../helpers/Map/getLocation";
import MapClickHandler from "./MapClickHandler";
import GlobalContext from "../context/GlobalContext";
import MapMarker from "./MapMarker";
import Loading from "./Loading";

function Map() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const { clickedLocations, isLoading, setIsLoading } =
    useContext(GlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getLocation(setCurrentPosition);
      } catch (error) {
        console.error("Error fetching location:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setIsLoading]);

  return (
    <div className={styles.mapContainer}>
      {currentPosition && (
        <MapContainer
          center={currentPosition}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          touchZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
          {clickedLocations.map((location, index) => (
            <MapMarker key={index} position={location.position} />
          ))}
        </MapContainer>
      )}
      {isLoading && <Loading />}
    </div>
  );
}

export default Map;
