import { Link } from "react-router-dom";
import styles from "./CharacterPage.module.css";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";
import getData from "../util/getData";
import CharacterComponent from "../components/CharacterComponent";
import { Icon } from "@mui/material";
import { Button } from "@mui/material";

export default function CharacterPage() {
  const { characterContext } = useContext(DataContext);
  const { setCharacterContext } = useContext(DataContext);

  const param = useParams();

  const character = characterContext.find((char) => char.id == param.id);

  const loadMoreData = async (url) => {
    let newdata = await getData(url);

    setCharacterContext((prev) => {
      return [...prev, ...newdata.results];
    });
  };

  const prevId = character.id - 1;

  const nextId =
    characterContext.find((element) => element.id === character.id + 1) ===
    undefined
      ? character.next !== "undefined"
        ? loadMoreData(character.next)
        : loadMoreData("https://rickandmortyapi.com/api/character?page=10")
      : character.id + 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.CharacterPageContainer}>
      <div className={styles.characterContainer}>
        {prevId !== 0 && (
          <Link to={`/${prevId}`}>
            <Icon>arrow_back_ios</Icon>
          </Link>
        )}
        <div className={styles.CharacterPageCharComponentCard}>
          <CharacterComponent {...{ character }} />
        </div>
        <Link to={`/${nextId}`}>
          <Icon>arrow_forward_ios</Icon>
        </Link>
      </div>

      <Link to={"/.."}>
        <Button
          style={{
            border: "2px solid white",
            width: "fit-content",
            alignSelf: "center",
            margin: "3rem",
          }}
        >
          Back to all characters
        </Button>
      </Link>
    </div>
  );
}
