// Entry Point of the API Server

const express = require('express');

/* Creates an Express application.
The express() function is a top-level
function exported by the express module.
*/
const app = express();
const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'gfgbackend',
	password: '1234',
	dialect: 'postgres',
	port: 5432
});


/* To handle the HTTP Methods Body Parser
is used, Generally used to extract the
entire body portion of an incoming
request stream and exposes it on req.body
*/
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


pool.connect((err, client, release) => {
	if (err) {
		return console.error(
			'Error acquiring client', err.stack)
	}
	client.query('SELECT NOW()', (err, result) => {
		release()
		if (err) {
			return console.error(
				'Error executing query', err.stack)
		}
		console.log("Connected to Database !")
	})
})

app.get('/show', (req, res, next) => {
	// console.log("TEST DATA :");
	pool.query('Select * from test')
		.then(testData => {
			console.log(testData);
			res.send(testData.rows);
		}).catch((error)=>{
            res.send("error found")
        })
})

// Require the Routes API
// Create a Server and run it on the port 3000
const server = app.listen(3000, function () {
	let host = server.address().address
	let port = server.address().port
	// Starting the Server at the port 3000
})

app.delete('/delete/:id', (req, res) => {
    const id  = req.params.id;
    console.log(id)
  
    // SQL DELETE statement
    const deleteQuery = 'DELETE FROM test WHERE id = $1 RETURNING *';
  
    // Execute the query
    pool.query(deleteQuery,[id], (err, result) => {
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
