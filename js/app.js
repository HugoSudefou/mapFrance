var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
	console.log('Yes');
    $scope.show= false;
	var map = document.getElementById('map');
	var path = map.getElementsByTagName('path');


	for (var i = 0; i < path.length; i++) {
      
	    path[i].addEventListener("click", function(e){
	    	var elementDepartement = e.target;
	    	var dep = elementDepartement.getAttribute('data-num');
	    	$http.get("donnees/departement.json")
				.success(function(data, status, headers, config) {
					var donnees = data;
					for (var i = 0; i < donnees.length; i++) {
						if (donnees[i].fields.code_dept === dep) { 
							console.log('Code Dep : ' + donnees[i].fields.code_dept + '. Code région : ' + donnees[i].fields.code_reg + '. Nom de la ville : ' + donnees[i].fields.nom_chf);
							console.log('All données : ');
							console.log(donnees[i]);
							var lat = donnees[i].fields.geo_point_2d[0];
							var long = donnees[i].fields.geo_point_2d[1];
							console.log('lat : ' + lat + ' long : ' + long);
							console.log("http://www.prevision-meteo.ch/services/json/lat="+ lat +"lng="+ long);
						}
					}
					$http.get("http://www.prevision-meteo.ch/services/json/lat="+ lat +"lng="+ long)
						.success(function(data, status, headers, config) {
    						$scope.show= true;
							console.log('Donnée météo : ');
							// console.log(data);
							var curentMeteo = data.current_condition;
							console.log(curentMeteo.icon);
							$scope.icon = curentMeteo.icon;
							$scope.icon_big = curentMeteo.icon_big;
						 });
				 });
	    })
    }

});
app.controller('meteoGps', function($scope, $http) {
	console.log('GPS');
    navigator.geolocation.getCurrentPosition(function(position)
    {
        console.log("Latitude : " + position.coords.latitude + ", longitude : " + position.coords.longitude);
    });

});


