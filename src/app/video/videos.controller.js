'use strict';

angular.module('myApp.controllers')
    .controller('VideosCtrl', VideosController);

function VideosController($scope, ApiService,$sce,HelperService) {
    $scope.videos = [];
    $scope.rootURL = RootAPIUrl;
    var pageSize = 12, page = 0;
    var inProgress = true;
    $scope.max = RatingMaxValue;

    $scope.gridstackOptions = {
        animate: true,
        cell_height: 80,
        vertical_margin: 10,
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
                         v.ratingValue = Math.round(HelperService.avg(v.ratings));
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
            rating: video.ratingValue
        };
        console.log("rated ",$scope.rate.videoId," to ",$scope.rate.rating ," stars");
        //ApiService.Post(API.Video.Post.Rate,{}).save($scope.rate,function(response){
        //    if(response.status = "success")
        //    {
        //        console.log("rated ",$scope.rate.videoId," to ",$scope.rate.rating ," stars");
        //        $scope.video = response.data;
        //        $scope.video.ratingValue = Math.round(HelperService.avg($scope.video.ratings));
        //        $scope.video.trustedURL = $sce.trustAsResourceUrl($scope.rootURL + $scope.video.url);
        //    }
        //});
    };
    //Fetch first 10 videos
    $scope.loadVideos();
}