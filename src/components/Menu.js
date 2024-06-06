import { useContext } from "react";
import styles from "./Menu.module.css";
import GlobalContext from "../context/GlobalContext";
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Flag from "react-world-flags";
import Footer from "./Footer";

function Menu() {
  const {
    clickedLocations,
    setClickedLocations,
    isPlanifyPage,
    setIsPlanifyPage,
  } = useContext(GlobalContext);

  const handleRemoveItem = (indexToRemove) => {
    setClickedLocations((location) =>
      location.filter((_, index) => index !== indexToRemove)
    );
  };
  const handleDateChange = (date, indexToUpdate) => {
    setClickedLocations((locations) =>
      locations.map((location, index) =>
        index === indexToUpdate ? { ...location, date } : location
      )
    );
  };

  const handlePlanifyPage = () => {
    setIsPlanifyPage(true);
  };

  const handleCheckJourneyPage = () => {
    setIsPlanifyPage(false);
  };

  const today = new Date();

  const sortedLocations = [...clickedLocations].sort((a, b) => {
    if (!a.date) return -1;
    if (!b.date) return 1;
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div className={styles.menuContainerWrapper}>
      <div className={styles.menuContainer}>
        <div className={styles.menuLogo}>
          <a href="/">
            <img
              src="/JourneyPlanifyLogo.png"
              alt="JourneyPlanify"
              className={styles.logo}
            />
          </a>
        </div>
        <h2 className={styles.menuHeader}>EXPLORE YOUR JOURNEYS</h2>
        <div className={styles.buttonsContainer}>
          <button
            className={`${styles.headerBtn} ${
              isPlanifyPage ? styles.activeBtn : ""
            }`}
            onClick={handlePlanifyPage}
          >
            Planify
          </button>
          <button
            className={`${styles.headerBtn} ${
              isPlanifyPage ? "" : styles.activeBtn
            }`}
            onClick={handleCheckJourneyPage}
          >
            Journey Check
          </button>
        </div>

        {isPlanifyPage &&
          (clickedLocations.length === 0 ? (
            <p className={styles.emptyText}>
              Plan your journey by selecting destinations on the map...
            </p>
          ) : (
            <div className={styles.menuListContainer}>
              {clickedLocations.map((location, index) => (
                <div key={index} className={styles.menuListContentPlanify}>
                  <IoMdClose
                    className={styles.closeIcon}
                    onClick={() => handleRemoveItem(index)}
                  />
                  <Flag code={location.countryCode} height="16" />
                  <p className={styles.menuListContentText}>
                    {location.country}
                  </p>
                  <p className={styles.menuListContentText}>{location.city}</p>
                  <DatePicker
                    showIcon
                    className={styles.menuListContentDate}
                    selected={location.date}
                    onChange={(date) => handleDateChange(date, index)}
                    minDate={today}
                    placeholderText="Select date"
                  />
                </div>
              ))}
            </div>
          ))}

        {!isPlanifyPage &&
          (clickedLocations.length === 0 ? (
            <p className={styles.emptyText}>
              Before checking your journey, please use "Planify" to select your
              destinations on the map...
            </p>
          ) : (
            <div className={styles.menuListContainer}>
              {sortedLocations.map((location, index) => (
                <div key={index} className={styles.menuListContentJourneyCheck}>
                  <p className={styles.menuListContentNumber}>#{index + 1}</p>
                  <Flag code={location.countryCode} height="16" />
                  <p className={styles.menuListContentText}>
                    {location.country}
                  </p>
                  <p className={styles.menuListContentText}>{location.city}</p>
                  <DatePicker
                    showIcon
                    className={styles.menuListContentDate}
                    selected={location.date}
                    onChange={(date) => handleDateChange(date, index)}
                    minDate={today}
                    placeholderText="Select date"
                    readOnly
                  />
                </div>
              ))}
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default Menu;
