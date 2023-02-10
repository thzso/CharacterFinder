import axios from axios

const getMultipleEpisodes =async(episodesId)=> {

  let res = await axios(`https://rickandmortyapi.com/api/episode/${episodesId}`)
  console.log(res)
  return res

}
export default getMultipleEpisodes