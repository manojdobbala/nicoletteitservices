//Install express server
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const scribeLog = require('scribe-js')();
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const PORT = process.env.PORT || 3000;

var app = express();

// Logging
app.use(scribeLog.express.logger());
app.use('/logs', scribeLog.webPanel());

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Setup the view-engine and path for the client start point
app.set('views', path.join(__dirname, 'dist'));
app.set('views engine', 'html');
app.engine('html', ejs.renderFile);


app.listen(PORT, function (req, res) {
  console.log('Server is running on the port : ' + PORT);
});

app.use('/*',function(req,res,next){
  res.render('index.html');
  next();
});
