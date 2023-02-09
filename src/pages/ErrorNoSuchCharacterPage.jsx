import { Link } from "react-router-dom";

const ErrorNoSuchCharacterPage = () => {
  return (
    <div>
      no such char
      <Link to={"/.."}>
        {" "}
        <button>Back to all characters</button>
      </Link>
    </div>
  );
};
export default ErrorNoSuchCharacterPage;
