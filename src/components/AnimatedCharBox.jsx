import styles from "./AnimatedCharacterBox.module.css";
import { useEffect, useRef, useState } from "react";
import CharacterAvatar from "./CharacterAvatar";

const AnimatedCharacterBox = ({
  char,
  isFromEpisode,
  episodeCardWidth,
  stoppedCharacters,
  setStoppedCharacters,
  windowWidth,
}) => {


  const testRef = useRef(null);
  const [newHeightDimension, setNewHeightDimension] = useState(0);
  const [newWidthDimension, setNewWidthDimension] = useState(0);
  const [slower, setSlower] = useState(false);

  function makeNewPosition() {
    //   Get viewport dimensions (remove the dimension of the div)

    var h = 800 - 150;
    var w = windowWidth - 150;
    setNewHeightDimension(Math.floor(Math.random() * h));
    setNewWidthDimension(Math.floor(Math.random() * w));
  }

  const initRandomPositions =()=>{
    if (windowWidth >= 752) {
      
      if (testRef.current.id % 2 === 0) {
        const interval = setInterval(() => {
          makeNewPosition();
        }, 3000);

        return () => clearInterval(interval);
      } else {
        // makeNewPosition();

        const interval = setInterval(() => {
          makeNewPosition();
        }, 8000);

        return () => clearInterval(interval);
      }
    }

  }


  useEffect(() => {
    makeNewPosition()
    initRandomPositions()
    
  }, [windowWidth], []);

  useEffect(()=>{

    console.log("useefect üres dep array")
  },[])

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
            transition: char.id % 2 === 0 ? "translate 3s" : "translate 8s",
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
