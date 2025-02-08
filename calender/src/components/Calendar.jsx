import React, { useState } from "react";
import dayjs from "dayjs";
import useCalendar from "../hooks/useCalendar";
import EventModal from "./EventModal";

const Calendar = ({ year, month }) => {
  const { generateCalendar, addEvent, removeEvent, getEventsForDate } =
    useCalendar(year, month);
  const calendarGrid = generateCalendar();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleRemoveEvent = (date, title) => {
    removeEvent(date, title);
  };

  return (
    <div className="p-4">
      {/* Responsive Weekdays */}
      <div className="grid grid-cols-7 gap-0 text-center font-bold text-xs sm:text-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="border p-1">
            {day}
          </div>
        ))}
      </div>
      {/* Responsive Calendar Grid */}
      <div className="grid grid-cols-7 gap-0 mt-0 text-xs sm:text-sm">
        {calendarGrid.flat().map(({ date, day, isCurrentMonth }, index) => {
          const dayEvents = getEventsForDate(date);

          return (
            <div
              key={index}
              className={`border p-1 cursor-pointer hover:bg-gray-100 ${
                !isCurrentMonth ? "bg-gray-200" : ""
              }`}
              onClick={() => handleClick(date)}
            >
              {/* Display the day number */}
              <div className={`${!isCurrentMonth ? "text-gray-500" : ""}`}>
                {day}
              </div>

              {/* Display events as buttons */}
              <div className="flex flex-col gap-1">
                {dayEvents.slice(0, 2).map((event, idx) => (
                  <div key={idx} className="relative inline-block w-full">
                    <button
                      className={`w-full text-xs rounded px-1 py-0.5 ${event.color}`}
                      style={{
                        textDecoration:
                          event.endTime &&
                          dayjs(event.endTime).isBefore(dayjs())
                            ? "line-through"
                            : "none",
                      }}
                    >
                      {/* Show 3 letters on mobile, full title on desktop */}
                      <span className="sm:hidden">
                        {event.title.slice(0, 3)}
                      </span>
                      <span className="hidden sm:inline">{event.title}</span>
                    </button>
                    <span
                      className="absolute top-0 right-0 text-red-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveEvent(date, event.title);
                      }}
                    >
                      &times;
                    </span>
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <button
                    className={`text-xs text-blue-500 cursor-pointer w-full rounded px-1 py-0.5 ${dayEvents[0].color}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDate(date);
                      setShowModal(true);
                    }}
                  >
                    +{dayEvents.length - 2} more...
                  </button>
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
