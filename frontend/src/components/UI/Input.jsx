import React from "react";

const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        marginBottom: "15px",
        fontSize: "14px",
      }}
    />
  );
};

export default Input;
