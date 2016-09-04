'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'ngStorage',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers',
]).
    config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.when('/login', {
            templateUrl: 'app/authentication/login.html',
            controller: 'LoginCtrl'
        }).when('/video', {
            templateUrl: 'app/video/videos.html',
            controller: 'VideosCtrl'
        }).otherwise({redirectTo: '/login'});
    }]);

//Initializations
angular.module('myApp.services', []);
angular.module('myApp.directives', []);
angular.module('myApp.controllers', []);
