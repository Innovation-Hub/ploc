![Logo Hub Innovation Epitech](http://oi60.tinypic.com/23r2wdu.jpg)

Ploc
======

Innovation Hub's Plant Monitering and Watering System:
	"PLant Online Connection"

The goal of this project is to create a bot able to check if a plant needs water and give the right amount when it is necessary.

You can check the status of your plant and set the watering profile from the web API from known or custom plant profiles.

Project created by the Hub Innovation team from [Epitech](http://www.epitech.eu)

![Ploc](http://i.imgur.com/LbKkspR.jpg)

Features
--------
* Rest API
* Perfect timing for watering 
* creation of new plant profiles very easily (json file)

Usage
-------

on the Galileo
`node web.js`

on any http enabled device:

[GET] `/api/profiles` -> returns the list of all profiles

-------

To create new profile, you just need to add a new file in the recipes folder based on the sample:

```
{
  "name": "Juliet", // name of the profile
  "api": "juliet", // name of the endpoint for the web API
  "data": 
      {"time": 2000 // time is the number of millisecond of watering
      "humidity":0, // voltage of the humidity sensor, if lower than 1000, the plant needs water
       "light":0, // voltage of the light sensor, if lower than 1000, the plant needs light
       "water":"19/04/1988", // date of the last watering
       "tank":Ok // level of water in the tank}
}
```

RoadMap
--------
* Creation of a post method to create new profiles
* Air Humidity and temperature sensor
* multi level tank (high, medium, low)

Hardware
--------
* Intel [Galileo](http://www.intel.com/content/www/us/en/intelligent-systems/galileo/galileo-overview.html)
* Submersible pump Aleas AH-1
* Relay
* Sensors :
	- humidity : 
		* 2 raw steel nails (L 100mm,  4,5)
		* Phototransistor (LTV4N35)
		* 100 kΩ resistor
	- light : a simple LDR and a 100 kΩ resistor
	- tank level : two wires

Estimated: under 120$

Depends
-------
* NodeJS 0.8 (Express, Async)
* Galileo from Intel
* Water Tank (5 liters)

Licence
-------
This project is under MIT Licence.

The MIT License (MIT)

Copyright (c) 2014 Innovation Hub Epitech

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

