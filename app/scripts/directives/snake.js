'use strict';

/**
 * @ngdoc directive
 * @name stayzillaApp.directive:snake
 * @description
 * # snake
 */
angular.module('stayzillaApp')
  .directive('snake', function () {
    return {
      template: '<div snake-cell ng-repeat="cell in snakeCells track by $index" class="snake-cell"></div>',
      restrict: 'E'
    };
  });
