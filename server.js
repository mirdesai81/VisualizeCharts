var express = require('express'),
    path = require('path');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app,config);

/*require('./server/config/mongoose')(config);

require('./server/config/passport')();*/

require('./server/config/routes')(app);


app.listen(config.port, function(){
    console.log("App listening on port " + config.port + "...");
});