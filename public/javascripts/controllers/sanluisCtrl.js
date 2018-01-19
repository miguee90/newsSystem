angular.module('globalmediaApp').controller('sanluisCtrl', function ($scope,$timeout,$http, $state, $location, $anchorScroll) {
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
	$http.get('/secciones/'+'SanLuis').then(function(portada){
		$scope.portada=portada.data;
		$scope.backImage={'background-image' :'URL(../../images/multimedia/' +$scope.portada[0].imagen.imgSeccionF+')'};
	}, function(err){
		consle.eror(err);
	});
	
	/*GET PARA TOP NEWS*/
	$http.get('/popularSeccion/'+'SanLuis').then(function(tops){
		$scope.topNews=tops.data;
		console.log($scope.topNews);
	},function(err){
		console.error(err);
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
		$http.get('cargaMas/'+pagina+'/'+1).then(function(n){
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

	$scope.anoticia=function(aliass,ids){
		$state.go('noticiaId', {id:ids, alias:aliass});
	};
});