import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task, boardId, editTask, deleteTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id, boardId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editTask(task._id, editedTask);
    setIsEditing(false);
  };

  return (
    <div
      ref={drag}
      className={`flex flex-col m-4 p-3 border rounded-md cursor-pointer ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="flex flex-col">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleEditChange}
            required
            className="p-1 mb-2 border rounded"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleEditChange}
            required
            className="p-1 mb-2 border rounded"
          />
          <div className="flex gap-3">
            <button type="submit" className="p-1 bg-blue-500 text-white rounded">
              Save
            </button>
            <button
              type="button"
              className="p-1 bg-gray-300 rounded"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => setIsEditing(true)} className="text-blue-500">
              Edit
            </button>
            <button onClick={() => deleteTask(task._id)} className="text-red-500">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
