import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ProjectDetail from "./components/ProjectDetail";
import ProjectList from "./components/ProjectList";
import ProjectSave from "./components/ProjectSave";
import Menu from "./menu/Menu";
import Home from "./views/Home";
import Main from "./views/Main";
// import "./menu/menu.css";
import AssignDetail from "./components/AssignDetail";
import AssignList from "./components/AssignList";
import AssignSave from "./components/AssignSave";
import CompanyDetail from "./components/CompanyDetail";
import CompanyList from "./components/CompanyList";
import CompanySave from "./components/CompanySave";
import ContractDetail from "./components/ContractDetail";
import ContractList from "./components/ContractList";
import ContractSave from "./components/ContractSave";
import ProjectMonitoring from "./components/ProjectMonitoring";
import SignDetail from "./components/SignDetail";
import SignList from "./components/SignList";
import SignSave from "./components/SignSave";

function App() {
  return (
    <div className="App">
      <Main />
      <hr />
      <Menu />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/monitor" element={<ProjectMonitoring />} />
          <Route path="/project/save" exact={true} element={<ProjectSave />} />
          <Route path="/project/list" exact={true} element={<ProjectList />} />
          <Route
            path="/project/list/:pjtNo"
            exact={true}
            element={<ProjectDetail />}
          />
          <Route path="/company/save" exact={true} element={<CompanySave />} />
          <Route path="/company/list" exact={true} element={<CompanyList />} />
          <Route
            path="/company/list/:companyNo"
            exact={true}
            element={<CompanyDetail />}
          />
          <Route
            path="/contract/save"
            exact={true}
            element={<ContractSave />}
          />
          <Route
            path="/contract/list"
            exact={true}
            element={<ContractList />}
          />
          <Route
            path="/contract/list/:contract_idx"
            exact={true}
            element={<ContractDetail />}
          />
          <Route path="/assign/save" exact={true} element={<AssignSave />} />
          <Route path="/assign/list" exact={true} element={<AssignList />} />
          <Route
            path="/assign/list/:assign_idx/:assignMonth"
            exact={true}
            element={<AssignDetail />}
          />
          <Route path="/sign/save" exact={true} element={<SignSave />} />
          <Route path="/sign/list" exact={true} element={<SignList />} />
          <Route
            path="/sign/list/:sign_idx/:signMonth"
            exact={true}
            element={<SignDetail />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
