angular.module('globalmediaApp').controller('noticierosCtrl', function ($scope,$timeout,$http,$sce) {
	var INTERVAL = 10000;
	var meses=["ENERO","FEBRERO", "MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
	var date=new Date();
	$scope.totalItems = 0;
	$scope.maxSize = 4;
	$scope.bigCurrentPage = 1;
	var seccion=15;

	$scope.fecha={dia: date.getDay(), mes: meses[date.getMonth()], ano: date.getYear(),hora: date.getHours(),minutos:date.getMinutes()};
	

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


	/*CONTROL DE DIVS PAR MOSTRAR NOTICIEROS DFERENTES*/
	$scope.fondo={
		background:'url(../../images/noticieros/adetalle/adetalle.jpg)',
		'background-size': 'cover'
	};

	$http.get('/noticieros/'+1).then(function(notas){
		$scope.notasNoticieros=notas.data;
	}, function(err){
		console.error(err);
	});

	$http.get('/podcast/'+1+'/'+seccion).then(function(notas){
		$scope.podcasts=notas.data.array;
		$scope.totalItems = notas.data.total/3;
		console.log($scope.podcasts);
	}, function(err){
		console.error(err);
	});

	$scope.cambiaPag=function(num){
		$http.get("/podcast/"+num+'/'+seccion)
		.success(function (data, status) {
				console.log(data);
				$scope.podcasts=data.array;
			})
			.error(function (data) {
				console.error("Error con base de datos");
		 	 });
	}

	$scope.getURL=function(ruta){
		return $sce.trustAsResourceUrl('images/multimedia/'+ruta);
	};

	$scope.noti=function(noticiero){
		console.log(noticiero);
		switch(noticiero){
			case 'reporte':
				seccion=19;
				$scope.fondo={
					background:'url(../../images/noticieros/reporte/reporte.jpg)',
					'background-size': 'cover'
				};
				$http.get('/noticieros/'+2).then(function(notas){
					$scope.notasNoticieros=notas.data;
				}, function(err){
					console.error(err);
				});
				$http.get('/podcast/'+1+'/'+seccion).then(function(notas){
					$scope.podcasts=notas.data.array;
					$scope.totalItems = notas.data.total/3;
				}, function(err){
					console.error(err);
				});
			break;
			case 'detalle':
				seccion=15;
				$scope.fondo={
					background:'url(../../images/noticieros/adetalle/adetalle.jpg)',
					'background-size': 'cover'
				};
				$http.get('/noticieros/'+1).then(function(notas){
					$scope.notasNoticieros=notas.data;
				}, function(err){
					console.error(err);
				});
				$http.get('/podcast/'+1+'/'+seccion).then(function(notas){
					$scope.podcasts=notas.data.array;
					$scope.totalItems = notas.data.total/3;
				}, function(err){
					console.error(err);
				});
			break;
			case 'formula':
				seccion=17;
				$scope.fondo={
					background:'url(../../images/noticieros/formula/formula.jpg)',
					'background-size': 'cover'
				};
				$http.get('/noticieros/'+3).then(function(notas){
					$scope.notasNoticieros=notas.data;
				}, function(err){
					console.error(err);
				});
				$http.get('/podcast/'+1+'/'+seccion).then(function(notas){
					$scope.podcasts=notas.data.array;
					$scope.totalItems = notas.data.total/3;
				}, function(err){
					console.error(err);
				});
			break;
			case 'noche':
				seccion=35;
				$scope.fondo={
					background:'url(../../images/noticieros/noche/noche.jpg)',
					'background-size': 'cover'
				};
				$http.get('/noticieros/'+4).then(function(notas){
					$scope.notasNoticieros=notas.data;
				}, function(err){
					console.error(err);
				});
				$http.get('/podcast/'+1+'/'+seccion).then(function(notas){
					$scope.podcasts=notas.data.array;
					$scope.totalItems = notas.data.total/3;
				}, function(err){
					console.error(err);
				});
			break;
		}
	};
})
.filter('trustedAudioUrl', function($sce) {
    return function(path, audioFile) {
        return $sce.trustAsResourceUrl(path + audioFile);
    };
});