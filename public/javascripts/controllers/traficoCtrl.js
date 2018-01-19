angular.module('globalmediaApp').controller('traficoCtrl', function ($scope,$timeout,$http, uiGmapGoogleMapApi,$state,$stateParams) {
	$state.transitionTo('Trafico.Mapa');
	var INTERVAL = 10000;
	var meses=["ENERO","FEBRERO", "MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
	var date=new Date();
	$scope.fecha={dia: date.getDay(), mes: meses[date.getMonth()], ano: date.getYear(),hora: date.getHours(),minutos:date.getMinutes()};
	$scope.inferiores=true;
	
	
	 $scope.$on('vjsVideoReady', function (e, data) {
            data.player.on("pause", function () {
				data.player.on("play", function () {
					console.info("play again");
				  data.player.load (); 
				  data.player.off("play");
				});
		  });
        });
	
	//Obtiene los datos del clima
	$http.get('http://api.openweathermap.org/data/2.5/weather?q=SanLuisPotosi,MX&units=metric&lang=es&APPID=274ae23cbc63fbd1459f858b29a5e0a7')
	.then(function(response){
		$scope.clima={};
		$scope.clima.temp=Math.trunc(response.data.main.temp);
		$scope.clima.desc=response.data.weather[0].description;
	}, function(response){
		console.error("Error no se puede obtener el clima");
	});
	
	/*Noticias relacionadas a trafico*/
	$http.get('trafico').then(function(notas){
		$scope.notas=notas.data;
	},function(err){
		console.error("Error con notas "+err);
	});
	
	/**************************NOTAS IMPORTANTES*****************************/
	$http.get('portada').then(function(response){
		$scope.importantes=response.data;
		console.log($scope.importantes);
	},function(err){
		console.error("ERROR NOTAS PORTADA");
	});
	
	/******************AREA SLIDER BANNERS PRINCIPALES****************/
	//Obtener todos los baner que rotaran en header
	$http.get('banners/'+'Nuevo').then(function(response){
		$scope.slidesP = response.data;
	},function(response){
		console.error(response);
	});
	
	//Obtener todos los baner que rotaran en la parte superior
	$http.get('banners/'+'trafico').then(function(response){
		$scope.slidesTrafico = response.data;
	},function(response){
		console.error(response);
	});
	
	//Obtener todos los baner que rotaran en la parte inferior
	$http.get('banners/'+'trafico2').then(function(response){
		$scope.slidesTrafico2 = response.data;
	},function(response){
		console.error(response);
	});
	//Manipulación de los elementos del slider1
	$scope.currentIndex = 0;
    $scope.setCurrentSlideIndex = function (index) {
        $scope.currentIndex = index;
    };
    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };
	$scope.prevSlide = function () {
        $scope.currentIndex = ($scope.currentIndex < $scope.slidesP.length - 1) ? ++$scope.currentIndex : 0;
    };
    $scope.nextSlide = function () {
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slidesP.length - 1;
		$timeout($scope.nextSlide, INTERVAL);
    };
	
	function loadSlides() {
		$timeout($scope.nextSlide, INTERVAL);
	}
	
	loadSlides();
	
	//Manipulación de los elementos del slider2
	$scope.currentIndex2 = 0;
    $scope.setCurrentSlideIndex2 = function (index) {
        $scope.currentIndex2 = index;
    };
    $scope.isCurrentSlideIndex2 = function (index) {
        return $scope.currentIndex2 === index;
    };
	$scope.prevSlide2 = function () {
        $scope.currentIndex2 = ($scope.currentIndex2 < $scope.slidesTrafico.length - 1) ? ++$scope.currentIndex2 : 0;
    };
    $scope.nextSlide2 = function () {
        $scope.currentIndex2 = ($scope.currentIndex2 > 0) ? --$scope.currentIndex2 : $scope.slidesTrafico.length - 1;
		$timeout($scope.nextSlide2, INTERVAL);
    };
	
	function loadSlides2() {
		$timeout($scope.nextSlide2, INTERVAL);
	}
	
	loadSlides2();
	
	//Manipulación de los elementos del slider3
	$scope.currentIndex3 = 0;
    $scope.setCurrentSlideIndex3 = function (index) {
        $scope.currentIndex3 = index;
    };
    $scope.isCurrentSlideIndex3 = function (index) {
        return $scope.currentIndex3 === index;
    };
	$scope.prevSlide3 = function () {
        $scope.currentIndex3 = ($scope.currentIndex3 < $scope.slidesTrafico2.length - 1) ? ++$scope.currentIndex3 : 0;
    };
    $scope.nextSlide3 = function () {
        $scope.currentIndex3 = ($scope.currentIndex3 > 0) ? --$scope.currentIndex3 : $scope.slidesTrafico2.length - 1;
		$timeout($scope.nextSlide3, INTERVAL);
    };
	
	function loadSlides3() {
		$timeout($scope.nextSlide3, INTERVAL);
	}
	
	loadSlides3();
	
	
	/*MAPA*/
	$scope.map = { center: { latitude: 22.142805, longitude: -100.971294 }, zoom: 12 };
	$scope.options={scrollwheel: false};
	
	 $scope.clickMarker=function(instance,event,marker){
		console.info(marker);
		switch(marker.title){
			case "Global":
				$state.go('Trafico.Reproduce',{id:1});
			break;
			case "Citadella":
				$state.go('Trafico.Reproduce',{id:3});
			break;
			case "Carr57":
				$state.go('Trafico.Reproduce',{id:5});
			break;
			case "Hospital1":
				$state.go('Trafico.Reproduce',{id:6});
			break;
			case "HotelIbis":
				$state.go('Trafico.Reproduce',{id:8});
			break;
		}
	};
	
	$scope.markers=[
				   {id:4, title:"Carr57", latitude:22.150164,longitude: -100.955967, icon:"images/common/marker-min.png"},
				   {id:5, title:"Citadella", latitude:22.138113,longitude: -101.000773, icon:"images/common/marker-min.png"},
				   {id:6, title:"Hospital1", latitude:22.139592,longitude:  -100.940389, icon:"images/common/marker-min.png"},
				   {id:9, title:"HotelIbis", latitude:22.124306,longitude:  -100.917221, icon:"images/common/marker-min.png"},
				   {id:12, title:"Global", latitude:22.144604,longitude: -100.956698, icon:"images/common/marker-min.png"}
				   ];
	
	uiGmapGoogleMapApi.then(function(maps) {
		
    });
	
});