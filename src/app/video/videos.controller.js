'use strict';

angular.module('myApp.controllers')
    .controller('VideosCtrl', VideosController);

function VideosController($scope, ApiService,$sce) {
    $scope.videos = [];
    $scope.rootURL = RootAPIUrl;
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
                    $scope.videos = $scope.videos.concat(response.data);
                    page++;
                } else {
                    inProgress = false;
                }
            });

        }
    };

    this.config = {
        preload: "none",
        sources: [
            {
                src: $sce.trustAsResourceUrl("asset/videos/What_is_the_MEAN_Stack.mp4"),
                type: "video/mp4"
            }
        ],
        theme: {
            url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
        },
        plugins: {
            controls: {
                autoHide: false ,
                autoHideTime: 5000
            }
        }
    };

    //Fetch first 10 videos
    $scope.loadVideos();
}