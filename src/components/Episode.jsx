import { useEffect, useState, useRef, useLayoutEffect } from "react";
import getData from "../util/getData";
import CharacterAvatar from "./CharacterAvatar";
import styles from "./Episode.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import filterNewChars from "../util/filterNewChars";
import getEpisodesCharacters from "../util/getEpisodeCharacters";
import AnimatedCharacterBox from "./AnimatedCharBox";
import { Icon } from "@mui/material";

const Episode = ({ episode, value }) => {
  const { characterContext } = useContext(DataContext);
  const { setCharacterContext } = useContext(DataContext);
  const [show, setShow] = useState(false);
  const [episodeCharacters, setEpisodeCharacters] = useState([]);
  const [episodeCardWidth, setEpisodeCardWidth] = useState(0);

  // const [scrollId, setScrollId] = useState()
  const isFromEpisode = true;

  const ref = useRef(null);
  const refEpisodeCard = useRef(null);

  console.log(episodeCardWidth);

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
            <Icon className ="episodeCopmponent_arrow-icon"style={{ color: "#df7fd5", fontSize: "3rem !important" }}>
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
        <div
          className={styles.episodeCharactersContainer}
          style={{ position: "relative", margin: "0 ", padding: "0" }}
        >
          {/* <span >Click a character to make it stop!</span> */}
          {episodeCharacters.map((char) => (
            <AnimatedCharacterBox
              key={char.id}
              {...{ char, isFromEpisode, episodeCardWidth }}
            />
          ))}
        </div>
      )}
      <hr />
    </div>
  );
};

export default Episode;
