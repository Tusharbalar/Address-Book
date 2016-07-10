'use strict';

var mongoose = require('mongoose'),
    config = require('./config/config');

var db = mongoose.connect(config.db, function (err) {
    if (err) {
        console.error('Unable to connect to MongoDB');
        console.log(err);
    } else {
        console.log('connected..');
    }
});

var app = require('./config/express')(db);

// start the application
app.listen(config.port, function () {
   console.log('Server started: http://localhost:3000');
});
