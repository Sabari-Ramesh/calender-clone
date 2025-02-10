// components/Header.jsx
import React from "react";

function Header({ year, month, handlePrevMonth, handleNextMonth }) {
  return (
    <div className="flex relative max-w-[78rem] mx-auto rounded bg-blue-500">
      <button
        className="px-4 py-2 text-white rounded font-bold text-2xl"
        onClick={handlePrevMonth}
      >
        &lt;
      </button>
      <button
        className="px-4 py-2 text-white rounded font-bold text-2xl"
        onClick={handleNextMonth}
      >
        &gt;
      </button>
      <span className="mx-1 text-lg font-4xl mt-3">
        {new Date(year, month - 1).toLocaleString("default", {
          month: "long",
        })}{" "}
        {year}
      </span>
    </div>
  );
}

export default Header;
