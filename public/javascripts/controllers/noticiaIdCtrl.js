angular.module('globalmediaApp').controller('noticiaIdCtrl', function ($scope,$timeout,$uibModal,$http,$stateParams,$sce, $location, $anchorScroll) {
	

	/**********ALIAS PRUEBA*************tijeretazo-atrasa-parque-industrial-del-municipio************/
	var INTERVAL = 10000;
	var meses=["ENERO","FEBRERO", "MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
	var date=new Date();
	$scope.fecha={dia: date.getDay(), mes: meses[date.getMonth()], ano: date.getYear(),hora: date.getHours(),minutos:date.getMinutes()};
	$scope.nota=$stateParams.id;
	$scope.alias=$stateParams.alias;
	$scope.tipoAudio=false;

	/*LOAD INFO*/
	$http.get('notaId/'+$scope.nota).then(function(respuesta){
		$scope.completa=$sce.trustAsHtml(respuesta.data.nota.notaCompleta);
		$scope.completo=respuesta.data;
		$scope.backImage={'background-image' :'URL(../../images/multimedia/' +$scope.completo.imagen.imagenArticulo+')'};
	
		console.log($scope.completo);
		if($scope.completo.nota.tipoNota==1)
			$scope.tipoAudio=true;

		$scope.$parent.seo = { 
		    pageTitle : $scope.completo.nota.titulo,
			pageDescription: $scope.completo.nota.resumen,
			keywords: $scope.completo.nota.titulo,
			imagen: 'http://globalmedia.mx/images/multimedia/'+$scope.completo.imagen.imagenMain,
			url:'http://globalmedia.mx/#!/Nota/'+$scope.completo.nota.idNotas+'/'+$scope.completo.nota.alias,
			type:'article'
		};
		$scope.sec=$scope.completo.seccion.nombre;
		pinta($scope.sec);
		/*+ SOBRE EL TEMA*/
		$http.get('sobreTema/'+$scope.completo.nota.idNotas).then(function(res){
			$scope.sobreTema=res.data;
		},function(err){
			console.error(err);
		});
	},function(err){
		console.error(err);
	});

	$http.post('/plusHitNota', {id:$scope.nota}).then(function(h){
	}, function(err){
		console.error(err);
	});
	
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
	
	//Obtener todos los baner que rotaran en la parte inferior
	$http.get('banners/'+'BannerNota').then(function(response){
		$scope.slidesBan = response.data;
		console.log($scope.slidesBan);
	},function(response){
		console.error(response);
	});

	//Manipulación de los elementos del slider1
	$scope.currentIndexBan = 0;
    $scope.setCurrentSlideIndexBan = function (index) {
        $scope.currentIndexBan = index;
    };
    $scope.isCurrentSlideIndexBan = function (index) {
        return $scope.currentIndexBan === index;
    };
	$scope.prevSlideBan = function () {
        $scope.currentIndexBan = ($scope.currentIndexBan < $scope.slidesBan.length - 1) ? ++$scope.currentIndexBan : 0;
    };
    $scope.nextSlideBan = function () {
        $scope.currentIndexBan = ($scope.currentIndexBan > 0) ? --$scope.currentIndexBan : $scope.slidesBan.length - 1;
		$timeout($scope.nextSlideBan, INTERVAL);
    };
	
	function loadSlidesBan() {
		$timeout($scope.nextSlideBan, INTERVAL);
	}
	
	loadSlidesBan();
	/********************************GET PARA NOTAS AL MOMENTO******************************/
	$http.get('/almom/'+'9').then(function(almomento){
		$scope.almomento=almomento.data;
	}, function(err){
		console.error(err);
	});
	
	/***************************GET PARA SECCION MAS DESTACADO****************************/
	$http.get('/masDestacados').then(function(destacados){
		$scope.destacados=destacados.data;
	},function(err){
		console.error("ERROR EN MAS DESTACADOS");
	});
	
	
	
	function pinta(seccion){
		switch($scope.sec){
			case 'Local':
				$scope.backColor={'background-color':'#327188',
								 'border-color':'#327188'};
				break;
			case 'Seguridad':
				$scope.backColor={'background-color':'#680e3b',
								 'border-color':'#680e3b'};
				break;
			case 'Nacional':
				$scope.backColor={'background-color':'#49577d',
								 'border-color':'#49577d'};
				break;
			case 'Internacional':
				$scope.backColor={'background-color':'#194672',
								 'border-color':'#194672'};
				break;
			case 'Espectaculos':
			case 'Espectáculos':
				$scope.backColor={'background-color':'#701e75',
								 'border-color':'#701e75'};
				break;
			case 'Deportes':
				$scope.backColor={'background-color':'#2f78b7',
								 'border-color':'#2f78b7'};
				break;
			case 'Negocios':
				$scope.backColor={'background-color':'#8a7b36',
								 'border-color':'#8a7b36'};
				break;
			case 'Estados':
				$scope.backColor={'background-color':'#6d6d6d',
								 'border-color':'#6d6d6d'};
				break;
			case 'Actualidad':
				$scope.backColor={'background-color':'#c77837',
								 'border-color':'#c77837'};
				break;
		}
	}

	$scope.goto=function(){
		$location.hash('notas');
		$anchorScroll();
	};
	
	$scope.pageId=$scope.nota;

	$scope.getURL=function(ruta){
		return $sce.trustAsResourceUrl('images/multimedia/'+ruta);
	};

	///***************GETS PARA LA SECCIONES DE NOTICIAS*************/
	//$http.get('/esNoticia').then(function(notas){
	//	$scope.esNoticia=notas.data;
	//},function(response){
	//	console.error("ERROR BASE DE DATOS ES NOTICIA");
	//});

	var animationsEnabled=true;

	$scope.open=function(){
		var modalInstance = $uibModal.open({
	      animation: animationsEnabled,
	      ariaLabelledBy: 'modal-title',
	      ariaDescribedBy: 'modal-body',
	      templateUrl: 'myModalContent.html',
	      controller: 'ModalInstanceCtrl',
	      size:'lg',
	      resolve:{image: function(){
	      		return $scope.completo.imagen.imagenMain;
	      }}
	    });
	};
})
.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, image) {
  $scope.imagen=image;
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});