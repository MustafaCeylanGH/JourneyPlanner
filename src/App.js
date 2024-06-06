import "./index.css";
import Menu from "./components/Menu";
import Map from "./components/Map";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <div className="appContainer">
        <Menu />
        <Map />
      </div>
    </GlobalProvider>
  );
}

export default App;
