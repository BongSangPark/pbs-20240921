import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import Item from "../menu/Item";

const CompanyDetail = () => {
  const param = useParams();
  const cmpNoRef = useRef("");
  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    companyNo: "",
    companyNm: "",
    leader: "",
    companyTel: "",
    companyAddr: "",
    salesLeader: "",
    position: "",
    salesTel: "",
  });

  const text = "Home > BP사 관리 > BP사 상세";

  let url = "http://localhost/company/list/" + param.companyNo;

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((Response) => {
        return Response.json();
      })
      .then((data) => {
        setDetail(data);
      });
  }, []);

  const handleValueChange = (e) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  };

  const companyUpdate = () => {
    let url = "http://localhost/company/update";

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(detail),
    })
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else {
          alert("수정 문제가 발생했습니다.");
          throw Error("수정 문제가 발생했습니다.");
        }
      })
      .then((data) => {
        alert("수정 완료하였습니다!");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const companyDelete = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      let url = "http://localhost/company/delete/" + cmpNoRef.current.value;

      fetch(url, {
        method: "DELETE",
      })
        .then((Res) => {
          if (Res.status === 204) {
            return Res.json();
          } else {
            alert("삭제 문제가 발생했습니다.");
            throw Error("삭제 문제가 발생했습니다.");
          }
        })
        .then((data) => {
          alert("삭제 완료하였습니다!");
        })
        .catch((error) => {
          console.error(error.message);
        });
      navigate("/company/list");
    }
  };

  return (
    <div className="div">
      <div><Item item={text} /></div>
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
                name="companyNo"
                maxLength="10"
                style={{
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "LightGray",
                }}
                ref={cmpNoRef}
                value={detail.companyNo.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')}
                readOnly
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
                style={{ width: "100%" }}
                value={detail.companyNm}
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
                style={{ width: "100%", textAlign: "center" }}
                value={detail.leader}
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
                style={{ width: "100%", textAlign: "center" }}
                value={detail.companyTel}
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
                style={{ width: "100%", textAlign: "center" }}
                value={detail.salesLeader}
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
                style={{ width: "100%" }}
                value={detail.companyAddr}
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
                style={{ width: "100%", textAlign: "center" }}
                value={detail.position}
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
                style={{ width: "100%", textAlign: "center" }}
                value={detail.salesTel}
                onChange={(e) => handleValueChange(e)}
                placeholder="숫자만 입력"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Link to="/company/list">
        <button type="button" class="btn btn-primary btn-sm">
          BP사 조회
        </button>
      </Link>
      &nbsp;
      <button type="button" class="btn btn-primary btn-sm" onClick={companyUpdate}>
        BP사 수정
      </button>
      &nbsp;
      <button type="button" class="btn btn-primary btn-sm" onClick={companyDelete}>
        BP사 삭제
      </button>
    </div>
  );
};

export default CompanyDetail;
