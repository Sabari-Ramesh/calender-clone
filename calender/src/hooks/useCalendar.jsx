import { useState } from "react";
import dayjs from "dayjs";
import data from "../data.json"; // Import static events

const useCalendar = (year, month) => {
  const [events, setEvents] = useState(data); // Static events loaded from data.json

  // Predefined light colors
  const lightColors = [
    "bg-green-300",
    "bg-red-300",
    "bg-orange-300",
    "bg-blue-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-pink-300",
  ];

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
    const randomColor = lightColors[Math.floor(Math.random() * lightColors.length)];
    const newEventWithId = { ...newEvent, color: randomColor, id: Date.now() }; // Use timestamp as unique ID
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
    prevEvents.map((event) => (event.id === id ? { ...event, ...updatedEvent } : event))
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
