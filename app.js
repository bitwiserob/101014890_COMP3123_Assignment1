const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const employeeRouter = require('./routes/employee');
const DB_URL = "mongodb+srv://admin:1234@~101014890.ceawi2z.mongodb.net/101014890?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/', userRouter);
app.use('/api/', employeeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>console.log(`Server is running port ${PORT}`));


module.exports = app;
