'use strict';

/**
 * @ngdoc directive
 * @name stayzillaApp.directive:snakeCell
 * @description
 * # snakeCell
 */
angular.module('stayzillaApp')
  .directive('snakeCell', function () {
    return {
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
      	function draw(){
	      	element.css('left', scope.cell.x*20);
	      	element.css('top', scope.cell.y*20);
      	}
      	draw();
      	scope.$on('redraw', function(){
      		draw();
      	});
      }
    };
  });
