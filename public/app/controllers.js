function HomeCtrl($scope, $routeParams, $http) 
{
	
};

function MonitoringCtrl($scope, $routeParams, $http) 
{
	$scope.profiles;
	$scope.isBusy = false;
	$scope.info = '';
	
	setInterval(function()
		{
			$http.get('http://192.168.42.42:4242/api/profiles').success(function(data, status) 
			{
				$scope.profiles = data;
				console.log(data);
			});
		}, 10000);
};