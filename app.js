
//
// Define the 'app' module.
//
angular.module('app', ['mouseCapture'])

//
// Application controller.
//
.controller('AppCtrl', function AppCtrl ($scope, mouseCapture) {

	//
	// Setup the application data-model.
	//
	$scope.dataBindingTest = "Hello computer!";

	$scope.mousedown = function (event) {

		mouseCapture.startDrag(event, {
			dragStarted: function () {
				console.log("dragStarted");

			},

			dragging: function (deltaX, deltaY) {
				console.log("dragging: " + deltaX + ", " + deltaY);
			},

			dragEnded: function () {
				console.log("dragEnded");
			},

			clicked: function () {
				console.log("clicked");
			},
		});

	};

})

;