/**
 * @module pvector
 */
define(function (require) {

  'use strict';
  
  /**
   * A class to describe a two or three dimensional vector, specifically a Euclidean (also known as geometric) vector. A vector is an entity that has both magnitude and direction. The datatype, however, stores the components of the vector (x,y for 2D, and x,y,z for 3D). The magnitude and direction can be accessed via the methods mag() and heading().
 * 
 * In many of the Processing examples, you will see PVector used to describe a position, velocity, or acceleration. For example, if you consider a rectangle moving across the screen, at any given instant it has a position (a vector that points from the origin to its location), a velocity (the rate at which the object's position changes per time unit, expressed as a vector), and acceleration (the rate at which the object's velocity changes per time unit, expressed as a vector). Since vectors represent groupings of values, we cannot simply use traditional addition/multiplication/etc. Instead, we'll need to do some "vector" math, which is made easy by the methods inside the PVector class. 
   * @class PVector
   * @constructor
   * @param {Number} [x] The x component of the vector
   * @param {Number} [y] The y component of the vector
   * @param {Number} [z] The z component of the vector
   */
  function PVector(x, y, z) {
    
    /**
     * The x component of the vector
     * @property x
     * @type {Number}
     */
    this.x = x || 0;
    /**
     * The y component of the vector
     * @property y
     * @type {Number}
     */
    this.y = y || 0;
    /**
     * The z component of the vector
     * @property z
     * @type {Number}
     */
    this.z = z || 0;
  }

  /**
   * Sets the x, y, and z component of the vector using three separate variables, the data from a PVector, or the values from a float array.
   * @method set
   * @param {Number} [x] The x component of the vector
   * @param {Number} [y] The y component of the vector
   * @param {Number} [z] The z component of the vector
   * @return {Void} Nothing.
   */
  PVector.prototype.set = function (x, y, z) {
    if (x instanceof PVector) { return this.set(x.x, x.y, x.z); }
    if (x instanceof Array) { return this.set(x[0], x[1], x[2]); }
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  };

  /**
   * Gets a copy of the vector, returns a PVector object. 
   * @method get
   * @return {PVector} The PVector object.
   */
  PVector.prototype.get = function () {
    return new PVector(this.x, this.y, this.z);
  };

  /**
   * Adds x, y, and z components to a vector, adds one vector to another, or adds two independent vectors together. The version of the method that adds two vectors together is a static method and returns a PVector, the others have no return value -- they act directly on the vector. See the examples for more context. 
   * 
   * @method add
   * @chainable
   * @param {Number} [x] The x component of the vector to be added.
   * @param {Number} [y] The y component of the vector to be added.
   * @param {Number} [z] The z component of the vector to be added.
   * @return {PVector} The PVector object.
   */
  PVector.prototype.add = function (x, y, z) {
    if (x instanceof PVector) { return this.add(x.x, x.y, x.z); }
    if (x instanceof Array) { return this.add(x[0], x[1], x[2]); }
    this.x += x || 0;
    this.y += y || 0;
    this.z += z || 0;
    return this;
  };

  /**
   * Subtracts x, y, and z components from a vector, subtracts one vector from another, or subtracts two independent vectors. The version of the method that substracts two vectors is a static method and returns a PVector, the others have no return value -- they act directly on the vector. See the examples for more context. 
   * 
   * @method sub
   * @chainable
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @return {PVector} The PVector object.
   */
  PVector.prototype.sub = function (x, y, z) {
    if (x instanceof PVector) { return this.sub(x.x, x.y, x.z); }
    if (x instanceof Array) { return this.sub(x[0], x[1], x[2]); }
    this.x -= x || 0;
    this.y -= y || 0;
    this.z -= z || 0;
    return this;
  };

  PVector.prototype.mult = function (n) {
    this.x *= n || 0;
    this.y *= n || 0;
    this.z *= n || 0;
    return this;
  };

  PVector.prototype.div = function (n) {
    this.x /= n;
    this.y /= n;
    this.z /= n;
    return this;
  };

  PVector.prototype.mag = function () {
    return Math.sqrt(this.magSq());
  };

  PVector.prototype.magSq = function () {
    var x = this.x, y = this.y, z = this.z;
    return (x * x + y * y + z * z);
  };

  /**
   * Calculates the dot product of two vectors. 
   * 
   * @method dot
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @return {Number/mag}
   */
  PVector.prototype.dot = function (x, y, z) {
    if (x instanceof PVector) {
      return this.dot(x.x, x.y, x.z);
    }
    return this.x * (x || 0) +
           this.y * (y || 0) +
           this.z * (z || 0);
  };

  PVector.prototype.cross = function (v) {
    var x = this.y * v.z - this.z * v.y;
    var y = this.z * v.x - this.x * v.z;
    var z = this.x * v.y - this.y * v.x;
    return new PVector(x, y, z);
  };

  PVector.prototype.dist = function (v) {
    var d = v.get().sub(this);
    return d.mag();
  };

  PVector.prototype.normalize = function () {
    return this.div(this.mag());
  };

  PVector.prototype.limit = function (l) {
    var mSq = this.magSq();
    if(mSq > l*l) {
      this.div(Math.sqrt(mSq)); //normalize it
      this.mult(l);
    }
    return this;
  };

  PVector.prototype.setMag = function (n) {
    return this.normalize().mult(n);
  };

  PVector.prototype.heading = function () {
    return Math.atan2(this.y, this.x);
  };

  // accepts angle in radians only
  PVector.prototype.rotate2D = function (a) {
    var newHeading = this.heading() + a;
    var mag = this.mag();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
    return this;
  };

  PVector.prototype.lerp = function (x, y, z, amt) {
    if (x instanceof PVector) {
      return this.lerp(x.x, x.y, x.z, y);
    }
    this.x += (x - this.x) * amt || 0;
    this.y += (y - this.y) * amt || 0;
    this.z += (z - this.z) * amt || 0;
    return this;
  };

  PVector.prototype.array = function () {
    return [this.x || 0, this.y || 0, this.z || 0];
  };


  // Static Methods
  

  /**
   * Make a new 2D unit vector from an angle
   
   * @param {number} The desired angle.
   * @return {PVector} The new PVector object.
   */
  PVector.fromAngle = function(angle) {
    return new PVector(Math.cos(angle),Math.sin(angle),0);
  };

  /**
   * Make a new 2D unit vector from a random angle
   *
   * @return {PVector} The new PVector object.
   */
  PVector.random2D = function () {
    // This should include an option to use p5.js seeded random number
    return this.fromAngle(Math.random(Math.PI*2));
  };

  /**
   * Make a new random 3D unit vector.
   *
   * @return {PVector} The new PVector object.
   */
  PVector.random3D = function () {
    // This should include an option to use p5.js seeded random number
    var angle = Math.random()*Math.PI*2;
    var vz = Math.random()*2-1;
    var vx = Math.sqrt(1-vz*vz)*Math.cos(angle);
    var vy = Math.sqrt(1-vz*vz)*Math.sin(angle);
    return new PVector(vx, vy, vz);
  };

  PVector.add = function (v1, v2) {
    return v1.get().add(v2);
  };

  PVector.sub = function (v1, v2) {
    return v1.get().sub(v2);
  };

  PVector.mult = function (v, n) {
    return v.get().mult(n);
  };

  PVector.div = function (v, n) {
    return v.get().div(n);
  };

  PVector.dot = function (v1, v2) {
    return v1.dot(v2);
  };

  PVector.cross = function (v1, v2) {
    return v1.cross(v2);
  };

  PVector.dist = function (v1,v2) {
    return v1.dist(v2);
  };

  PVector.lerp = function (v1, v2, amt) {
    return v1.get().lerp(v2, amt);
  };

  PVector.angleBetween = function (v1, v2) {
    return Math.acos(v1.dot(v2) / (v1.mag() * v2.mag()));
  };

  return PVector;

});
