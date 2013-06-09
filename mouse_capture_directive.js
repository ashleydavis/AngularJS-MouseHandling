
angular.module('mouseCapture', [] )

.directive('mouseCapture', function() {
  return {
  	restrict: 'A',

  	controller: function($scope, $element, $attrs) {

  		var threshold = 5; //todo: make this an attr option.

  		this.startDrag = function (evt, config) {

  			var dragging = false;
			var x = evt.clientX;
			var y = evt.clientY;

	  		var mouseMove = function (evt) {
	  			
				if (!dragging) {
					if (evt.clientX - x > threshold ||
						evt.clientY - y > threshold)
					{
						dragging = true;

						if (config.dragStarted) {
							config.dragStarted();

							$scope.$apply();
						}

					}
				}
				else {
					if (config.dragging) {
						config.dragging(evt.clientX - x, evt.clientY - y);

						$scope.$apply();
					}

					x = evt.clientX;
					y = evt.clientY;
				}
	  		};

	  		var mouseUp = function (evt) {

	  			if (dragging) {
  					if (config.dragEnded) {
  						config.dragEnded();
  					}
	  			}
	  			else {
  					if (config.clicked) {
  						config.clicked();
  					}
	  			}

				$scope.$apply();

	  			$element.unbind("mousemove", mouseMove);
	  			$element.unbind("mouseup", mouseUp);

	  			evt.stopPropagation();
	  			evt.preventDefault();
	  		};

  			$element.mousemove(mouseMove);
  			$element.mouseup(mouseUp);

	  		evt.stopPropagation();
	  		evt.preventDefault();
  		};
  	},
  };
})
;

