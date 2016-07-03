var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
	console.log('Yes');
    $scope.show= false;
	var map = document.getElementById('map');
	var path = map.getElementsByTagName('path');

	for (var i = 0; i < path.length; i++) {
      
	    path[i].addEventListener("click", function(e){
	    	var elementDepartement = e.target;
	    	var cap = elementDepartement.getAttribute('data-capital').toUpperCase();
	    	var idRegNow = [];
	    	var idRegReal = [];
	    	var meteo = [];
	    	$http.get("donnees/departement.json")
				.success(function(data, status, headers, config) {
					var donnees = data;
					var donneesBis = donnees;

					angular.forEach(donnees, function(value, key) {
					  if (value.fields.nom_chf == cap) { 
							/*
							console.log('Code Dep : ' + donnees[i].fields.code_dept + '. Code région : ' + donnees[i].fields.code_reg + '. Nom de la ville : ' + donnees[i].fields.nom_chf);
							console.log('All données : ');
							console.log(donnees[i]);
							var lat = donnees[i].fields.geo_point_2d[0];
							var long = donnees[i].fields.geo_point_2d[1];
							console.log('lat : ' + lat + ' long : ' + long);
							console.log("http://www.prevision-meteo.ch/services/json/lat="+ lat +"lng="+ long);
							*/
							console.log('key : ' + key);
							console.log('value : ');
							console.log(value);
							var idRegWait = value.fields.code_reg;
							console.log('idReg : ' + idRegWait);
							this.push(idRegWait);
						}
					}, idRegNow);

					console.log('idReg : ' + idRegNow);
					var idReg2 = idRegNow;
					console.log('idReg2 : ' + idReg2);
					angular.forEach(donneesBis, function(value, key) {
						if (value.fields.code_reg == idReg2) { 
							/*
							console.log('Code Dep : ' + donnees[i].fields.code_dept + '. Code région : ' + donnees[i].fields.code_reg + '. Nom de la ville : ' + donnees[i].fields.nom_chf);
							console.log('All données : ');
							console.log(donnees[i]);
							var lat = donnees[i].fields.geo_point_2d[0];
							var long = donnees[i].fields.geo_point_2d[1];
							console.log('lat : ' + lat + ' long : ' + long);
							console.log("http://www.prevision-meteo.ch/services/json/lat="+ lat +"lng="+ long);
							*/
							console.log('key : ' + key);
							console.log('value : ');
							console.log(value);
							var nom = value.fields.nom_chf;
							console.log('nom : ' + nom);
							$scope.meteoNow = value;
							this.push(nom);
						}
					}, idRegReal);
					console.log('idRegReal : ');
					console.log(idRegReal);
					angular.forEach(donneesBis, function(value, key) {
						if (value.fields.code_reg == idReg2) { 
							/*
							console.log('Code Dep : ' + donnees[i].fields.code_dept + '. Code région : ' + donnees[i].fields.code_reg + '. Nom de la ville : ' + donnees[i].fields.nom_chf);
							console.log('All données : ');
							console.log(donnees[i]);
							var lat = donnees[i].fields.geo_point_2d[0];
							var long = donnees[i].fields.geo_point_2d[1];
							console.log('lat : ' + lat + ' long : ' + long);
							console.log("http://www.prevision-meteo.ch/services/json/lat="+ lat +"lng="+ long);
							*/
							console.log('key : ' + key);
							console.log('value : ');
							console.log(value);
							var nom = value.fields.nom_chf;
							console.log('nom : ' + nom);
							$scope.meteoNow = value;
							this.push(nom);
						}
					}, meteo);
					// for (var i = 0; i < donnees.length; i++) {
					// 	if (donnees[i].fields.nom_chf == cap) { 
					// 		/*
					// 		console.log('Code Dep : ' + donnees[i].fields.code_dept + '. Code région : ' + donnees[i].fields.code_reg + '. Nom de la ville : ' + donnees[i].fields.nom_chf);
					// 		console.log('All données : ');
					// 		console.log(donnees[i]);
					// 		var lat = donnees[i].fields.geo_point_2d[0];
					// 		var long = donnees[i].fields.geo_point_2d[1];
					// 		console.log('lat : ' + lat + ' long : ' + long);
					// 		console.log("http://www.prevision-meteo.ch/services/json/lat="+ lat +"lng="+ long);
					// 		*/
					// 		console.log("yes");
					// 		console.log("donnees : ");
					// 		console.log(donnees);
					// 		var idReg = donnees[i].fields.code_reg;
					// 	}
					// }

					// for (var i = 0; i < donneesBis.length; i++) {
					// 	if (donneesBis[i].fields.code_reg == idReg) { 
					// 		console.log("yes je suis un departement");
					// 		console.log("http://www.prevision-meteo.ch/services/json/"+ donneesBis[i].fields.nom_chf);
					// 		var lat = donneesBis[i].fields.geo_point_2d[0];
					// 		var long = donneesBis[i].fields.geo_point_2d[1];
					// 		$http.get("http://www.prevision-meteo.ch/services/json/"+ donneesBis[i].fields.nom_chf)
					// 			.success(function(data, status, headers, config) {
		   //  						$scope.show= true;
					// 				console.log(donneesBis[i]);
					// 				// console.log('Donnée météo : ');
					// 				// // console.log(data);
					// 				// var curentMeteo = data.current_condition;
					// 				// console.log(curentMeteo.icon);
					// 				// $scope.icon = curentMeteo.icon;
					// 				// $scope.icon_big = curentMeteo.icon_big;
					// 				// console.log('yes j\'ai des bonne coordonnees');
					// 				// console.log('Data : ');
					// 				// console.log(data);
					// 				// console.log('CurrentData : ');
					// 				// console.log(data.current_condition);
					// 				console.log('condition : ' + data.current_condition.condition);
					// 				// console.log('date : ' + data.current_condition.date);
					// 				// console.log('tmp : ' + data.current_condition.tmp);
					// 				// console.log('icon : ' + data.current_condition.icon);
					// 				$scope.meteoNow = data.current_condition;
					// 			 });
					// 	}
					// }
					
						 //console.log(data);
				 });
				console.log('idRegReal : ');
				console.log(idRegReal);
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


