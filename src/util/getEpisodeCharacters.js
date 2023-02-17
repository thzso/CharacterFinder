import axios from "axios"

const getEpisodesCharacters =async(url)=>{
  let res= await axios.get(url)
  return res.data
}

export default getEpisodesCharacters