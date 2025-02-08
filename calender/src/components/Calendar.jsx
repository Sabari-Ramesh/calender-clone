import React, { useState } from "react";
import dayjs from "dayjs";
import useCalendar from "../hooks/useCalendar";
import EventModal from "./EventModal";

const Calendar = ({ year, month }) => {
  const { generateCalendar, addEvent, getEventsForDate } = useCalendar(
    year,
    month
  );
  const calendarGrid = generateCalendar();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddEvent = (date) => {
    const title = prompt("Enter event title:");
    if (title) {
      const startTime = prompt("Enter start time (HH:mm):");
      const endTime = prompt("Enter end time (HH:mm):");
      const color = getRandomLightColor();
      addEvent({ title, date, startTime, endTime, color });
    }
  };

  const getRandomLightColor = () => {
    const letters = "BCDEF".split("");
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-2 text-center font-bold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {calendarGrid.flat().map(({ date, day, isCurrentMonth }, index) => {
          const dayEvents = getEventsForDate(date);

          return (
            <div
              key={index}
              className={`border p-2 cursor-pointer hover:bg-gray-100 ${
                !isCurrentMonth ? "bg-gray-200" : ""
              }`}
              onClick={() => handleAddEvent(date)}
            >
              <div className={`${!isCurrentMonth ? "text-gray-500" : ""}`}>
                {day}
              </div>
              <div>
                {dayEvents.slice(0, 2).map((event, idx) => (
                  <div
                    key={idx}
                    className={`text-xs rounded p-1 mb-1 ${event.color}`}
                    style={{
                      textDecoration:
                        event.endTime && dayjs(event.endTime).isBefore(dayjs())
                          ? "line-through"
                          : "none",
                    }}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div
                    className="text-xs text-blue-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(date);
                    }}
                  >
                    +{dayEvents.length - 2} more...
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {showModal && (
        <EventModal
          date={selectedDate}
          events={getEventsForDate(selectedDate)}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
