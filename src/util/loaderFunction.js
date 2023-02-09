import axios from "axios"


const loaderFunction = async()=>{
  const res = await axios.get("https://rickandmortyapi.com/api/character")

  let  next = res.data.info.next;
  let prev = res.data.info.prev;

  let charactersArray = res.data.results

  charactersArray.map(character => {
    character.next= next
    character.prev= prev
  })

  //ezt nem értem, de ennyitől már hozzá is adja a next és prev kulcsokat, hát jó!
  
  // console.log(charactersArray)
  // console.log("Loaderfunction",res)
  return res
}

export default loaderFunction