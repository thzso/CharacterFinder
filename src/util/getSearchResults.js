import { useState } from "react"

import axios from "axios"


const getSearchResuts = async(value)=> {

  const res = await axios.get(`https://rickandmortyapi.com/api/character/?name=${value}`)

  console.log(res)
  return res

}
export default getSearchResuts