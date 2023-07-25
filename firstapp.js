// first appp using express js
const express = require('express')

const app = express();
app.get('/',function(req,res){
    res.send("helloo how are you?")
})

app.get('/about',(req,res)=>{
    const id = req.query.id
    res.send("yes I am fine that's me "+id)
})

app.get('/about/:id',(req,res)=>{
    const id = req.params.id
    
    if(id==1){
        res.send("hello nikhil")
    }
    else{
        res.send("do i know you")
    }
    res.send("yes I am fine from "+id)
})


app.listen(3000,function(req){
    console.log("running....")
})