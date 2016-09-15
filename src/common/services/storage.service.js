
angular.module('myApp.services')
    .factory('StorageService', function ($localStorage) {
        return {
            Get:function(key){
                return $localStorage[key];
            },
            Set: function(key,value){
                $localStorage[key] = value;
            },
            Delete: function(key){
                delete $localStorage[key];
            }
        }
    });
