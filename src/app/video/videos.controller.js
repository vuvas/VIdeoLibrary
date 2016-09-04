'use strict';

angular.module('myApp.controllers')
    .controller('VideosCtrl', VideosController);

function VideosController($scope, ApiService) {
    $scope.videos = [];
    var pageSize = 10, page = 0;
    var previousPage = null;
    var inProgress = true;

    $scope.loadVideos = function () {
        if (inProgress) {
            var param = {
                skip: page * pageSize,
                limit: pageSize
            };
            console.log('previousPage', previousPage);
            if (page == previousPage) {
                return false;
            }
            console.log(page, param);
            ApiService.GetObject(API.Video.Get.Videos, param).then(function (response) {
                if (response.status == "success") {
                    //console.log("Response", response);
                    $scope.videos = $scope.videos.concat(response.data);
                    previousPage = page;
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