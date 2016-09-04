'use strict';

angular.module('myApp.controllers')
    .controller('VideosCtrl', VideosController);

    function VideosController (ApiService) {

        (function initController() {
            //Reset login status
            ApiService.Get(API.Video.Get.Videos, {}).then(function (data) {
                console.log("data",data);
            });
        })();
    }