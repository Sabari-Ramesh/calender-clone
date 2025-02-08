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

  const handleDoubleClick = (date) => {
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
              onDoubleClick={() => handleDoubleClick(date)}
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
                      setSelectedDate(date);
                      setShowModal(true);
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
          onClose={() => setShowModal(false)}
          onSubmit={(eventData) => {
            const success = addEvent(eventData);
            if (success) setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Calendar;
