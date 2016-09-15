
angular.module('myApp.services')
    .factory('ApiService', function ($resource,StorageService) {
        var buildUrl = function (resourceUrl) {
            return RootAPIUrl + resourceUrl;
        };

        var buildPostUrl = function (resourceUrl, params) {
            var paramStr = '?';
            var fullParam = buildParams(params);
            var properties = _.allKeys(fullParam);
            _.each(properties, function(property){
                paramStr += property + '=' + fullParam[property];
            });

            return  RootAPIUrl + resourceUrl + paramStr;
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
            Post: function (api, params) {
                return $resource(buildPostUrl(api,params),POST);
            }
        }
    });