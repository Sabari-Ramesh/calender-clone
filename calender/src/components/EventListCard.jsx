import React from "react";

const EventListCard = ({ date, events, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose} // Close the card when clicking outside
      ></div>

      {/* Card Content */}
      <div className="bg-white p-4 rounded-lg w-full max-w-md shadow-lg z-50 relative">
        <h2 className="text-xl font-bold mb-2">Events for {date}</h2>
        <div className="flex flex-col gap-2">
          {events.map((event, idx) => (
            <div key={idx} className={`p-2 rounded ${event.color}`}>
              <p className="text-sm font-medium">{event.title}</p>
              <p className="text-xs text-gray-600">
                {event.startTime} - {event.endTime}
              </p>
            </div>
          ))}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-gray-300 rounded w-full"
          onClick={onClose} // Close the card
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventListCard;