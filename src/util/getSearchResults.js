// EZ NEM KELLL ASSZEM

import axios from "axios"


const getSearchResults = async(value, page)=> {


    const res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}&name=${value}`)
   

    const nextPage = res.data.info.next
    

    return res
  }



export default getSearchResults