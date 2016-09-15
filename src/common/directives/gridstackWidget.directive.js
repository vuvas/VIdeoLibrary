angular.module('myApp.directives')
    .directive('gridstatckWidget', function($rootScope, $window) {
        return {
            scope: {
                gridstackOptions: '='
            },
            link: function(scope, element){
                //Wait 1 sec DOM till has finished rendering
                $timeout(function () {
                    element.gridstack(scope.gridstackOptions);
                }, 1000);
            }
        }
    });