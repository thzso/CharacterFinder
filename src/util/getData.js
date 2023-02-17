import axios from "axios";

const getData = async (url) => {
  const res = await axios.get(url);
  console.log("getData", res);

  let charactersArray = res.data.results;
  let next = res.data.info.next;
  let prev = res.data.info.prev;

  charactersArray.map((character) => {
    character.next = next;
    character.prev = prev;
  });
  return res.data;
};

export default getData;
