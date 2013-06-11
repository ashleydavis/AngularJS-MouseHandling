
//
// Define the 'app' module.
//
angular.module('app', ['mouseCapture'])

//
// Define the main application controller.
//
.controller('AppCtrl', function AppCtrl ($scope, mouseCapture) {

	//
	// Position of the draggable element.
	//
	$scope.draggable = {
		x: 50,
		y: 50,
		width: 100,
		height: 100,
	};	

	//
	// Width and height of the element that contains the draggable element.
	//
	$scope.draggableContainer =	{
		width: 500,
		height: 500,
	};

	//
	// Handle the mousedown event from the view.
	//
	$scope.mousedown = function (event) {

		//
		// Initiate dragging, but only if the mouse moves beyound the threshold value.
		//
		mouseCapture.startDrag(event, {


			//
			// Callback when the mouse has dragged beyond the threshold amount to
			// indicate that dragging has started.
			// 
			dragStarted: function () {
				console.log("dragStarted");
			},

			//
			// Callback during dragging for each mouse movement.
			//
			dragging: function (deltaX, deltaY, x, y) {

				$scope.draggable.x = Math.min(Math.max(0, x), $scope.draggableContainer.width - $scope.draggable.width);
				$scope.draggable.y = Math.min(Math.max(y, 0), $scope.draggableContainer.height - $scope.draggable.height);


			},

			// 
			// Callback when dragging has ended.
			//
			dragEnded: function () {
				console.log("dragEnded");
			},

			//
			// Callback when the mouse down then up has occurred but the mouse didn't
			// move beyond the threshold value, a 'click' callback is executed to indicate
			// that dragging was never started.
			//
			clicked: function () {
				alert("clicked");
			},
		});

	};

})

//
// Directive to set the css left property of the dragable.
//
.directive('ngCssLeft', function () {
	return {
		restrict: 'A',

		link: function ($scope, $element, $attrs) {

			$attrs.$observe('ngCssLeft', function (newValue) {

				$element.css('left', newValue + "px");
			});
		},
	};
})

//
// Directive to set the css top property of the dragable.
//
.directive('ngCssTop', function () {
	return {
		restrict: 'A',

		link: function ($scope, $element, $attrs) {

			$attrs.$observe('ngCssTop', function (newValue) {

				$element.css('top', newValue + "px");
			});
		},
	};
})

//
// Directive to set the css width property of the dragable.
//
.directive('ngCssWidth', function () {
	return {
		restrict: 'A',

		link: function ($scope, $element, $attrs) {

			$attrs.$observe('ngCssWidth', function (newValue) {

				$element.css('width', newValue + "px");
			});
		},
	};
})

//
// Directive to set the css height property of the dragable.
//
.directive('ngCssHeight', function () {
	return {
		restrict: 'A',

		link: function ($scope, $element, $attrs) {

			$attrs.$observe('ngCssHeight', function (newValue) {

				$element.css('height', newValue + "px");
			});
		},
	};
})

;