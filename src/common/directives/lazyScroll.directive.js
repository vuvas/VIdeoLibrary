/**
 * Created by Jared on Sep 04, 2016.
 */


angular.module('myApp.directives')
.directive('lazyScroll', function($rootScope, $window) {
        return {
            link: function(scope, elem, attrs) {

                var scrollEnabled, loadData, scrollTrigger = .90,scrollEnabled = true;;
                $window = angular.element($window);
                if (attrs.lazyNoScroll != null) {
                    scope.$watch(attrs.lazyNoScroll, function(value) {
                        scrollEnabled = (value == true) ? false : true;
                    });
                }

                if ((attrs.lazyScrollTrigger != undefined) && (attrs.lazyScrollTrigger > 0 && attrs.lazyScrollTrigger <100) ) {
                    scrollTrigger = attrs.lazyScrollTrigger/100;
                }

                loadData = function() {
                    var wintop = window.pageYOffset;
                    var docHeight = window.document.body.clientHeight;
                    var windowHeight = window.innerHeight//$window.height();
                    var triggered = (wintop/(docHeight - windowHeight));

                    if((scrollEnabled) && (triggered >= scrollTrigger) ){
                        return scope.$apply(attrs.lazyScroll);
                    }
                };
                var throttled = _.throttle(loadData, 100);
                $window.on('scroll', throttled);
                scope.$on('$destroy', function() {
                    return $window.off('scroll', throttled);
                });
            }
        };
    }
).directive('rating',function(){
  return {
      restrict: 'A',
      template: '<ul class="rating">' +
      '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
      '\u2605' +
      '</li>' +
      '</ul>',
      scope: {
          ratingValue: '=',
          max: '=',
          readonly: '@',
          onRatingSelected: '&'
      },
      link: function (scope, elem, attrs) {

          var updateStars = function() {
              scope.stars = [];
              for (var  i = 0; i < scope.max; i++) {
                  scope.stars.push({filled: i < scope.ratingValue});
              }
          };

          scope.toggle = function(index) {
              if (scope.readonly && scope.readonly === 'true') {
                  return;
              }
              scope.ratingValue = index + 1;
              scope.onRatingSelected({rating: index + 1});
          };

          scope.$watch('ratingValue', function(oldVal, newVal) {
              if (newVal) {
                  updateStars();
              }
          });
      }
  }


});
