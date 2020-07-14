const express = require ('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
// const {v4} = require('uuid');
const uniqid = require("uniqid");
const { format } = require('timeago.js');


//initializations
const app = express();
require('./database');

//Settings
app.set('port',process.env.PORT || 5000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//Midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
const storage = multer.diskStorage({
    destination:path.join(__dirname,'public/img/uploads'),
    filename: (req,file,cb,filename)=>{
        cb(null,uniqid()+ path.extname(file.originalname))
    }
});
app.use(multer({ storage }).single('image'));

//Global variables
app.use((req, res, next)=>{
    app.locals.format = format;
    next();
});

//Routes
app.use(require('./routes/index'));



//Static files
app.use(express.static(path.join(__dirname,'public')));

//Start the server
app.listen(app.get('port'), ()=>{
    console.log(`server on port ${app.get('port')}`);
});
