import React, { useEffect, useRef, useState } from "react";
import Item from "../menu/Item";

const ProjectHome = () => {
  const [project, setProject] = useState();
  const [home, setHome] = useState([]);
  const [company, setCompany] = useState();
  const homRef = useRef([]);

  const text = "Home";

  useEffect(() => {
    projectList();
    companyList();
    homRef.current[0].focus();
  }, []);

  const projectList = () => {
    let pjtUrl = "http://localhost/contract/projectList";

    fetch(pjtUrl)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          alert("프로젝트 List 데이터가 존재하지 않습니다.");
          throw Error("데이터가 데이터가 존재하지 않습니다.");
        }
      })
      .then((data) => {
        setProject(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const companyList = (pjtNo) => {
    let url1 = "http://localhost/contract/companyList";
    let url2 = "http://localhost/contract/contractCompanyList/" + pjtNo;

    let url = (pjtNo !== null && pjtNo !== undefined) ? url2 : url1;

    fetch(url)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          setCompany("");
          alert("BP 데이터가 존재하지 않습니다.");
          throw Error("데이터가 데이터가 존재하지 않습니다.");
        }
      })
      .then((data) => {
        setCompany(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleValueChange = (e) => {
      homRef.current[1].value =  "";
      if ((e.target.value === "") || (e.target.value === null)) {
        companyList();
      } else {
        companyList(e.target.value);
      }
  };

  const homeProjectList = () => {
    let likeRef1 = homRef.current[0].value;
    let likeRef2 = homRef.current[1].value;

    let baseurl = "http://localhost/monitor/homelike";
    let listUrl =
      baseurl +
      "?pjtNo=" +
      likeRef1 +
      "&companyNo=" +
      likeRef2;

    fetch(listUrl, { method: "GET" })
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          setHome("");
          alert("homeProjectList 데이터가 존재하지 않습니다.");
          throw Error("데이터가 데이터가 존재하지 않습니다.");
        }
      })
      .then((data) => {
        setHome(data);
        return true;
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="container-fluid">
      <div><Item item={text} /></div>
      <hr />
      <div>
        <b class="text-center fs-6">프로젝트 :</b>
        &nbsp;
        <select
          name="pjtNo"
          ref={(el) => (homRef.current[0] = el)}
          style={{ width: "300px" }}
          onChange={(e) => handleValueChange(e)}
          class="form-select-sm"
        >
          <option value="" defaultValue="프로젝트 선택">
            프로젝트 선택
          </option>
          {project &&
            project.map((item, key) => (
              <option key={item.pjtNo} value={item.pjtNo}>
                [ {item.pjtNo.replace(/(\d{6})(\d{3})/, "$1-$2")} ] {item.pjtNm}
              </option>
            ))}
        </select>
        &nbsp;&nbsp;
        <b>BP사 명 :</b>
        &nbsp;
        <select
            name="companyNo"
            ref={(el) => (homRef.current[1] = el)}
            style={{ width: "250px" }}
            class="form-select-sm"
          >
            <option value="">BP사 선택</option>
            {company &&
              company.map((item, key) => (
                <option key={item.pjtNo} value={item.companyNo}>
                  [{" "}
                  {item.companyNo.replace(
                    /(\d{3})(\d{2})(\d{5})/,
                    "$1-$2-$3"
                  )}{" "}
                  ] {item.companyNm}
                </option>
              ))}
          </select>
        &nbsp;
        <button type="button" class="btn btn-primary btn-sm" onClick={homeProjectList}>
          조회
        </button>
        &nbsp;
        <label style={{ fontSize: "12pt" }}>
          (프로젝트 - BP사 계약 - 실투입 - 검수 내역을 확인하세요!)
        </label>
      </div>
      <hr />
      <table className="table" style={{ fontSize: "85%" }}>
        <thead>
          <tr align="center">
            <th className="bg-secondary-subtle scope-col">프로젝트</th>
            <th className="bg-secondary-subtle scope-col">수주금액</th>
            <th className="bg-secondary-subtle scope-col">프로젝트시작일</th>
            <th className="bg-secondary-subtle scope-col">프로젝트종료일</th>
            <th className="bg-secondary-subtle scope-col">BP사 명</th>
            <th className="bg-secondary-subtle scope-col">계약등급</th>
            <th className="bg-secondary-subtle scope-col">계약M/M</th>
            <th className="bg-secondary-subtle scope-col">투입등급</th>
            <th className="bg-secondary-subtle scope-col">투입M/M</th>
            <th className="bg-secondary-subtle scope-col">검수등급</th>
            <th className="bg-secondary-subtle scope-col">검수M/M</th>
          </tr>
        </thead>
        <tbody>
          {home &&
            home.map((home, key) => (
              <tr key={home.rowNum}>
                <td align="left">[{home.pjtNo.replace(/(\d{6})(\d{3})/, "$1-$2")}] {home.pjtNm}</td>
                <td>({home.totMm} M/M) / {home.totAmt.toLocaleString("ko-KR")}</td>
                <td>{home.startDt.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')}</td>
                <td>{home.endDt.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')}</td>
                <td>[{home.companyNo.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')}] {home.companyNm}</td>
                <td>{home.contractGrade !== null ? home.contractGrade.substr(1) : ""}</td>
                <td>{home.contractMm}</td>
                <td>{home.assignGrade !== null ? home.assignGrade.substr(1) : ""}</td>
                <td>{home.assignMm}</td>
                <td>{home.signGrade !== null ? home.signGrade.substr(1) : ""}</td>
                <td>{home.signMm}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectHome;
