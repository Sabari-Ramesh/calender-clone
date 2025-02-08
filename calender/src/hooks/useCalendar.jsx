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

  // Add event with validation
  const addEvent = (newEvent) => {
    const { date, startTime, endTime, title } = newEvent;

    // Validate event title length
    if (title.length > 20) {
      alert("Event title must not exceed 20 characters.");
      return false;
    }

    // Validate start time and end time
    if (startTime >= endTime) {
      alert("Start time must be earlier than end time.");
      return false;
    }

    // Validate overlapping events
    const existingEvents = events.filter((event) => event.date === date);
    const isOverlapping = existingEvents.some(
      (event) =>
        (startTime >= event.startTime && startTime < event.endTime) ||
        (endTime > event.startTime && endTime <= event.endTime) ||
        (startTime <= event.startTime && endTime >= event.endTime)
    );

    if (isOverlapping) {
      alert("Error: Events cannot overlap on the same day.");
      return false;
    }

    setEvents((prevEvents) => [...prevEvents, newEvent]);
    return true;
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter((event) => event.date === date);
  };

  return { generateCalendar, addEvent, getEventsForDate };
};

export default useCalendar;
