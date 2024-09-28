import React from "react";

const Item = (props) => {
  let text = props.item;

  return (
    <div class="position-relative">
      <label
        style={{
          position: "absolute",
          top: "-15px",
          left: "1px",
          fontSize: "75%",
          fontWeight: "bold",
        }}
        className="left-align"
      >
        <li>{text}</li>
      </label>
    </div>
  );
};

export default Item;
