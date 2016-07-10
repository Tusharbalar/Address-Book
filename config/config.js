'use strict';

var _ = require('lodash');

var production = {
    db: 'mongodb://localhost/address-book'
};

var development = {
    db: 'mongodb://localhost/address-book-dev'
};

var config = {
    app: {
        title: 'Address Book',
        description: 'A simple address book example.'
    },
    port: process.env.PORT || 3000,
    mode: process.env.MODE || 'dev'
};

module.exports = _.extend(config, config.mode === 'prod' ? production : development);
