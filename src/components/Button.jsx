import React from "react";

function Button({ className, children, ...rest }) {
  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
}

export default Button;
