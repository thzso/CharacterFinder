import axios from "axios";

const loaderFunction = async () => {
  const res = await axios.get("https://rickandmortyapi.com/api/character");

  let next = res.data.info.next;
  let prev = res.data.info.prev;

  let charactersArray = res.data.results;

  charactersArray.map((character) => {
    character.next = next;
    character.prev = prev;
  });

  return res;
};

export default loaderFunction;
