import styles from "./Footer.module.css";

function Footer() {
  const curYear = calculateCurYear();
  return (
    <footer className={styles.footerContainer}>
      <p
        className={styles.footerText}
      >{` Copyright © ${curYear} by Mustafa Ceylan. All rights reserved.`}</p>
    </footer>
  );
}

export default Footer;

const calculateCurYear = () => {
  const date = new Date();
  return date.getFullYear();
};
