'use strict';

angular.module('myApp.controllers')
    .controller('VideoDetailCtrl', VideoDetailController);

function VideoDetailController($scope, ApiService,$sce,$route) {
    //$scope.videos = [];
    $scope.video = {};
    $scope.rootURL = RootAPIUrl;
    $scope.videoId = $route.current.params.videoId;

    $scope.max = RatingMaxValue;
    $scope.rating = 4;

    $scope.videos = [];
    $scope.rootURL = RootAPIUrl;
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

                    _.forEach($scope.videos,function(v){
                        return v.trustedURL = $sce.trustAsResourceUrl($scope.rootURL + v.url);
                    });
                    page++;
                } else {
                    inProgress = false;
                }
            });

        }
    };



    ApiService.GetObject(API.Video.Get.Video, {videoId:$scope.videoId})
        .then(function (response) {

        if (response.status == "success") {
            console.log("su");
            $scope.video = response.data;
            var sum  =  _.reduce($scope.video.ratings, function(memo, num)
                    {
                        return memo + num;
                    }, 0) / $scope.video.ratings.length;

            $scope.video.rating = Math.round(sum);
            console.log($scope.video);
        }
    });


    $scope.saveRating = function(video){
        $scope.rate = {
            videoId:video._id,
            rating:$scope.rating
        };
        ApiService.Post(API.Video.Post.Rate).save($scope.rate,function(response){
            if(response.status = "success"){
                $scope.video = response.data;
            }
        });
    }



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



    $scope.loadVideos();
    console.log("videos",$scope.videos);

}