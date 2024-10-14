// express
const express = require('express');
const path = require('path');
const app = express();

//api router prefix
app.use(express.static(path.join(__dirname, '')))

//listen 3100
app.listen(3100);

console.log('Start the client at port:3100');