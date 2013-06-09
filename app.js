
//
// Define the 'app' module.
//
angular.module('app', ['mouseCapture'])

//
// Application controller.
//
.controller('AppCtrl', function AppCtrl ($scope) {

	//
	// Setup the application data-model.
	//
	$scope.dataBindingTest = "Hello computer!";

})

;