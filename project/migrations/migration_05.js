// migration.js

const pool = require('../db');

// Define your migration logic
const createSharedListsTableMigration = `
  CREATE TABLE IF NOT EXISTS shared_lists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    list_id INT NOT NULL,
    shared_user_id INT NOT NULL,
    permission ENUM('read', 'modify') DEFAULT 'read',
    FOREIGN KEY (list_id) REFERENCES lists(id),
    FOREIGN KEY (shared_user_id) REFERENCES users(id)
  )
`;

// Execute the migration
pool.query(createSharedListsTableMigration, (error) => {
  if (error) {
    console.error('Error executing shared_lists table migration:', error);
  } else {
    console.log('Shared_lists table migration successful!');
    pool.end(); // Close the connection pool after migration
  }
});
