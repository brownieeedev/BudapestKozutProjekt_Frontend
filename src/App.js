import "./App.css";
import "./css/main.scss";
import { Routes, Route } from "react-router-dom";

//Route elements
import SignIn from "./routes/signin/SignIn";
import Home from "./routes/home/Home";
import CreateNews from "./routes/createnews/CreateNews";
import ManageNews from "./routes/managenews/ManageNews";
import Article from "./routes/article/Article";

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
        <Route path="/news/:id" element={<Article />} />
        <Route path="/createnews" element={<CreateNews />} />
        <Route path="/managenews" element={<ManageNews />} />
      </Routes>
    </div>
  );
}

export default App;
