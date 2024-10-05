import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import Item from "../menu/Item";

const ProjectDetail = () => {
  const param = useParams();
  const pjtNoRef = useRef("");
  const pjtRef = useRef([]);
  const navigate = useNavigate();
  const [totamt, setTotamt] = useState("");
  const [detail, setDetail] = useState({
    pjtNo: "",
    pjtNm: "",
    orderOrg: "",
    pm: "",
    startDt: "",
    endDt: "",
    term: "",
    totAmt: 0,
    totMm: 0,
  });

  const text = "Home > 프로젝트 관리 > 프로젝트 상세";

  let url = "http://localhost/project/list/" + param.pjtNo;

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
    if (e.target.name === "totAmt") {
      let price = e.target.value;
      price = Number(price.replaceAll(",", ""));
      if (isNaN(price)) {
        setDetail(...detail, 0);
      } else {
        setDetail({
          ...detail,
          [e.target.name]: price,
        });
      }
    } else {
      setDetail({
        ...detail,
        [e.target.name]: e.target.value,
      });
    }
  };

  const saveCheck = () => {
    if (pjtRef.current[0].value === "") {
      alert("프로젝트 명를 확인하세요.");
      pjtRef.current[0].focus();
      return "NO";
    } else if (pjtRef.current[1].value === "") {
      alert("수주금액을 확인하세요.");
      pjtRef.current[1].focus();
      return "NO";
    } else if (pjtRef.current[2].value === "") {
      alert("프로젝트 시작일을 확인하세요.");
      pjtRef.current[2].focus();
      return "NO";
    } else if (pjtRef.current[3].value === 0) {
      alert("프로젝트 종료일을 확인하세요.");
      pjtRef.current[3].focus();
      return "NO";
    } else if (pjtRef.current[4].value === "") {
      alert("PM을 확인하세요.");
      pjtRef.current[4].focus();
      return "NO";
    } else if (pjtRef.current[5].value === "") {
      alert("발주기관을 확인하세요.");
      pjtRef.current[5].focus();
      return "NO";
    } else if (pjtRef.current[6].value === "") {
      alert("직급을 확인하세요.");
      pjtRef.current[6].focus();
      return "NO";
    } else if (pjtRef.current[7].value === 0) {
      alert("기간(개월)을 확인하세요.");
      pjtRef.current[7].focus();
      return "NO";
    } else if (pjtRef.current[8].value === "") {
      alert("총 M/M를 확인하세요.");
      pjtRef.current[8].focus();
      return "NO";
    }
    return "OK";
  };

  const projectUpdate = () => {
    if (saveCheck() === "OK") {
      let url = "http://localhost/project/update";

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
    }
  };

  const projectDelete = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      let url = "http://localhost/project/delete/" + param.pjtNo;

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
      navigate("/project/list");
    }
  };

  return (
    <div className="div">
      <div><Item item={text} /></div>
      <hr />
      <label
        style={{ position: "relative", top: "-15px", fontSize: "90%" }}
        className="right-align"
      >
        단위 : 원
      </label>
      <table class="table table-bordered" style={{ fontSize: "90%" }}>
        <tbody>
          <tr>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-120-C"
              valign="middle"
            >
              프로젝트 No
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="pjtNo"
                maxLength="9"
                style={{
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "LightGray",
                }}
                ref={pjtNoRef}
                value={detail.pjtNo.replace(/(\d{6})(\d{3})/, '$1-$2')}
                readOnly
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              프로젝트 명
            </th>
            <td align="left" className="input-Nm" valign="middle">
              <input
                type="text"
                name="pjtNm"
                style={{ width: "100%" }}
                ref={(el) => (pjtRef.current[0] = el)}
                value={detail.pjtNm}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              수주금액(원)
            </th>
            <td align="left" className="input-120-L" valign="middle">
              <input
                type="text"
                name="totAmt"
                value={detail.totAmt.toLocaleString("ko-KR")}
                ref={(el) => (pjtRef.current[1] = el)}
                style={{ width: "100%", textAlign: "right" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              프로젝트 시작일
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="startDt"
                maxLength="8"
                style={{ width: "100%", textAlign: "center" }}
                ref={(el) => (pjtRef.current[2] = el)}
                value={detail.startDt}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              프로젝트 종료일
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="endDt"
                maxLength="8"
                style={{ width: "100%", textAlign: "center" }}
                ref={(el) => (pjtRef.current[3] = el)}
                value={detail.endDt}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
          </tr>
          <tr>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
              valign="middle"
            >
              프로젝트 PM
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="pm"
                style={{ width: "100%", textAlign: "center" }}
                ref={(el) => (pjtRef.current[4] = el)}
                value={detail.pm}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-120-C"
              valign="middle"
            >
              발주기관
            </th>
            <td align="left" className="input-content" valign="middle">
              <input
                type="text"
                name="orderOrg"
                style={{ width: "100%" }}
                ref={(el) => (pjtRef.current[5] = el)}
                value={detail.orderOrg}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-120-C"
              valign="middle"
            >
              직급
            </th>
            <td align="left" className="input-120-L" valign="middle">
              <input
                type="text"
                name="position"
                style={{ width: "100%", textAlign: "center" }}
                ref={(el) => (pjtRef.current[6] = el)}
                value={detail.position}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-120-C"
              valign="middle"
            >
              기간(개월)
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="term"
                maxLength="3"
                style={{ width: "100%", textAlign: "center" }}
                ref={(el) => (pjtRef.current[7] = el)}
                value={detail.term}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-120-C"
              valign="middle"
            >
              총 M/M
            </th>
            <td align="left" className="input-100-L" valign="middle">
              <input
                type="text"
                name="totMm"
                maxLength="4"
                style={{ width: "100%", textAlign: "center" }}
                ref={(el) => (pjtRef.current[8] = el)}
                value={detail.totMm}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Link to="/project/list">
        <button type="button" class="btn btn-primary btn-sm">
          프로젝트 조회
        </button>
      </Link>
      &nbsp;
      <button type="button" class="btn btn-primary btn-sm" onClick={projectUpdate}>
        프로젝트 수정
      </button>
      &nbsp;
      <button type="button" class="btn btn-primary btn-sm" onClick={projectDelete}>
        프로젝트 삭제
      </button>
    </div>
  );
};

export default ProjectDetail;
