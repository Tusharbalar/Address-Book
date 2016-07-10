(function () {

    var app = angular.module('myApp', [
        'ngRoute',
        'myControllers',
        'myServices'
    ]);

    app.config(['$routeProvider',
        function (routeProvider) {
            routeProvider.when('/contacts', {
                templateUrl: 'partials/contact-list.html'
            });
            routeProvider.when('/contacts/edit', {
                templateUrl: 'partials/contact-form.html'
            });
            routeProvider.when('/contacts/edit/:id', {
                templateUrl: 'partials/contact-form.html'
            });
    }]);

}());