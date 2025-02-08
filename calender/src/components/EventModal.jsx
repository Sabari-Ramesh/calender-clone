import React, { useState } from "react";

const EventModal = ({ date, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    // Validate event title length
    if (!title) {
      newErrors.title = "Event title is required.";
    } else if (title.length > 20) {
      newErrors.title = "Event title must not exceed 20 characters.";
    }

    // Validate start time and end time
    if (!startTime || !endTime) {
      newErrors.time = "Start time and end time are required.";
    } else if (startTime >= endTime) {
      newErrors.time = "Start time must be earlier than end time.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const color = getRandomLightColor();
      onSubmit({ title, date, startTime, endTime, description, color });
    }
  };

  // Generate a random light color
  const getRandomLightColor = () => {
    const colors = [
      "bg-green-300",
      "bg-red-300",
      "bg-orange-300",
      "bg-blue-300",
      "bg-yellow-300",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="bg-white p-4 rounded-lg w-full sm:max-w-md shadow-lg">
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
            {errors.time && (
              <p className="text-red-500 text-xs">{errors.time}</p>
            )}
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
