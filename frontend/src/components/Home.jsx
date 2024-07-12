import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Taskboard from './Taskboard';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState({ boards: [], tasks: [] });
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    try {
      const boardsResponse = await axios.get('http://localhost:3000/api/v1/taskboard', {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      });
      const tasksResponse = await axios.get('http://localhost:3000/api/v1/task', {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      });
      setData({ boards: boardsResponse.data, tasks: tasksResponse.data });
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => { 
    fetchData();
  }, []);

  const moveTask = async (taskId, sourceBoardId, targetBoardId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/taskboard/${sourceBoardId}/tasks/${taskId}`,{
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
  
      const taskToUpdate = data.tasks.find((task) => task._id === taskId);
      const addResponse = await axios.post(
        `http://localhost:3000/api/v1/taskboard/${targetBoardId}/tasks/${taskId}`,
        { ...taskToUpdate, boardId: targetBoardId },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
  
      const updatedTask = addResponse.data;
      const updatedTasks = data.tasks.map((task) =>
        task._id === taskId ? { ...updatedTask } : task
      );
      setData({ ...data, tasks: updatedTasks });
      fetchData();
    } catch (error) {
      console.error('Error moving task', error);
    }
  };
  

  const addBoard = async () => {
    if (newBoardTitle.trim() === '' || newBoardDescription.trim() === '') {
      alert('Please enter both title and description');
      return;
    }

    try {
      const newBoard = { name: newBoardTitle, description: newBoardDescription };
      const response = await axios.post('http://localhost:3000/api/v1/taskboard', newBoard, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      });
      fetchData();
      setNewBoardTitle('');
      setNewBoardDescription('');
      setShowForm(false);
    } catch (error) {
      console.error('Error adding board', error);
    }
  };

  const deleteTaskboard = async (taskboardId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/taskboard/${taskboardId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      });
      const updatedBoards = data.boards.filter((board) => board._id !== taskboardId);
      setData({ ...data, boards: updatedBoards });
      fetchData();
    } catch (error) {
      console.error('Error deleting taskboard', error);
    }
  };

  const editTask = async (taskId, updatedTask) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/task/${taskId}`, updatedTask, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      });
      const updatedTasks = data.tasks.map((task) =>
        task._id === taskId ? { ...task, ...updatedTask } : task
      );
      setData({ ...data, tasks: updatedTasks });
      fetchData();
    } catch (error) {
      console.error('Error editing task', error);
    }
  };

  const createTask = async (boardId, newTask) => {
    try {
      const taskResponse = await axios.post('http://localhost:3000/api/v1/task', newTask, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      });

      const createdTask = taskResponse.data;

      if (taskResponse.status) {
        await axios.post(`http://localhost:3000/api/v1/taskboard/${boardId}/tasks/${createdTask.id}`, {}, {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        });
      } else {
        console.error("Error creating task");
      }

      setData({ ...data, tasks: [...data.tasks, { ...createdTask, boardId }] });
      fetchData();
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/task/${taskId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      });
      const updatedTasks = data.tasks.filter((task) => task._id !== taskId);
      setData({ ...data, tasks: updatedTasks });
      fetchData();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <h3 className="text-2xl font-thin text-center p-4 mb-4">Your taskboards are here.</h3>
      <div className="flex m-4 gap-4 px-20 py-2">
        {data.boards.map((board) => {
          const tasks = board.tasks;
          return (
            <Taskboard
              key={board._id}
              board={board}
              tasks={tasks}
              moveTask={moveTask}
              editTask={editTask}
              deleteTask={deleteTask}
              createTask={createTask}
              deleteTaskboard={deleteTaskboard}
            />
          );
        })}
        <div
          className="taskboard new-board"
          onClick={() => setShowForm(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#e0e0e0',
            borderRadius: '5px',
            width: '100px',
            cursor: 'pointer',
          }}
        >
          <h2 style={{ fontSize: '2rem', margin: 0 }}>+</h2>
        </div>
      </div>

      {showForm && (
        <div className="flex flex-col w-60 items-center bg-slate-50 mx-96 p-4">
          <h2 className='text-lg font-semibold'>Create New Taskboard</h2>
          <input
            type="text"
            placeholder="Title"
            value={newBoardTitle}
            className='m-2 p-1 rounded-md w-52'
            onChange={(e) => setNewBoardTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={newBoardDescription}
            className='m-2 p-1 rounded-md w-52'
            onChange={(e) => setNewBoardDescription(e.target.value)}
          />
          <button onClick={addBoard} className='bg-slate-300 px-2 m-2 rounded-md'>Add Taskboard</button>
          <button onClick={() => setShowForm(false)} className='bg-slate-300 px-2 rounded-md'>Cancel</button>
        </div>
      )}
    </DndProvider>
  );
};

export default Home;
