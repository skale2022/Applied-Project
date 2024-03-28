const pool = require('../db');

// Define your migration logic
const addUserColumnMigration = `
  ALTER TABLE todos
  ADD COLUMN user_id INT;
`;

// Execute the migration
pool.query(addUserColumnMigration, (error) => {
  if (error) {
    console.error('Error executing migration:', error);
  } else {
    console.log('Migration successful - added user_id column to todos table!');
    pool.end(); // Close the connection pool after the migration
  }
});
