// import logo from './logo.svg';
import "./App.css";
import Home from "./Component/Home/Home";
import NavbarComponent from "./Component/NavbarComponent";



function App() {
  return (
    <div className="App">
      <div>
        <NavbarComponent/>
      </div>
      <div>
        <Home/>
      </div>
    </div>
  );
}

export default App;
