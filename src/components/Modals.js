"use clinet"
import { useState } from 'react';

export const EditTaskListModal = ({ isOpen, onClose, tasklist, onSave }) => {
  const [text, setText] = useState(tasklist.text);
  const [deadline, setDeadline] = useState(tasklist.deadline || '');

  const handleSave = () => {
    onSave({ ...tasklist, text, deadline });
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-1/3">
          <h2 className="text-lg font-semibold mb-4">Edit Task List</h2>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="block w-full mt-1 p-2 border rounded"
            />
          </label>
          <label className="block mb-4">
            Deadline:
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="block w-full mt-1 p-2 border rounded"
            />
          </label>
          <div className="flex justify-end space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>
              Save
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};


