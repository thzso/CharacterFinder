import { useEffect, useState, useRef } from "react";
import getData from "../util/getData";
import Character from "./CharacterAvatar";
import styles from "./Episode.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import filterNewChars from "../util/filterNewChars";
import getEpisodesCharacters from "../util/getEpisodeCharacters";

const Episode = ({ episode, value }) => {
  console.log("epizódkártyában value :", value);

  const { characterContext } = useContext(DataContext);
  const { setCharacterContext } = useContext(DataContext);
  const [show, setShow] = useState(false);
  const [episodeCharacters, setEpisodeCharacters] = useState([]);
  // const [scrollId, setScrollId] = useState()
  const isFromEpisode = true;

  const ref = useRef(null);

  console.log(ref);

  if (value !== undefined) {
    console.log(value);
    console.log("ref.curr", ref.current);
    console.log("ref.curr.id : ", ref.current.id);
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
        <p>{episode.id}</p>
        <p>Episode : {episode.episode}</p>
        <p>Title: {episode.name}</p>
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
          <p>{episodeCharacters.length}</p>
          {episodeCharacters.map((char) => (
            <Character key={char.id} {...{ char, isFromEpisode }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Episode;
