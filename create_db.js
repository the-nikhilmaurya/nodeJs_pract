const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres', // default database name (usually "postgres")
  password: '1234',
  port: 5432, // default PostgreSQL port
});

// API endpoint to create the database
app.get('/create-database', async (req, res) => {
  try {
    // Connect to the database server
    const client = await pool.connect();

    // SQL query to create the new database
    const createDatabaseQuery = 'CREATE DATABASE db2;';

    // Execute the query to create the database
    await client.query(createDatabaseQuery);

    // Release the client back to the pool
    client.release();

    console.log('Database created successfully!');
    res.status(200).json({ message: 'Database created successfully!' });
  } catch (err) {
    console.error('Error creating database:', err);
    res.status(500).json({ error: 'An error occurred while creating the database.' });
  }
});

// create table


// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
