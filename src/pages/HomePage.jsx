import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CharacterAvatar from "../components/CharacterAvatar";
import styles from "./Homepage.module.css";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import getData from "../util/getData";
import { Button } from "@mui/material";
import SearchInput from "../components/SearchInput";





const HomePage = () => {
  const { characterContext } = useContext(DataContext);
  const { setCharacterContext } = useContext(DataContext);
  const [data, setData] = useState(characterContext);
  const nextPage = characterContext[characterContext.length - 1].next;

  const [options, setOptions] = useState([]);

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
      <SearchInput {...{ options, setOptions }} />

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
        <>
          <div className={styles.cardContainer}>
            {data.map((char) => (
              <div key={char.id}className={styles.linkContainer}>
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
