AngularJS-MouseCapture
======================

Implements mouse capture and dragging as an AngularJS directive.

I have a win32/WPF background but am now into WebUI.  I needed to implement *mouse capture* which is traditionally used to have one UI element *capture the mouse* so that it receives all mouse events even when the mouse is no longer over that particular UI element.  It is very handy when dragging a UI element within a container element and you want the mouse to be able to leave that container element and come back without cancelling the dragging.  When programming under Windows you'd use mouse capture to achieve this.

However, when programming under the browser there is no concept of mouse capture (unless you are developing exclusively for IE) so I rolled my own solution.  Fortunately it's not difficult, mouse capture is pretty much equivalent to handling events at the document level on behalf of some nested UI element and delivering those mouse events to the controller for that UI element.

The solution to the problem is quite simple as described on StackOverflow:

  http://stackoverflow.com/questions/820026/capture-mouse-in-firefox

However, I wanted to get an example of this working under AngularJS and my implementation of that can be found in this repository.

mouseCapture service
--------------------

To use the mouseCapture service you must include `mouseCapture` in your app module like this:

```javascript
angular.module('app', ['mouseCapture', ])
```

Then include `mouseCapture` as a parameter to your controller:

```javascript
.controller('AppCtrl', function AppCtrl ($scope, mouseCapture) {
```

The service is can be used to acquire the mouse capture, passing in the event object for the event (typically a `mousedown` event) that triggered the mouse capture:

```javascript
mouseCapture.acquire(evt, {
	... callbacks ...
});
```

Via the second parameter you can register handlers for mouse events:

```javascript
mouseCapture.acquire(evt, {
	mouseMove: function (evt) {
		...
	},

	mouseUp: function (evt) {
		...
	},

	released: function () {
		...
	},

});
```

The `mouseMove` and `mouseUp` handlers allow the UI element that acquired the mouse capture to handle mouse events even though the mouse is no longer over that element.

The `released` handler is called when mouse capture has been relased, either by the UI element that acquired it or by some other UI element or controller.

mouseCapture directive
----------------------

By default it is the `document` root element that handles mouse events while the mouse is captured.  If you want to set this to some other element you can add the *mouse-capture* directive as an attribute to the UI element that should handle these events, eg you might want to handle it on the body:

```html
  <body ng-app="app" ng-controller="AppCtrl" mouse-capture>
```

dragging service
-----------------

The other part of this repository is the `dragging` service. It is built on the `mouseCapture` directive to better support draggable elements.

To use, include the `dragging` module in your app module:

```javascript
angular.module('app', ['dragging', ])
```

Then include the `dragging` service as a parameter to your controller:

```javascript
.controller('AppCtrl', function AppCtrl ($scope, dragging) {
```

In response to a mousedown event on the draggable UI element call `startDragging`:

```javascript
dragging.startDrag(event, {
	... callbacks ...
});
```

The first parameter is the event object for the mousedown event that triggered the dragging.

The second parameter contains handlers for dragging events:

```javascript
dragging.startDrag(event, {
	dragStarted: function() {
		...
	},

	dragging: function (deltaX, deltaY, x, y) {
		...
	},

	dragEnded: function () {
		...
	},

	clicked: function () {
		...
	},
});
```

Dragging will only commence if the mouse is moved more than a threshold amount while the mouse button is down.  If this happens `dragStarted` will be called.  `dragging` is then called for each mousemove while dragging is in progress culminating in a call to `dragEnded` when the mouse is released and dragging has ended.

When the mouse is pressed and released and did not move by the threshold amount only `clicked` is called.  This allows dragging and clicking to easily be handled on the same UI element.

