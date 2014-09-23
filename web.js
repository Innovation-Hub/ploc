var fs = require('fs');
var async = require('async');

// Load the native controller to manipule pumps
var ploc = require('./ploc-manager');

var port = 4242;
var express = require('express');
var app = express();
var server = require('http').createServer(app, { log: false })
app.use(express.json());
app.use(express.urlencoded());
app.use(express.compress());
app.use(express.static(__dirname + '/public'));

// in-memory "database"
var profiles = [];

// just a little helper with string manipulation
String.prototype.endsWith = function(suffix) 
{
    return this.match(suffix+"$") == suffix;
};


// we read all recipes inside the ./recipes directory to load them
// in the in-memory "database" and prepare a POST query to be able to
// create cocktail "on demand"
fs.readdir('./profiles/', function (err, files) 
{
	files.forEach(function (f) 
	{
		if (f.endsWith('.json')) 
		{
		    fs.readFile('./profiles/' + f,  function (err, data) 
		    {
			    if (err) 
			    {
					console.log('Error: ' + err);
					process.exit();
			    } 
			    else 
			    {
					var r = JSON.parse(data);
					profiles.push(r);
					console.log('Plant ' + r.name + ' added');		
			    }
			});
		}
	});
});

fs.appendFile('log.csv', 'Time,Plant,Humidity,Light,Temp,Tank\n', function (err) 
		{
  			if (err) throw err;
		});

// when users call the GET /api/profiles url, we return the list of all profiles
// with the data from all our sensors
app.get('/api/profiles', function (req,res) 
{
	console.log('Entering get');

 	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Content-Type", "application/json");

	var re;
	
	profiles.forEach(function (r) 
	{
		//re = ({name: r.name, data:{}endpoint: '/api/' + r.api});
		console.log('Monitoring ' + r.name);

		var humidity = "" + ploc.getHumidity();
		r.data.humidity = humidity;
		var h = humidity.replace("\n","");
		
		var light = "" + ploc.getLight();
		r.data.light = light;
		var l = light.replace("\n", "");

		if (ploc.checkTank() == 0)
		{
			r.data.tank = 'Empty';
			var tank = "0\n";
		}
		else
		{
			r.data.tank = 'Ok';
			var tank = "1\n";
		}
		if (r.data.humidity < 3500 && r.data.tank != 'Empty')
		{
			ploc.setPump(r.data.time);
			r.data.water = 'DONE';
		}
		else
			r.data.water = 'NOPE';
					
		re = r;

		var d = new Date();

		var log = d.toLocaleTimeString() + "," + r.name + "," + h + "," + l + "," + tank;
		console.log(log);
		fs.appendFile('log.csv', log, function (err) 
		{
  			if (err) throw err;
		});
	});
	res.send(re);
});


//Here we can manually run the pump from the website
app.get('/api/water', function()
{
	console.log('Entering water');
	profiles.forEach(function (r) 
	{
		console.log('Watering ' + r.name);

		if (r.data.tank != 'Empty')
		{
			ploc.setPump(r.data.time);
			console.log('DONE');
		}
		else
			console.log = ("not enough water");
					
		fs.appendFile('log.csv', "Manual Watering", function (err) 
		{
  			if (err) throw err;
		});
	});
});

server.listen(process.env.PORT || port);
console.log('server started on port ' + (process.env.PORT || port));
