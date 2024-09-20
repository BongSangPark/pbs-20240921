import { useState } from "react";
import { Link } from "react-router-dom";
import "../menu/menu.css";

const Menu = () => {

  return (
    <ul class="menu">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="#">MENU 2</Link>
          <ul class="depth_1">
            <li><a href="/project/save">프로젝트 등록</a></li>
            <li><a href="/project/list">프로젝트 조회</a></li>
          </ul>
      </li>
      <li>
        <Link to="#">프로젝트 계약관리</Link>
          <ul class="depth_1">
            <li><Link to="/contract/save">계약 등록</Link></li>
            <li><Link to="/contract/list">계약 조회</Link></li>
          </ul>
      </li>
      <li>
        <Link to="#">인력투입 관리</Link>
          <ul class="depth_1">
            <li><Link to="/assign/save">실투입 등록</Link></li>
            <li><Link to="/assign/list">실투입 조회</Link></li>
          </ul>
      </li>
      <li>
        <Link to="#">인력검수 관리</Link>
          <ul class="depth_1">
            <li><Link to="/confirm/save">검수 등록</Link></li>
            <li><Link to="/confirm/list">검수 조회</Link></li>
          </ul>
      </li>
    </ul>
  )
};
export default Menu;
