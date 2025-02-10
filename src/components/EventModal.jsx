import React, { useState } from "react";

const EventModal = ({ date, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onSubmit({ title, date, startTime, endTime, description });
    if (!result.success) {
      setErrors(result.errors);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-full sm:max-w-md shadow-lg z-50">
        <h2 className="text-xl font-bold mb-2">Add Event for {date}</h2>
        <form onSubmit={handleSubmit}>
          {/* Event Title */}
          <div className="mb-2">
            <label className="block text-sm font-medium">Event Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              maxLength={20}
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title}</p>
            )}
          </div>

          {/* Start Time */}
          <div className="mb-2">
            <label className="block text-sm font-medium">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {errors.time && (
              <p className="text-red-500 text-xs">{errors.time}</p>
            )}
          </div>

          {/* End Time */}
          <div className="mb-2">
            <label className="block text-sm font-medium">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Description */}
          <div className="mb-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Overlap Error */}
          {errors.overlap && (
            <p className="text-red-500 text-xs mb-2">{errors.overlap}</p>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
