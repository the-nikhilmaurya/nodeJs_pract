// api to insert,delete and update data
const express  = require('express')
const {Pool} = require('pg')



const pool  = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'db',
    password: '1234',
    port: 5432
});

const port = 3000;
const app = express();



app.use(express.urlencoded({extended: false})); 
app.use(express.json());



//insert api
app.post('/insert',async (req, res) => {
  console.log("inserting....")
  try{
    const {fname, lname, dob, married, department, salary } = req.body;
    const insert = 'insert into employees (fname, lname, dob, married, department, salary) values ($1,$2,$3,$4,$5,$6) RETURNING *';
    const result = await pool.query(insert,[fname, lname, dob, married, department, salary]);
    console.log('Data inserted successfully');
    res.status(200).json({ message: 'Data inserted successfully', insertedRow: result.rows[0] });

  }catch(error){
      // console.log(error)
      console.error("got error while inserting")
      return res.status(500).json({ error: "got error while inserting" });
  }
});

app.delete('/delete',async (req, res) => {
  try{
    const { id } = req.body;
    const deleteQuery = 'delete from employees where id = $1;' 
    const result = await pool.query(deleteQuery,[id]);
    if(result.rowCount === 0){
      console.log("employee id not found to delete")
      return res.Status(404).json({error:"employee id not found to delete"})
    }
    console.log("Deleted successfully")
    return res.status(200).json({empoyeeID:" Deleted successfully"})

  }catch(error){
    console.error("not able to delete ")
    return res.status(500).json({ error: "not able to delete" });
  }
  
});

// show all
app.get('/show', async (req, res) => {
  console.log('show only')
  try{
    const query = ("select * from employees ;")
    const result = await pool.query(query);
    console.log("data fetched successfully")
    return res.status(200).json(result.rows);
  }catch(error){
      console.error("not able to fetch")
      return res.status(500).json({ error: "not able to fetch" });
  }
  
})


//show by id
app.get('/show/:id', async(req, res) => {
  console.log("showid")
  const {id} = req.params;
  try{
    const select = "select * from employees where id = $1;"
    const result = await pool.query(select,[id]);
    if(result.rowCount === 0){
      return res.status(404).json({error:"employee id not founddd"})
    }
    console.log("data fetched successfully")
    return res.status(200).json({message:"data fetched successfully",data:result.rows[0]});
    }catch(error){
      console.error("not able to fetch")
      return res.status(500).json({ error: "not able to fetch" });
    }
})


app.put('/update',async (req, res) => {
  console.log("updating....")
  try{
    const {id,fname, lname, dob, married, department, salary } = req.body;
    const update = 'update employees set fname = $2,lname = $3,dob = $4,married = $5,department = $6,salary = $7 where id = $1 returning *;';
    const result = await pool.query(update,[id,fname, lname, dob, married, department, salary]);
    if (result.rowCount === 0) {
      console.log("Data with the specified ID not found")
      res.status(404).json({ message: 'Data with the specified ID not found' });
    }
    console.log('Data updated successfully');
    res.status(200).json({ message: 'Data updated successfully', updated: result.rows[0] });

  }catch(error){
      console.log(error)
      console.error("got error while updating")
      return res.status(500).json({ error: "got error while updating" });
    }
    
  });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


// show using pagination concept limit and offset
app.get('/showlimit', async (req, res) => {
  console.log('show limited')
  try{
    const {limit ,offset} = req.body;
  
    const query = ("select * from employees LIMIT $1 OFFSET $2 ;")
    const result = await pool.query(query,[limit,offset]);
    if(result.rowCount === 0)
    {
        console.log('You trying to access rows that is now present')
        return res.json({overLimit:"You trying to access rows that is now present"})
    } 
    console.log("data fetched successfully")
    return res.status(200).json(result.rows);

    
  }catch(error){
      console.error("not able to fetch properly")
      return res.status(500).json({ error: "not able to fetch properly" });
  }
  
})

// searchingg by column name
app.get('/search', async (req, res) => {
  console.log('searching....')
  const keys = ['id','fname', 'lname', 'dob', 'married', 'department', 'salary']
  const values = req.body
  const keyArr = Object.keys(values)[0]
  console.log(keyArr)

  if(keys.indexOf(keyArr)<0){
      console.log("Invalid column name given")
      return res.status(404).json('Invalid column name given')
  }
  try{
    const {limit ,offset} = req.body;
    const valArr = Object.values(values)[0]
    console.log(valArr)
    const query = (`select * from employees where ${keyArr}= $1 LIMIT $2 OFFSET $3 ;`)
    const result = await pool.query(query,[valArr,limit,offset]);
    if(result.rowCount === 0){
      console.log("No Data exist for this particular value")
      return res.status(404).json('No Data exist for this particular value')
    }
    console.log("data fetched successfully")
    return res.status(200).json(result.rows);


  }catch(error){
    console.log(error)
      console.error("not able to fetch properly")
      return res.status(500).json({ error: "not able to fetch properly" });
  }  
})


//search dynamically
app.get('/searchd', async (req, res) => {
  console.log("searching dynamically..")
  const {value} = req.body
  
  console.log(value)
  try{
    const {limit ,offset} = req.body;
    const query = ('select * from employees where fname = $1 OR lname = $1 OR department = $1 LIMIT $2 OFFSET $3  ;')
    const result = await pool.query(query,[value,limit,offset]);
    if(result.rowCount === 0){
      console.log("No Data exist for this particular value")
      return res.status(404).json('No Data exist for this particular value')
    }
    console.log("data fetched successfully")
    return res.status(200).json(result.rows);


  }catch(error){
    console.log(error)
      console.error("not able to fetch properly")
      return res.status(500).json({ error: "not able to fetch properly" });
  }  
})


// update2  that is updating the particular column only by selecting the id
app.put('/update/:id', async (req, res) => {
  console.log("update2...")
  const keys = ['fname', 'lname', 'dob', 'married', 'department', 'salary']
  const {id} = req.params
  console.log(id)
  const values = req.body
  const keyArr = Object.keys(values)[0]
  console.log(keyArr)

  if(keys.indexOf(keyArr)<0){
      console.log("Invalid column name given")
      return res.status(404).json('Invalid column name given')
  }
  try{
    const valArr = Object.values(values)[0]
    console.log(valArr)
    const update = (`update employees set ${keyArr}=$2 where id = $1 returning *;`)


    const result = await pool.query(update,[id,valArr]);
    if(result.rowCount === 0  ){
      console.log("id not found")
      return res.status(404).json('id not found',)
    }
    console.log("Data updated successfully")
    return res.status(200).json({message:"Data updated successfully",data:result.rows[0]});


  }catch(error){
    console.log(error)
      console.error("not able to fetch properly")
      return res.status(500).json({ error: "not able to fetch properly" });
  }  
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

