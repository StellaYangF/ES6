const express = require("express");
const server = express();
const {port} = require('./constants');
server.get('/', (req,res)=> {
  res.send('Connected');
})
server.get('/user', (req,res)=> {
  res.send('user');
})
server.listen(port,() => {
  console.log(`Server is listening on port ${port}`);
})
