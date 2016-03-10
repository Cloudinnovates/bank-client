var portNb = 3000;

var express = require('express');
var path = require('path');

var app = express();
var router = express.Router(); 

app.listen(portNb,function(){
  console.log("Live at Port "+portNb);
});

// Static geters
router.use("/public", express.static(__dirname + '/public'));
router.use("/angular2", express.static(__dirname + '/node_modules/angular2'));
router.use("/node_modules/angular2", express.static(__dirname + '/node_modules/angular2'));
router.use("/app", express.static(__dirname + '/app'));

// Every other get route send index.html
router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(router);