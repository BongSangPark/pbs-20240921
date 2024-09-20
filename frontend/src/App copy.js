import { Route, Routes } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import "./App.css";
import ProjectDetail from "./components/ProjectDetail";
import ProjectList from "./components/ProjectList";
import ProjectSave from "./components/ProjectSave";
import Home from "./views/Home";
import Main from "./views/Main";
import Menu from "./menu/Menu";

function App() {
  console.warn = function no_console() {};

  return (
    <div className="App">
      <Main />
      <hr />
      <BrowserRouter>
        <Menu />
        <hr />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route
            path="/save"
            exact={true}
            element={<ProjectSave save="save" />}
          />
          <Route
            path="/list"
            exact={true}
            element={<ProjectList list="list" />}
          />
          <Route path="/list/:pjtNo" exact={true} element={<ProjectDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
