var config = require("./env");

let constantfile = require('./config/constants.js');
Object.assign(config(), constantfile);

process.env = config();
console.log("process.env", process.env);

const express = require('express');
const app = express();
const fs = require("fs");
const port = process.env.PORT || 3001;
const flash = require('connect-flash');
const path = require('path');
const cookieParser = require('cookie-parser');
global.moment = require('moment');

const session = require('express-session');
var cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
const fileUpload = require('express-fileupload');

const nunjucks = require('nunjucks');
global.now = new Date();
global.dateFormat = dateFormat;

var Sequelize = require('sequelize');
global.Sequelize = Sequelize;
var sequelizeDB = require('./config/database.js')(Sequelize);
global.sequelize1 = sequelizeDB;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
nunjucks.configure('app/views', {
  autoescape: true,
  express: app,
  watch: false
});
var server = require('http').createServer(app);

app.set('view engine', 'html');
//set in headers in every request
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cookieSession({
    name: 'session',
    keys: ["define cookie"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }));  

app.use(flash());
app.use(fileUpload());

var model = require('./app/models/mysql/index')(Sequelize, sequelizeDB);
var controllers = require('./app/controllers/index')(model);
require('./routes/index.js')(app, model, controllers);

app.get('/test', (req, res) => {
  res.send({'msg':"Define Softwares Welcome You!"});  
});
//Start: Server connection
app.set('port', port);
var config = require("./config/constants.js");
server.listen(port, function () {
  console.log("(---------------------------------)");
  console.log("|         Server Started...       |");
  console.log("|   " + process.env.baseUrl + " :" + process.env.PORT + "    |");
  console.log("(---------------------------------)");
});
//End: Server connection

//End Setting Data
//End: Socket connection code
//catch 404 and forward to error handler
require('./config/error.js')(app);
module.exports = { app: app, server: server }
