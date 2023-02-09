import { useLocation, useRouteLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./CharacterPage.module.css";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import getNextPage from "../util/getNextPage.js";
import DataContext from "../context/DataContext";
import getData from "../util/getData";
// a uselocationból a HomePage adatait veszem (next url, eddig lekérdezett karakterek array-e), kezdetben, egyszer használva , hogy legyen egy characterArray-em, onnantól a characterArray szolgáltatja az adatot(meg az urlt meg mindent)

export default function CharacterPage() {

  const { characterContext } = useContext(DataContext);
  const { setCharacterContext } = useContext(DataContext);


  const param = useParams();

  const character = characterContext.find((char) => char.id == param.id);

  const loadMoreData = async (url) => {
    console.log("bejött", url);
    let newdata = await getData(url);
    console.log(newdata);
    // itt majd berakni a szűrést!!:
    setCharacterContext((prev) => {
      return [...prev, ...newdata.results];
    });
  };


  const prevId = character.id - 1;


  //  console.log("find: ",characterContext.find(element => element.id === character.id+1))
  // const nextId = character.id < characterContext.length ? character.id + 1  :loadMoreData()
  const nextId =
    characterContext.find((element) => element.id === character.id + 1) ===
    undefined
      ? character.next !== "undefined"
        ? loadMoreData(character.next)
        : loadMoreData('https://rickandmortyapi.com/api/character?page=10')
      : character.id + 1;
  console.log(nextId);
 
  console.log("characterContext: ",characterContext);
  console.log(`https://rickandmortyapi.com/api/character/${character.id + 1}`);
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.info}>
          <p>
            {" "}
            ID: {character.id}, next: {character.next} prev: {character.prev}
          </p>
          <p>{character.name}</p>
          <p>Gender: {character.gender}</p>
          <p>
            Species: {character.species}{" "}
            {character.type && `, ${character.type}`}
          </p>
          <p>From: {character.origin.name}</p>
          <p>{character.status}</p>
        </div>

        <img src={character.image} alt="" />
      </div>
      {prevId !== 0 && (
        <Link to={`/${prevId}`}>
          <button>previous character</button>
        </Link>
      )}

      <Link to={`/${nextId}`}>
        <button>next character</button>
      </Link>

      <Link to={"/.."}>
        {" "}
        <button>Back to all characters</button>
      </Link>
    </div>
  );
}
