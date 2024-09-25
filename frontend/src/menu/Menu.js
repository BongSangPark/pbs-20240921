import "./menu.css";

const Menu = () => {
  return (
    <div className="container-xxl">
      <ul class="menu">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/monitor">프로젝트 모니터링</a>
        </li>
        <li>
          <a href="#">프로젝트 관리</a>
          <ul class="depth_1">
            <li>
              <a href="/project/save">프로젝트 등록</a>
            </li>
            <li>
              <a href="/project/list">프로젝트 조회</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">BP사 관리</a>
          <ul class="depth_1">
            <li>
              <a href="/company/save">BP사 등록</a>
            </li>
            <li>
              <a href="/company/list">BP사 조회</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">BP사 계약관리</a>
          <ul class="depth_1">
            <li>
              <a href="/contract/save">계약 등록</a>
            </li>
            <li>
              <a href="/contract/list">계약 조회</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">인력투입 관리</a>
          <ul class="depth_1">
            <li>
              <a href="/assign/save">실투입 등록</a>
            </li>
            <li>
              <a href="/assign/list">실투입 조회</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">인력검수 관리</a>
          <ul class="depth_1">
            <li>
              <a href="/sign/save">검수 등록</a>
            </li>
            <li>
              <a href="/sign/list">검수 조회</a>
            </li>
          </ul>
        </li>
      </ul>
      </div>
  );
};
export default Menu;
