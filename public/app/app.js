var app = angular.module('plocApp', ["ngRoute"]);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
	$routeProvider.
 		when('/', {templateUrl: 'partials/home.html',   controller: HomeCtrl}).
		when('/monitoring', {templateUrl: 'partials/monitoring.html',   controller: MonitoringCtrl}).
 		otherwise({redirectTo: '/'});
}]);