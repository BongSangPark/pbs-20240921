import React, { useEffect, useState } from "react";

const ProjectMonitoringContract = (props) => {
  const [contract, setContract] = useState([]);
  const pjtNo = props.pjtNo;
  const companyNo = props.companyNo;

  useEffect(() => {
    ContractMonitoring(pjtNo, companyNo);
  }, [pjtNo, companyNo]);

  const ContractMonitoring = (pjtNo) => {
    let url =
      "http://localhost/monitor/contractlist/" + pjtNo + "/" + companyNo;

    fetch(url)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          setContract("");
          //alert("ContractMonitoring 데이터가 존재하지 않습니다.");
          throw Error("데이터가 데이터가 존재하지 않습니다.");
        }
      })
      .then((data) => {
        setContract(data);
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
        className="table table-sm"
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
              <b>BP사 계약</b>
            </td>
          </tr>
          <tr align="center">
            <th
              cassName="bg-secondary-subtle scope-col input-80-L"
              style={{ width: "22%" }}
            >
              BP사 명
            </th>
            <th
              cassName="bg-secondary-subtle scope-col input-40-C"
              style={{ width: "9%" }}
            >
              인력
            </th>
            <th
              cassName="bg-secondary-subtle scope-col input-30-C"
              style={{ width: "8%" }}
            >
              등급
            </th>
            <th
              cassName="bg-secondary-subtle scope-col input-50-C"
              style={{ width: "13%" }}
            >
              시작일
            </th>
            <th
              cassName="bg-secondary-subtle scope-col input-50-C"
              style={{ width: "13%" }}
            >
              종료일
            </th>
            <th
              cassName="bg-secondary-subtle scope-col input-30-C"
              style={{ width: "8%" }}
            >
              M/M
            </th>
            <th
              cassName="bg-secondary-subtle scope-col input-30-C"
              style={{ width: "12%" }}
            >
              단가
            </th>
            <th
              cassName="bg-secondary-subtle scope-col input-30-C"
              style={{ width: "13%" }}
            >
              금액
            </th>
          </tr>
        </thead>
        <tbody>
          {contract &&
            contract.map((contract, key) => (
              <tr key={contract.rowNum}>
                <td align="left" style={{ whiteSpace: "nowrap", maxWidth: "60px", textOverflow: "ellipsis" }}>
                  {contract.companyNm}
                </td>
                <td>{contract.bpPerson}</td>
                <td>{contract.grade.substr(1)}</td>
                <td>{contract.startDt}</td>
                <td>{contract.endDt}</td>
                <td>{contract.contractMm}</td>
                <td align="right">{contract.price.toLocaleString("ko-KR")}</td>
                <td align="right">
                  {contract.sumPrice.toLocaleString("ko-KR")}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectMonitoringContract;
