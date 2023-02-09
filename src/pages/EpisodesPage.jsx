import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import DataContext from "../context/DataContext";


import Episode from "../components/Episode";

const EpisodesPage = () => {
  // let context = useContext(DataContext);
  // console.log(context.characterContext);

  // let testChar = context.characterContext.filter()

  const [episodes, setEpisodes] = useState([]);
  const [nextUrl, setNextUrl] = useState(
    "https://rickandmortyapi.com/api/episode"
  );




  useEffect(() => {
    const getEpisodes = async () => {
      let res = await axios.get(nextUrl);

      setEpisodes((prev) => [...prev, ...res.data.results]);
      setNextUrl(res.data.info.next);
    };

    if (nextUrl) {
      getEpisodes();
    }
  }, [nextUrl]);



  return (
    <div style={{ color: "white" }}>
      {episodes.map((episode) => (
        <div key={episode.id}>
<Episode {...{episode}} />
        </div>
      ))}
    </div>
  );
};

export default EpisodesPage;
