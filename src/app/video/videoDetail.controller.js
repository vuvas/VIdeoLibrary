'use strict';

angular.module('myApp.controllers')
    .controller('VideoDetailCtrl', VideoDetailController);

function VideoDetailController($scope, ApiService,$sce,$route,HelperService,VideoService) {
    $scope.video = {};
    $scope.video.rating = 0;
    $scope.videos = [];

    $scope.rootURL = RootAPIUrl;
    $scope.max = RatingMaxValue;
    $scope.videoId = $route.current.params.videoId;


    var pageSize = 11, page = 0;
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
    $scope.loadVideos();

    ApiService.GetObject(API.Video.Get.Video, {videoId:$scope.videoId})
        .then(function (response) {
            if (response.status == "success") {
                $scope.video = response.data;
                $scope.video.trustedURL = $sce.trustAsResourceUrl($scope.rootURL + $scope.video.url);
                $scope.video.rating = Math.round(HelperService.avg($scope.video.ratings));
            }

        });


    $scope.saveRating = function(video){
        $scope.rate = {
            videoId:video._id,
            rating: video.rating
        };

        ApiService.Post(API.Video.Post.Rate).save($scope.rate,function(response){
            if(response.status = "success"){
                $scope.video = response.data;
                $scope.video.rating = Math.round(HelperService.avg($scope.video.ratings));
            }
        });
    };



    this.config = {
        preload: "none",
        useNativeControls: true,
        src: $sce.trustAsResourceUrl($scope.rootURL + $scope.video.url),
        type: "video/mp4"
        ,
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





}