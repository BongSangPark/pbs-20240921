import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const ProjectDetail = () => {
  const param = useParams();
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

  const pjtNoRef = useRef("");
  let totamt = "";

  let url = "http://localhost/list/" + param.pjtNo;

  useEffect(() => {
    console.log("useEffect 실행중~~~");
    fetch(url, { method: "GET" })
      .then((Response) => {
        return Response.json();
      })
      .then((data) => {
        setDetail(data);
        totamt = data.totAmt.toLocaleString("ko-KR");
      });
  }, []);

  const handleValueChange = (e) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  };

  const projectUpdate = () => {
    let url = "http://localhost/update";

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(detail),
    })
      .then((Res) => {
        if (Res.status === 200) {
          return Response.json();
        } else {
          console.log("Update 문제가 발생했습니다.");
          return;
        }
      })
      .then((data) => {
        console.log("Update 성공!!!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const projectDelete = () => {
    let url = "http://localhost/delete/" + pjtNoRef.current.value;

    fetch(url, {
      method: "DELETE",
    })
      .then((Res) => {
        if (Res.status === 204) {
          return Response.json();
        } else {
          console.log("Delete 문제가 발생했습니다.");
          return;
        }
      })
      .then((data) => {
        console.log("Delete 성공!!!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="div">
      <h4 className="text-center">프로젝트 상세 내역입니다</h4>
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th align="center" className="bg-secondary-subtle scope-col">
              프로젝트 NO
            </th>
            <td align="left">
              <input type="text" ref={pjtNoRef} value={detail.pjtNo} readOnly/>
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              프로젝트 명
            </th>
            <td align="left">
              <input
                type="text"
                id="pjtNm"
                value={detail.pjtNm}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              발주기관
            </th>
            <td align="left">
              <input
                type="text"
                id="orderOrg"
                value={detail.orderOrg}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              프로젝트 PM
            </th>
            <td align="left" className="col-2">
              <input type="text" id="pm" value={detail.pm} className="w-25" />
              <input
                type="text"
                id="position"
                value={detail.position}
                className="w-25"
                onChange={(e) => handleValueChange(e)}
              />
            </td>
          </tr>
          <tr>
            <th align="center" className="bg-secondary-subtle scope-col">
              수주금액(원)
            </th>
            <td align="left">
              <input
                type="number"
                id="totAmt"
                className="text-right"
                value={detail.totAmt}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              프로젝트 시작일
            </th>
            <td align="left">
              <input
                type="text"
                id="startDt"
                align="left"
                value={detail.startDt}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              프로젝트 종료일
            </th>
            <td align="left">
              <input
                type="text"
                id="endDt"
                value={detail.endDt}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              총 M/M
            </th>
            <td align="left" className="col-2">
              <input
                type="text"
                id="totMm"
                value={detail.totMm}
                className="w-25"
                onChange={(e) => handleValueChange(e)}
              />
              &nbsp;M/M
            </td>
          </tr>
        </tbody>
      </table>
      <Link to="/list">
        <button>프로젝트 조회</button>
      </Link>
      &nbsp;
      <button onClick={projectUpdate}>프로젝트 수정</button>&nbsp;
      <button onClick={projectDelete}>프로젝트 삭제</button>
    </div>
  );
};

export default ProjectDetail;
