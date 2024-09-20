import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ContractDetail = (props) => {
  const param = useParams();
  const crtIdxRef = useRef("");
  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    contract_idx: "",
    pjtNo: "",
    pjtNm: "",
    companyNo: "",
    companyNm: "",
    leader: "",
    bpPerson: "",
    grade: "",
    birth: "",
    startDt: "",
    endDt: "",
    contractMm: "",
    price: 0,
    sumPrice: 0,
  });

  const Grade = [
    { grade: "특급" },
    { grade: "고급" },
    { grade: "중급" },
    { grade: "초급" },
  ];

  let url = "http://localhost/contract/detail?pjtNo=" + param.pjtNo + "&companyNo=" + param.companyNo;

  console.log("url==>", url);

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

  const saveCheck = () => {
    if (crtIdxRef.current[0].value === "") {
      alert("프로젝트를 선택하세요.");
      crtIdxRef.current[0].focus();
      return "NO";
    } else if (crtIdxRef.current[1].value === "") {
      alert("BP사를 선택하세요.");
      crtIdxRef.current[1].focus();
      return "NO";
    } else if (crtIdxRef.current[2].value === "") {
      alert("계약금액을 확인하세요.");
      crtIdxRef.current[2].focus();
      return "NO";
    } else if (crtIdxRef.current[3].value === "") {
      alert("투입인력을 확인하세요.");
      crtIdxRef.current[3].focus();
      return "NO";
    } else if (crtIdxRef.current[4].value === "") {
      alert("등급을 확인하세요.");
      crtIdxRef.current[4].focus();
      return "NO";
    } else if (crtIdxRef.current[5].value === "") {
      alert("출생년도를 확인하세요.");
      crtIdxRef.current[5].focus();
      return "NO";
    } else if (crtIdxRef.current[6].value === "") {
      alert("계약 시작일을 확인하세요.");
      crtIdxRef.current[6].focus();
      return "NO";
    } else if (crtIdxRef.current[7].value === 0) {
      alert("계약 종료일을 확인하세요.");
      crtIdxRef.current[7].focus();
      return "NO";
    } else if (crtIdxRef.current[8].value === "") {
      alert("계약단가를 확인하세요.");
      crtIdxRef.current[8].focus();
      return "NO";
    } else if (crtIdxRef.current[9].value === "") {
      alert("계약 M/M를 확인하세요.");
      crtIdxRef.current[9].focus();
      return "NO";
    }
    return "OK";
  };

  const contractUpdate = () => {
    if (saveCheck() === "OK") {
      let url = "http://localhost/contract/update";

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

  const contractDelete = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      let url = "http://localhost/contract/delete/" + param.contract_idx;

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
      navigate("/contract/list");
    }
  };

  return (
    <div className="div">
      <h4 className="text-center">BP사 계약 상세 내역입니다</h4>
      <hr />
      <label
        style={{ position: "relative", top: "-15px" }}
        className="right-align"
      >
        단위 : 원
      </label>

      <table className="table table-striped table-bordered table table-condensed">
        <thead>
          <tr align="center">
            <th className="bg-secondary-subtle scope-col">프로젝트 명</th>
            <th className="bg-secondary-subtle scope-col">사업자 등록번호</th>
            <th className="bg-secondary-subtle scope-col">BP사 명</th>
            <th className="bg-secondary-subtle scope-col">투입인력</th>
            <th className="bg-secondary-subtle scope-col">등급</th>
            <th className="bg-secondary-subtle scope-col">계약단가</th>
            <th className="bg-secondary-subtle scope-col">계약금액</th>
            <th className="bg-secondary-subtle scope-col">계약금액</th>
          </tr>
        </thead>
        <tbody align="center">
          {detail &&
            detail.map((detail, key) => (
              <tr key={detail.contract_idx}>
                <td align="center">
                  <input
                    type="text"
                    name="contract_idx"
                    value={detail.contract_idx}
                    ref={(el) => (crtRef.current[0] = el)}
                    style={{ width: "100%", textAlign: "center" }}
                    onChange={(e) => handleValueChange(e)}
                    readOnly
                  />
                </td>
                <td>{detail.pjtNm}</td>
                <td align="center">
                  <input
                    type="text"
                    name="companyNo"
                    value={detail.companyNo}
                    ref={(el) => (crtRef.current[1] = el)}
                    style={{ width: "100%", textAlign: "center" }}
                    onChange={(e) => handleValueChange(e)}
                  />
                </td>
                <td>{detail.companyNm}</td>
                <td>
                  <input
                    type="text"
                    name="leader"
                    value={detail.leader}
                    ref={(el) => (crtRef.current[2] = el)}
                    style={{ width: "100%", textAlign: "center" }}
                    onChange={(e) => handleValueChange(e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="bpPerson"
                    value={detail.bpPerson}
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
                ref={(el) => (crtIdxRef.current[4] = el)}
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


                <td align="right" >{detail.sumPrice}
                  <input
                    type="text"
                    name="sumPrice"
                    value={detail.sumPrice}
                    ref={(el) => (crtRef.current[4] = el)}
                    style={{ width: "100%", textAlign: "right" }}
                    onChange={(e) => handleValueChange(e)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th
              align="center"
              className="bg-secondary-subtle scope-col"
              style={{
                width: "50px",
                textAlign: "center",
              }}
            >
              NO
            </th>
            <input
              type="text"
              name="contract_idx"
              maxLength="3"
              style={{
                width: "100%",
                textAlign: "center",
              }}
              value={detail.contract_idx}
              readOnly
            />
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              프로젝트
            </th>
            <input
              type="text"
              name="pjtNo"
              maxLength="9"
              style={{
                width: "100%",
                textAlign: "center",
                backgroundColor: "LightGray",
              }}
              value={detail.pjtNo}
              readOnly
            />
              <input
                type="text"
                name="pjtNm"
                style={{ width: "100%" }}
                value={detail.pjtNm}
                readOnly
              />
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              BP사
            </th>
            <input
              type="text"
              name="companyNo"
              maxLength="10"
              style={{
                width: "100%",
                textAlign: "center",
                backgroundColor: "LightGray",
              }}
              value={detail.companyNo}
              readOnly
            />
            <input
              type="text"
              name="companyNm"
              style={{ width: "100%" }}
              value={detail.companyNm}
              readOnly
            />
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              대표자
            </th>
            <input
              type="text"
              name="leader"
              style={{ width: "100%", textAlign: "center" }}
              value={detail.leader}
              readOnly
            />
            <th align="center" className="bg-secondary-subtle scope-col">
              계약금액
            </th>
            <td colSpan="3" align="left" className="input-amt">
              <input
                type="text"
                name="sumPrice"
                ref={(el) => (crtIdxRef.current[2] = el)}
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
                ref={(el) => (crtIdxRef.current[3] = el)}
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
                ref={(el) => (crtIdxRef.current[4] = el)}
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
                ref={(el) => (crtIdxRef.current[5] = el)}
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
                ref={(el) => (crtIdxRef.current[6] = el)}
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
                ref={(el) => (crtIdxRef.current[7] = el)}
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
                ref={(el) => (crtIdxRef.current[8] = el)}
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
                ref={(el) => (crtIdxRef.current[9] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Link to="/contract/list">
        <button type="button" class="btn btn-primary">
          계약 조회
        </button>
      </Link>
      &nbsp;
      <button type="button" class="btn btn-primary" onClick={contractUpdate}>
        계약 수정
      </button>
      &nbsp;
      <button type="button" class="btn btn-primary" onClick={contractDelete}>
        계약 삭제
      </button>
    </div>
  );
};

export default ContractDetail;
