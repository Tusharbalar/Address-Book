    'use strict';

    var _ = require('lodash');

    exports.getErrorMessage = function (err) {

        var message = 'Unknown server error.';
        if (err.message) {
            message = err.message;
        } else {
            message = (_.first(err.errors)||{}).message || message;
        }

        return message;
    };
