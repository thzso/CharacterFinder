import styles from "./CharacterAvatar.module.css";
import { useState } from "react";
import { height } from "@mui/system";

export default function Character({ char, isFromEpisode, clickedChar}) {
  const [clicked, setClicked] = useState(false);



  return (
    <div
      className={`${styles.card} ${styles.grow}`}
      onClick={() => setClicked(!clicked)}
    >
      <img src={char.image} alt="" />
      <div
        style={{ maxHeight: clicked ? "" : "10%" }}
        className={!clickedChar ? styles.info : styles.infoStatic}
      >
       <span>{char.name}</span> 

        {isFromEpisode && clicked && (
          <div>
            <span style={{display: "block"}}>Origin: {char.location.name}</span>
            <span style={{display: "block"}}>Gender: {char.gender}</span>
            <span style={{display: "block"}}>Species: {char.species}</span>
          </div>
        )}
      </div>
    </div>
  );
}
