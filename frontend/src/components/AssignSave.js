import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Item from "../menu/Item";

const AssignSave = () => {
  const asnRef = useRef([]);

  const [project, setProject] = useState();
  const [company, setCompany] = useState();
  const [assign, setAssign] = useState({
    pjtNo: "",
    companyNo: "",
    assignMonth: "",
    bpPerson: "",
    grade: "",
    birth: "",
    startDt: "",
    endDt: "",
    assignMm: "",
  });

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth()).toString().padStart(2, "0");
  const yyyymm = `${year}${month}`;

  const text = "Home > 인력투입 관리 > 실투입 등록";

  const Grade = [
    { grade: "특급" },
    { grade: "고급" },
    { grade: "중급" },
    { grade: "초급" },
  ];

  useEffect(() => {
    projectList();
    companyList();
    asnRef.current[0].value = yyyymm;
    setAssign({
      ...assign,
      "assignMonth": asnRef.current[0].value,
    });
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

  const companyList = () => {
    let url = "http://localhost/assign/companyList";

    fetch(url)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          alert("데이터가 존재하지 않습니다.");
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
    setAssign({
      ...assign,
      [e.target.name]: e.target.value,
    });
  };

  const saveCheck = () => {
    if (asnRef.current[0].value === "") {
      alert("투입년월 선택하세요.");
      asnRef.current[0].focus();
      return "NO";
    } else if (asnRef.current[1].value === "") {
      alert("프로젝트를 선택하세요.");
      asnRef.current[1].focus();
      return "NO";
    } else if (asnRef.current[2].value === "") {
      alert("BP사를 선택하세요.");
      asnRef.current[2].focus();
      return "NO";
    } else if (asnRef.current[3].value === "") {
      alert("투입인력을 확인하세요.");
      asnRef.current[3].focus();
      return "NO";
    } else if (asnRef.current[4].value === "") {
      alert("등급을 확인하세요.");
      asnRef.current[4].focus();
      return "NO";
    } else if (asnRef.current[5].value === "") {
      alert("투입 시작일을 확인하세요.");
      asnRef.current[5].focus();
      return "NO";
    } else if (asnRef.current[6].value === 0) {
      alert("투입 종료일을 확인하세요.");
      asnRef.current[6].focus();
      return "NO";
    } else if (asnRef.current[7].value === "") {
      alert("실투입 M/M를 확인하세요.");
      asnRef.current[7].focus();
      return "NO";
    }
    return "OK";
  };

  const assignSave = () => {
    if (saveCheck() === "OK") {
      let url = "http://localhost/assign/save";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(assign),
      })
        .then((Res) => {
          if (Res.status === 201) {
            return Res.json();
          } else {
            alert("등록 문제가 발생했습니다.");
            throw Error("등록 문제가 발생했습니다.");
          }
        })
        .then((data) => {
          alert("등록 완료하였습니다!");
        })
        .catch((error) => {
          console.error(error.message);
        });

      asnRef.current[0].focus();
    }
  };

  return (
    <div className="div">
      <div><Item item={text} /></div>
      <hr />
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              투입년월
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="assignMonth"
                maxLength="6"
                ref={(el) => (asnRef.current[0] = el)}
                style={{ width: "100%", textAlign: "center" }}
                //onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              프로젝트
            </th>
            <td colSpan="3" align="left" className="input-Nm">
              <select
                name="pjtNo"
                ref={(el) => (asnRef.current[1] = el)}
                style={{ width: "100%" }}
                onChange={(e) => handleValueChange(e)}
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
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              BP사
            </th>
            <td colSpan="3" align="left" className="input-Nm">
              <select
                name="companyNo"
                ref={(el) => (asnRef.current[2] = el)}
                style={{ width: "100%" }}
                onChange={(e) => handleValueChange(e)}
              >
                <option value="" defaultValue="BP사 선택">
                  BP사 선택
                </option>
                {company &&
                  company.map((item) => (
                    <option key={item.companyNo} value={item.companyNo}>
                      [ {item.companyNo.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')} ] {item.companyNm}
                    </option>
                  ))}
              </select>
            </td>
          </tr>
          <tr>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              투입인력
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="bpPerson"
                ref={(el) => (asnRef.current[3] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              등급
            </th>
            <td align="left" className="input-100-L">
              <select
                name="grade"
                ref={(el) => (asnRef.current[4] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              >
                <option value="" defaultValue="선택">
                  선택
                </option>
                {Grade &&
                  Grade.map((g) => (
                    <option key={g.grade} value={g.grade}>
                      {g.grade}
                    </option>
                  ))}
              </select>
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              투입시작일
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="startDt"
                maxLength="8"
                ref={(el) => (asnRef.current[5] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              투입종료일
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="endDt"
                maxLength="8"
                ref={(el) => (asnRef.current[6] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              실투입M/M
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="assignMm"
                maxLength="4"
                ref={(el) => (asnRef.current[7] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" class="btn btn-primary" onClick={assignSave}>
        투입 등록
      </button>
      &nbsp;
      <Link to="/">
        <button type="button" class="btn btn-primary">
          등록 취소
        </button>
      </Link>
      &nbsp;
      <Link to="/assign/list">
        <button type="button" class="btn btn-primary">
          등록 조회
        </button>
      </Link>
      &nbsp;
    </div>
  );
};

export default AssignSave;
