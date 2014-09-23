function HomeCtrl($scope, $routeParams, $http) 
{
	
};

function MonitoringCtrl($scope, $routeParams, $http) 
{
	$scope.profiles;
	$scope.isBusy = false;
	$scope.info = '';
	$scope.thirstiness;
	$scope.sunlight;
	$scope.tank;
	
	var monitoring = function () { 
		$http.get('http://192.168.42.42:4242/api/profiles').success(function(data, status) 
		{
			$scope.profiles = data;
			console.log(data);
			// Humidity information
			if($scope.profiles.data.humidity < 1500)
			{
				$scope.thirstiness = "drought";
			}
			else if ($scope.profiles.data.humidity > 3000)
			{
				$scope.thirstiness = "ok";
			}
			else
			{
				$scope.thirstiness = "ploc_logo";
			}

			// Sunlight information
			if($scope.profiles.data.light < 1500)
			{
				$scope.sunlight = "night";
			}
			else if ($scope.profiles.data.light < 2000)
			{
				$scope.sunlight = "cloudy";
			}
			else if ($scope.profiles.data.light > 3000)
			{
				$scope.sunlight = "umbrella";
			}
			else
			{
				$scope.sunlight = "sunny";
			}

			// Tank Level information
			if ($scope.profiles.data.tank === "Ok")
			{
				$scope.tank = "full";
			}
			else
				$scope.tank = "empty";
	});

	monitoring();

	document.getElementById("up").onclick = monitoring;

	document.getElementById('water').onclick = function ()
	{
		$http.get('http://192.168.42.42:4242/api/water').success();
	};
};