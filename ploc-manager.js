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
    // 'low':'A3',
    // 'medium':'A4',
    // 'high': 'A2',
    'low' : 'A2',
    // 'medium': 10,
    // 'high' : 11,
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
      "Level": 42
    }
}

PlocManager.prototype.openAlim = function(pin_number)
//function openAlim(pin_number)
{
  galil.openPin(this.pin[pin_number]);
  galil.setPinDirection(this.pin[pin_number], "out");
  galil.setPinPortDrive(this.pin[pin_number], "strong");
  galil.writePin(this.pin[pin_number], this.state['ON']);

  //console.log('PIN ' + this.pin[pin_number] + ': ON');
};

PlocManager.prototype.openAnalog = function(pin_number)
//function openAnalog(pin_number)
{
  galil.openPin(this.pin[pin_number]);
  galil.setPinDirection(this.pin[pin_number], "out");
  galil.writePin(this.pin[pin_number], this.state['OFF']);
};

PlocManager.prototype.closeAlim = function(pin_number)
//function closeAlim(pin_number)
{
  galil.writePin(this.pin[pin_number], this.state['OFF']);
  //console.log('PIN ' + this.pin[pin_number] + ': OFF');
  
  galil.closePin(this.pin[pin_number]);
};


PlocManager.prototype.getHumidity = function() 
{
  //console.log("Entering getHumidity function")
  
  this.openAlim('clou');
  this.openAnalog('pot');
  
  this.info["Humidity"] = galil.readAnalogPin(this.pin['pot'])
  //console.log("Humidity: " + this.info["Humidity"] );

  this.closeAlim('clou');  
  galil.closePin(this.pin['pot']);

  return this.info["Humidity"];
};

PlocManager.prototype.getLight = function()
{
  //console.log("Entering getLight function")
	this.openAlim('ldrIn');
  this.openAnalog('ldrOut');

	this.info["Light"]  = galil.readAnalogPin(this.pin['ldrOut'])
  //console.log("Light: " + this.info["Light"]);

  this.closeAlim('ldrIn');
  galil.closePin(this.pin['ldrOut']);

  return this.info["Light"]
};

PlocManager.prototype.setPump = function(delay)
{
  var that = this;
  console.log('delay ' + delay);
  galil.openPin(this.pin['pump']);
  galil.setPinDirection(this.pin['pump'], "out");
  galil.setPinPortDrive(this.pin['pump'], "strong");

  if (this.info["Humidity"] < 3500)
  {
    galil.writePin(this.pin['pump'], this.state['ON']);
    console.log("The plant needs water");
    setTimeout(function()
      {
        galil.writePin(that.pin['pump'], that.state['OFF']);
        galil.closePin(that.pin['pump']);
      }, delay);  
  }
  else
  {
    galil.closePin(this.pin['pump']);
  }
};

PlocManager.prototype.checkTank = function()
{
  //console.log("Entering getLight function")
  this.openAlim('tank');
  this.openAnalog('low');
  // this.openAnalog('medium');
  // this.openAnalog('high');

  var low = galil.readAnalogPin(this.pin['low']);
  console.log('low ' + low);

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
  // galil.closePin(this.pin['medium']);
  // galil.closePin(this.pin['high']);

  return this.info["Level"]
}

module.exports = new PlocManager;