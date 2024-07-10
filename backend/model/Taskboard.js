const mongoose = require('mongoose');

const taskboardSchema = new mongoose.Schema({
  name: String,
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

const Taskboard =  mongoose.model('Taskboard', taskboardSchema);

module.exports = Taskboard;