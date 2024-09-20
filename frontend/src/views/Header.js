import React from "react";

const Header = () => {
  return (
    <div className="text-center">
      <a href="/">Home</a>&nbsp; | &nbsp;
      <a href="/save">프로젝트 등록</a>&nbsp; | &nbsp;
      <a href="/list">프로젝트 조회</a>&nbsp; | &nbsp;
      <a href="/contract">계약 조회</a>&nbsp; | &nbsp;
      <a href="/real">실투입 조회</a>&nbsp; | &nbsp;
      <a href="/sign">검수 조회</a>&nbsp;
      <hr />
    </div>
  );
};

export default Header;
