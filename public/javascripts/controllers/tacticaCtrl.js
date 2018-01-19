angular.module('globalmediaApp').controller('tacticaCtrl', function ($scope, $state, $timeout,$http, $location, $anchorScroll) {
	var INTERVAL = 10000;
	
	/******************AREA SLIDER BANNERS PRINCIPALES****************/
	//Obtener todos los baner que rotaran en header
	$http.get('banners/'+'Nuevo').then(function(response){
		$scope.slidesP = response.data;
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
	/*******************FIN AREA SLIDER BANNERS PRINCIPALES HEADER*******************/
	
	/*GET PARA NOTAS PORTADA*/
	$http.get('/secciones/'+'Tactica').then(function(portada){
		$scope.portada=portada.data;
		console.log($scope.portada);
		$scope.backImage={'background-image' :'URL(../../images/multimedia/' +$scope.portada[0].imagen.imgSeccionF+')'};
	}, function(err){
		console.error("ERROR CON NOTAS PORTADA "+ err);
	});
	
	/*GET PARA TOP NEWS*/
	$http.get('/popularSeccion/'+'Tactica').then(function(tops){
		$scope.topNews=tops.data;
		console.log($scope.topNews);
	},function(err){
		console.error("ERROR TOP NEWS "+err);
	});
	
	//Obtener todos los baner que estaran en la seccion derecha
	$http.get('banners/'+'Banner seccion derecha').then(function(response){
		$scope.slidesD = response.data;
	},function(response){
		console.error("ERROR SLIDERS SECCION DERECHA");
	});

	/*CARGA MAS AREA*/
	var pagina=1;
	$scope.notasMas=[];

	$scope.cargaMas=function(){
		pagina++;
		$http.get('cargaMas/'+pagina+'/'+5).then(function(n){
			n.data.objetos.forEach(function(i){
				$scope.notasMas.push(i);
			});
		},function(err){
			console.error(err);
		});
	};

	$scope.goto=function(){
		console.log("ENTRAAAAAAAA");
		$location.hash('notas');
		$anchorScroll();
	};
	
	$scope.anoticia=function(alias,id){
		$state.go('noticiaId',{alias:alias,id:id});
	};	
});