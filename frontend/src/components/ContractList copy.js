import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ContractList = () => {
  // const [list, setList] = useState();
  const [contract, setContract] = useState([]);
  const inputRef = useRef([]);
  const [search, setSearch] = useState({
    pjtNm: "",
    companyNm: "",
    bpPerson: "",
  });

  let url = "http://localhost/contract/list";

  useEffect(() => {
    contractList(url);
    inputRef.current[0].focus();
  }, []);

  const contractList = (url) => {
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
        setContract(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const contractLikeList = () => {
    let likeRef1 = inputRef.current[0].value;
    let likeRef2 = inputRef.current[1].value;
    let likeRef3 = inputRef.current[2].value;

    const baseurl = "http://localhost/contract/like?";

    // const params = {
    //   pjtNm : likeRef1,
    //   companyNm : likeRef2,
    //   bpPerson : likeRef3,
    // };

    // const queryString = new URLSearchParams(params).toString();
    // const url = `${baseurl}?${queryString}`;

    // const url = `http://localhost/contract/like?pjtNm=${likeRef1}&companyNm=${likeRef2}&bpPerson=${likeRef3}`;

    // const url = "http://localhost/contract/like?pjtNm=차세&companyNm=우수&bpPerson=일";

    let url = baseurl + "pjtNm=" + likeRef1 + "&companyNm=" + likeRef2 + "&bpPerson=" + likeRef3;
    console.log("url ==>", url);

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
        setContract(data);
      })
      .catch((error) => {
        console.error(error.message);
      });

    inputRef.current[0].focus();
  };

  return (
    <div className="container">
      <b>프로젝트 :</b>
      &nbsp;
      <input
        type="text"
        ref={(el) => (inputRef.current[0] = el)}
        placeholder="프로젝트 명을 입력하세요."
      ></input>
      &nbsp;
      <b>BP사 명 :</b>
      &nbsp;
      <input
        type="text"
        ref={(el) => (inputRef.current[1] = el)}
        placeholder="BP사 명을 입력하세요."
      ></input>
      &nbsp;
      <b>투입인력 :</b>
      &nbsp;
      <input
        type="text"
        ref={(el) => (inputRef.current[2] = el)}
        placeholder="투입인력을 입력하세요."
      ></input>
      &nbsp;
      <button class="btn btn-primary" onClick={contractLikeList}>
        조회
      </button>
      &nbsp;
      <label>(프로젝트 NO를 클릭하여 상세내역을 확인하세요.)</label>
      <hr />
      <table className="table table-striped table-bordered table table-condensed">
        <thead>
          <tr align="center">
            <th>프로젝트 NO</th>
            <th>프로젝트 명</th>
            <th>사업자 등록번호</th>
            <th>BP사 명</th>
            <th>대표자</th>
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
                <td>{contract.companyNo}</td>
                <td>{contract.companyNm}</td>
                <td>{contract.leader}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractList;
