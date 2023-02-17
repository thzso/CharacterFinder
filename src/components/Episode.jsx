import { useEffect, useState, useRef, useLayoutEffect } from "react";
import CharacterAvatar from "./CharacterAvatar";
import styles from "./Episode.module.css";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import getEpisodesCharacters from "../util/getEpisodeCharacters";
import AnimatedCharacterBox from "./AnimatedCharBox";
import { Icon } from "@mui/material";

const Episode = ({ episode, value }) => {
  const { characterContext } = useContext(DataContext);
  const { setCharacterContext } = useContext(DataContext);
  const [show, setShow] = useState(false);
  const [episodeCharacters, setEpisodeCharacters] = useState([]);
  const [animatedCharacters, setAnimatedCharacters] = useState([]);
  const [stoppedCharacters, setStoppedCharacters] = useState([]);
  const [episodeCardWidth, setEpisodeCardWidth] = useState(0);



  useEffect(() => {
    console.log("bejött");
    setAnimatedCharacters((prev) =>  prev.filter((animated) =>!stoppedCharacters.some((stopped) => stopped.id === animated.id)));
  }, [stoppedCharacters]);

  // const [scrollId, setScrollId] = useState()
  const isFromEpisode = true;

  const ref = useRef(null);
  const refEpisodeCard = useRef(null);

  // console.log(episodeCardWidth);

  useLayoutEffect(() => {
    setEpisodeCardWidth(refEpisodeCard.current.offsetWidth);
  }, []);

  if (value !== undefined) {
    if (value == ref.current.id) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const showCharacters = async () => {
    let idOfChars = episode.characters
      .map((url) => (url = url.substring(url.lastIndexOf("/") + 1)))
      .join(",");

    const url = "https://rickandmortyapi.com/api/character/" + idOfChars;
    let charsOfEpisodedata = await getEpisodesCharacters(url);

    setEpisodeCharacters(charsOfEpisodedata);
    setAnimatedCharacters(charsOfEpisodedata);
  };

  return (
    <div ref={refEpisodeCard} className="episodeCard">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div ref={ref} id={episode.id} className={styles.espisodeInfo}>
          <span className={styles.title}>{episode.name}</span>
          <span>
            {episode.episode}, {episode.air_date}
          </span>
        </div>
        <div
          onClick={() => {
            showCharacters(episode.characters);
            setShow(!show);
          }}
        >
          {/* <span> Characters </span> */}
          {!show ? (
            <Icon
              className="episodeCopmponent_arrow-icon"
              style={{ color: "#df7fd5", fontSize: "3rem !important" }}
            >
              expand_more
            </Icon>
          ) : (
            <Icon style={{ color: "#df7fd5", fontSize: "3rem" }}>
              expand_less
            </Icon>
          )}
        </div>
      </div>
      {show && (
        <div className={styles.episodeCharactersContainer}>
          <div className={styles.episode_stoppedChars}>
            {stoppedCharacters.length !== 0 &&
              stoppedCharacters.map((char) => (
                <div
                onClick={()=> console.log("click", char.id)}
                
                >
                  
                  <CharacterAvatar
                    key={char.id}
                    {...{ char, isFromEpisode }}
                  />
                </div>
              ))}
          </div>
          {/* <span >Click a character to make it stop!</span> */}

          <div
            style={{
              position: "relative",
              margin: "0 ",
              padding: "0",
              height: animatedCharacters.length > 0 ? "800px" : "0",
            }}
          >
            {animatedCharacters.map((char) => (
              <AnimatedCharacterBox
                key={char.id}
                {...{
                  char,
                  isFromEpisode,
                  episodeCardWidth,
                  stoppedCharacters,
                  setStoppedCharacters,
                }}
              />
            ))}
          </div>
        </div>
      )}
      <hr />
    </div>
  );
};

export default Episode;
