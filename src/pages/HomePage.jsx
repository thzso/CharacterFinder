import { useEffect, useState } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import Character from "../components/Character";
// import characterLoader from "../util/characterLoader";
import getNextPage from "../util/getNextPage";
import styles from "./Homepage.module.css"
import { useContext } from "react";
import DataContext from "../context/DataContext";
import getData from "../util/getData";
import { Autocomplete } from "@mui/material"
import {TextField} from "@mui/material"
import getSearchResults from "../util/getSearchResults"


const HomePage = () => {

  const loaderData = useRouteLoaderData("root")
  
  const {characterContext} = useContext(DataContext)
  const {setCharacterContext} =useContext(DataContext)
  const [data, setData]= useState(characterContext)
  const nextPage = characterContext[characterContext.length-1].next
 
  const handleMore = () => {

    const getNextPageData = async () => {
      let newData = await getData(nextPage);

      // setNextPage(newData.info.next);
      let newCharactersData = newData.results;
      // console.log(newCharactersData);
      setData((prevData) => {
        return [...prevData, ...newCharactersData];
      });
    };
    getNextPageData();
  };



useEffect(()=>{
  if(!characterContext.includes(data))
  setCharacterContext( [...data])
},[data])

const [inputValue, setInputValue]= useState("")
const [searchResults, setSearchResults] = useState([])
const [options, setOptions] = useState([])

const handleInput = async(value)=>{

  setInputValue(value)

  if(value !== ""){

    
      let result = await getSearchResults(value)
      setSearchResults(result)
      let optionsArray= searchResults.map((char, i) => char.name.toLowerCase())
      setOptions(optionsArray)
  }else{
    setOptions([])
  }


}


console.log("inputvalue",inputValue)
console.log("options" , options)



  return (
    <div>
    <Autocomplete 
    


// filterOptions={(x) => x}
options={options}
// filterOptions={(option)=> option.includes(inputValue)}
onInputChange={(e)=>handleInput(e.target.value)}
value={inputValue}

renderInput={(params) => <TextField className={styles.autocomplete} {...params} />}
 />
    <div className={styles.cardContainer} >

   {
    inputValue
    ? searchResults.map(searchedChar => <Character key={searchedChar.id} char={searchedChar}/>)
    :      data.map((char) => (
      <Link to={`${char.id}`} key={char.id} state={{char, data, nextPage}} >
      <Character  {...{ char }} />
      
      </Link>
    ))


   }


    </div>

  <button onClick={handleMore}>More</button>
    </div>
  );
};

export default HomePage;
