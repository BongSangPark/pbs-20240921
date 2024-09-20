import { Route, Routes } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import "./App.css";
import ProjectList from "./components/ProjectList";
import Home from "./views/Home";
import Main from "./views/Main";
import ProjectDetail from "./components/ProjectDetail";
import ProjectSave from "./components/ProjectSave";
import Header from "./views/Header";
import Category from "./menu/Category";
import Contents from "./Contents";

function App() {
  console.warn = function no_console() {};

  return (
    <div className="App">
      <Main />
      <hr />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/save" exact={true} element={<ProjectSave save="save" />} />
          <Route path="/list" exact={true} element={<ProjectList list="list" />} />
          <Route path="/list/:pjtNo" exact={true} element={<ProjectDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
