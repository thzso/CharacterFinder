import styles from "./CharacterAvatar.module.css";
import { useState } from "react";

export default function Character({ char, isFromEpisode, clickedChar }) {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={`${styles.card} ${styles.grow}`}
      onClick={() => setClicked(!clicked)}
    >
      <img src={char.image} alt="" />
      <div className={!clickedChar ? styles.info : styles.infoStatic}>
        <span>{char.name}</span>

        {isFromEpisode && clicked && (
          <div>
            <span>Origin: {char.location.name}</span>
            <span>Gender: {char.gender}</span>
            <span>Species: {char.species}</span>
          </div>
        )}
      </div>
    </div>
  );
}
