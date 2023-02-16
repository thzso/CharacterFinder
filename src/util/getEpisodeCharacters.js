import axios from "axios"

const getEpisodesCharacters =async(url)=>{
  let res= await axios.get(url)
// console.log("getepisodesCharacters, util : ",res);
  return res.data
}

export default getEpisodesCharacters