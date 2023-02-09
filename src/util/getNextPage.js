
//Ez sztem már nem is kell 

import axios from "axios"

const getNextPage = async(url)=> {
  const res = await axios.get(url)
  return res.data
}

export default getNextPage