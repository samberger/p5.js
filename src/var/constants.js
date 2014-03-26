/**
@module constants
*/
define(function(require) {

  var PI = Math.PI;

  return {

    // ENVIRONMENT
    ARROW: 'default',
    CROSS: 'crosshair',
    HAND: 'pointer',
    MOVE: 'move',
    TEXT: 'text',
    WAIT: 'wait',

    // TRIGONOMETRY
    /**
     * @property HALF_PI
     * @type Number
     * @final
     */
    HALF_PI: PI / 2,
    /**
     * @property PI
     * @type Number
     * @final
     */
    PI: PI,
    /**
     * @property QUARTER_PI
     * @type Number
     * @final
     */
    QUARTER_PI: PI / 4,
    /**
     * @property TAU
     * @type Number
     * @final
     */
    TAU: PI * 2,
    /**
     * @property TWO_PI
     * @type Number
     * @final
     */
    TWO_PI: PI * 2,
    /**
     * @property DEGREES
     * @type String
     * @final
     */
    DEGREES: 'degrees',
    /**
     * @property RADIANS
     * @type String
     * @final
     */
    RADIANS: 'radians',

    // SHAPE
    CORNER: 'corner',
    CORNERS: 'corners',
    RADIUS: 'radius',
    RIGHT: 'right',
    LEFT: 'left',
    CENTER: 'center',
    POINTS: 'points',
    LINES: 'lines',
    TRIANGLES: 'triangles',
    TRIANGLE_FAN: 'triangles_fan',
    TRIANGLE_STRIP: 'triangles_strip',
    QUADS: 'quads',
    QUAD_STRIP: 'quad_strip',
    CLOSE: 'close',
    OPEN: 'open',
    CHORD: 'chord',
    PIE: 'pie',
    PROJECT: 'square', // PEND: careful this is counterintuitive
    SQUARE: 'butt',
    ROUND: 'round',
    BEVEL: 'bevel',
    MITER: 'miter',

    // COLOR
    RGB: 'rgb',
    HSB: 'hsb',

    // DOM EXTENSION
    AUTO: 'auto',

    // TYPOGRAPHY
    NORMAL: 'normal',
    ITALIC: 'italic',
    BOLD: 'bold'

  };

});