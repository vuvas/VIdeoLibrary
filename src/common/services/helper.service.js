/**
 * Created by Yonas on 9/5/2016.
 */
angular.module('myApp.services')
    .factory('HelperService', function () {
        return {
            avg: function (array) {
                return  _.reduce(array, function(memo, num) {
                        return memo + num;
                    }, 0) / (array.length === 0 ? 1 : array.length);

            }
        }
    });