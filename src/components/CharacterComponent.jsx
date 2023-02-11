import styles from "./CharacterAvatar.module.css"
import { useState, useEffect } from "react";
import axios from "axios";

const CharacterComponent =({character})=>{


  // const [episodesArr, setEpisodesArr] = useState([]);

  // const episodesIds = character.episode
  //   .map((url) => (url = url.substring(url.lastIndexOf("/") + 1)))
  //   .join(",");

  // useEffect(() => {
  //   const getMultipleEpisodes = async (episodesId) => {
  //     let res = await axios(
  //       `https://rickandmortyapi.com/api/episode/${episodesId}`
  //     );
  //     console.log(res);
  //     setEpisodesArr(res.data);
  //   };
  //   getMultipleEpisodes(episodesIds);
  // }, []);

  // console.log("episodarray", episodesArr);


  return (
    <div className={styles.card}>
    <div className={styles.info}>

      <p>{character.name}</p>
      <p>Gender: {character.gender}</p>
      <p>
        Species: {character.species}{" "}
        {character.type && `, ${character.type}`}
      </p>
      <p>Origin: {character.origin.name}</p>
      {/* <p>Episodes: {episodesArr.map(ep => `${ep.name}, `)}</p> */}
      <p>{character.status}</p>
    </div>

    <img src={character.image} alt="" />
  </div>


  )
}

export default CharacterComponent