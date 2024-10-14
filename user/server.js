// express
const express = require('express');
const path = require('path');
const app = express();

//api router prefix
app.use(express.static(path.join(__dirname, '')))

//listen 3200
app.listen(3200);

console.log('Start the admin at port:3200');