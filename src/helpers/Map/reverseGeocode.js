export const reverseGeocode = async (lat, lng) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`
  );
  const data = await response.json();
  return data;
};
