/**
* Crafted by Eileen on 06/03/14
* For Epitech Innovation Hub
*/

"use strict";
var galil = require('./gpio-galileo-helper');


var PlocManager = function()
{
  /**
     * Helps you to work directly on a ploc with its index,
     * mapping its index to the matching IO pin
     * thus to the matching sensor
     * @property ploc
     * @type Object
     */
	this.pin = 
	{
		'pot': 'A0',
		'ldrOut': 'A1',
    'low': 'A2',
    'tank': 12,
		'clou': 5,
		'pump': 7,
		'ldrIn': 8
	}
    /**
     * Voltage supply
     * @property state
     * @property Object
     */
	this.state =
    {
        'ON':   "1",
        'OFF':  "0"
    };


    /**
     * Incoming sensors informations
     * @property info
     * @property Object
     */
    this.info =
    {
      "Humidity": 0,
      "Light": 0,
      "Level": 42,
    }
}


/**
* Open the chosen pin for current alimentation
*
* @method openAlim
* @param {Number} pin_number Number of the pin on the Galileo board.
*/
PlocManager.prototype.openAlim = function(pin_number)
{
  galil.openPin(this.pin[pin_number]);
  galil.setPinDirection(this.pin[pin_number], "out");
  galil.setPinPortDrive(this.pin[pin_number], "strong");
  galil.writePin(this.pin[pin_number], this.state['ON']);
};

/**
* Open the chosen pin for analog reading
*
* @method openAnalog
* @param {Number} pin_number Number of the pin on the Galileo board.
*/
PlocManager.prototype.openAnalog = function(pin_number)
{
  galil.openPin(this.pin[pin_number]);
  galil.setPinDirection(this.pin[pin_number], "out");
  galil.writePin(this.pin[pin_number], this.state['OFF']);
};

/**
* Shut off and close the chosen pin
*
* @method closeAlim
* @param {Number} pin_number Number of the pin on the Galileo board.
*/
PlocManager.prototype.closeAlim = function(pin_number)
{
  galil.writePin(this.pin[pin_number], this.state['OFF']);
  galil.closePin(this.pin[pin_number]);
};


/**
* Launch the humidity sensor and get the data back.
*
* @method getHumidity 
*/
PlocManager.prototype.getHumidity = function() 
{  
  this.openAlim('clou');
  this.openAnalog('pot');
  
  this.info["Humidity"] = galil.readAnalogPin(this.pin['pot'])

  this.closeAlim('clou');  
  galil.closePin(this.pin['pot']);

  return this.info["Humidity"];
};

/**
* Launch the light sensor and get the data back.
*
* @method getLight
*/
PlocManager.prototype.getLight = function()
{
	this.openAlim('ldrIn');
  this.openAnalog('ldrOut');

	this.info["Light"]  = galil.readAnalogPin(this.pin['ldrOut'])

  this.closeAlim('ldrIn');
  galil.closePin(this.pin['ldrOut']);

  return this.info["Light"]
};

/**
* Run the water pump if the plant is thirsty 
* and if the water supply is full
*
* @method setPump
* @param {Number} delay Running time of the pump 
*/
PlocManager.prototype.setPump = function(delay)
{
  console.log("Entering set pump");
  var that = this;
  galil.openPin(this.pin['pump']);
  galil.setPinDirection(this.pin['pump'], "out");
  galil.setPinPortDrive(this.pin['pump'], "strong");

  if (this.info["Humidity"] < 2000 && this.info["Level"] != 0)
  {
    galil.writePin(this.pin['pump'], this.state['ON']);
    console.log("let the water flow");
    setTimeout(function()
      {
        console.log("Cut this off!");
        galil.writePin(that.pin['pump'], that.state['OFF']);
        galil.closePin(that.pin['pump']);
      }, delay);  
  }
  else
  {
    galil.closePin(this.pin['pump']);
  }
};

/**
* Launch the water level sensor and get the data back.
*
* @method checkTank
*/
PlocManager.prototype.checkTank = function()
{
  this.openAlim('tank');
  this.openAnalog('low');

  var low = galil.readAnalogPin(this.pin['low']);

  if (low > 1000)
  {
    this.info["Level"] = 2;
  }
  else
  {
    this.info["Level"] = 0;
  }

  this.closeAlim('tank');
  galil.closePin(this.pin['low']);

  return this.info["Level"]
}

module.exports = new PlocManager;