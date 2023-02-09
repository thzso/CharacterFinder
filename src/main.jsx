import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EpisodesPage from "./pages/EpisodesPage";
import CharacterPage from "./pages/CharacterPage";
import loaderFunction from "./util/loaderFunction";
// import characterLoader from "./util/characterLoader";
import ErrorNoSuchCharacterPage from "./pages/ErrorNoSuchCharacterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    id: "root",
    loader: loaderFunction,
    children: [
      { index: true, 
        element: <HomePage /> 
      },
      { path: "episodes", 
        element: <EpisodesPage /> 
      },
      // { path: "contact", 
      //   element: <ContactPage /> 
      // },
      { path: "/:id",
        element: <CharacterPage/>,
        id: "character",
        // loader: characterLoader,
        errorElement: <ErrorNoSuchCharacterPage/>
      }

    ]
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}></RouterProvider>
);
