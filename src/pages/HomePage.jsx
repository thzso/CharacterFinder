import { useEffect, useState } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import Character from "../components/Character";
// import characterLoader from "../util/characterLoader";
import getNextPage from "../util/getNextPage";
import styles from "./Homepage.module.css";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import getData from "../util/getData";
import MuiAutocomplete from "../components/MuiAutocomplete.jsx";
// import { Autocomplete } from "@mui/material"
// import {TextField} from "@mui/material"
// import getSearchResults from "../util/getSearchResults"

const HomePage = () => {
  const loaderData = useRouteLoaderData("root");

  const { characterContext } = useContext(DataContext);
  const { setCharacterContext } = useContext(DataContext);
  const [data, setData] = useState(characterContext);
  const nextPage = characterContext[characterContext.length - 1].next;

  const [options, setOptions] = useState([]);

  const handleMore = () => {
    const getNextPageData = async () => {
      let newData = await getData(nextPage);

      // setNextPage(newData.info.next);
      let newCharactersData = newData.results;
      // console.log(newCharactersData);
      setData((prevData) => {
        return [...prevData, ...newCharactersData];
      });
    };
    getNextPageData();
  };

  // console.log("options homepageben : ", options)
  useEffect(() => {
    if (!characterContext.includes(data)) setCharacterContext([...data]);
  }, [data]);

  return (
    <div>
      <MuiAutocomplete {...{ options, setOptions }} />

      {options.length ? (
        <div className={styles.cardContainer}>
          {options.map((searchedChar) => (
            <Character key={searchedChar.id} char={searchedChar} />
          ))}
        </div>
      ) : (
        <div className={styles.cardContainer}>
          {data.map((char) => (
            <Link
              to={`${char.id}`}
              key={char.id}
              state={{ char, data, nextPage }}
            >
              <Character {...{ char }} />
            </Link>
          ))}

          <button onClick={handleMore}>More</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
