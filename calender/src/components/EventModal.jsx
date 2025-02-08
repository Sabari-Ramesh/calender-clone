import React from "react";

const EventModal = ({ date, events, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-2">Events for {date}</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index} className={`p-2 rounded ${event.color}`}>
              <strong>{event.title}</strong> - {event.startTime} to{" "}
              {event.endTime}
            </li>
          ))}
        </ul>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventModal;
