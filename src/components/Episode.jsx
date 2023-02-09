import { useEffect, useState } from "react";
import getData from "../util/getData";
import Character from "../components/Character";
import  styles from "./Episode.module.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import filterNewChars from "../util/filterNewChars";
import getEpisodesCharacters from "../util/getEpisodeCharacters";

const Episode = ({ episode }) => {


  const {characterContext} = useContext(DataContext)
  const {setCharacterContext} =useContext(DataContext)
  const [show, setShow] = useState(false);
  const [episodeCharacters, setEpisodeCharacters] = useState([]);
  const isFromEpisode = true

  const showCharacters = async () => {
    let idOfChars = episode.characters
      .map((url) => (url = url.substring(url.lastIndexOf("/") + 1)))
      .join(",");

    const url = "https://rickandmortyapi.com/api/character/" + idOfChars;
    let charsOfEpisodedata = await getEpisodesCharacters(url);
    console.log("res, getepisod: ", charsOfEpisodedata)
    
    setEpisodeCharacters(charsOfEpisodedata)

    
  };

  // useEffect(()=>{
  //   // let newChars = episodeCharacters.filter(charArrObj => !characterContext.some(contextObj=> contextObj.id===charArrObj.id))
  //   // console.log("new characters: ", newChars.length)

  //     setCharacterContext(prev => [...prev,...filterNewChars(episodeCharacters,characterContext)].sort((a,b)=> a.id - b.id))
    
  // },[episodeCharacters])
    // console.log("episode component characterContext : ",characterContext)
  return (
    <div className="episodeCard">
      <div className="espisodeInfo">
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
        <div className={styles.episodeCharactersContainer} style={{ display: "flex" }}>
          <p>{episodeCharacters.length}</p>
          {episodeCharacters.map((char) => (
          

            <Character key={char.id}  {...{ char, isFromEpisode }} />

           
            
         
            ))}
        </div>
      )}
    </div>
  );
};

export default Episode;
