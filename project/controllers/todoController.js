const pool = require('../db');

exports.getTasks = (req, res) => {
  const { listId } = req.params;
  pool.query('SELECT * FROM todos WHERE list_id = ?', [listId], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
};

exports.addTask = (req, res) => {
  const { listId } = req.params;
  const { task } = req.body;
  pool.query('INSERT INTO todos (list_id, task) VALUES (?, ?)', [listId, task], (error) => {
    if (error) throw error;
    res.json({ message: 'Task added successfully' });
  });
};

exports.updateTask = (req, res) => {
  const { listId, taskId } = req.params;
  const { completed } = req.body;
  pool.query('UPDATE todos SET completed = ? WHERE id = ? AND list_id = ?', [completed, taskId, listId], (error) => {
    if (error) throw error;
    res.json({ message: 'Task updated successfully' });
  });
};

exports.deleteTask = (req, res) => {
  const { listId, taskId } = req.params;
  console.log(`listId ${listId}, tsakId ${taskId}`)
  pool.query('DELETE FROM todos WHERE id = ? AND list_id = ?', [taskId, listId], (error) => {
    if (error) throw error;
    res.json({ message: 'Task deleted successfully' });
  });
};

exports.deleteList = (req, res) => {
  console.log(`reached deletelist`)
  const { listId } = req.params;
  pool.query('DELETE FROM todos WHERE list_id = ?', [listId], (error) => {
    if (error) throw error;
    pool.query('DELETE FROM lists WHERE id = ?', [listId], (error) => {
      if (error) throw error;
      res.json({ message: 'List and associated tasks deleted successfully' });
    });
  });
};

exports.getLists = (req, res) => {
  console.log(`function called and get lists ${JSON.stringify(req.params)}`)
  const { userId } = req.params;
  pool.query('SELECT lists.id AS list_id, lists.name, lists.user_id, todos.task, todos.completed, todos.id, shared_lists.permission FROM lists LEFT JOIN todos ON lists.id = todos.list_id LEFT JOIN shared_lists ON lists.id = shared_lists.list_id WHERE lists.user_id = ? OR shared_lists.shared_user_id = ?;', [userId,userId], (error, results) => {
    if (error) throw error;
    console.log(`result get list- ${JSON.stringify(results)}`)
    res.json(results);
  });
};

exports.addList = (req, res) => {
  const { userId } = req.params;
  const { name, tasks } = req.body; // Modified to accept tasks
  pool.query('INSERT INTO lists (user_id, name) VALUES (?, ?)', [userId, name], (error, result) => {
      if (error) throw error;
      const listId = result.insertId;
      if (tasks && tasks.length > 0) {
          const formattedTasks = tasks.map(task => [listId, task.task, task.completed]);
          pool.query('INSERT INTO todos (list_id, task, completed) VALUES ?', [formattedTasks], (error) => {
              if (error) throw error;
              res.json({ message: 'List added successfully with tasks' });
          });
      } else {
          res.json({ message: 'List added successfully' });
      }
  });
};

exports.shareList = (req, res) => {
  const { userId, listId } = req.params;
  const { username, permission } = req.body;
  console.log(`its here in sharelist`)
  // First, check if the user exists
  pool.query('SELECT id FROM users WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.error('Error checking user existence:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const sharedUserId = results[0].id;
    console.log(`shareUserId- ${sharedUserId}`)
    // Next, check if the list belongs to the requesting user
    pool.query('SELECT user_id FROM lists WHERE id = ?', [listId], (error, results) => {
      if (error) {
        console.error('Error checking list ownership:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
      
      console.log(`results[0].user_id ${results[0].user_id} \n userId ${userId}`)
      console.log(`results.length === 0 ${results.length === 0} \n  results[0].user_id !== userId ${ Number(results[0].user_id) !== Number(userId)}`)
      if (results.length === 0 || Number(results[0].user_id) !== Number(userId)) {
        return res.status(403).json({ message: 'Unauthorized to share this list' });
      }

      console.log(`listId - ${listId} sharedUserId- ${sharedUserId}`)
      // Check if the list is already shared with the user
      pool.query('SELECT * FROM shared_lists WHERE list_id = ? AND shared_user_id = ?', [listId, sharedUserId], (error, results) => {
        if (error) {
          console.error('Error checking existing share:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
          return res.status(400).json({ message: 'List already shared with this user' });
        }

        console.log(` before insert into share Lists`)
        // Share the list
        pool.query('INSERT INTO shared_lists (list_id, shared_user_id, permission) VALUES (?, ?, ?)', [listId, sharedUserId, permission], (error) => {
          if (error) {
            console.error('Error sharing list:', error);
            return res.status(500).json({ message: 'Internal server error' });
          }
          res.json({ message: 'List shared successfully' });
        });
      });
    });
  });
};
