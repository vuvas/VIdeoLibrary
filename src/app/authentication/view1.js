'use strict';

angular.module('myApp.controllers')
.controller('View1Ctrl', function(ApiService) {

  ApiService.Get(API.Get.AllRestaurants,{}).then(function(data){
    console.log("Data",data);
  });

});