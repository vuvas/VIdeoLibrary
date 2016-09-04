'use strict';

angular.module('myApp.controllers')
    .controller('VideosCtrl', VideosController);

function VideosController($scope, ApiService) {
    $scope.videos = [];
    var pageSize = 10, page = 0;
    var inProgress = true;

    $scope.loadVideos = function () {
        if (inProgress) {
            var param = {
                skip: page * pageSize,
                limit: pageSize
            };
            ApiService.GetObject(API.Video.Get.Videos, param).then(function (response) {
                if (response.status == "success") {
                    //console.log("Response", response);
                    $scope.videos = $scope.videos.concat(response.data);
                    page++;
                } else {
                    inProgress = false;
                }
            });

        }
    };

    //Fetch first 10 videos
    $scope.loadVideos();
}