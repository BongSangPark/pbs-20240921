import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Item from "../menu/Item";

const ProjectList = () => {
  const [project, setProject] = useState([]);
  const inputRef = useRef();

  const text = "Home > 프로젝트 관리 > 프로젝트 조회";

  let url = "http://localhost/project/list";

  useEffect(() => {
    projectList(url);
    inputRef.current.focus();
  }, []);

  const projectList = (url) => {
    fetch(url)
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          setProject("");
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

  const projectLikeList = () => {
    url = "http://localhost/project/like?pjtNm=" + inputRef.current.value;

    fetch(url, { method: "GET" })
      .then((Res) => {
        if (Res.status === 200) {
          return Res.json();
        } else if (Res.status === 204) {
          setProject("");
          alert("검색 데이터가 존재하지 않습니다.");
          throw Error("검색 데이터가 데이터가 존재하지 않습니다.");
        }
      })
      .then((data) => {
        setProject(data);
      })
      .catch((error) => {
        console.error(error.message);
      });

    inputRef.current.focus();
  };

  return (
    <div className="container">
      <div><Item item={text} /></div>
      <hr />
      <b>프로젝트 명 :</b>
      &nbsp;
      <input
        type="text"
        ref={inputRef}
        placeholder="프로젝트명을 입력하세요."
      ></input>
      &nbsp;
      <button type="button" class="btn btn-primary btn-sm" onClick={projectLikeList}>
        조회
      </button>
      &nbsp;
      <label>(프로젝트 NO를 클릭하여 상세내역을 확인하세요.)</label>
      <label className="right-align">
        <Link to="/project/save">
          <button type="button" class="btn btn-primary">
            프로젝트 등록
          </button>
        </Link>
      </label>
      <hr />
      <table className="table table-striped table-bordered table table-condensed">
        <thead>
          <tr align="center">
            <th>프로젝트 No</th>
            <th>프로젝트 명</th>
            <th>PM</th>
            <th>직급</th>
          </tr>
        </thead>
        <tbody align="center">
          {project &&
            project.map((project, key) => (
              <tr key={project.pjtNo}>
                <td>
                  <Link to={`/project/list/${project.pjtNo}`}>
                    {project.pjtNo.replace(/(\d{6})(\d{3})/, '$1-$2')}
                  </Link>
                </td>
                <td align="left">{project.pjtNm}</td>
                <td>{project.pm}</td>
                <td>{project.position}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
