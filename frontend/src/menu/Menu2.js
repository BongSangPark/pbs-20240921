import { useState } from "react";
import "../menu/menu.css";

const Menu2 = () => {
  const [isHovering, setIsHovering] = useState(0);

  return (
    <div>
      <ul className="menu">
        <li
          onMouseOver={() => setIsHovering(1)}
          onMouseOut={() => setIsHovering(0)}
        >
          <a href="#">메인메뉴1</a>
          {isHovering ? (
            <ul className="depth_1">
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
        <li
          onMouseOver={() => setIsHovering(1)}
          onMouseOut={() => setIsHovering(0)}
        >
          <a href="#">메인메뉴2</a>
          {isHovering ? (
            <ul className="depth_1">
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
export default Menu2;
