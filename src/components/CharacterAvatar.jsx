import styles from "./Character.module.css";
import { useState } from "react";
export default function Character({ char, isFromEpisode }) {

  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={`${styles.card} ${styles.grow}`}
      onClick={() => setClicked(!clicked)}
    >
      <img src={char.image} alt="" />
      <div className={styles.info}>{char.name}</div>
      {isFromEpisode && clicked && <div>
        <p>{char.location.name}</p>
        <p>{char.gender}</p>
        <p>{char.species}</p>
      
      </div>}
    </div>
  );
}
