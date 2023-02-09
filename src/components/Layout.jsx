import { Link,NavLink } from "react-router-dom"
import styles from "./Layout.module.css"
import footerImage from "../assets/mrpoopybutthole.png"
import { useState } from "react"




const Layout =({children})=>{

  //https://rickandmortyapi.com/api/character/?name=ri&

  // const [options, setOptions] = useState([]);


  return(
    <div className={styles.container} >
    <header className={styles.header}>

      {/* <img className={styles.logo} src={logo} alt="" /> */}
<div className={styles.menu}>
        <NavLink to="/" >Characters</NavLink>
        <NavLink to="episodes">Episodes</NavLink>

</div>
    </header>


    




    <main className={styles.main}>{children}</main>

    <footer className={styles.footer}>
      <img className={styles.footerImage} src={footerImage} alt="" />
      <p>
      Rick&Morty Api
      </p>
      
       </footer>
    
       </div>
  )
}
export default Layout