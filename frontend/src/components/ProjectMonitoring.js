import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ProjectMonitoring = () => {
  const [project, setProject] = useState();
  const [pjtDetail, setPjtDetail] = useState();
  const [monitor, setMonitor] = useState([]);
  const mntRef = useRef([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth()).toString().padStart(2, '0');
  const yyyymm = `${year}${month}`;

  useEffect(() => {
    mntRef.current[0].value = yyyymm;
    // projectList();
    mntRef.current[0].focus();
  }, []);

  const projectList = () => {

    let pjtUrl = "http://localhost/assign/projectList";

    fetch(pjtUrl)
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

  const projectDetalList = () => {
    let pjtUrl =
        "http://localhost/sign/list/" + mntRef.current[0].value;

      fetch(pjtUrl)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          setPjtDetail("");
          alert("데이터가 존재하지 않습니다.");
          throw Error("데이터가 데이터가 존재하지 않습니다.");
        }
      })
      .then((data) => {
        setPjtDetail(data);
        return true;
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  const ProjectCheckMonitoring = () => {
    if (projectDetalList()) {
      let url =
        "http://localhost/monitor/list/" + mntRef.current[0].value;

      fetch(url)
        .then((Res) => {
          if (Res.status === 200) {
            return Res.json();
          } else if (Res.status === 204) {
            setMonitor("");
            alert("데이터가 존재하지 않습니다.");
            throw Error("데이터가 데이터가 존재하지 않습니다.");
          }
        })
        .then((data) => {
          setMonitor(data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center">프로젝트 게약-투입-검수 통합 Monitoring입니다</h4>
      <hr />
      <b>검수기준월 :</b>
      &nbsp;
      <input
        type="text"
        maxLength="6"
        style={{ width: "80px", textAlign: "center" }}
        ref={(el) => (mntRef.current[0] = el)}
      />
      &nbsp;
      <b>프로젝트 :</b>
      &nbsp;
      <select
        name="pjtNo"
        ref={(el) => (mntRef.current[1] = el)}
        style={{ width: "200px" }}
      >
        <option value="" defaultValue="프로젝트 선택">
          프로젝트 선택
        </option>
        {project &&
          project.map((item, key) => (
            <option key={item.pjtNo} value={item.pjtNo}>
              [ {item.pjtNo} ] {item.pjtNm}
            </option>
          ))}
      </select>
      &nbsp;
      <button class="btn btn-primary" onClick={ProjectCheckMonitoring}>
        조회
      </button>
      &nbsp;
      <label style={{ fontSize: "10pt"}}>(프로젝트선택하여 Monitoring 상세내역을...)</label>
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
            {/* [{pjtDetail.pjtNo}] {pjtDetail.pjtNm} */}
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              발주기관
            </th>
            {/* {pjtDetail.orderOrg} */}
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              시작일
            </th>
            {/* {pjtDetail.startDt} */}
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              종료일
            </th>
            {/* {pjtDetail.endDt} */}
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-120-C"
            >
              기간(개월)
            </th>
            {/* {pjtDetail.term} */}
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-120-C"
            >
              총 M/M
            </th>
            {/* {pjtDetail.totMm} */}
            <th align="center" className="bg-secondary-subtle scope-col input-100-C">
              총 계약금액
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="totAmt"
                // value={pjtDetail.totAmt.toLocaleString("ko-KR")}
                readOnly
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-120-C"
            >
              PM
            </th>
            {/* {pjtDetail.pm} {pjtDetail.position} */}
          </tr>
        </tbody>
      </table>
      <hr />
      <table className="table table-striped table-bordered table table-condensed">
        <thead>
          <tr align="center">
            <th className="bg-secondary-subtle scope-col">BP사 명</th>
            <th className="bg-secondary-subtle scope-col">계약인력</th>
            <th className="bg-secondary-subtle scope-col">등급</th>
            <th className="bg-secondary-subtle scope-col">계약시작일</th>
            <th className="bg-secondary-subtle scope-col">계약종료일</th>
            <th className="bg-secondary-subtle scope-col">게약M/M</th>
            <th className="bg-secondary-subtle scope-col">계약단가</th>
            <th className="bg-secondary-subtle scope-col" style={{ color: "blue" }}>계약금액</th>
            <th className="bg-secondary-subtle scope-col" style={{ color: "blue" }}>투입인력</th>
            <th className="bg-secondary-subtle scope-col" style={{ color: "blue" }}>등급</th>
            <th className="bg-secondary-subtle scope-col" style={{ color: "blue" }}>투입시작일</th>
            <th className="bg-secondary-subtle scope-col" style={{ color: "blue" }}>투입종료일</th>
            <th className="bg-secondary-subtle scope-col" style={{ color: "blue" }}>실투입M/M</th>
            <th className="bg-secondary-subtle scope-col" style={{ color: "red" }}>검수인력</th>
            <th className="bg-secondary-subtle scope-col" style={{ color: "red" }}>등급</th>
            <th className="bg-secondary-subtle scope-col" style={{ color: "red" }}>검수시작일</th>
            <th className="bg-secondary-subtle scope-col" style={{ color: "red" }}>검수종료일</th>
            <th className="bg-secondary-subtle scope-col" style={{ color: "red" }}>검수M/M</th>
          </tr>
        </thead>
        {/* <tbody align="center">
          {sign &&
            sign.map((sign, key) => (
              <tr key={sign.sign_idx}>
                <td align="center">{sign.signMonth}</td>
                <td>
                  <Link to={`/sign/list/${sign.sign_idx}/${sign.signMonth}`}>
                    {sign.pjtNo}
                  </Link>
                </td>
                <td align="left">{sign.pjtNm}</td>
                <td>{sign.companyNo}</td>
                <td align="left">{sign.companyNm}</td>
                <td>{sign.bpPerson}</td>
                <td>{sign.grade}</td>
              </tr>
            ))}
        </tbody> */}
      </table>
    </div>
  );
};

export default ProjectMonitoring;
