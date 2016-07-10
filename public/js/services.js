(function () {

    'use strict';

    var services = angular.module('myServices', ['ngResource']);

    services.factory('Contact', ['$resource',
        function ($resource) {

            return $resource('contacts/:id', {
                id: '@_id'
            }, {
                update: {
                    method: 'PUT'
                }
            });
    }]);
}());