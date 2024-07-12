const Task = require('../model/Task');

const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({ title : title,description: description ,userId:req.userId});
    await task.save();
    res.send({ id: task._id, message: 'Task created successfully' });
  } catch (err) {
    res.status(400).send({ error: 'Failed to create task' });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.status(400).send({ error: 'Failed to retrieve tasks' });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send({ error: 'Task not found' });
    res.send(task);
  } catch (err) {
    res.status(400).send({ error: 'Failed to retrieve task' });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send({ error: 'Task not found' });
    task.title = req.body.title;
    task.description = req.body.description;
    await task.save();
    res.send({ message: 'Task updated successfully' });
  } catch (err) {
    res.status(400).send({ error: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    res.send({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err); // Log the actual error for debugging
    res.status(400).send({ error: 'Failed to delete task' });
  }
};


module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };