import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Item from "../menu/Item";

const ContractList = () => {
  const [project, setProject] = useState();
  const [contract, setContract] = useState([]);
  const inputRef = useRef([]);

  const text = "Home > BP사 계약관리 > 계약 조회";

  let url = "http://localhost/contract/list";

  useEffect(() => {
    projectList();
    contractList(url);
    inputRef.current[0].focus();
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

  const contractList = (url) => {
    fetch(url)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          setContract("");
          alert("데이터가 존재하지 않습니다.");
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

  const contractLikeList = () => {
    let likeRef1 = inputRef.current[0].value;
    let likeRef2 = inputRef.current[1].value;

    let baseurl = "http://localhost/contract/like";
    let searchUrl = baseurl + "?pjtNo=" + likeRef1 + "&companyNm=" + likeRef2;

    fetch(searchUrl)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          setContract("");
          alert("데이터가 존재하지 않습니다.");
          throw Error("데이터가 데이터가 존재하지 않습니다.");
        }
      })
      .then((data) => {
        setContract(data);
      })
      .catch((error) => {
        console.error(error.message);
      });

    inputRef.current[0].focus();
  };

  return (
    <div className="container">
      <div><Item item={text} /></div>
      <hr />
      <b>프로젝트 :</b>
      &nbsp;
      <select
        name="pjtNo"
        ref={(el) => (inputRef.current[0] = el)}
        style={{ width: "300px" }}
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
      <b>BP사 명 :</b>
      &nbsp;
      <input
        type="text"
        ref={(el) => (inputRef.current[1] = el)}
        placeholder="BP사 명을 입력하세요."
      ></input>
      &nbsp;
      <button class="btn btn-primary" onClick={contractLikeList}>
        조회
      </button>
      &nbsp;
      <label>(프로젝트 NO를 클릭하여 상세내역을 확인하세요.)</label>
      <label className="right-align">
        <Link to="/contract/save">
          <button type="button" class="btn btn-primary">
            계약 등록
          </button>
        </Link>
      </label>
      <hr />
      <table className="table table-striped table-bordered table table-condensed">
        <thead>
          <tr align="center">
            <th className="bg-secondary-subtle scope-col">프로젝트 No</th>
            <th className="bg-secondary-subtle scope-col">프로젝트 명</th>
            <th className="bg-secondary-subtle scope-col">사업자 등록번호</th>
            <th className="bg-secondary-subtle scope-col">BP사 명</th>
            <th className="bg-secondary-subtle scope-col">대표자</th>
            <th className="bg-secondary-subtle scope-col">투입인력</th>
            <th className="bg-secondary-subtle scope-col">계약금액</th>
          </tr>
        </thead>
        <tbody align="center">
          {contract &&
            contract.map((contract, key) => (
              <tr key={contract.contract_idx}>
                <td>
                  <Link to={`/contract/list/${contract.contract_idx}`}>
                    {contract.pjtNo}
                  </Link>
                </td>
                <td align="left">{contract.pjtNm}</td>
                <td>{contract.companyNo.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')}</td>
                <td align="left">{contract.companyNm}</td>
                <td>{contract.leader}</td>
                <td>{contract.bpPerson}</td>
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

export default ContractList;
