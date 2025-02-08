import { useState } from "react";
import dayjs from "dayjs";

const useCalendar = (year, month) => {
  const [events, setEvents] = useState([]);

  // Generate a 35-grid calendar
  const generateCalendar = () => {
    const firstDayOfMonth = dayjs(`${year}-${month}-01`);
    const startDay = firstDayOfMonth.startOf("month").day(); // Day of the week for the 1st of the month
    const daysInMonth = firstDayOfMonth.daysInMonth();

    const calendarGrid = [];
    let dayCounter = 1 - startDay; // Start from the previous month's dates if necessary

    for (let i = 0; i < 5; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        const currentDate = dayjs(`${year}-${month}-01`).add(dayCounter, "day");
        const date = currentDate.format("YYYY-MM-DD");
        const day = currentDate.date();

        week.push({
          date,
          day,
          isCurrentMonth: currentDate.month() + 1 === month,
        });

        dayCounter++;
      }
      calendarGrid.push(week);
    }

    return calendarGrid;
  };

  // Add event
  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter((event) => event.date === date);
  };

  return { generateCalendar, addEvent, getEventsForDate };
};

export default useCalendar;