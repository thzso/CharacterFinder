import { useLocation } from "react-router-dom";
import CharacterComponent from "../components/CharacterComponent";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const SearchedChar = () => {
  const location = useLocation();
  const character = location.state.searchedChar;
  return (
    <div>
      <CharacterComponent {...{ character }} />
      <Link to={"/.."}>
        <Button
          style={{
            border: "2px solid white",
            width: "fit-content",
            alignSelf: "center",
            margin: "3rem",
          }}
        >
          Back to all characters
        </Button>
      </Link>
    </div>
  );
};

export default SearchedChar;
