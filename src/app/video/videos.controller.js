'use strict';

angular.module('myApp.controllers')
    .controller('VideosCtrl', VideosController);

function VideosController($scope, ApiService,$sce,HelperService) {
    $scope.videos = [];
    $scope.rootURL = RootAPIUrl;
    var pageSize = 10, page = 0;
    var inProgress = true;
    $scope.max = RatingMaxValue;

    $scope.loadVideos = function () {
        if (inProgress) {
            var param = {
                skip: page * pageSize,
                limit: pageSize
            };
            ApiService.GetObject(API.Video.Get.Videos, param).then(function (response) {
                if (response.status == "success") {
                    $scope.videos = $scope.videos.concat(response.data);
                    _.each($scope.videos,function(v){
                         v.trustedURL = $sce.trustAsResourceUrl($scope.rootURL + v.url);
                         v.rating = Math.round(HelperService.avg(v.ratings));
                    });
                    page++;
                } else {
                    inProgress = false;
                }
            });

        }

    };

    this.config = {
        preload: "none",
        type: "video/mp4",
        useNativeControls: true,
        theme: {
            url: "../bower_components/videogular-themes-default/videogular.min.css"
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