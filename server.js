const app = require('./app');
const http = require('http');
const dbconnect = require('./config/dbConnection');
require('dotenv').config();

const port = process.env.PORT

dbconnect();

const server = http.createServer(app);

server.listen(port,()=>{
console.log("server is running ") // production live https://mybackend-lake.vercel.app/
})