import { createContext, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const loaderData = useRouteLoaderData("root");

  const [characterContext, setCharacterContext] = useState(
    loaderData.data.results
  );

  return (
    <DataContext.Provider value={{ characterContext, setCharacterContext }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContextProvider };
export default DataContext;
