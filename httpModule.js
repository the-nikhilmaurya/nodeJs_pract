const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req,res)=>{
    console.log(req)
    res.statusCode = 200;
    res.setHeader("Content-Type",'text/html')
    res.end(`<h1> this is me</h1>`);
})


server.listen(port,()=>
{console.log(`server is listeninh on port ${port}`)
});