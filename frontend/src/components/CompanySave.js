import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Item from "../menu/Item";

const CompanySave = () => {
  const bpRef = useRef([]);
  const navigate = useNavigate();
  const [conpamy, setCompany] = useState({
    companyNo: "",
    companyNm: "",
    leader: "",
    companyTel: "",
    companyAddr: "",
    salesLeader: "",
    position: "",
    salesTel: "",
  });

  const text = "Home > BP사 관리 > BP사 등록";

  useEffect(() => {
    bpRef.current[0].focus();
  }, []);

  const handleValueChange = (e) => {
    setCompany({
      ...conpamy,
      [e.target.name]: e.target.value,
    });
  };

  const saveCheck = () => {
    if (bpRef.current[0].value === "") {
      alert("사업자 등록번호를 확인하세요.");
      bpRef.current[0].focus();
      return "NO";
    } else if (bpRef.current[1].value === "") {
      alert("BP사 명를 확인하세요.");
      bpRef.current[1].focus();
      return "NO";
    } else if (bpRef.current[2].value === "") {
      alert("대표자를 확인하세요.");
      bpRef.current[2].focus();
      return "NO";
    } else if (bpRef.current[3].value === "") {
      alert("회사 전화번호를 확인하세요.");
      bpRef.current[3].focus();
      return "NO";
    } else if (bpRef.current[4].value === "") {
      alert("주 소를 확인하세요.");
      bpRef.current[4].focus();
      return "NO";
    } else if (bpRef.current[5].value === "") {
      alert("영업대표를 확인하세요.");
      bpRef.current[5].focus();
      return "NO";
    } else if (bpRef.current[6].value === "") {
      alert("직급을 확인하세요.");
      bpRef.current[6].focus();
      return "NO";
    } else if (bpRef.current[7].value === 0) {
      alert("영업 전화번호를 확인하세요.");
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
            throw Error("등록 문제가 발생했습니다.");
          }
        })
        .then((data) => {
          alert("등록 완료하였습니다!");
        })
        .catch((error) => {
          console.log(error);
          alert("등록 error가 발행하였습니다!");
        });

      // bpRef.current[0].focus();
      navigate("/company/list");
    }
  };

  return (
    <div className="div">
      <div>
        <Item item={text} />
      </div>
      <hr />
      <table class="table table-bordered" style={{ fontSize: "90%" }}>
        <tbody>
          <tr>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              사업자 등록번호
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                maxLength="10"
                name="companyNo"
                ref={(el) => (bpRef.current[0] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
                placeholder="숫자만 10자리"
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              BP사 명
            </th>
            <td align="left" className="input-Nm" valign="middle">
              <input
                type="text"
                name="companyNm"
                ref={(el) => (bpRef.current[1] = el)}
                style={{ width: "100%" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              대표자
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="leader"
                ref={(el) => (bpRef.current[2] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              회사 전화번호
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                maxLength={11}
                name="companyTel"
                ref={(el) => (bpRef.current[3] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
                placeholder="숫자만 입력"
              />
            </td>
          </tr>
          <tr>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              영업대표
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="salesLeader"
                ref={(el) => (bpRef.current[4] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              주 소
            </th>
            <td align="left" className="input-Nm" valign="middle">
              <input
                type="text"
                name="companyAddr"
                ref={(el) => (bpRef.current[5] = el)}
                style={{ width: "100%" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              영업직급
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="position"
                ref={(el) => (bpRef.current[6] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              영업 전화번호
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="salesTel"
                maxLength={11}
                ref={(el) => (bpRef.current[7] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
                placeholder="숫자만 입력"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" class="btn btn-primary btn-sm" onClick={companySave}>
        BP사 등록
      </button>
      &nbsp;
      <Link to="/">
        <button type="button" class="btn btn-primary btn-sm">
          등록 취소
        </button>
      </Link>
      &nbsp;
      <Link to="/company/list">
        <button type="button" class="btn btn-primary btn-sm">
          BP사 조회
        </button>
      </Link>
      &nbsp;
    </div>
  );
};

export default CompanySave;
