const http = require('http');
const fs = require('fs')
const port = process.env.PORT || 3000;

const server = http.createServer((req,res)=>{
    console.log(req)
    res.statusCode = 200;
    res.setHeader("Content-Type",'text/html')
    if(req.url == '/')
    {
        res.end(`<h1> this is me</h1> <p> In the slash section`);
    }
    else if(req.url == '/about'){
        res.end(`<h1> this is me</h1> <p> you are in about section `);
    }
    else if(req.url == '/index'){
        let data = fs.readFileSync('index.html')
        res.end(data.toString());
    }
    else{
    res.statusCode = 404;
    res.end(`<h1> you have done something wrong check once `)


    }
})


server.listen(port,()=>
{console.log(`server is listeninh on port ${port}`)
});