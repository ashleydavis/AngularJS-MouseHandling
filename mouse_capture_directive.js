
angular.module('mouseCapture', [] )

//
// Service used to acquire 'mouse capture' then receive dragging events while the mouse is captured.
//
.factory('mouseCapture', function ($rootScope) {

	//
	// Threshold for dragging.
	// When the mouse moves by at least this amount dragging starts.
	//
	var threshold = 5; //todo: make this an attr option.

	//
	// Element that the mouse capture applies to, defaults to 'document' 
	// unless the 'mouse-capture' directive is used.
	//
	var $element = document; 

	return {

		// 
		// Register an element to use as the mouse capture element instead of 
		// the default which is the document.
		//
		registerElement: function(element) {

			$element = element;
		},

		//
		// Called by users of the service to register a mousedown event and start dragging.
		// Acquires the 'mouse capture' until the mouseup event.
		//
  		startDrag: function (evt, config) {

  			var dragging = false;
			var x = evt.clientX;
			var y = evt.clientY;

			//
			// Handler for mousemove events while the mouse is 'captured'.
			//
	  		var mouseMove = function (evt) {
	  			
				if (!dragging) {
					if (evt.clientX - x > threshold ||
						evt.clientY - y > threshold)
					{
						dragging = true;

						if (config.dragStarted) {
							config.dragStarted();

							$rootScope.$apply();
						}

					}
				}
				else {
					if (config.dragging) {
						config.dragging(evt.clientX - x, evt.clientY - y);

						$rootScope.$apply();
					}

					x = evt.clientX;
					y = evt.clientY;
				}
	  		};

			//
			// Handler for mouseup event while the mouse is 'captured'.
			// Mouseup releases the mouse capture.
			//
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

				$rootScope.$apply();

	  			$element.unbind("mousemove", mouseMove);
	  			$element.unbind("mouseup", mouseUp);

	  			evt.stopPropagation();
	  			evt.preventDefault();
	  		};

	  		// 
	  		// In response to the mousedown event register handlers for mousemove and mouseup 
	  		// during 'mouse capture'.
	  		//
  			$element.mousemove(mouseMove);
  			$element.mouseup(mouseUp);

	  		evt.stopPropagation();
	  		evt.preventDefault();
  		},

	};

})

//
// Directive that marks the mouse capture element.
//
.directive('mouseCapture', function () {
  return {
  	restrict: 'A',

  	controller: function($scope, $element, $attrs, mouseCapture) {

  		// 
  		// Register the directives element as the mouse capture element.
  		//
  		mouseCapture.registerElement($element);

  	},
  };
})
;

