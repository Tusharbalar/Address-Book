(function () {

    'use strict';

    var my = angular.module('myControllers', []);

    my.controller('ContactCtrl', ['$scope', '$routeParams', '$location', 'Contact',
        function ($scope, $routeParams, $location, Contact) {

            $scope.find = function () {
                $scope.contacts = Contact.query();
            };

            $scope.findOne = function () {
                if ($routeParams.id) {
                    $scope.contact = Contact.get({
                        id: $routeParams.id
                    });
                } else {
                    $scope.contact = new Contact({});
                }
            };

            $scope.create = function () {
                $location.path('/contacts/edit');
            };

            $scope.edit = function (contact) {
                $location.path('/contacts/edit/' + contact._id);
            };

            $scope.remove = function (contact) {
                contact.$remove(function (res) {
                    var i = $scope.contacts.indexOf(contact);
                    $scope.contacts.splice(i, 1);
                });
            };

            $scope.save = function () {
                var contact = $scope.contact;
                if (contact._id) {
                    contact.$update(function (res) {
                        $location.path('/contacts');
                    });
                } else {
                    contact.$save(function (res) {
                        $location.path('/contacts');
                    });
                }
            };
    }]);
}());