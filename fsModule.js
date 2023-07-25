const fs = require('fs');

// fs.readFile('file.txt','utf-8',(err,data)=>{
//     console.log(err,  data)
// })

// let a = fs.readFileSync('file.txt')
// console.log(a.toString())

// console.log('finished reading')


//write file
// fs.writeFile('file2.txt',"this is  a data",()=>{
//     console.log("written to the file")
// })

let a = fs.writeFileSync("file2.txt","hmm maje hai maje")


console.log("finished reading file")