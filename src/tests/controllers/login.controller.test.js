'use strict';

describe('myApp.controllers module', function() {

  var scope,controller,location,md5;
  var mockApiService, mockUserService;

  beforeEach(function() {

      mockApiService = jasmine.createSpyObj('ApiService',['Get','GetObject','Post']);
      mockUserService = jasmine.createSpyObj('UserService',['SetCredentials','GetCredentials','ClearCredentials']);
      //load the modules
      module('myApp.controllers');

      inject(function ($rootScope,$controller,_$location_,_md5_) {
          scope = $rootScope.$new();
          location = _$location_;
          md5 = _md5_;

          controller = $controller('LoginCtrl',{
              $scope : scope,
              ApiService: mockApiService,
              UserService: mockUserService,
              md5 :  md5,
              $location : location
          })

          });
      });

    it('should LoginCtrl be defined',function() {
      //spec body
      expect(controller).toBeDefined();
    });

});