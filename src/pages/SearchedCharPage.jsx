import { useLocation } from "react-router-dom"
import CharacterComponent from "../components/CharacterComponent"
// import { useNavigate } from "react-router-dom"

const SearchedChar =()=> {


  const location = useLocation()
  // const navigate = useNavigate()
  const character = (location.state.searchedChar)
  return(
    <div>
    <CharacterComponent {...{character}}/>
    {/* <button onClick={() => navigate(-1)}>go back</button> */}

    </div>
  )
}

export default SearchedChar