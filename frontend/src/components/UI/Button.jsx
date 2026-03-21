import React from "react";

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      style={{
        width: "100%",
        padding: "12px",
        background: "#2a6e3f",
        color: "white",
        fontWeight: "600",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        marginTop: "10px",
        fontSize: "15px",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
