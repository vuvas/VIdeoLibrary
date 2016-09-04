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
                        var sum = 0;
                    _.forEach($scope.videos,function(v){
                         v.trustedURL = $sce.trustAsResourceUrl($scope.rootURL + v.url);
                         v.rating = Math.round(_.reduce(v.ratings, function(memo, num) {
                                 return memo + num;
                             }, 0) / (v.ratings.length === 0 ? 1 : v.ratings.length));
                        return v;
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
    console.log("v",$scope.videos);
}