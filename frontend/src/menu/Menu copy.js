import { useState } from "react";

const Menu = () => {
  const [isHovering, setIsHovering] = useState(0);

  return (
    <div>
      <ul className="mainmenu">
        <li
          onMouseOver={() => setIsHovering(1)}
          onMouseOut={() => setIsHovering(0)}
        >
          <a href="#">메인메뉴1</a>
          <p>메인메뉴2</p>
          {isHovering ? (
            <ul className="submenu">
              <li>
                <a href="#">서브메뉴1</a>
              </li>
              <li>
                <a href="#">서브메뉴2</a>
              </li>
            </ul>
          ) : (
            ""
          )}
        </li>
      </ul>
    </div>
  );
};
export default Menu;
