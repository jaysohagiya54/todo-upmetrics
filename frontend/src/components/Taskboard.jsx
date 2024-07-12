import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';

const Taskboard = ({ board, tasks, moveTask, editTask, deleteTask, createTask, deleteTaskboard }) => {
  const handleDrop = (item) => {
    moveTask(item.id, item.boardId, board._id);
  };

  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => handleDrop(item),
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleCreateTask = async (e) => {
    e.preventDefault();
    await createTask(board._id, { title: newTaskTitle, description: newTaskDescription });
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  return (
    <div ref={drop} className="flex flex-col m-4 p-4 shadow-xl bg-white rounded-md">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-2xl">{board.name}</h2>
          <h2 className="font-normal text-md">{board.description}</h2>
        </div>
        <button
          onClick={() => deleteTaskboard(board._id)}
          className="py-1 px-2 bg-red-500 text-white rounded-full text-xs "
        >
          Delete
        </button>
      </div>
      <div className="mt-4">
        {tasks.map((task) => (
          <Task key={task._id} task={task} boardId={board._id} editTask={editTask} deleteTask={deleteTask} />
        ))}
      </div>
      <form onSubmit={handleCreateTask} className="mt-4 flex flex-col">
        <input
          type="text"
          placeholder="Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="p-2 mb-2 border rounded h-8"
          required
        />
        <textarea
          placeholder="Task Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className="p-2 mb-2 border rounded h-12"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default Taskboard;
