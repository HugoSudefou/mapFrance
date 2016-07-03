var app = angular.module('myApp', []);

app.factory('getRegion', function ($q) {
  return {
    doLoop: function () {
      // creation d'une promise
      var deferred = $q.defer();

    
	var map = document.getElementById('map');
	var path = map.getElementsByTagName('path');

    for (var i = 0; i < path.length; i++) {
      
	    path[i].addEventListener("click", function(e){
	    	var elementDepartement = e.target;
	    	cap = elementDepartement.getAttribute('data-capital').toUpperCase();
	    	var idRegNow = [];
	    	var idRegReal = [];
	    	var meteo = [];
		      // resolution de la promise
		      // il est aussi possible de la rejeter avec .reject()
		      deferred.resolve(cap);
	    });
	}

		      // on renvoie la promise
		      return deferred.promise;

    }
  }
});

app.controller('myCtrl', function($scope, $http, getRegion, $location, $anchorScroll) {
	$scope.goToMeteo = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('clearfix');

      // call $anchorScroll()
      $anchorScroll();
    };
	$scope.goToTop = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('header');

      // call $anchorScroll()
      $anchorScroll();
    };
	console.log('Yes');
    $scope.show = false;
    $scope.showMeteo = false;
	var map = document.getElementById('map');
	var path = map.getElementsByTagName('path');

	addEventListener("click", function(e){
    	$scope.show= true;
    	var promise = getRegion.doLoop();
    	$scope.meteo= [];
    	$scope.RegReal= [];

		promise.then(function (arr) {
		    // on obtient le resultat de .resolve() ici
		    // attention arr n'est accessible seulement dans la closure

		    $scope.nomPref = arr;
		    // console.log('YESSSSSSSSSSSSSSSSSSS : ');
		    // console.log(arr);
	
			var idRegNow = [];
			var idRegReal = [];
			$scope.infometeo = [];
			var nomPref = $scope.nomPref;
			$http.get("donnees/departement.json")
				.success(function(data, status, headers, config) {
					var nomPref = $scope.nomPref;
					// console.log('nomPref : ' + nomPref);
					var donnees = data;
					var donneesBis = donnees;
					$scope.donneesTre = donnees;

					angular.forEach(donnees, function(value, key) {
					  if (value.fields.nom_chf == nomPref) { 
							/*
							console.log('Code Dep : ' + donnees[i].fields.code_dept + '. Code région : ' + donnees[i].fields.code_reg + '. Nom de la ville : ' + donnees[i].fields.nom_chf);
							console.log('All données : ');
							console.log(donnees[i]);
							var lat = donnees[i].fields.geo_point_2d[0];
							var long = donnees[i].fields.geo_point_2d[1];
							console.log('lat : ' + lat + ' long : ' + long);
							console.log("http://www.prevision-meteo.ch/services/json/lat="+ lat +"lng="+ long);
							*/
							// console.log('key : ' + key);
							// console.log('value : ');
							// console.log(value);
							var idRegWait = value.fields.code_reg;
							// console.log('idReg : ' + idRegWait);
							this.push(idRegWait);
						}
					}, idRegNow);

					// console.log('idReg : ' + idRegNow);
					var idReg2 = idRegNow;
					// console.log('idReg2 : ' + idReg2);
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
							// console.log('key : ' + key);
							// console.log('value : ');
							// console.log(value);
							$scope.nomVille = value.fields.nom_chf;
							// console.log('nom : ' + $scope.nomVille);
							$scope.ville = value;
							this.push($scope.nomVille);
						}
					}, idRegReal);
					// console.log('idRegReal : ');
					// console.log(idRegReal);
					$scope.RegReal = idRegReal;
					
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
				 })
				.then(function(data, status, headers, config){
					// console.log('$scope.RegReal : ');
					// console.log($scope.RegReal);
					var donneesTre = $scope.donneesTre;
					var RegReal = $scope.RegReal;
					angular.forEach(donneesTre, function(value, key) {
						angular.forEach(RegReal, function(nameReg, key) {
							if (value.fields.nom_chf == nameReg) { 
								
								// console.log('Code Dep : ' + value.fields.code_dept + '. Code région : ' + value.fields.code_reg + '. Nom de la ville : ' + value.fields.nom_chf);
								// console.log('All données : ');
								// console.log(value);
								var lat = value.fields.geo_point_2d[0];
								var long = value.fields.geo_point_2d[1];
								// console.log('lat : ' + lat + ' long : ' + long);
								// console.log("http://www.prevision-meteo.ch/services/json/lat="+ lat +"lng="+ long);
								$http.get("http://www.prevision-meteo.ch/services/json/lat="+ lat +"lng="+ long)
									.success(function(data, status, headers, config) {
			    						// $scope.show= true;
										// console.log(data);
										// console.log('Donnée météo : ');
										// // console.log(data);
										// var curentMeteo = data.current_condition;
										// console.log(curentMeteo.icon);
										// $scope.icon = curentMeteo.icon;
										// $scope.icon_big = curentMeteo.icon_big;
										// console.log('yes j\'ai des bonne coordonnees');
										// console.log('Data : ');
										// console.log(data);
										// console.log('CurrentData : ');
										// console.log(data.current_condition);
										// console.log('condition : ' + data.current_condition.condition);
										// console.log('date : ' + data.current_condition.date);
										// console.log('tmp : ' + data.current_condition.tmp);
										// console.log('icon : ' + data.current_condition.icon_big);
										$scope.condition = data.current_condition.condition;
										$scope.date = data.current_condition.date;
										$scope.tmp = data.current_condition.tmp;
										$scope.icon = data.current_condition.icon_big;

										var day2 = data.fcst_day_0;
										var day3 = data.fcst_day_1;
										var day4 = data.fcst_day_2;
										var day5 = data.fcst_day_3;
										var day6 = data.fcst_day_4;

										var nom = value.fields.nom_chf;
										var condition = $scope.condition;
										var date = $scope.date;
										var tmp = $scope.tmp;
										var icon = $scope.icon;
										$scope.infometeo.push({nom: nom, condition: condition, date: date, tmp: tmp, icon: icon, day2: day2, day3: day3, day4: day4, day5: day5, day6: day6});

									})
									.then(function(data, status, headers, config){
										console.log('$scope.infometeo');
										console.log($scope.infometeo);
										$scope.meteo = $scope.infometeo;

									})
								
							}
						})
					});
					$scope.showMeteo = true;
				})
		});
    });
 //    

});
app.controller('meteoGps', function($scope, $http) {
	console.log('GPS');
    navigator.geolocation.getCurrentPosition(function(position)
    {
        // console.log("Latitude : " + position.coords.latitude + ", longitude : " + position.coords.longitude);
        $scope.lat = position.coords.latitude;
        $scope.long = position.coords.longitude;
        $scope.infometeoGeo = [];
        var lat = $scope.lat;
        var long = $scope.long;
        // console.log("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + ',' + long + "&sensor=false");
    	$http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + ',' + long + "&sensor=false")
			.success(function(data, status, headers, config) {
				// $scope.show= true;
				// console.log(data);
				// console.log('Donnée météo : ');
				// // console.log(data);
				// var curentMeteo = data.current_condition;
				// console.log(curentMeteo.icon);
				// $scope.icon = curentMeteo.icon;
				// $scope.icon_big = curentMeteo.icon_big;
				// console.log('yes j\'ai des bonne coordonnees');
				// console.log('Data : ');
				// console.log(data.results[0].formatted_address);
				// console.log('CurrentData : ');
				// console.log(data.current_condition); 
				$scope.addressGeo = data.results[0].formatted_address;
				

			})
			.then(function(data, status, headers, config) {
				$http.get("http://www.prevision-meteo.ch/services/json/lat="+ lat +"lng="+ long)
					.success(function(data, status, headers, config) {
						// $scope.show= true;
						console.log('Data : ');
						console.log(data);
						// // console.log(data);
						// var curentMeteo = data.current_condition;
						// console.log(curentMeteo.icon);
						// $scope.icon = curentMeteo.icon;
						// $scope.icon_big = curentMeteo.icon_big;
						// console.log('yes j\'ai des bonne coordonnees');
						// console.log('Data : ');
						// console.log(data);
						// console.log('CurrentData : ');
						// console.log(data.current_condition);
						// console.log('condition : ' + data.current_condition.condition);
						// console.log('date : ' + data.current_condition.date);
						// console.log('tmp : ' + data.current_condition.tmp);
						// console.log('icon : ' + data.current_condition.icon_big);
						$scope.condition = data.current_condition.condition;
						$scope.date = data.current_condition.date;
						$scope.tmp = data.current_condition.tmp;
						$scope.icon = data.current_condition.icon;

						var address = $scope.addressGeo;
						var condition = $scope.condition;
						var date = $scope.date;
						var tmp = $scope.tmp;
						var icon = $scope.icon;
						$scope.infometeoGeo.push({address: address, condition: condition, date: date, tmp: tmp, icon: icon});
						console.log($scope.infometeoGeo);
						console.log($scope.infometeoGeo[0].address);
						$scope.infometeoGeo = $scope.infometeoGeo[0];

					})
			})
    })

});


app.controller('twitterCtrl', function($scope, $http) {
	console.log('Twitter');
	$http.get("http://api.twitter.com/1/search/tweets.json?q=%23freebandnames")
		.success(function(data, status, headers, config) {
			// $scope.show= true;
			// console.log(data);
			// console.log('Donnée météo : ');
			// // console.log(data);
			// var curentMeteo = data.current_condition;
			// console.log(curentMeteo.icon);
			// $scope.icon = curentMeteo.icon;
			// $scope.icon_big = curentMeteo.icon_big;
			console.log('yes j\'ai Acces a Twitter');
			console.log('Data : ');
			console.log(data);
			// console.log('CurrentData : ');
			// console.log(data.current_condition); 
			// $scope.adresseGeo = data.results[0].formatted_address;
		})

});
