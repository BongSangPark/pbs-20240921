import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const ContractSave = (props) => {
  const [save, setSave] = useState(props.save);
  const crtRef = useRef([]);

  const [project, setProject] = useState();
  const [company, setCompany] = useState();
  const [selectedValue, setSelectedValue] = useState("");

  const [contract, setContract] = useState({
    pjtNo: "",
    bpPerson: "",
    grade: "",
    birth: "",
    company: "",
    startDt: "",
    endDt: "",
    contractmm: "",
    price: 0,
    sumprice: 0,
  });

  useEffect(() => {
    let url = "http://localhost/contract/projectList";

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
        console.log("data==>", data);
        setProject(data);
      })
      .catch((error) => {
        console.error(error.message);
      });

    // crtRef.current[3].focus();
  }, [save]);

  const handleValueChange = (e) => {
    setContract({
      ...contract,
      [e.target.name]: e.target.value,
    });
  };

  const saveCheck = () => {
    if (crtRef.current[0].value === "") {
      alert("프로젝트 NO를 확인하세요.");
      crtRef.current[0].focus();
      return "NO";
    } else if (crtRef.current[1].value === "") {
      alert("BP사 명를 확인하세요.");
      crtRef.current[1].focus();
      return "NO";
    } else if (crtRef.current[2].value === "") {
      alert("투입인력을 확인하세요.");
      crtRef.current[2].focus();
      return "NO";
    } else if (crtRef.current[3].value === "") {
      alert("등급을 확인하세요.");
      crtRef.current[3].focus();
      return "NO";
    } else if (crtRef.current[4].value === "") {
      alert("출생년도를 확인하세요.");
      crtRef.current[4].focus();
      return "NO";
    } else if (crtRef.current[5].value === "") {
      alert("계약단가를 확인하세요.");
      crtRef.current[5].focus();
      return "NO";
    } else if (crtRef.current[6].value === "") {
      alert("계약 M/M를 확인하세요.");
      crtRef.current[6].focus();
      return "NO";
    } else if (crtRef.current[7].value === 0) {
      alert("총 계약금액을 확인하세요.");
      crtRef.current[7].focus();
      return "NO";
    } else if (crtRef.current[8].value === "") {
      alert("계약 시작일을 확인하세요.");
      crtRef.current[8].focus();
      return "NO";
    } else if (crtRef.current[9].value === 0) {
      alert("계약 종료일을 확인하세요.");
      crtRef.current[9].focus();
      return "NO";
    }
    return "OK";
  };

  const contractSave = () => {
    if (saveCheck() === "OK") {
      let url = "http://localhost/contract/save";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(contract),
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

      crtRef.current[0].focus();
    }
  };

  return (
    <div className="div">
      <h4 className="text-center">BP사 계약 등록입니다</h4>
      <hr />
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              프로젝트
            </th>
            <td align="left" className="input-100-L">
              <select onChange={(e) => setSelectedValue(e.value)} value={selectedValue} >
                {project.map((item) => (
                  <option value={item.pjtNo} key={item.pjtNo}>
                    {item.pjtNo} {item.pjtNm}
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
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="companyNo"
                value={project.companyNo}
                ref={(el) => (crtRef.current[1] = el)}
                style={{
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "LightGray",
                }}
                readOnly
              />
            </td>
            <td colSpan="4" align="left" className="input-Nm">
              <input
                type="text"
                name="companyNm"
                value={project.companyNm}
                style={{
                  width: "100%",
                  backgroundColor: "LightGray",
                }}
                readOnly
              />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              총 계약금액(원)
            </th>
            <td align="left" className="input-amt">
              <input
                type="text"
                name="sumPrice"
                ref={(el) => (crtRef.current[2] = el)}
                style={{ width: "100%", textAlign: "right" }}
                onChange={(e) => handleValueChange(e)}
              />
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
                ref={(el) => (crtRef.current[3] = el)}
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
              <input
                type="text"
                name="grade"
                ref={(el) => (crtRef.current[4] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              출생년도
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="birth"
                maxLength={4}
                ref={(el) => (crtRef.current[5] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              계약단가(원)
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="price"
                ref={(el) => (crtRef.current[6] = el)}
                style={{ width: "100%", textAlign: "right" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              계약 M/M
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="contractMm"
                maxLength="4"
                ref={(el) => (crtRef.current[7] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              계약 시작일
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="startDt"
                maxLength="8"
                ref={(el) => (crtRef.current[8] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              계약 종료일
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="endDt"
                maxLength="8"
                ref={(el) => (crtRef.current[9] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td> */}
          </tr>
        </tbody>
      </table>
      <button type="button" class="btn btn-primary" onClick={contractSave}>
        계약 등록
      </button>
      &nbsp;
      <Link to="/">
        <button type="button" class="btn btn-primary">
          등록 취소
        </button>
      </Link>
      &nbsp;
      <Link to="/contract/list">
        <button type="button" class="btn btn-primary">
          등록 조회
        </button>
      </Link>
      &nbsp;
    </div>
  );
};

export default ContractSave;
