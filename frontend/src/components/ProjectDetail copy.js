import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

// let amt = "";
let totamt = "";

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

  let url = "http://localhost/list/" + param.pjtNo;

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((Response) => {
        return Response.json();
      })
      .then((data) => {
        setDetail(data);
        totamt = data.totAmt.toLocaleString("ko-KR");
      });
  }, []);

  return (
    <div className="div">
      <h4 className="text-center">프로젝트 상세 내역입니다</h4>
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th align="center" className="bg-secondary-subtle scope-col">
              프로젝트 NO
            </th>
            {/* <td align="left">{detail.pjtNo}</td> */}
            <td align="left">
              <input type="text" value={detail.pjtNo} readOnly />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              프로젝트 명
            </th>
            {/* <td align="left">{detail.pjtNm}</td> */}
            <td align="left">
              <input type="text" value={detail.pjtNm} readOnly />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              발주기관
            </th>
            {/* <td align="left">{detail.orderOrg}</td> */}
            <td align="left">
              <input type="text" value={detail.orderOrg} readOnly />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              프로젝트 PM
            </th>
            {/* <td align="left">{detail.pm}&nbsp;{detail.position}</td> */}
            <td align="left" className="col-2">
              <input
                type="text" value={detail.pm} className="w-25" creadOnly />
              <input type="text" value={detail.position} className="w-25" readOnly />
            </td>
          </tr>
          <tr>
            <th align="center" className="bg-secondary-subtle scope-col">
              수주금액(원)
            </th>
            {/* <td align="left">{totamt}&nbsp;원</td> */}
            <td align="left">
              <input type="text" className="text-right" value={totamt} readOnly />
            </td>

            
            <th align="center" className="bg-secondary-subtle scope-col">
              프로젝트 시작일
            </th>
            {/* <td align="left">{detail.startDt}</td> */}
            <td align="left">
              <input type="text" align="left" value={detail.startDt} readOnly />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              프로젝트 종료일
            </th>
            {/* <td align="left">{detail.endDt}</td> */}
            <td align="left">
              <input type="text" value={detail.endDt} readOnly />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              총 M/M
            </th>
            <td align="left" className="col-2">
              {/* <td align="left">{detail.totMm}&nbsp;M/M</td> */}
              <input type="text" value={detail.totMm} className="w-25" readOnly />
              &nbsp;M/M
            </td>
          </tr>
        </tbody>
      </table>
      <Link to="/list">
        <button>프로젝트 조회</button>
      </Link>
    </div>
  );
};

export default ProjectDetail;
