import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import Item from "../menu/Item";

const SignDetail = () => {
  const param = useParams();
  const sgnRef = useRef([]);
  const [project, setProject] = useState();
  const [company, setCompany] = useState();
  const navigate = useNavigate();
  const [sign, setSign] = useState({
    asign_idx: "",
    pjtNo: "",
    pjtNm: "",
    companyNo: "",
    companyNm: "",
    signMonth: "",
    bpPerson: "",
    grade: "",
    birth: "",
    startDt: "",
    endDt: "",
    signMm: "",
    price: 0,
    sumPrice: 0,
  });

  const text = "Home > 인력검수 관리 > 검수 상세";

  const Grade = [
    { grade: "특급" },
    { grade: "고급" },
    { grade: "중급" },
    { grade: "초급" },
  ];

  useEffect(() => {
    projectList();
    companyList();
    detailList();
  }, []);

  const projectList = () => {
    let url = "http://localhost/assign/projectList";

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
        setProject(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const companyList = () => {
    let url = "http://localhost/assign/companyList";

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
        setCompany(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const detailList = () => {
    let url =
      "http://localhost/sign/list/" + param.sign_idx + "/" + param.signMonth;

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
        setSign(data);
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
        setSign(...sign, 0);
      } else {
        setSign({
          ...sign,
          [e.target.name]: price,
        });
      }
    } else {
      setSign({
        ...sign,
        [e.target.name]: e.target.value,
      });
    }
  };

  const saveCheck = () => {
    if (sgnRef.current[0].value === "") {
      alert("프로젝트를 확인하세요.");
      sgnRef.current[0].focus();
      return "NO";
    } else if (sgnRef.current[1].value === "") {
      alert("BP사를 확인하세요.");
      sgnRef.current[1].focus();
      return "NO";
    } else if (sgnRef.current[2].value === "") {
      alert("검수인력을 확인하세요.");
      sgnRef.current[2].focus();
      return "NO";
    } else if (sgnRef.current[3].value === "") {
      alert("등급을 확인하세요.");
      sgnRef.current[3].focus();
      return "NO";
    } else if (sgnRef.current[4].value === "") {
      alert("투입 시작일을 확인하세요.");
      sgnRef.current[4].focus();
      return "NO";
    } else if (sgnRef.current[5].value === 0) {
      alert("투입 종료일을 확인하세요.");
      sgnRef.current[5].focus();
      return "NO";
    } else if (sgnRef.current[6].value === "") {
      alert("실투입 M/M를 확인하세요.");
      sgnRef.current[6].focus();
      return "NO";
    } else if (sgnRef.current[7].value === "") {
      alert("검수단가를 확인하세요.");
      sgnRef.current[7].focus();
      return "NO";
    } else if (sgnRef.current[8].value === "") {
      alert("검수금액을 확인하세요.");
      sgnRef.current[8].focus();
      return "NO";
    } else if (sgnRef.current[9].value === "") {
      alert("출생년도를 확인하세요.");
      sgnRef.current[9].focus();
      return "NO";
    }
    return "OK";
  };

  const signUpdate = () => {
    if (saveCheck() === "OK") {
      let url = "http://localhost/sign/update";

      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(sign),
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

  const signDelete = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      let url =
        "http://localhost/sign/delete/" +
        param.sign_idx +
        "/" +
        param.signMonth;

      fetch(url, {
        method: "DELETE",
      })
        .then((Res) => {
          if (Res.status === 200) {
            return Res.json();
          } else {
            setSign("");
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
      navigate("/sign/list");
    }
  };

  return (
    <div className="div">
      <div><Item item={text} /></div>
      <hr />
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              검수년월
            </th>
            <td>{sign.signMonth}</td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              프로젝트
            </th>
            <td colSpan="5" align="left" className="input-Nm">
              <select
                name="pjtNo"
                value={sign.pjtNo}
                ref={(el) => (sgnRef.current[0] = el)}
                style={{ width: "100%" }}
                onChange={(e) => handleValueChange(e)}
              >
                <option defaultValue={sign.pjtNo}>프로젝트 선택</option>
                {project &&
                  project.map((item, key) => (
                    <option key={item.pjtNo} value={item.pjtNo}>
                      [ {item.pjtNo} ] {item.pjtNm}
                    </option>
                  ))}
              </select>
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              BP사
            </th>
            <td colSpan="3" align="left" className="input-Nm">
              <select
                name="companyNo"
                value={sign.companyNo}
                ref={(el) => (sgnRef.current[1] = el)}
                style={{ width: "100%" }}
                onChange={(e) => handleValueChange(e)}
              >
                <option defaultValue={sign.companyNo}>프로젝트 선택</option>
                {company &&
                  company.map((item, key) => (
                    <option key={item.pjtNo} value={item.companyNo}>
                      [ {item.companyNo} ] {item.companyNm}
                    </option>
                  ))}
              </select>
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              검수인력
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="bpPerson"
                value={sign.bpPerson}
                ref={(el) => (sgnRef.current[2] = el)}
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
              등급
            </th>
            <td align="left" className="input-100-L">
              <select
                name="grade"
                value={sign.grade}
                ref={(el) => (sgnRef.current[3] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              >
                <option defaultValue={sign.grade}>선택</option>
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
              검수시작일
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="startDt"
                value={sign.startDt}
                maxLength="8"
                ref={(el) => (sgnRef.current[4] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              검수종료일
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="endDt"
                value={sign.endDt}
                maxLength="8"
                ref={(el) => (sgnRef.current[5] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              검수M/M
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="signMm"
                value={sign.signMm}
                maxLength="4"
                ref={(el) => (sgnRef.current[6] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th
              align="center"
              className="bg-secondary-subtle scope-col input-100-C"
            >
              검수단가
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="price"
                value={sign.price.toLocaleString("ko-KR")}
                ref={(el) => (sgnRef.current[7] = el)}
                style={{ width: "100%", textAlign: "right" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
            <th align="center" className="bg-secondary-subtle scope-col input-100-C">
              검수금액
            </th>
            <td align="left" className="input-100-L">
              <input
                type="text"
                name="sumPrice"
                value={sign.sumPrice.toLocaleString("ko-KR")}
                ref={(el) => (sgnRef.current[8] = el)}
                style={{ width: "100%", textAlign: "right" }}
                onChange={(e) => handleValueChange(e)}
              />
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
                value={sign.birth}
                maxLength={4}
                ref={(el) => (sgnRef.current[9] = el)}
                style={{ width: "100%", textAlign: "center" }}
                onChange={(e) => handleValueChange(e)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Link to="/sign/list">
        <button type="button" class="btn btn-primary">
          검수 조회
        </button>
      </Link>
      &nbsp;
      <button type="button" class="btn btn-primary" onClick={signUpdate}>
        검수 수정
      </button>
      &nbsp;
      <button type="button" class="btn btn-primary" onClick={signDelete}>
        검수 삭제
      </button>
    </div>
  );
};

export default SignDetail;
