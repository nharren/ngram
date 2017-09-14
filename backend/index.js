require('dotenv').config()
console.log(process.env);
require('babel-register')
require('./src/main.js')
