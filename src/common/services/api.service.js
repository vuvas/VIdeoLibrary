/**
 * Created by Jared on Sep 03, 2016.
 */

angular.module('myApp.services')
    .factory('ApiService', function ($resource,StorageService) {
        var buildUrl = function (resourceUrl) {
            return RootAPIUrl + resourceUrl;
        };

        var buildParams = function (params) {
            var fullParams = params;
            var sessionId =  StorageService.Get(SessionLocalStorageKey);
            if (sessionId !== undefined) {
                var sessionObj = {};
                sessionObj[SessionLocalStorageKey] = sessionId;
                fullParams = angular.extend(sessionObj, params);
            }
            return fullParams;
        };

        return {
            Get: function (api, params) {
                return $resource(buildUrl(api),{}, GET).get(buildParams(params)).$promise;
            },
            GetObject: function (api, params) {
                return $resource(buildUrl(api),{}, GETObject).get(buildParams(params)).$promise;
            },
            Post: function (api) {
                return $resource(buildUrl(api),POST);
            }
        }
    });