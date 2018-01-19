angular.module('globalmediaApp').controller('denunciaCtrl', function ($scope,$timeout,$http,$sce) {
	var INTERVAL = 10000;
	var meses=["ENERO","FEBRERO", "MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
	var date=new Date();
	$scope.fecha={dia: date.getDay(), mes: meses[date.getMonth()], ano: date.getYear(),hora: date.getHours(),minutos:date.getMinutes()};
	
	/*CARGA MAS AREA*/
	var pagina=1;
	$scope.notasMas=[];

	$scope.cargaMas=function(){
		pagina++;
		$http.get('cargaMas/'+pagina+'/'+11).then(function(n){
			n.data.objetos.forEach(function(i){
				$scope.notasMas.push(i);
			});
		},function(err){
			console.error(err);
		});
	};
	
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
	
	/*AGREGA A LA WHITE LIST LAS URLS DE LOS VIDEOS DE YOUTUBE*/
	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	 }
	
	/*CHANGE THE IFRAME SOURCE*/
	$scope.change=function(video){
		$scope.video=video;
		$scope.video.url=$scope.video.url.replace("watch?v=", "v/");
	}
	
	/*GET ID DE VIDEO YOUTUBE*/
	$scope.getId=function(url){
		var video_id = url.split('v=')[1];
		var ampersandPosition = video_id.indexOf('&');
		if(ampersandPosition != -1) {
			console.log(video_id);
		  return video_id = video_id.substring(0, ampersandPosition);
		}
		else{
			return video_id;
		}
	}
	
	/********************************GET PARA NOTAS AL MOMENTO******************************/
	$http.get('/almom/'+'9').then(function(almomento){
		$scope.almomento=almomento.data;
	}, function(err){
		alert("ERROR AL MOMENTO NOTAS");
	});
	
	/*GET NOTAS RELACIONADAS*/
	$http.get('/notasSeccion/'+'Farandula').then(function(response){
		$scope.notas=response.data;
	},function(response){
		alert("ERROR BASE DE DATOS "+response);
	});
	
	/*DENUNCIA VIDEO PRINCIPAL*/
	$http.get('/denuncia').then(function(response){
		$scope.video=response.data;
		$scope.video.url=$scope.video.url.replace("watch?v=", "v/");
	},function(err){
		alert("ERROR VIDEO DENUNCIA "+err);
	});
	
	/*DENUNCIA VIDEO PRINCIPAL*/
	$http.get('/denuncias').then(function(response){
		$scope.playlist=response.data;
	},function(err){
		alert("ERROR VIDEO DENUNCIA "+err);
	});
	
	/********************************GET PARA INVESTIGACIONES******************************/
	$http.get('/secciones/'+'Informe').then(function(response){
		$scope.investigaciones=response.data;
		console.info($scope.investigaciones);
	}, function(err){
		alert("ERROR INFORME NOTAS");
	});
});