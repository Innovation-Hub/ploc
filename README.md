![Logo Hub Innovation Epitech](http://oi60.tinypic.com/23r2wdu.jpg)

Ploc
======

Innovation Hub's Plant Monitering and Watering System:
	"PLant Online Connexion"

The goal of this project is to create a bot able to check if a plant needs water and give the right amount when it is necessary.

You can check the status of your plant and set the watering profile from the web API from known or custom plant profiles.

Project created by the Hub Innovation team from [Epitech](http://www.epitech.eu)

![Ploc]()

//Youtube ==> [First Drink!](http://www.youtube.com/watch?v=8okK15RWCJY)

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

[POST] `/api/profileName` -> 

Create profile
-------

To create new profile, you just need to add a new file in the recipes folder based on the sample:

```
{
  "name": "Juliet", // name of the profile
  "api": "juliet", // name of the endpoint for the web API
  "ingredients": [
      {"time": 2000} // time is the number of millisecond for each ingredient
    ]
}
```

RoadMap
--------
* Creation of a web front with angularjs/Bootstrap
* Mobile client
* 

Hardware
--------
* Intel [Galileo](http://www.intel.com/content/www/us/en/intelligent-systems/galileo/galileo-overview.html)
* 
* 1x [2 channels relay board](http://www.elecfreaks.com/store/2-channel-5v12v24v-relay-module-p-270.html)

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

