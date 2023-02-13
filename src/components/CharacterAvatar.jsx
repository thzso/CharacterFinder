import styles from "./CharacterAvatar.module.css";
import { useState } from "react";
import { height } from "@mui/system";
export default function Character({ char, isFromEpisode }) {

  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={`${styles.card} ${styles.grow}`}
      onClick={() => setClicked(!clicked)}
    >
      <img src={char.image} alt="" />
      <div  style={{ maxHeight: clicked? "": "10%"}} className={styles.info}>
        {char.name}
        
        
        
      {isFromEpisode && clicked && 
      <div>
        <p>{char.location.name}</p>
        <p>{char.gender}</p>
        <p>{char.species}</p>
      
      </div>}
        
        </div>
    </div>
  );
}
