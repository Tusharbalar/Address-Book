'use strict';

var _ = require('lodash'),
    mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    Contact = mongoose.model('Contact');

exports.create = function (req, res) {
    var contact = new Contact(req.body);
    contact.save(function (err) {
       if (err) {
           return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
       } else {
           res.jsonp(contact);
       }
    });
};

exports.read = function (req, res) {
    var contact = req.contact;
    return res.jsonp(contact);
};

exports.update = function (req, res) {
    var contact = req.contact;

    contact = _.extend(contact, req.body);
    contact.save(function (err) {
       if (err) {
           return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
       } else {
           res.jsonp(contact);
       }
    });
};

exports.remove = function (req, res) {
    var contact = req.contact;
    contact.remove(function (err) {
       if (err) {
           return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
       } else {
           res.jsonp(contact);
       }
    });
};

exports.list = function (req, res) {
    Contact.find().exec(function (err, contacts) {
       if (err) {
           return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
       } else {
           res.jsonp(contacts);
       }
    });
};

exports.findById = function (req, res, next, id) {
    Contact.findById(id).exec(function(err, contact) {
        if (err) return next(err);
		if (!contact) return next(new Error('Failed to load contact ' + id));
		req.contact = contact;
		next();
    });
};

// contact middleware

