import React, { useState } from "react";
import Calendar from "./components/Calendar";

function App() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(2); // February

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center my-4">Custom Calendar</h1>
      <div className="flex justify-center mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handlePrevMonth}
        >
          Previous Month
        </button>
        <span className="mx-4 text-lg font-semibold">
          {new Date(year, month - 1).toLocaleString("default", { month: "long" })} {year}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleNextMonth}
        >
          Next Month
        </button>
      </div>
      <Calendar year={year} month={month} />
    </div>
  );
}

export default App;