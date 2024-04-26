const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const userController = require('../controllers/userController');

router.get('/:userId/lists', todoController.getLists);
router.get('/:userId/lists/:listId/tasks', todoController.getTasks);
router.post('/:userId/lists/:listId/tasks', todoController.addTask);
router.put('/:userId/lists/:listId/tasks/:taskId', todoController.updateTask);
router.delete('/:userId/lists/:listId/tasks/:taskId', todoController.deleteTask);
router.delete('/:userId/lists/:listId', todoController.deleteList);
router.post('/:userId/lists', todoController.addList);
router.post('/:userId/lists/:listId/share', todoController.shareList);


router.get('/:users', userController.getAllUsers);
router.post('/register', userController.createUser);
router.post('/login',userController.loginUser)
module.exports = router;
