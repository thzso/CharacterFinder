import { useEffect, useState } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import CharacterAvatar from "../components/CharacterAvatar";
import getNextPage from "../util/getNextPage";
import styles from "./Homepage.module.css";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import getData from "../util/getData";
import MuiAutocomplete from "../components/MuiAutocomplete.jsx";
import { Button } from "@mui/material";

const HomePage = () => {
  const loaderData = useRouteLoaderData("root");

  const { characterContext } = useContext(DataContext);
  const { setCharacterContext } = useContext(DataContext);
  const [data, setData] = useState(characterContext);
  const nextPage = characterContext[characterContext.length - 1].next;

  const [options, setOptions] = useState([]);

  // console.log(options)

  const handleMore = () => {
    const getNextPageData = async () => {
      let newData = await getData(nextPage);

      let newCharactersData = newData.results;
      setData((prevData) => {
        return [...prevData, ...newCharactersData];
      });
    };
    getNextPageData();
  };

  useEffect(() => {
    if (!characterContext.includes(data)) setCharacterContext([...data]);
  }, [data]);

  return (
    <div className={styles.homepageContainer}>
      <MuiAutocomplete {...{ options, setOptions }} />

      {options.length ? (
        <div className={styles.cardContainer}>
          {options.map((searchedChar) => (
            <Link
              to={`search/${searchedChar.id}`}
              key={searchedChar.id}
              state={{ searchedChar }}
            >
              <CharacterAvatar key={searchedChar.id} char={searchedChar} />
            </Link>
          ))}
        </div>
      ) : (
        // <div
        //   style={{
        //     display: "flex",
        //     flexDirection: "column",
        //     justifyContent: "center",
        //   }}
        // >
        <>
          <div className={styles.cardContainer}>
            {data.map((char) => (
              <div className={styles.linkContainer}>
                <Link
                  to={`${char.id}`}
                  key={char.id}
                  state={{ char, data, nextPage }}
                >
                  <CharacterAvatar {...{ char }} />
                </Link>
              </div>
            ))}
          </div>
          <Button
            style={{
              border: "2px solid white",
              width: "fit-content",
              alignSelf: "center",
              margin: "3rem",
            }}
            onClick={handleMore}
          >
            More
          </Button>
        </>
      )}
    </div>
  );
};

export default HomePage;
