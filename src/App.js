import "./App.css";
import "./css/main.scss";
import { Routes, Route } from "react-router-dom";

//Route elements
import SignIn from "./routes/signin/SignIn";

//Other elements
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" index element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
