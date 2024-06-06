import { useMapEvents } from "react-leaflet";
import { reverseGeocode } from "../helpers/Map/reverseGeocode";
import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MapClickHandler = () => {
  const { setClickedLocations, isPlanifyPage } = useContext(GlobalContext);
  const [preventNewToast, setPreventNewToast] = useState(false);

  useMapEvents({
    click: async (event) => {
      if (!isPlanifyPage) {
        setPreventNewToast(false);
        if (!preventNewToast) {
          toast.warn("You can only add locations in Planify page", {
            style: {
              color: "#343a40",
              fontSize: "1.6rem",
              fontWeight: "600",
              textAlign: "center",
            },
          });
          setPreventNewToast(true);
        }
        return;
      }

      const lat = event.latlng.lat;
      const lng = event.latlng.lng;

      try {
        const locationData = await reverseGeocode(lat, lng);
        console.log(locationData);
        const country = locationData.address.country || "Unknown";
        const city =
          locationData.address.city ||
          locationData.address.town ||
          locationData.address.county ||
          locationData.address.village ||
          "Unknown";

        setClickedLocations((locations) => [
          ...locations,
          {
            position: [lat, lng],
            country,
            city,
            date: null,
            countryCode: locationData.address.country_code,
          },
        ]);
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    },
  });
  return (
    <ToastContainer
      closeOnClick={false}
      autoClose={2000}
      pauseOnHover={false}
    />
  );
};

export default MapClickHandler;
