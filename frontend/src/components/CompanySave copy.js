import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const CompanySave = (props) => {
  const [save, setSave] = useState(props.save);
  const [project, setProject] = useState([]);
  const bpRef = useRef([]);
  const [conpamy, setCompany] = useState({
    pjtNo: "",
    company: "",
    startDt: "",
    endDt: "",
    leader: "",
    position: "",
    totMm: 0,
    totAmt: 0,
  });

  let url = "http://localhost/project/list";

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((Response) => {
        return Response.json();
      })
      .then((data) => {
        setProject(data);
      });
  }, []);

  const handleValueChange = (e) => {
    setCompany({
      ...conpamy,
      [e.target.name]: e.target.value,
    });
  };

  const saveCheck = () => {
    if (bpRef.current[0].value === "") {
      alert("프로젝트 NO를 확인하세요.");
      bpRef.current[0].focus();
      return "NO";
    } else if (bpRef.current[1].value === "") {
      alert("BP사 명를 확인하세요.");
      bpRef.current[1].focus();
      return "NO";
    } else if (bpRef.current[2].value === "") {
      alert("계약 시작일을 확인하세요.");
      bpRef.current[2].focus();
      return "NO";
    } else if (bpRef.current[3].value === "") {
      alert("계약 종료일을 확인하세요.");
      bpRef.current[3].focus();
      return "NO";
    } else if (bpRef.current[4].value === "") {
      alert("BP리더를 확인하세요.");
      bpRef.current[4].focus();
      return "NO";
    } else if (bpRef.current[5].value === "") {
      alert("직급을 확인하세요.");
      bpRef.current[5].focus();
      return "NO";
    } else if (bpRef.current[6].value === "") {
      alert("총 M/M를 확인하세요.");
      bpRef.current[6].focus();
      return "NO";
    } else if (bpRef.current[7].value === 0) {
      alert("계약금액을 확인하세요.");
      bpRef.current[7].focus();
      return "NO";
    }
    return "OK";
  };

  const companySave = () => {
    if (saveCheck() === "OK") {
      let url = "http://localhost/company/save";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(conpamy),
      })
        .then((Res) => {
          if (Res.status === 201) {
            return Res.json();
          } else {
            alert("등록 문제가 발생했습니다.");
            return;
          }
        })
        .then((data) => {
          alert("등록 완료하였습니다!");
        })
        .catch((error) => {
          console.log(error);
          alert("등록 error가 발행하였습니다!");
        });

      bpRef.current[0].focus();
    }
  };

  return (
    <div className="div">
      <h4 className="text-center">BP사 계약 등록입니다</h4>
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th align="center" className="bg-secondary-subtle scope-col">
              프로젝트 NO
            </th>
            {/* <td align="left">
              <input
                type="text"
                name="pjtNo"
                ref={(el) => (bpRef.current[0] = el)}
                className="input-width"
                onChange={(e) => handleValueChange(e)}
                readOnly
              />
            </td> */}
            <td align="left">
              <Select
                options={project[0]}
                onChange={(e) => handleValueChange(e)}
                defaultValue={project[0]}
              ></Select>
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              BP사 명
            </th>
            <td align="left">
              <input
                type="text"
                name="company"
                ref={(el) => (bpRef.current[1] = el)}
                className="input-pjtNm"
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              계약 시작일
            </th>
            <td align="left">
              <input
                type="text"
                name="startDt"
                ref={(el) => (bpRef.current[2] = el)}
                className="input-width"
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              계약 종료일
            </th>
            <td align="left">
              <input
                type="text"
                name="endDt"
                ref={(el) => (bpRef.current[3] = el)}
                className="input-width"
                onChange={(e) => handleValueChange(e)}
              />
            </td>
          </tr>
          <tr>
            <th align="center" className="bg-secondary-subtle scope-col">
              BP 리더
            </th>
            <td align="left">
              <input
                type="text"
                name="leader"
                ref={(el) => (bpRef.current[4] = el)}
                className="input-width"
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              직급
            </th>
            <td align="left">
              <input
                type="text"
                name="position"
                ref={(el) => (bpRef.current[5] = el)}
                className="input-width"
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              총 M/M
            </th>
            <td align="left">
              <input
                type="text"
                name="totMm"
                ref={(el) => (bpRef.current[6] = el)}
                className="input-width"
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              계약금액(원)
            </th>
            <td align="left">
              <input
                type="text"
                name="totAmt"
                ref={(el) => (bpRef.current[7] = el)}
                className="input-amt"
                onChange={(e) => handleValueChange(e)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={companySave}>BP사 등록</button>&nbsp;
      <Link to="/">
        <button>등록 취소</button>
      </Link>
      &nbsp;
      <Link to="/contract/list">
        <button>등록 조회</button>
      </Link>
      &nbsp;
    </div>
  );
};

export default CompanySave;
