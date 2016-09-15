/**
 * Created by Yonas on 9/5/2016.
 */
angular.module('myApp.services').factory('VideoService', VideoService);

function VideoService(ApiService,$sce,HelperService) {
    var video = {};

    var rootURL = RootAPIUrl;

    var loadVideos = function (param) {

            ApiService.GetObject(API.Video.Get.Videos, param).then(function (response) {
                if (response.status == "success") {
                   var videos = response.data;
                    _.each(videos,function(v){
                        v.trustedURL = $sce.trustAsResourceUrl(rootURL + v.url);
                        v.rating = Math.round(HelperService.avg(v.ratings));
                    });
                    return videos;
                }
            });


        };
    var getVideo = function(videoId){
        ApiService.GetObject(API.Video.Get.Video, {videoId:videoId})
            .then(function (response) {

                if (response.status == "success") {
                    video = response.data;
                    video.trustedURL = $sce.trustAsResourceUrl(rootURL + video.url);
                    video.rating = Math.round(HelperService.avg(video.ratings));
                }
                return video;
            });

    };

    var  saveRating = function(video){

        ApiService.Post(API.Video.Post.Rate).save(video,function(response){
            if(response.status = "success"){
                video = response.data;
                video.rating = Math.round(HelperService.avg(video.ratings));
                video.trustedURL = $sce.trustAsResourceUrl(rootURL + video.url);
                console.log("rated ",video.name," to ",video.rating ," stars");
            }
        });
        return video;
    };

    return {
        videos: function(param){
            return loadVideos(param);
        },
        video: function(videoId){
            return getVideo(videoId);
        },
        Rate: function(video){
            return saveRating(video);
        }
    }
}

