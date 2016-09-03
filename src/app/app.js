'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'myApp.controllers',
    'myApp.services'
]).
    config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.when('/view1', {
            templateUrl: 'app/authentication/view1.html',
            controller: 'View1Ctrl'
        }).when('/view2', {
            templateUrl: 'app/video/view2.html',
            controller: 'View2Ctrl'
        }).otherwise({redirectTo: '/view1'});
    }]);

//Initializations
angular.module('myApp.services', []);
angular.module('myApp.controllers', []);
