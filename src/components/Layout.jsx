import { NavLink } from "react-router-dom";
import styles from "./Layout.module.css";
import footerImage from "../assets/mrpoopybutthole.png";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const Layout = ({ children }) => {
  const [random1, setRandom1] = useState(238332);
  const [random2, setRandom2] = useState(54769);
  const [random3, setRandom3] = useState(182095);
  const [random4, setRandom4] = useState(269063);
  const [random5, setRandom5] = useState(307310);
  const [random6, setRandom6] = useState(238332);
  const [random7, setRandom7] = useState(238332);
  const [random8, setRandom8] = useState(95215);

  const random = () => {
    return Math.floor(Math.random() * 1000000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRandom1(random());
      setRandom2(random());
      setRandom3(random());
      setRandom4(random());
      setRandom5(random());
      setRandom6(random());
      setRandom7(random());
      setRandom8(random());
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div
          className={styles.logoContainer}
          style={{
            borderTopLeftRadius: `${random1}px ${random2}px`,
            borderTopRightRadius: `${random3}px ${random4}px`,
            borderBottomLeftRadius: `${random5}px ${random6}px`,
            borderBottomRightRadius: `${random7}px ${random8}px`,
          }}
        >
          <img className={styles.logo} src={logo} alt="" />
        </div>
        <div className={styles.menu}>
          <NavLink to="/">Characters</NavLink>
          <NavLink to="episodes">Episodes</NavLink>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <img className={styles.footerImage} src={footerImage} alt="" />
        <p></p>
        <div></div>
      </footer>
    </div>
  );
};
export default Layout;
