'use strict';

angular.module('myApp.controllers')
    .controller('VideosCtrl', VideosController);

function VideosController($scope, ApiService,$sce,HelperService) {
    $scope.videos = [];
    $scope.rootURL = RootAPIUrl;
    var pageSize = 10, page = 0;
    var inProgress = true;
    $scope.max = RatingMaxValue;
    $scope.gridstackOptions = {
        animate: true,
        cell_height: 80,
        vertical_margin: 20,
        float: false,
        width: 12,
        height:12
    };

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
        },
        options:{
            width: 285,
            height:160
        }

    };

    $scope.saveRating = function(video){
        $scope.rate = {
            videoId:video._id,
            rating: video.rating
        };


        ApiService.Post(API.Video.Post.Rate,{}).save($scope.rate,function(response){
            if(response.status = "success"){
                //$scope.video = response.data;
                //$scope.video.rating = Math.round(HelperService.avg($scope.video.ratings));
                //$scope.video.trustedURL = $sce.trustAsResourceUrl($scope.rootURL + $scope.video.url);
                //console.log("rated up",$scope.video);
            }
        });
    };
    //Fetch first 10 videos
    $scope.loadVideos();
}