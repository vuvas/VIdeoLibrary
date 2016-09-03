/**
 * Created by Jared on Sep 03, 2016.
 */

angular.module('myApp.services')
    .factory('ApiService', function ($resource) {
        var buildUrl = function (resourceUrl) {
            return RootAPIUrl + resourceUrl;
        };

        return {
            Get: function (api, params) {
                return $resource(buildUrl(api),{}, GET).get(params).$promise;
            },
            GetObject: function (api, params) {
                return $resource(buildUrl(api),{}, GETObject).get(params).$promise;
            },
            Post: function (api) {
                return $resource(buildUrl(api),{},POST);
            }
        }
    });