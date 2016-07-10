'use strict';

var contacts = require('../controllers/contacts');

module.exports = function (app) {
    // configure routes here
    app.route('/contacts')
        .get(contacts.list)
        .post(contacts.create);

    app.route('/contacts/:id')
        .get(contacts.read)
        .put(contacts.update)
        .delete(contacts.remove);

    // bind the contact middleware
    app.param('id', contacts.findById);
};