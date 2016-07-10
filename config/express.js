'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    swig = require('swig'),
    path = require('path'),
    fs = require('fs'),
    config = require('./config');

function findFiles(dir, callback) {
    var base = path.join(__dirname, dir);
    var list = [];
    fs.readdir(base, function (err, files) {
        files.forEach(function (file) {
            if (path.extname(file) === '.js') {
                list.push(path.resolve(base, file));
            }
        });
        return callback(err, list);
    });
}

module.exports = function (db) {

    var app = express();

    // load

    // register swig template engine
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, '../app/views'));

    // enable jsonp
    app.enable('jsonp callback');

    // disable view cache in dev mode
    if (config.mode === 'dev') {
        app.set('view cache', false);
        swig.setDefaults({
            cache: false
        });
    }

    // setup models
    findFiles('../app/models', function (err, files) {
        files.forEach(require);
    });

    // setup routes
    findFiles('../app/routes', function (err, files) {
        files.forEach(function (file) {
            require(file)(app);
        });
    });

    // register body parsers
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(methodOverride());

    // serve static files from public directory
    app.use(express.static(path.join(__dirname, '../public')));

    // the index page
    var index = require('../app/controllers/index');
    app.get('/', index);

    return app;
};