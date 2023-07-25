const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
	host: 'localhost',
	database: 'gfgbackend',
	password: '1234',
	dialect: 'postgres',
	port: 5432
  });

  // SQL INSERT statement
const insertQuery = `
INSERT INTO test
VALUES (100)
RETURNING *;`;

// Execute the query
pool.query(insertQuery, (err, result) => {
if (err) {
  console.error('Error executing query:', err);
} else {
  console.log('Data inserted successfully!');
  console.log('Inserted row:', result.rows[0]);
}

// Don't forget to release the client back to the pool
pool.end();
});