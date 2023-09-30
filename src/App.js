import "./App.css";
import "./css/main.scss";
import { Routes, Route } from "react-router-dom";

//Route elements
import SignIn from "./routes/signin/SignIn";
import Home from "./routes/home/Home";
import CreateNews from "./routes/createnews/CreateNews";

//Other elements
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" index element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/news" element={<Home />} />
        <Route path="/createnews" element={<CreateNews />} />
      </Routes>
    </div>
  );
}

export default App;
