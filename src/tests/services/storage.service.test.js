/**
 * Created by Jared on Sep 06, 2016.
 */

describe('StorageService tests', function () {
    var StorageService, $localStorage;

    beforeEach(function () {
        // load the module.
        module('myApp.services');
        module('ngStorage');

        inject(function (_StorageService_,_$localStorage_) {
            StorageService = _StorageService_;
            $localStorage = _$localStorage_;
        });
    });

    // check to see if it has the expected function
    it('should have an Get function', function () {
        expect(angular.isFunction(StorageService.Get)).toBe(true);
    });

    it('should have an Set function', function () {
        expect(angular.isFunction(StorageService.Set)).toBe(true);
    });

    it('should have an Delete function', function () {
        expect(angular.isFunction(StorageService.Delete)).toBe(true);
    });



});

