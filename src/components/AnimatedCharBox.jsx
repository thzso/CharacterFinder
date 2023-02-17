import styles from "./AnimatedCharacterBox.module.css";
import { useEffect, useRef, useState } from "react";
import CharacterAvatar from "./CharacterAvatar";

const AnimatedCharacterBox = ({ char, isFromEpisode, episodeCardWidth, stoppedCharacters, setStoppedCharacters }) => {
  const testRef = useRef(null);
  const [newHeightDimension, setNewHeightDimension] = useState(0);
  const [newWidthDimension, setNewWidthDimension] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [slower, setSlower] = useState(false);
  // const [clickedChar, setClickedChar] = useState(false)

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  // console.log("window",windowWidth)

  function makeNewPosition() {
    //   Get viewport dimensions (remove the dimension of the div)
    // nálam nem window, hanem befoglalódiv
    var h = 800 - testRef.current.clientHeight;
    var w = windowWidth - testRef.current.clientWidth;

    setNewHeightDimension(Math.floor(Math.random() * h));
    setNewWidthDimension(Math.floor(Math.random() * w));
  }
  // console.log(newHeightDimension, newWidthDimension)

  useEffect(() => {
    if (testRef.current.id % 2 === 0) {
      makeNewPosition();

      const interval = setInterval(() => {
        makeNewPosition();
      }, 3000);

      return () => clearInterval(interval);
    } else {
      makeNewPosition();

      const interval = setInterval(() => {
        makeNewPosition();
      }, 8000);

      return () => clearInterval(interval);
    }
  }, []);

  // function animateDiv(myclass){
  //   var newq = makeNewPosition();
  //   $(myclass).animate({ top: newq[0], left: newq[1] }, 5000,   function(){
  //     animateDiv(myclass);
  //   });

  // };

  return (
    <div
      ref={testRef}
      key={char.id}
      id={char.id}
      className={styles.testDiv}
      style={{
        position: "absolute",
        translate: `${newWidthDimension}px ${newHeightDimension}px`,
        transition: char.id % 2 === 0 ? "translate 3s" : "translate 8s",
        
      }}
     onClick={(e)=> setStoppedCharacters(prev => [...prev,char])}
    >

        <CharacterAvatar {...{ char, isFromEpisode }} />
      </div>
   
  );
};

export default AnimatedCharacterBox;
