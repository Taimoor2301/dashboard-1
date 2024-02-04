import React from "react";

export default function Button({ whenClick, color, text, disabled }) {
  return (
    <button
      disabled={disabled}
      className={`${color} p-2 rounded-md text-white font-semibold`}
      onClick={() => whenClick()}
    >
      {text}
    </button>
  );
}
