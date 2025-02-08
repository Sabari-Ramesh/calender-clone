import React from "react";

const EventListCard = ({ date, events, onClose, onDelete, onEdit }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="relative bg-white p-6 rounded-lg w-full sm:max-w-md shadow-lg z-50">
        {/* Header */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Events for {date}
        </h2>

        {/* Event List */}
        <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-2 rounded border border-gray-200"
            >
              {/* Event Details */}
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">{event.title}</span>
                <span className="text-sm text-gray-500">
                  {event.startTime} - {event.endTime}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {/* Edit Button */}
                <button
                  className="text-blue-500 hover:underline text-sm font-medium"
                  onClick={() => onEdit(event)}
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  className="text-red-500 hover:underline text-sm font-medium"
                  onClick={() => onDelete(event.id)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventListCard;
