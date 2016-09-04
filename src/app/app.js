'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'ngStorage',
    'myApp.controllers',
    'myApp.services'
]).
    config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.when('/login', {
            templateUrl: 'app/authentication/login.html',
            controller: 'LoginCtrl'
        }).when('/video', {
            templateUrl: 'app/video/view2.html',
            controller: 'View2Ctrl'
        }).otherwise({redirectTo: '/login'});
    }]);

//Initializations
angular.module('myApp.services', []);
angular.module('myApp.controllers', []);
