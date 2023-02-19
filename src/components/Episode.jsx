import { useEffect, useState, useRef, useLayoutEffect } from "react";
import CharacterAvatar from "./CharacterAvatar";
import styles from "./Episode.module.css";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import getEpisodesCharacters from "../util/getEpisodeCharacters";
import AnimatedCharacterBox from "./AnimatedCharBox";
import { Icon, stepLabelClasses } from "@mui/material";

const Episode = ({ episode, value }) => {
  const { characterContext } = useContext(DataContext);
  const { setCharacterContext } = useContext(DataContext);
  const [show, setShow] = useState(false);
  const [episodeCharacters, setEpisodeCharacters] = useState([]);
  const [animatedCharacters, setAnimatedCharacters] = useState([]);
  const [stoppedCharacters, setStoppedCharacters] = useState([]);
  const [episodeCardWidth, setEpisodeCardWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isFromEpisode = true;

  const ref = useRef(null);
  const refEpisodeCard = useRef(null);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setAnimatedCharacters((prev) =>
      prev.filter(
        (animated) =>
          !stoppedCharacters.some((stopped) => stopped.id === animated.id)
      )
    );
  }, [stoppedCharacters]);

  useEffect(() => {
    if (windowWidth < 752) {
      setAnimatedCharacters(episodeCharacters);
      setStoppedCharacters([]);
    }
  }, [windowWidth]);

  useLayoutEffect(() => {
    setEpisodeCardWidth(refEpisodeCard.current.offsetWidth);
  }, []);

  const scroll = () => {
    if (value !== null) {
      if (value.id == ref.current.id) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  useEffect(() => {
    scroll();
  }, [value]);

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
          <span className={styles.episodeDate}>
            {episode.episode}, {episode.air_date}
          </span>
        </div>
        <div
          onClick={() => {
            showCharacters(episode.characters);
            setShow(!show);
            setStoppedCharacters([]);
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
                <div style={{ width: "200px" }}>
                  <CharacterAvatar key={char.id} {...{ char, isFromEpisode }} />
                </div>
              ))}
          </div>

          <div
            className={styles.episode_charContainerOnWindowWidth}
            style={{
              height:
                (windowWidth > 752 && animatedCharacters.length) > 0
                  ? "800px"
                  : "auto",
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
                  windowWidth,
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
