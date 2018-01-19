angular.module('globalmediaApp').controller('vivecanalCtrl', function ($scope,$timeout,$http) {
	var INTERVAL = 10000;
	var meses=["ENERO","FEBRERO", "MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
	var date=new Date();
	$scope.fecha={dia: date.getDay(), mes: meses[date.getMonth()], ano: date.getYear(),hora: date.getHours(),minutos:date.getMinutes()};
	
	//Obtiene los datos del clima
	$http.get('http://api.openweathermap.org/data/2.5/weather?q=SanLuisPotosi,MX&units=metric&lang=es&APPID=274ae23cbc63fbd1459f858b29a5e0a7')
	.then(function(response){
		$scope.clima={};
		$scope.clima.temp=Math.trunc(response.data.main.temp);
		$scope.clima.desc=response.data.weather[0].description;
	}, function(response){
		alert("Error no se puede obtener el clima");
	});
	
	$http.post('/plusHitRecurso', {id:1005}).then(function(h){
		console.log("HITS");
		console.log(h);
	}, function(err){
		console.error(err);
	});

	/******************AREA SLIDER BANNERS PRINCIPALES****************/
	//Obtener todos los baner que rotaran en header
	$http.get('banners/'+'Nuevo').then(function(response){
		$scope.slidesP = response.data;
	},function(response){
		alert(response);
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
	
	/*GET NOTAS RELACIONADAS*/
	$http.get('/notasSeccion/'+'Farandula').then(function(response){
		$scope.notas=response.data;
		console.log($scope.notas);
	},function(response){
		alert("ERROR BASE DE DATOS "+response);
	});
	
});