const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gfgbackend',
  password: '1234',
  port: 5432
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

app.post('/insert', (req, res) => {
  const { value } = req.body;

  // SQL INSERT statement
  const insertQuery = 'INSERT INTO test VALUES ($1) RETURNING *';

  // Execute the query
  pool.query(insertQuery, [value], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred while inserting data.' });
    } else {
      console.log('Data inserted successfully!');
      res.status(200).json({ message: 'Data inserted successfully!', insertedRow: result.rows[0] });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
  
    // SQL DELETE statement
    const deleteQuery = 'DELETE FROM test WHERE id = $1 RETURNING *';
  
    // Execute the query
    pool.query(deleteQuery, [id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred while deleting data.' });
      } else if (result.rowCount === 0) {
        res.status(404).json({ message: 'Data with the specified ID not found.' });
      } else {
        console.log('Data deleted successfully!');
        res.status(200).json({ message: 'Data deleted successfully!', deletedRow: result.rows[0] });
      }
    });
  });


  app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { newValue } = req.body;
    console.log(id+"  " +newValue)
    // SQL UPDATE statement
    const updateQuery = 'UPDATE test SET id = $1 WHERE id = $2 RETURNING *';
  
    // Execute the query
    pool.query(updateQuery, [newValue, id], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred while updating data.' });
      } else if (result.rowCount === 0) {
        res.status(404).json({ message: 'Data with the specified ID not found.' });
      } else {
        console.log('Data updated successfully!');
        res.status(200).json({ message: 'Data updated successfully!', updatedRow: result.rows[0] });
      }
    });
  });
  
  


  app.get('/show', (req, res, next) => {
    // console.log("TEST DATA :");
    pool.query('Select * from test')
      .then(testData => {
        console.log(testData);
        res.send(testData.rows);
      })
  })
  
