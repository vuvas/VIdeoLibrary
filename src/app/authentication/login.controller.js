'use strict';

angular.module('myApp.controllers')
    .controller('LoginCtrl', LoginController);

function LoginController($scope, $location, ApiService, UserService) {
    $scope.login = login;

    (function initController() {
        //Reset login status
        UserService.ClearCredentials();
    })();

    function login() {
        $scope.dataLoading = true;
        var user = {
            username: $scope.username,
            password: $scope.password
        };

        ApiService.Post(API.User.Post.Auth).save(user, function (response) {
            if (response.status == 'success') {
                UserService.SetCredentials(response.sessionId);
                $location.path('/video');
            } else {
                alert("Invalid username or password");
            }
        }, function (error) {
            alert(error.message);
        });
    }
}