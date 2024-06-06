export const getLocation = (setCurrentPosition) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCurrentPosition([latitude, longitude]);
      },
      () => {
        setCurrentPosition([51.505, -0.09]);
      }
    );
  } else {
    setCurrentPosition([51.505, -0.09]);
  }
};
