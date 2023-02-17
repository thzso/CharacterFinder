import axios from "axios";

const getOptions = async (page, value) => {
  const result = await axios.get(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${value}`
  );
  const labeledResult = result.data.results.map((obj) => ({
    ...obj,
    label: obj.name,
  }));
  return labeledResult;
};

export default getOptions;
