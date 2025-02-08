// App.jsx
import React, { useState } from "react";
import Calendar from "./components/Calendar";
import Header from "./components/Header"; // Import the Header component

function App() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear(); // Get the current year
  const currentMonth = currentDate.getMonth() + 1;
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth); // February

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
      <h1 className="text-2xl font-bold text-center my-4">Calendar</h1>
      {/* Use the Header component here */}
      <Header
        year={year}
        month={month}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
      />
      <Calendar year={year} month={month} />
    </div>
  );
}

export default App;
