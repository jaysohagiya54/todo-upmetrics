const express = require('express');
const router = express.Router();
const TaskboardController = require('../controllers/TaskboardController');

router.post('/', TaskboardController.createTaskboard);
router.get('/', TaskboardController.getTaskboards);
router.get('/:id', TaskboardController.getTaskboard);
router.put('/:id', TaskboardController.updateTaskboard);
router.delete('/:id', TaskboardController.deleteTaskboard);
router.post('/:taskboardId/tasks/:taskId', TaskboardController.addTaskToTaskboard);
router.delete('/:taskboardId/tasks/:taskId', TaskboardController.removeTaskFromTaskboard);

module.exports = router;