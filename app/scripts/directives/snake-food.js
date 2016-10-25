'use strict';

/**
 * @ngdoc directive
 * @name stayzillaApp.directive:snakeFood
 * @description
 * # snakeFood
 */
angular.module('stayzillaApp')
  .directive('snakeFood', function () {
    return {
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        function draw(){
        	scope.food = {
        		x: Math.floor(Math.random()*(scope.selectedBoardSize-1)),
	  			y: Math.floor(Math.random()*(scope.selectedBoardSize-1))
        	};
        	for(var i=scope.snakeCells.length-1; i>=0; i--){
        		if(scope.food.x === scope.snakeCells[i].x && scope.food.y === scope.snakeCells[i].y){
        			break;
        			draw();
        		}
        	}
	      	element.css('left', scope.food.x*20);
	      	element.css('top', scope.food.y*20);
      	}
      	draw();
      	scope.$on('create-food', function(){
      		draw();
      	});
      }
    };
  });
