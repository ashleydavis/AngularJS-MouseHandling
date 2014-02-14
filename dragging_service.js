angular.module('dragging', ['mouseCapture', ] )

//
// Service used to help with dragging and clicking on elements.
//
.factory('dragging', function ($rootScope, mouseCapture) {

	//
	// Threshold for dragging.
	// When the mouse moves by at least this amount dragging starts.
	//
	var threshold = 5;

	return {


		//
		// Called by users of the service to register a mousedown event and start dragging.
		// Acquires the 'mouse capture' until the mouseup event.
		//
  		startDrag: function (evt, config) {

  			var dragging = false,
  			    x,
			    y,
			    type = evt.type,
			    isTouch = (type == "touchstart" || type == "touchmove");

			//
			// Handler for mousemove events while the mouse is 'captured'.
			//
			if (isTouch) {
				x = evt.originalEvent.touches[0].pageX;
				y = evt.originalEvent.touches[0].pageY;
			} else {
				x = evt.pageX;
				y = evt.pageY;
			}
			
	  		var mouseMove = function (evt) {
	  			var pageX, pageY;
	  			
	  			if (isTouch) {
	  				pageX = evt.originalEvent.touches[0].pageX;
	  				pageY = evt.originalEvent.touches[0].pageY;
	  			} else {
	  				pageX = evt.pageX;
	  				pageY = evt.pageY;
	  			}

				if (!dragging) {
					if (Math.abs(pageX - x) > threshold ||
						Math.abs(pageY - y) > threshold)
					{
						dragging = true;

						if (config.dragStarted) {
							config.dragStarted(x, y, evt);
						}

						if (config.dragging) {
							// First 'dragging' call to take into account that we have 
							// already moved the mouse by a 'threshold' amount.
							config.dragging(pageX, pageY, evt);
						}
					}
				}
				else {
					if (config.dragging) {
						config.dragging(pageX, pageY, evt);
					}

					x = pageX;
					y = pageY;
				}
	  		};

	  		//
	  		// Handler for when mouse capture is released.
	  		//
	  		var released = function() {

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
	  		};

			//
			// Handler for mouseup event while the mouse is 'captured'.
			// Mouseup releases the mouse capture.
			//
	  		var mouseUp = function (evt) {

	  			mouseCapture.release();

	  			evt.stopPropagation();
	  			evt.preventDefault();
	  		};

	  		//
	  		// Acquire the mouse capture and start handling mouse events.
	  		//
			mouseCapture.acquire(evt, {
				mouseMove: mouseMove,
				mouseUp: mouseUp,
				released: released,
			});

	  		evt.stopPropagation();
	  		evt.preventDefault();
  		},

	};

})

;

