var express = require('express'); 

var app = express();

// Add headers
app.use(function (req, res, next) {
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET'/*, POST, OPTIONS, PUT, PATCH, DELETE'*/);
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', false);
    
        // Pass to next layer of middleware
        next();
    });

app.use(express.static(__dirname + '/server/static'));

app.listen(process.env.PORT || 3000);