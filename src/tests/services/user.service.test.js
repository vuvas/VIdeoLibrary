/**
 * Created by Jared on Sep 06, 2016.
 */

describe('UserService tests', function () {
    var UserService, storageServiceMock;

    beforeEach(function () {
        // load the modules.
        module('ngStorage');
        module('myApp.services',function($provide){
            storageServiceMock = jasmine.createSpyObj('StorageService',['Get','Set','Delete'])

            //provide the mock
            $provide.value('StorageService',storageServiceMock);
        });

        inject(function ( _UserService_) {
            UserService = _UserService_;
        });

    });

    // check to see if it has the expected function
    it('should have an ClearCredentials function', function () {
        expect(angular.isFunction(UserService.ClearCredentials)).toBe(true);
    });

    it('should have an SetCredentials function', function () {
        expect(angular.isFunction(UserService.SetCredentials)).toBe(true);
    });

    it('should have an GetCredentials function', function () {
        expect(angular.isFunction(UserService.GetCredentials)).toBe(true);
    });

    it('should call StorageService.Get UserService.GetCredentials passing through parameters.', function(){
        //make the call
        UserService.GetCredentials(SessionLocalStorageKey);

        //check our spy
        expect(storageServiceMock.Get).toHaveBeenCalledWith(SessionLocalStorageKey);
    })

});