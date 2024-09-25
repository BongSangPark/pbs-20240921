import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const AssignList = () => {
  const [project, setProject] = useState();
  const [assign, setAssign] = useState([]);
  const asnRef = useRef([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth()).toString().padStart(2, '0');
  const yyyymm = `${year}${month}`;

  useEffect(() => {
    asnRef.current[0].value = yyyymm;
    projectList();
    assignList();
    asnRef.current[0].focus();
  }, []);

  const projectList = () => {
    let pjtUrl = "http://localhost/assign/projectList";

    fetch(pjtUrl)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          alert("데이터가 존재하지 않습니다.");
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

  const assignList = () => {
    let url =
      "http://localhost/assign/list/" + asnRef.current[0].value;

    fetch(url)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          setAssign("");
          alert("데이터가 존재하지 않습니다.");
          throw Error("데이터가 데이터가 존재하지 않습니다.");
        }
      })
      .then((data) => {
        setAssign(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const assignLikeList = () => {
    let likeRef1 = asnRef.current[0].value;
    let likeRef2 = asnRef.current[1].value;
    let likeRef3 = asnRef.current[2].value;
    let likeRef4 = asnRef.current[3].value;

    let baseurl = "http://localhost/assign/like";
    let searchUrl = baseurl + "?assignMonth=" + likeRef1 + "&pjtNo=" + likeRef2 + "&companyNm=" + likeRef3 + "&bpPerson=" + likeRef4;

    fetch(searchUrl)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          setAssign("");
          alert("데이터가 존재하지 않습니다.");
          throw Error("데이터가 데이터가 존재하지 않습니다.");
        }
      })
      .then((data) => {
        setAssign(data);
      })
      .catch((error) => {
        console.error(error.message);
      });

    asnRef.current[0].focus();
  };

  return (
    <div className="container">
      <h4 className="text-center">인력 실투입 조회입니다</h4>
      <hr />
      <b>투입년월 :</b>
      &nbsp;
      <input
        type="text"
        maxLength="6"
        style={{ width: "80px", textAlign: "center" }}
        ref={(el) => (asnRef.current[0] = el)}
      />
      &nbsp;
      <b>프로젝트 :</b>
      &nbsp;
      <select
        name="pjtNo"
        ref={(el) => (asnRef.current[1] = el)}
        style={{ width: "200px" }}
      >
        <option value="" defaultValue="프로젝트 선택">
          프로젝트 선택
        </option>
        {project &&
          project.map((item, key) => (
            <option key={item.pjtNo} value={item.pjtNo}>
              [ {item.pjtNo.replace(/(\d{6})(\d{3})/, '$1-$2')} ] {item.pjtNm}
            </option>
          ))}
      </select>
      &nbsp;
      <b>BP사 명 :</b>
      &nbsp;
      <input
        type="text"
        ref={(el) => (asnRef.current[2] = el)}
        placeholder="BP사 명을 입력하세요."
      ></input>
      &nbsp;
      <b>투입인력 :</b>
      &nbsp;
      <input
        type="text"
        style={{ width: "80px", textAlign: "center" }}
        ref={(el) => (asnRef.current[3] = el)}
        placeholder="투입인력을 입력하세요."
      ></input>
      &nbsp;
      <button class="btn btn-primary" onClick={assignLikeList}>
        조회
      </button>
      &nbsp;
      <label style={{ fontSize: "10pt"}}>(프로젝트 NO를 클릭하여 상세내역을...)</label>
      <label className="right-align">
        <Link to="/assign/save">
          <button type="button" class="btn btn-primary">
            실투입 등록
          </button>
        </Link>
      </label>
      <hr />
      <table className="table table-striped table-bordered table table-condensed">
        <thead>
          <tr align="center">
            <th className="bg-secondary-subtle scope-col">투입년월</th>
            <th className="bg-secondary-subtle scope-col">프로젝트 No</th>
            <th className="bg-secondary-subtle scope-col">프로젝트 명</th>
            <th className="bg-secondary-subtle scope-col">사업자 등록번호</th>
            <th className="bg-secondary-subtle scope-col">BP사 명</th>
            <th className="bg-secondary-subtle scope-col">투입인력</th>
            <th className="bg-secondary-subtle scope-col">등급</th>
          </tr>
        </thead>
        <tbody align="center">
          {assign &&
            assign.map((assign, key) => (
              <tr key={assign.assign_idx}>
                <td align="center">{assign.assignMonth}</td>
                <td>
                  <Link to={`/assign/list/${assign.assign_idx}/${assign.assignMonth}`}>
                    {assign.pjtNo.replace(/(\d{6})(\d{3})/, '$1-$2')}
                  </Link>
                </td>
                <td align="left">{assign.pjtNm}</td>
                <td>{assign.companyNo.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')}</td>
                <td align="left">{assign.companyNm}</td>
                <td>{assign.bpPerson}</td>
                <td>{assign.grade}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignList;
