import { useEffect, useState} from "react";
import axios from "axios";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { HashLink } from "react-router-hash-link";
import { Autocomplete, TextField } from "@mui/material";

import Episode from "../components/Episode";

const EpisodesPage = () => {
  // let context = useContext(DataContext);
  // console.log(context.characterContext);

  // let testChar = context.characterContext.filter()

  const [episodes, setEpisodes] = useState([]);
  const [nextUrl, setNextUrl] = useState(
    "https://rickandmortyapi.com/api/episode"
  );
  const [value, setValue] = useState()



  console.log("value", value)


  useEffect(() => {
    const getEpisodes = async () => {
      let res = await axios.get(nextUrl);

      let labeledResult = res.data.results.map(obj => ({...obj, label: obj.name}))

      setEpisodes((prev) => [...prev, ...labeledResult]);
      setNextUrl(res.data.info.next);
    };

    if (nextUrl) {
      getEpisodes();
    }
  }, [nextUrl]);



  return (
    <div style={{ color: "white" }}>
      <div>
      <Autocomplete 
      options={episodes}
      onChange={(event, newValue) => {
        setValue(newValue.id);
      } }
      renderInput={(params) => <TextField {...params} label="search episode" sx={{ input: { color: 'white' } }}/>}
      />
    <HashLink smooth to="#43">ep 43</HashLink>
      </div>
      {episodes.map((episode) => (
        <div key={episode.id}>
<Episode {...{episode, value}} />
        </div>
      ))}
    </div>
  );
};

export default EpisodesPage;
