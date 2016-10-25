'use strict';

/**
 * @ngdoc function
 * @name stayzillaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stayzillaApp
 */
angular.module('stayzillaApp')
  .controller('MainCtrl', function ($scope, $interval, $timeout) {
  	$scope.score = 0;
  	$scope.time = 0;
  	$scope.highScore = localStorage.snakeScore || 0;
  	$scope.sizes = [12, 16, 20];
  	$scope.selectedBoardSize = $scope.sizes[0];

  	$(document).keydown(function(e) {
	    switch(e.which) {
	        case 37: // left
	        if($scope.direction !== 'left' && $scope.direction !== 'right'){
		        $scope.direction = 'left';
		    }
	        break;

	        case 38: // up
	        if($scope.direction !== 'up' && $scope.direction !== 'down'){
	        	$scope.direction = 'up';
		    }
	        break;

	        case 39: // right
	        if($scope.direction !== 'left' && $scope.direction !== 'right'){
		        $scope.direction = 'right';
		    }
	        break;

	        case 40: // down
	        if($scope.direction !== 'up' && $scope.direction !== 'down'){
		        $scope.direction = 'down';
		    }
	        break;

	        default: return; // exit this handler for other keys
	    }
	    e.preventDefault(); // prevent the default action (scroll / move caret)
	});

	$scope.startTimer = function(){
		$scope.timer = $interval(function(){
	  		if($scope.direction){
		  		var snakeOld = angular.copy($scope.snakeCells);
		  		for(var i=0; i<$scope.snakeCells.length; i++){
		  			if(i===0){
		  				if($scope.direction === 'left'){
		  					$scope.snakeCells[i].x--;
		  				}else if($scope.direction === 'right'){
		  					$scope.snakeCells[i].x++;
		  				}else if($scope.direction === 'up'){
		  					$scope.snakeCells[i].y--;
		  				}else{
		  					$scope.snakeCells[i].y++;
		  				}
		  				if($scope.snakeCells[i].x<0 ||
		  					$scope.snakeCells[i].x>=$scope.selectedBoardSize ||
		  					$scope.snakeCells[i].y<0 ||
		  					$scope.snakeCells[i].y>=$scope.selectedBoardSize)
		  				{
		  					alert('Oops..!! Game Ended');
								$scope.start();
		  					
		  					return;
		  				}else if($scope.snakeCells[i].x === $scope.food.x &&
		  					$scope.snakeCells[i].y === $scope.food.y)
		  				{
		  					$scope.score+= 1;
		  					if($scope.score > $scope.highScore){
		  						localStorage.snakeScore = $scope.highScore = $scope.score;
		  					}
		  					$scope.snakeCells.splice(1, 0, $scope.food);
		  					$scope.$broadcast('create-food');
		  				}
		  			}else if(i===1){
		  				$scope.snakeCells[i] = angular.copy($scope.snakeCells[i-1]);
		  			}else{
		  				$scope.snakeCells[i] = angular.copy(snakeOld[i-1]);
		  			}

		  			console.dir($scope.snakeCells);
		  		}
	  		}
		  	$scope.$broadcast('redraw');
		  	if($scope.direction){
		  		$scope.time++;
		  	}
	  	}, 1000);
	};

	$scope.start = function(){
	  	$scope.time = 0;
	  	$scope.score = 0;
	  	$scope.$broadcast('redraw');
		if (angular.isDefined($scope.timer)) {
	        $interval.cancel($scope.timer);
	        $scope.timer = undefined;
		}
	  	$scope.snakeCells = [{
	  		x: Math.floor(Math.random()*($scope.selectedBoardSize-1)),
	  		y: Math.floor(Math.random()*($scope.selectedBoardSize-1))
	  	}];
	  	$scope.$broadcast('create-food');
	  	$scope.direction = undefined;
	  	$scope.startTimer();
	};

	$scope.sizeChanged = function(){
	  	$scope.boardStyle = {
	  		width: $scope.selectedBoardSize*20,
	  		height: $scope.selectedBoardSize*20
	  	};
	  	$scope.start();
  	};
  	$scope.sizeChanged();
  });
