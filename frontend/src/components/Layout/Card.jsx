import React from "react";

const Card = ({ children, className = "", style = {} }) => {
  return (
    <div
      className={`bg-white p-5 rounded-xl shadow-sm ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
