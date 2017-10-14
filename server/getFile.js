var getJson = require('../app/getLastData');
var fs = require('fs');
var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = Express();

app.use(bodyParser.json());

var jsonInfo = getJson.jsonInfo;


//var jsonObject = JSON.parse(jsonInfo);
fs.writeFile(process.cwd() + "/static/previsions.json", "Hello", "utf8", function(error) {
    if (error) {
        console.log(error);
    }
});


