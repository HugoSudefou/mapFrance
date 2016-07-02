var app = angular.module('myApp', []);
	console.log('No');
app.controller('myCtrl', function($scope) {
	console.log('Yes');
    $scope.firstName= "John";
    $scope.lastName= "Doe";
	var map = document.getElementById('map');
	var path = map.getElementsByTagName('path');

	for (var i = 0; i < path.length; i++) {
      
		var dep = path[i].getAttribute('data-num');
		console.log('dep : ');
		console.log(dep);
    }
});