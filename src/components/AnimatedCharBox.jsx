import styles from "./AnimatedCharacterBox.module.css";
import { useEffect, useRef, useState } from "react";
import CharacterAvatar from "./CharacterAvatar";

const AnimatedCharacterBox = ({
  char,
  isFromEpisode,
  setStoppedCharacters,
  windowWidth,
  episodeCardWidth,
}) => {
  console.log(episodeCardWidth);
  const testRef = useRef(null);
  const [newHeightDimension, setNewHeightDimension] = useState(0);
  const [newWidthDimension, setNewWidthDimension] = useState(0);

  let requestRef = useRef();
  const firstFrameTime = useRef(performance.now());

  let currentTime = 0;
  const animationDuration = 4000;

  // console.log("windowWiddth kívül",windowWidth)

  const makeNewPosition = () => {
    let h = 800 - 150;
    let w = windowWidth - 150;
    // console.log("w = ", w, "windowWidth =", windowWidth);
    setNewHeightDimension(Math.floor(Math.random() * h));
    setNewWidthDimension(Math.floor(Math.random() * w));
  };

  function render(now) {
    if (!firstFrameTime.current || now - currentTime >= animationDuration) {
      currentTime = now;
      firstFrameTime.current = now;

      makeNewPosition();
    }
    requestRef = requestAnimationFrame(render);
  }

  useEffect(
    () => {
      requestRef.current = requestAnimationFrame(render);
      return () => cancelAnimationFrame(requestRef.current);
    },
    [],
    [windowWidth]
  );

  return (
    <>
      {windowWidth >= 752 ? (
        <div
          ref={testRef}
          key={char.id}
          id={char.id}
          className={styles.testDiv}
          style={{
            position: "absolute",
            translate: `${newWidthDimension}px ${newHeightDimension}px`,
            transition: `${
              char.id % 2 === 0 ? "translate 3s" : "translate 8s"
            }`,
            overflow: "visible",
            width: "150px",
            height: "150px",
          }}
          onClick={(e) => setStoppedCharacters((prev) => [...prev, char])}
        >
          <img
            style={{ width: "150px", height: "150px", borderRadius: "100%" }}
            src={char.image}
            alt=""
          />
        </div>
      ) : (
        <div className={styles.animatedCharDivIfNotanimated}>
          <CharacterAvatar {...{ char, isFromEpisode }} />
        </div>
      )}
    </>
  );
};

export default AnimatedCharacterBox;
