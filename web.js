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

					
					// todo, réponse du réservoir	
				
			    }
			});
		}
	});
});

// when users call the GET /api/profiles url, we return the list of all profiles
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
		console.log('Starting monitoring' + r.name)

					r.data.humidity = '' + ploc.getHumidity();
					//console.log('light ' + ploc.getLight());
					r.data.light = '' + ploc.getLight();				
					
					if (r.data.humidity < 3500)
					{
						ploc.setPump(r.data.time);
						var date = new Date();
						//r.data.water = date.getDate() + "/" 
								//+ (date.getMonth() + 1) + "/" + date.getFullYear();
						r.data.water = 'DONE';
					}
					else
						r.data.water = 'NOPE';
					switch (ploc.checkTank())
					{
						case 0:
							r.data.tank = 'Fill me up !';
							break;
						// case 1:
						// 	r.data.tank = 'Medium';
							// break;
						case 2:
							r.data.tank = 'Ok';
					}
		re = r;
	});
	res.send(re);
});

server.listen(process.env.PORT || port);
console.log('server started on port ' + (process.env.PORT || port));
