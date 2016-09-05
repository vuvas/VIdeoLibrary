'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'angular-md5',
    'ngStorage',
    'ngSanitize',

    'myApp.services',
    'myApp.directives',
    'myApp.controllers',

    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls'

]).
    config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.when('/login', {
            templateUrl: 'app/authentication/login.html',
            controller: 'LoginCtrl'
        }).when('/video', {
            templateUrl: 'app/video/videos.html',
            controller: 'VideosCtrl'
        }).when('/video/:videoId', {
            templateUrl: 'app/video/video-detail.html',
            controller: 'VideoDetailCtrl'
        }).otherwise({redirectTo: '/login'});
    }]);

//Initializations
angular.module('myApp.services', []);
angular.module('myApp.directives', []);
angular.module('myApp.controllers', []);
