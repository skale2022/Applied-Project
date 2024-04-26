const pool = require('../db');

// Define your migration logic
const createListsTableMigration = `
  CREATE TABLE IF NOT EXISTS lists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`;

const createTasksTableMigration = `
  CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    list_id INT NOT NULL,
    FOREIGN KEY (list_id) REFERENCES lists(id)
  )
`;

const addListIdColumnMigration = `
  ALTER TABLE todos
  ADD COLUMN list_id INT,
  ADD FOREIGN KEY (list_id) REFERENCES lists(id)
`;

// Execute the migration
pool.query(createListsTableMigration, (error) => {
  if (error) {
    console.error('Error executing lists table migration:', error);
  } else {
    console.log('Lists table migration successful!');
    pool.query(createTasksTableMigration, (error) => {
      if (error) {
        console.error('Error executing tasks table migration:', error);
      } else {
        console.log('Tasks table migration successful!');
        pool.query(addListIdColumnMigration, (error) => {
          if (error) {
            console.error('Error executing add list_id column migration:', error);
          } else {
            console.log('Add list_id column migration successful!');
            pool.end(); // Close the connection pool after all migrations
          }
        });
      }
    });
  }
});
