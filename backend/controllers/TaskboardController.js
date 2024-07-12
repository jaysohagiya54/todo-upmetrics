const Taskboard = require('../model/Taskboard');
const Task = require('../model/Task');

const createTaskboard = async (req, res) => {
  const { name, description } = req.body;
  try {
    const taskboard = new Taskboard({ name, description, userId: req.userId }); // assuming userId is in req.token
    await taskboard.save();
    res.send({ message: 'Taskboard created successfully' });
  } catch (err) {
    console.error(err); // Log the actual error for debugging
    res.status(400).send({ error: 'Failed to create taskboard' });
  }
};

const getTaskboards = async (req, res) => {
  try {
    const taskboards = await Taskboard.find({userId:req.userId}).populate('tasks');
    res.send(taskboards);
  } catch (err) {
    res.status(400).send({ error: 'Failed to retrieve taskboards' });
  }
};

const getTaskboard = async (req, res) => {
  try {
    const taskboard = await Taskboard.findById(req.params.id).populate('tasks');
    if (!taskboard) return res.status(404).send({ error: 'Taskboard not found' });
    res.send(taskboard);
  } catch (err) {
    res.status(400).send({ error: 'Failed to retrieve taskboard' });
  }
};

const updateTaskboard = async (req, res) => {
  try {
    const taskboard = await Taskboard.findById(req.params.id);
    if (!taskboard) return res.status(404).send({ error: 'Taskboard not found' });
    taskboard.name = req.body.name;
    taskboard.description = req.body.description;
    await taskboard.save();
    res.send({ message: 'Taskboard updated successfully' });
  } catch (err) {
    res.status(400).send({ error: 'Failed to update taskboard' });
  }
};

const deleteTaskboard = async (req, res) => {
  try {
    const taskboard = await Taskboard.findByIdAndDelete(req.params.id);
    if (!taskboard) return res.status(404).send({ error: 'Taskboard not found' });
    res.send({ message: 'Taskboard deleted successfully' });
  } catch (err) {
    console.error(err); // Log the actual error for debugging
    res.status(400).send({ error: 'Failed to delete taskboard' });
  }
};

const addTaskToTaskboard = async (req, res) => {
  try {
    const taskboard = await Taskboard.findById(req.params.taskboardId);
    if (!taskboard) {
      return res.status(404).send({ error: 'Taskboard not found' });
    }

    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    // Push the task's _id into taskboard.tasks array
    taskboard.tasks.push(task._id);

    // Save the updated taskboard
    await taskboard.save();

    res.send({ message: 'Task added to taskboard successfully' });
  } catch (err) {
    console.error('Error adding task to taskboard:', err);
    res.status(400).send({ error: 'Failed to add task to taskboard' });
  }
};

const removeTaskFromTaskboard = async (req, res) => {
  try {
    const taskboard = await Taskboard.findById(req.params.taskboardId);
    if (!taskboard) {
      return res.status(404).send({ error: 'Taskboard not found' });
    }

    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    // Find index of task's _id in taskboard.tasks array
    const index = taskboard.tasks.indexOf(task._id);
    if (index === -1) {
      return res.status(400).send({ error: 'Task not found in taskboard' });
    }

    // Remove task's _id from taskboard.tasks array
    taskboard.tasks.splice(index, 1);

    // Save the updated taskboard
    await taskboard.save();

    res.send({ message: 'Task removed from taskboard successfully' });
  } catch (err) {
    console.error('Error removing task from taskboard:', err);
    res.status(400).send({ error: 'Failed to remove task from taskboard' });
  }
};


module.exports = { createTaskboard, getTaskboards, getTaskboard, updateTaskboard, deleteTaskboard, addTaskToTaskboard , removeTaskFromTaskboard };