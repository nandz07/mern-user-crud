
require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cors=require('cors')
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken')
const PORT = process.env.PORT;

var app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
mongoose.connect('mongodb://localhost:27017/mernCrud')
.then(()=>{
    console.log(`data base connected..!`);
})

const userRouter = require('./routes/users');



app.use('/', userRouter);



app.listen(PORT,()=>console.log(`server started at post ${PORT}`))
module.exports = app;
