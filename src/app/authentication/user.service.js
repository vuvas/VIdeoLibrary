/**
 * Created by Jared on Sep 03, 2016.
 */

angular.module('myApp.services').factory('UserService', UserService);

function UserService(StorageService){
    var service = {};

    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;

    return service;


    function SetCredentials(sessionId) {
        StorageService.Set(SessionLocalStorageKey, sessionId);
    }

    function ClearCredentials() {
        StorageService.Delete(SessionLocalStorageKey);
    }

    //private functions
    function handleSuccess(result){
        return result.data;
    }

    function handleError(error){
        return function() {
            return {success: false, message: error};
        }
    }
}
