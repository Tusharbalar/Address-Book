'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Contact = Schema({
    firstName: {
        type: String,
        trim: true,
        required: 'Please provide first name.'
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please provide a valid email address']
    },
    phone: {
        type: String,
        trim: true
    }
});

mongoose.model('Contact', Contact);