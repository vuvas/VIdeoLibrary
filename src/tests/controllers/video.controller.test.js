'use strict';

describe('video controller', function() {
    var scope,controller,sce;
    var mockApiService,mockHelperService;

    beforeEach(inject(function ($rootScope,$controller) {
        mockApiService = jasmine.createSpyObj('ApiService',['Get','GetObject','Post']);
        mockHelperService = jasmine.createSpyObj('HelperService',['avg']);
        //load the modules
        module('myApp.controllers');

        scope = $rootScope.$new();

        //$sceProvider.enabled(false);
        controller = $controller('VideosCtrl', {
            $scope: scope,
            ApiService: mockApiService,
            HelperService: mockHelperService,
            $sce: sce
        });

    }));
    it('should VideosCtrl be defined',function() {
        //spec body
        //var controller = createController();
        expect(controller).toBeDefined();

    });

});