// todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const userController = require('../controllers/userController');

router.get('/:userId', todoController.getTodos);
router.post('/', todoController.addTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

router.post('/register', userController.createUser);
router.post('/login',userController.loginUser)
module.exports = router;
