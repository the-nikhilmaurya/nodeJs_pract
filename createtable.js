const express = require('express');
const { Pool } = require('pg');

const app = express();

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db2', // Replace 'your_database' with your actual database name
  password: '1234', // Replace 'your_password' with your PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

// API endpoint to create the table
app.get('/create-table', (req, res) => {
  // SQL query to create the table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS data2 (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      age INTEGER
    )
  `;

  // Execute the query
  pool.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      res.status(500).json({ error: 'An error occurred while creating the table.' });
    } else {
      console.log('Table created successfully!');
      res.status(200).json({ message: 'Table created successfully!' });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
