import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";

const ContractDetail = () => {
  const param = useParams();
  const crtRef = useRef([]);
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

  useEffect(() => {
    detailList();
  }, []);

  const detailList = () => {
    let url = "http://localhost/contract/list/" + param.contract_idx;
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
        setDetail(data);
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
    if (crtRef.current[0].value === "") {
      alert("투입인력을 확인하세요.");
      crtRef.current[0].focus();
      return "NO";
    } else if (crtRef.current[1].value === "") {
      alert("등급을 확인하세요.");
      crtRef.current[1].focus();
      return "NO";
    } else if (crtRef.current[2].value === "") {
      alert("출생년도를 확인하세요.");
      crtRef.current[2].focus();
      return "NO";
    } else if (crtRef.current[3].value === "") {
      alert("계약시작일을 확인하세요.");
      crtRef.current[3].focus();
      return "NO";
    } else if (crtRef.current[4].value === 0) {
      alert("계약종료일을 확인하세요.");
      crtRef.current[4].focus();
      return "NO";
    } else if (crtRef.current[5].value === "") {
      alert("계약단가를 확인하세요.");
      crtRef.current[5].focus();
      return "NO";
    } else if (crtRef.current[6].value === "") {
      alert("계약M/M를 확인하세요.");
      crtRef.current[6].focus();
      return "NO";
    } else if (crtRef.current[7].value === "") {
      alert("계약금액을 확인하세요.");
      crtRef.current[7].focus();
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
          if (Res.status === 200) {
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
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              프로젝트 No
            </th>
            <td>{detail.pjtNo}</td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              사업자 등록번호
            </th>
            <td>{detail.companyNo}</td>
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
                value={detail.bpPerson}
                ref={(el) => (crtRef.current[0] = el)}
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
                value={detail.grade}
                ref={(el) => (crtRef.current[1] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              >
                <option defaultValue={detail.grade}>
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
                value={detail.birth}
                ref={(el) => (crtRef.current[2] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
          </tr>
          <tr>
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
                value={detail.startDt}
                ref={(el) => (crtRef.current[3] = el)}
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
                value={detail.endDt}
                ref={(el) => (crtRef.current[4] = el)}
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
                value={detail.price.toLocaleString("ko-KR")}
                ref={(el) => (crtRef.current[5] = el)}
                style={{ width: "100%", textAlign: "right" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              계약M/M
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="contractMm"
                maxLength="4"
                value={detail.contractMm}
                ref={(el) => (crtRef.current[6] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col">
              계약금액
            </th>
            <td colSpan="3" align="left" className="input-amt">
              <input
                type="text"
                name="sumPrice"
                value={detail.sumPrice.toLocaleString("ko-KR")}
                ref={(el) => (crtRef.current[7] = el)}
                style={{ width: "100%", textAlign: "right" }}
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
