/**
 * Crafted by Obero on 02/14/14
 * For Epitech Innovation Hub
 * Edited by Eileen on 06/03/14
 */

"use strict";
var fs = require('fs');

/**
 * GalileoGpio helps you to manipulate GPIO on Intel Galileo board.
 *
 * @class GalileoGpio
 * @constructor
 */
var GalileoGpio = function()
{
    /**
     * Helps you to work directly on a given IO pin with its number,
     * mapping its number to the matching GPIO id.
     * @property pin
     * @type Object
     */
    //TODO: Complete pin list
    this.pin =
    {   
        'A0': {"id" : "37", "index" :0},
        'A1': {"id" : "36", "index" :1},
        'A2': {"id" : "23", "index" :2},
        'A3': {"id" : "22", "index" :3},
        'A4': {"id" : "21", "index" :4}, 
        'A5': {"id" : "20", "index" :5},  


        0: {"id" : "50"},
        1: {"id" : "51"},
        2: {"id" : "32"},
        3: {"id" : "18"},
        4: {"id" : "28"},
        5: {"id" : "17"},
        6: {"id" : "24"},
        7: {"id" : "27"},
        8: {"id" : "26"},
        9: {"id" : "19"},
        10: {"id" : "16"},
        11: {"id" : "25"},
        12: {"id" : "38"},
        13: {"id" : "39"}
    };
    /**
     * GPIO system path
     * @property gpioPath
     * @type Object
     */
    this.gpioPath = "/sys/class/gpio";
};

GalileoGpio.prototype.openGPIO = function()
{
    //TODO: direct use of GPIO number
};

/**
 * Exports a GPIO to make it reachable on the system.
 *
 * @method openPin
 * @param {Number} pin_number Number of the pin on the Galileo board.
 */
GalileoGpio.prototype.openPin = function(pin_number)
{
    //TODO: use rough GPIO method once available
    fs.writeFileSync(this.gpioPath + "/export", this.pin[pin_number].id);
};

/**
 * Set the direction of the pin.
 *
 * @method setPinDirection
 * @param {Number} pin_number Number of the pin on the Galileo board.
 * @param {String} direction Either `in` or `out`
 */
GalileoGpio.prototype.setPinDirection = function(pin_number, direction)
{
    fs.writeFileSync(this.gpioPath + "/gpio" + this.pin[pin_number].id + "/direction", direction);
};

/**
 * Set the configuration type of the pin
 *
 * @method setPinPortDrive
 * @param {Number} pin_number Number of the pin on the Galileo board.
 * @param {String} config_type Either `pullup`, `pulldown`, `strong`, `hiz`
 */
GalileoGpio.prototype.setPinPortDrive = function(pin_number, config_type)
{
    fs.writeFileSync(this.gpioPath + "/gpio" + this.pin[pin_number].id + "/drive", config_type);
};

/**
 * Write data on the pin
 *
 * @method writePin
 * @param {Number} pin_number Number of the pin on the Galileo board.
 * @param {String} data What does the pin says ?
 */
GalileoGpio.prototype.writePin = function(pin_number, data)
{
    fs.writeFileSync(this.gpioPath + "/gpio" + this.pin[pin_number].id + "/value", data);
};

/**
 * Read data from an analog pin
 *
 * @method readAnalogPin
 * @param {Number} pin_number Number of the analog pin on the Galileo board.
 */

GalileoGpio.prototype.readAnalogPin = function(pin_number)
{
    var data = fs.readFileSync("/sys/bus/iio/devices/iio:device0/in_voltage" + this.pin[pin_number].index + "_raw");
    return data;
};

GalileoGpio.prototype.readAnalogScalePin = function(pin_number)
{
    var data = fs.readFileSync("/sys/bus/iio/devices/iio:device0/in_voltage" /*+ pin_number*/ + "_scale");
    return data;
};

/**
 * Read data from a digital pin
 *
 * @method readDigitalgPin
 * @param {Number} pin_number Number of the analog pin on the Galileo board.
 */

GalileoGpio.prototype.readDigitalPin = function(pin_number)
{
    var data = fs.readFileSync(this.gpioPath + "/gpio" + this.pin[pin_number].id + "/value");
    return data;
};


/**
 * Close system access to the pin
 *
 * @method closePin
 * @param {Number} pin_number Number of the pin on the Galileo board.
 */
GalileoGpio.prototype.closePin = function(pin_number)
{
    fs.writeFileSync(this.gpioPath + "/unexport", this.pin[pin_number].id);
};

module.exports = new GalileoGpio;
