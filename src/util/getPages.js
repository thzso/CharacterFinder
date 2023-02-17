import axios from "axios";

const getPages = async (value) => {
  const result = await axios.get(
    `https://rickandmortyapi.com/api/character/?name=${value}`
  );

  return result.data.info.pages;
};

export default getPages;
