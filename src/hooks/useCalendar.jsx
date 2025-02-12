import { useState } from "react";
import dayjs from "dayjs";
import data from "../data.json";
const useCalendar = (year, month) => {
  const [events, setEvents] = useState(data);


  const lightColors = [
    "bg-green-200",
    "bg-red-200",
    "bg-orange-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-pink-200",
  ];

  
  const generateCalendar = () => {
    const firstDayOfMonth = dayjs(`${year}-${month}-01`);
    const startDay = firstDayOfMonth.startOf("month").day();
    const daysInMonth = firstDayOfMonth.daysInMonth();

    const calendarGrid = [];
    let dayCounter = 1 - startDay;

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
    const errors = {};

    // Validate event title length
    if (!title) {
      errors.title = "Event title is required.";
    } else if (title.length > 20) {
      errors.title = "Event title must not exceed 20 characters.";
    }

    // Validate start time and end time
    if (!startTime || !endTime) {
      errors.time = "Start time and end time are required.";
    } else if (startTime >= endTime) {
      errors.time = "Start time must be earlier than end time.";
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
      errors.overlap = "Error: Events cannot overlap on the same day.";
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    // Assign a random light color and a unique ID
    const randomColor =
      lightColors[Math.floor(Math.random() * lightColors.length)];
    const newEventWithId = { ...newEvent, color: randomColor, id: Date.now() };
    setEvents((prevEvents) => [...prevEvents, newEventWithId]);
    return { success: true };
  };

  // Update an existing event
  const updateEvent = (updatedEvent) => {
    const { id, date, title, startTime, endTime } = updatedEvent;
    const errors = {};

    // Validate event title length
    if (!title) {
      errors.title = "Event title is required.";
    } else if (title.length > 20) {
      errors.title = "Event title must not exceed 20 characters.";
    }

    // Validate start time and end time
    if (!startTime || !endTime) {
      errors.time = "Start time and end time are required.";
    } else if (startTime >= endTime) {
      errors.time = "Start time must be earlier than end time.";
    }

    // Validate overlapping events
    const existingEvents = events.filter(
      (event) => event.date === date && event.id !== id // Exclude the event being updated by its ID
    );
    const isOverlapping = existingEvents.some(
      (event) =>
        (startTime >= event.startTime && startTime < event.endTime) ||
        (endTime > event.startTime && endTime <= event.endTime) ||
        (startTime <= event.startTime && endTime >= event.endTime)
    );

    if (isOverlapping) {
      errors.overlap = "Error: Events cannot overlap on the same day.";
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    // Update the event in the state
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      )
    );

    return { success: true };
  };
  // Remove event by its unique identifier
  const removeEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter((event) => event.date === date);
  };

  return {
    generateCalendar,
    addEvent,
    updateEvent,
    removeEvent,
    getEventsForDate,
  };
};

export default useCalendar;
