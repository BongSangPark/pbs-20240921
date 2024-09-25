import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ProjectMonitoringSign = (props) => {
  const [sign, setSign] = useState([]);
  const pjtNo = props.pjtNo;
  const companyNo = props.companyNo;

  useEffect(() => {
    SignMonitoring(pjtNo, companyNo);
  }, [pjtNo, companyNo]);

  const SignMonitoring = (pjtNo) => {
    let url = "http://localhost/monitor/signlist/" + pjtNo + "/" + companyNo;
    fetch(url)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          setSign("");
          //alert("SignMonitoring 데이터가 존재하지 않습니다.");
          throw Error("데이터가 데이터가 존재하지 않습니다.");
        }
      })
      .then((data) => {
        setSign(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div
      style={{
        width: "36%",
        height: "300px",
        border: "1px solid black",
      }}
    >
      <table
        className="table table-striped table-bordered table table-condensed"
        style={{ width: "100%", fontSize: "75%" }}
      >
        <thead>
          <tr>
            <td
              align="center"
              colSpan={8}
              className="bg-secondary-subtle scope-col"
              style={{ width: "100%" }}
            >
              <b>BP사 검수</b>
            </td>
          </tr>
          <tr align="center">
            <th
              cassName="bg-secondary-subtle scope-col input-80-C"
              style={{ width: "22%", color: "red" }}
            >
              BP사 명
            </th>
            <th
              cassName="bg-secondary-subtle scope-col input-40-C"
              style={{ width: "9%", color: "red" }}
            >
              인력
            </th>
            <th
              cassName="bg-secondary-subtle scope-col input-30-C"
              style={{ width: "8%", color: "red" }}
            >
              등급
            </th>
            <th
              cassName="bg-secondary-subtle scope-col input-50-C"
              style={{ width: "13%", color: "red" }}
            >
              시작일
            </th>
            <th
              cassName="bg-secondary-subtle scope-col input-50-C"
              style={{ width: "13%", color: "red" }}
            >
              종료일
            </th>
            <th
              cassName="bg-secondary-subtle scope-col input-30-C"
              style={{ width: "8%", color: "red" }}
            >
              M/M
            </th>
            <th
              cassName="bg-secondary-subtle scope-col input-30-C"
              style={{ width: "12%", color: "red" }}
            >
              단가
            </th>
            <th
              cassName="bg-secondary-subtle scope-col input-30-C"
              style={{ width: "13%", color: "red" }}
            >
              금액
            </th>
          </tr>
        </thead>
        <tbody>
          {sign &&
            sign.map((sign, key) => (
              <tr key={sign.rowNum}>
                <td align="left">{sign.companyNm}</td>
                <td>{sign.bpPerson}</td>
                <td>{sign.grade}</td>
                <td>{sign.startDt}</td>
                <td>{sign.endDt}</td>
                <td>{sign.signMm}</td>
                <td align="right">{sign.price.toLocaleString("ko-KR")}</td>
                <td align="right">{sign.sumPrice.toLocaleString("ko-KR")}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectMonitoringSign;
