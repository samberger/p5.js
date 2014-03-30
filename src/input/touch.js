/**
@module touch
@requires core
*/
define(function (require) {

  'use strict';

  var p5 = require('core');

  /**
   * Sets touch points.
   * @event setTouchPoints
   * @param {Object} e The event object.
   * @for p5
   */
  p5.prototype.setTouchPoints = function(e) {
    this._setProperty('touchX', e.changedTouches[0].pageX);
    this._setProperty('touchY', e.changedTouches[0].pageY);
    var touches = [];
    for(var i = 0; i < e.changedTouches.length; i++){
      var ct = e.changedTouches[i];
      touches[i] = {x: ct.pageX, y: ct.pageY};
    }
    this._setProperty('touches', touches);
  };
  
  /**
   * Listener for the touch start event.
   * @event ontouchstart
   * @param {Object} e The event object.
   * @for p5
   */
  p5.prototype.ontouchstart = function(e) {
    this.setTouchPoints(e);
    if(typeof this.touchStarted === 'function') {
      this.touchStarted(e);
    }
    var m = typeof touchMoved === 'function';
    if(m) {
      e.preventDefault();
    }
  };
  
  /**
   * Listener for the touch move event.
   * @event ontouchmove
   * @param {Object} e The event object.
   * @for p5
   */
  p5.prototype.ontouchmove = function(e) {
    this.setTouchPoints(e);
    if(typeof this.touchMoved === 'function') {
      this.touchMoved(e);
    }
  };
  
  /**
   * Listener for the touch end event.
   * @event ontouchend
   * @param {Object} e The event object.
   * @for p5
   */
  p5.prototype.ontouchend = function(e) {
    this.setTouchPoints(e);
    if(typeof this.touchEnded === 'function') {
      this.touchEnded(e);
    }
  };

  return p5;

});
