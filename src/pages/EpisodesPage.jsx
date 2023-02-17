import { useEffect, useState } from "react";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import styles from "./EpisodesPage.module.css";

import Episode from "../components/Episode";

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState([]);
  const [nextUrl, setNextUrl] = useState(
    "https://rickandmortyapi.com/api/episode"
  );
  const [value, setValue] = useState();

  useEffect(() => {
    const getEpisodes = async () => {
      let res = await axios.get(nextUrl);

      let labeledResult = res.data.results.map((obj) => ({
        ...obj,
        label: obj.name,
      }));

      setEpisodes((prev) => [...prev, ...labeledResult]);
      setNextUrl(res.data.info.next);
    };

    if (nextUrl) {
      getEpisodes();
    }
  }, [nextUrl]);

  return (
    <div className={styles.pageContainer} style={{ color: "white" }}>
      <div style={{ width: "20rem", margin: "auto" }}>
        <Autocomplete
          componentsProps={{
            paper: {
              sx: {
                backgroundColor: "rgb(255 255 255 / 85%)",
              },
            },
          }}
          ListboxProps={{
            className: "myCustomList",
          }}
          options={episodes}
          onChange={(event, newValue) => {
            setValue(newValue.id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="search episode"
              sx={{ button: { color: "#df7fd5" } }}
            />
          )}
        />
      </div>
      <div className={styles.episodesContainer}>
        {episodes.map((episode) => (
          <div className={styles.episode} key={episode.id}>
            <Episode {...{ episode, value }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodesPage;
