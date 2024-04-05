// todoController.js
const pool = require('../db');

exports.getTodos = (req, res) => {
  const { userId } = req.params;
  console.log(`userId- ${userId}`)
  pool.query('SELECT * FROM todos WHERE user_id = ?', [userId], (error, results) => {
    if (error) throw error;
    console.log(`results ${results}`)
    res.json(results);
  });
};

exports.addTodo = (req, res) => {
  const { userId, task } = req.body;
  console.log(`userId- ${userId} task- ${task}`)
  pool.query('INSERT INTO todos (user_id, task) VALUES (?, ?)', [userId, task], (error) => {
    if (error) throw error;
    res.json({ message: 'Task added successfully' });
  });
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  pool.query('UPDATE todos SET completed = ? WHERE id = ?', [completed, id], (error) => {
    if (error) throw error;
    res.json({ message: 'Task updated successfully' });
  });
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM todos WHERE id = ?', [id], (error) => {
    if (error) throw error;
    res.json({ message: 'Task deleted successfully' });
  });
};
