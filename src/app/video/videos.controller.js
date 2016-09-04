'use strict';

angular.module('myApp.controllers')
    .controller('VideosCtrl', VideosController);

    function VideosController ($scope,ApiService) {
        (function initController() {
            //Fetch Videos
            ApiService.GetObject(API.Video.Get.Videos, {}).then(function (response) {
                $scope.videos = response.data;
            });
        })();
    }