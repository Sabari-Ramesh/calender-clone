import React from "react";

const EventListCard = ({ date, events, onClose, onDelete, onEdit }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-full sm:max-w-md shadow-lg z-50">
        <h2 className="text-xl font-bold mb-2">Events for {date}</h2>
        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
          {events.map((event, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium">{event.title}</span>
                <span className="text-xs text-gray-500">
                  {event.startTime} - {event.endTime}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => onEdit(event)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => onDelete(event.id)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventListCard;
