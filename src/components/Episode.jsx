import { useEffect, useState, useRef } from "react";
import getData from "../util/getData";
import CharacterAvatar from "./CharacterAvatar";
import styles from "./Episode.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import filterNewChars from "../util/filterNewChars";
import getEpisodesCharacters from "../util/getEpisodeCharacters";

const Episode = ({ episode, value }) => {
  console.log(episode)

  const { characterContext } = useContext(DataContext);
  const { setCharacterContext } = useContext(DataContext);
  const [show, setShow] = useState(false);
  const [episodeCharacters, setEpisodeCharacters] = useState([]);
  // const [scrollId, setScrollId] = useState()
  const isFromEpisode = true;

  const ref = useRef(null);

 

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
    <div className="episodeCard">
      <div ref={ref} id={episode.id} className="espisodeInfo">
       
        <p>{episode.name}</p>
        <p>{episode.episode}, {episode.air_date}</p>
      </div>
      <button
        onClick={() => {
          showCharacters(episode.characters);
          setShow(!show);
        }}
      >
        Characters of this episode
      </button>
      {show && (
        <div
          className={styles.episodeCharactersContainer}
          style={{ display: "flex" }}
        >
          {episodeCharacters.map((char) => (
            <div className={styles.testDiv}>
            <CharacterAvatar key={char.id} {...{ char, isFromEpisode }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Episode;
