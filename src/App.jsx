import "./App.css";
import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import { DataContextProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <DataContextProvider>
      <Layout>
        <Outlet />
      </Layout>
      </DataContextProvider>
    </div>
  );
}

export default App;
