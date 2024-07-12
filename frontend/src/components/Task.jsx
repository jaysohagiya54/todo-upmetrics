// components/Task.js
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task, editTask, deleteTask }) => {
  const [, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task._id },
  }));

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
    <div ref={drag} className="flex flex-col m-4 p-3 border border-orange-600 rounded-md">
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className='flex flex-col'>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleEditChange}
            required
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleEditChange}
            required
          />
        <div className='flex gap-3'>
        <button type="submit" className='p-0.5 m-1 bg-slate-200 rounded-sm'>Save</button>
        <button type="button" className='p-0.5 m-1 bg-slate-200 rounded-sm' onClick={() => setIsEditing(false)}>     Cancel
        </button>
        </div>
       
        </form>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => setIsEditing(true)} className='text-xs font-thin text-left'>Edit</button>
          <button onClick={() => deleteTask(task._id)} className='text-xs font-thin text-left'>Delete</button>
        </>
      )}
    </div>
  );
};

export default Task;
