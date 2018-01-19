angular.module('globalmediaApp').controller('investigacionEspecialCtrl', function ($scope,$timeout,$http) {
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
	
	/*BANNER SUPERIOR*/
	$http.get('banners/'+'bannersFull').then(function(response){
		$scope.slideInves = response.data;
	},function(response){
		alert(response);
	});
	
	/********************************GET PARA NOTAS AL MOMENTO******************************/
	$http.get('/almom/'+'9').then(function(almomento){
		$scope.almomento=almomento.data;
	}, function(err){
		alert("ERROR AL MOMENTO NOTAS");
	});
	
	/********************************GET PARA INVESTIGACIONES******************************/
	$http.get('/secciones/'+'Especial').then(function(response){
		$scope.investigaciones=response.data;
		console.info($scope.investigaciones);
	}, function(err){
		alert("ERROR AL MOMENTO NOTAS");
	});

	/*CARGA MAS AREA*/
	var pagina=1;
	$scope.notasMas=[];

	$scope.cargaMas=function(){
		pagina++;
		$http.get('cargaMas/'+pagina+'/'+22).then(function(n){
			n.data.objetos.forEach(function(i){
				$scope.notasMas.push(i);
			});
		},function(err){
			console.error(err);
		});
	};
});