import React, { useState } from "react";
import dayjs from "dayjs";
import useCalendar from "../hooks/useCalendar";
import EventModal from "./EventModal";
import EventListCard from "./EventListCard";
import EventDetailsModal from "./EventDetailsModal";

const Calendar = ({ year, month }) => {
  const { generateCalendar, addEvent, updateEvent, removeEvent, getEventsForDate } =
    useCalendar(year, month);

  const calendarGrid = generateCalendar();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEventListCard, setShowEventListCard] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get today's date
  const today = dayjs().format("YYYY-MM-DD");

  const handleClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleRemoveEvent = (id) => {
    removeEvent(id);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="p-4 relative">
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
          const isToday = date === today; // Check if the date is today

          return (
            <div
              key={index}
              className={`border p-1 flex flex-col justify-between items-center h-24 w-full cursor-pointer ${
                isToday ? "bg-yellow-200" : ""
              }`}
              onClick={() => handleClick(date)}
            >
              {/* Display the day number */}
              <div className={`text-center ${!isCurrentMonth ? "text-gray-500" : ""}`}>{day}</div>

              {/* Display events as buttons */}
              <div className="flex flex-col gap-1 w-full overflow-hidden">
                {dayEvents.slice(0, 2).map((event, idx) => (
                  <div key={idx} className="relative inline-block w-full">
                    <button
                      className={`w-full text-xs rounded px-1 py-0.5 truncate ${event.color}`}
                      style={{
                        textDecoration:
                          dayjs(date).isBefore(dayjs(), "day") ||
                          (date === today && event.endTime && dayjs(event.endTime).isBefore(dayjs()))
                            ? "line-through"
                            : "none",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventClick(event);
                      }}
                    >
                      {/* Show 3 letters on mobile, full title on desktop */}
                      <span className="sm:hidden">{event.title.slice(0, 3)}</span>
                      <span className="hidden sm:inline">{event.title}</span>
                    </button>
                    <span
                      className="absolute top-0 right-0 text-red-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveEvent(event.id);
                      }}
                    >
                      &times;
                    </span>
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <button
                    className={`text-xs text-blue-500 cursor-pointer w-full rounded px-1 py-0.5 truncate ${dayEvents[0].color}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDate(date);
                      setShowEventListCard(true);
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

      {/* Event Modal */}
      {showModal && (
        <EventModal
          date={selectedDate}
          onClose={() => setShowModal(false)}
          onSubmit={(eventData) => {
            const result = addEvent(eventData);
            if (result.success) setShowModal(false);
            return result;
          }}
        />
      )}

      {/* Event List Card */}
      {showEventListCard && (
        <EventListCard
          date={selectedDate}
          events={getEventsForDate(selectedDate)}
          onClose={() => setShowEventListCard(false)}
          onDelete={handleRemoveEvent}
          onEdit={(event) => {
            setSelectedEvent(event);
            setShowEventListCard(false);
          }}
        />
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onUpdate={(updatedEvent) => {
            const result = updateEvent(updatedEvent);
            if (result.success) setSelectedEvent(null);
            return result;
          }}
        />
      )}
    </div>
  );
};

export default Calendar;