import { Link, NavLink } from "react-router-dom";
import styles from "./Layout.module.css";
import footerImage from "../assets/mrpoopybutthole.png";
import { useRef, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import logo from "../assets/logo.png";
// import { red, white } from "@mui/material/colors";








const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#FFDD4A",
    },
  },
});

const Layout = ({ children }) => {
  

  const [random1, setRandom1] = useState(238332)
  const [random2, setRandom2] = useState(54769)
  const [random3, setRandom3] = useState(182095)
  const [random4, setRandom4] = useState(269063)
  const [random5, setRandom5] = useState(307310)
  const [random6, setRandom6] = useState(238332)
  const [random7, setRandom7] = useState(238332)
  const [random8, setRandom8] = useState(95215)

  const random = () => {
    return Math.floor((Math.random() * 1000000));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRandom1(random())
      setRandom2(random())
      setRandom3(random())
      setRandom4(random())
      setRandom5(random())
      setRandom6(random())
      setRandom7(random())
      setRandom8(random())
    }, 1500);
  
    return () => clearInterval(interval);
  }, []);



// let last = 0;
// let changeSpeed = 1500;
// let rAF;

//useFFEctel? a changespeed a dependecy, a now-t meg kell keresnem , h honnan szedem 

// function render(now) {
//   if (!last || now - last >= changeSpeed) {
//     last = now;
  
//       refLogo.current.style.borderTopLeftRadius = `${random()}px ${random()}px`;
//       refLogo.current.style.borderTopRightRadius = `${random()}px ${random()}px`;
//       refLogo.current.style.borderBottomLeftRadius = `${random()}px ${random()}px`;
//       refLogo.current.style.borderBottomRightRadius = `${random()}px ${random()}px`;
    
//   }
//   rAF = requestAnimationFrame(render);
// }



// render(last);
// console.log("NOW",now)

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div 
         
          className={styles.logoContainer}
          style={{
            borderTopLeftRadius: `${random1}px ${random2}px`,
            borderTopRightRadius : `${random3}px ${random4}px`,
            borderBottomLeftRadius : `${random5}px ${random6}px`,
            borderBottomRightRadius : `${random7}px ${random8}px`

          }}
          
          
          >
          <img className={styles.logo} src={logo} alt="" />
          </div>
          <div 
          className={styles.menu}
          // style={{
          //   borderTopLeftRadius: `${random8}px ${random5}px`,
          //   borderTopRightRadius : `${random2}px ${random6}px`,
          //   borderBottomLeftRadius : `${random5}px ${random7}px`,
          //   borderBottomRightRadius : `${random4}px ${random3}px`

          // }}
          
          >
            <NavLink to="/">Characters</NavLink>
            <NavLink to="episodes">Episodes</NavLink>
          </div>
        </header>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          <div
          className={styles.footerBlobDiv}
          style={{
            borderTopLeftRadius: `${random8}px ${random5}px`,
            borderTopRightRadius : `${random2}px ${random6}px`,
            borderBottomLeftRadius : `${random5}px ${random7}px`,
            borderBottomRightRadius : `${random4}px ${random3}px`

          }}
          
          ></div>
          <img className={styles.footerImage} src={footerImage} alt="" />
          <p>Rick&Morty Api</p>
        </footer>
      </div>
    </ThemeProvider>
  );
};
export default Layout;
