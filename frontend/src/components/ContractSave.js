import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Item from "../menu/Item";

const ContractSave = () => {
  const crtRef = useRef([]);

  const [project, setProject] = useState();
  const [company, setCompany] = useState();
  const [contract, setContract] = useState({
    pjtNo: "",
    companyNo: "",
    bpPerson: "",
    grade: "",
    birth: "",
    startDt: "",
    endDt: "",
    contractMm: "",
    price: 0,
    sumPrice: 0,
  });

  const text = "Home > BP사 계약관리 > 계약 등록";

  const Grade = [
    { grade: "특급" },
    { grade: "고급" },
    { grade: "중급" },
    { grade: "초급" },
  ];

  useEffect(() => {
    projectList();
    companyList();
  }, []);

  const projectList = () => {
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
        setProject(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const companyList = () => {
    let url = "http://localhost/contract/companyList";

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
    if (e.target.name === "price" || e.target.name === "sumPrice") {
      let price = e.target.value;
      price = Number(price.replaceAll(",", ""));
      if (isNaN(price)) {
        setContract(...contract, 0);
      } else {
        setContract({
          ...contract,
          [e.target.name]: price,
        });
      }
    } else {
      setContract({
        ...contract,
        [e.target.name]: e.target.value,
      });
    }
  };

  const saveCheck = () => {
    if (crtRef.current[0].value === "") {
      alert("프로젝트를 선택하세요.");
      crtRef.current[0].focus();
      return "NO";
    } else if (crtRef.current[1].value === "") {
      alert("BP사를 선택하세요.");
      crtRef.current[1].focus();
      return "NO";
    } else if (crtRef.current[2].value === "") {
      alert("계약금액을 확인하세요.");
      crtRef.current[2].focus();
      return "NO";
    } else if (crtRef.current[3].value === "") {
      alert("투입인력을 확인하세요.");
      crtRef.current[3].focus();
      return "NO";
    } else if (crtRef.current[4].value === "") {
      alert("등급을 확인하세요.");
      crtRef.current[4].focus();
      return "NO";
    } else if (crtRef.current[5].value === "") {
      alert("출생년도를 확인하세요.");
      crtRef.current[5].focus();
      return "NO";
    } else if (crtRef.current[6].value === "") {
      alert("계약 시작일을 확인하세요.");
      crtRef.current[6].focus();
      return "NO";
    } else if (crtRef.current[7].value === 0) {
      alert("계약 종료일을 확인하세요.");
      crtRef.current[7].focus();
      return "NO";
    } else if (crtRef.current[8].value === "") {
      alert("계약단가를 확인하세요.");
      crtRef.current[8].focus();
      return "NO";
    } else if (crtRef.current[9].value === "") {
      alert("계약 M/M를 확인하세요.");
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
            throw Error("등록 문제가 발생했습니다.");
          }
        })
        .then((data) => {
          alert("등록 완료하였습니다!");
        })
        .catch((error) => {
          console.error(error.message);
        });

      crtRef.current[0].focus();
    }
  };

  return (
    <div className="div">
      <div><Item item={text} /></div>
      <hr />
      <label
        style={{ position: "relative", top: "-15px" }}
        className="right-align"
      >
        단위 : 원
      </label>
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              프로젝트
            </th>
            <td colSpan="4" align="left" className="input-100-L">
              <select
                name="pjtNo"
                ref={(el) => (crtRef.current[0] = el)}
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
            <td colSpan="4" align="left" className="input-100-L">
              <select
                name="companyNo"
                ref={(el) => (crtRef.current[1] = el)}
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
            <th align="center" className="bg-secondary-subtle scope-col">
              계약금액
            </th>
            <td colSpan="3" align="left" className="input-amt">
              <input
                type="text"
                name="sumPrice"
                value={contract.sumPrice.toLocaleString("ko-KR")}
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
              <select
                name="grade"
                ref={(el) => (crtRef.current[4] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              >
                <option value="" defaultValue="등급선택">
                  등급선택
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
              계약시작일
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="startDt"
                maxLength="8"
                ref={(el) => (crtRef.current[6] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              계약종료일
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="endDt"
                maxLength="8"
                ref={(el) => (crtRef.current[7] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              계약단가
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="price"
                value={contract.price.toLocaleString("ko-KR")}
                ref={(el) => (crtRef.current[8] = el)}
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
                ref={(el) => (crtRef.current[9] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
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
