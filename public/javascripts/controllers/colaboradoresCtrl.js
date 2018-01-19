angular.module('globalmediaApp').controller('colaboradoresCtrl', function ($scope,$timeout,$http,$stateParams,$sce) {
	
	/**********ALIAS PRUEBA*************tijeretazo-atrasa-parque-industrial-del-municipio************/
	var INTERVAL = 10000;
	var meses=["ENERO","FEBRERO", "MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
	var date=new Date();
	$scope.fecha={dia: date.getDay(), mes: meses[date.getMonth()], ano: date.getYear(),hora: date.getHours(),minutos:date.getMinutes()};
	$scope.nota=$stateParams.id;
	
	(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.8";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	
	//Obtiene los datos del clima
	$http.get('http://api.openweathermap.org/data/2.5/weather?q=SanLuisPotosi,MX&units=metric&lang=es&APPID=274ae23cbc63fbd1459f858b29a5e0a7')
	.then(function(response){
		$scope.clima={};
		$scope.clima.temp=Math.trunc(response.data.main.temp);
		$scope.clima.desc=response.data.weather[0].description;
	}, function(response){
		alert("Error no se puede obtener el clima");
	});

	$http.post('/plusHitNota', {id:$scope.nota}).then(function(h){
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
	
	/********************************GET PARA NOTAS AL MOMENTO******************************/
	$http.get('/almom/'+'3').then(function(almomento){
		$scope.almomento=almomento.data;
	}, function(err){
		console.log(err);
	});
	
	/***************************GET PARA SECCION MAS DESTACADO****************************/
	$http.get('/masDestacados').then(function(destacados){
		$scope.destacados=destacados.data;
		console.log($scope.destacados);
	},function(err){
		alert("ERROR EN MAS DESTACADOS");
	});
	
	/*LOAD INFO*/
	$http.get('cola/'+$scope.nota).then(function(respuesta){
		$scope.completa=$sce.trustAsHtml(respuesta.data.nota.notaCompleta);
		$scope.completo=respuesta.data;
		$scope.backImage={'background-image' :'URL(../../images/multimedia/' +$scope.completo.imagen.imagenArticulo+')'};
	
		console.log($scope.completo);
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
	
	function pinta(seccion){
		switch($scope.sec){
			case 'Local':
				$scope.backColor={'background-color':'#0f5591',
								 'border-color':'#0f5591'};
				break;
			case 'Seguridad':
				$scope.backColor={'background-color':'#f36523',
								 'border-color':'#f36523'};
				break;
			case 'Nacional':
				$scope.backColor={'background-color':'#0072bb',
								 'border-color':'#0072bb'};
				break;
			case 'Internacional':
				$scope.backColor={'background-color':'#8ec63f',
								 'border-color':'#8ec63f'};
				break;
			case 'Espectaculos':
			case 'Espectáculos':
				$scope.backColor={'background-color':'#ed008c',
								 'border-color':'#ed008c'};
				break;
			case 'Deportes':
				$scope.backColor={'background-color':'#01a89e',
								 'border-color':'#01a89e'};
				break;
			case 'Negocios':
				$scope.backColor={'background-color':'#090d4a',
								 'border-color':'#090d4a'};
				break;
			case 'Estados':
				$scope.backColor={'background-color':'#ff9a00',
								 'border-color':'#ff9a00'};
				break;
			case 'Actualidad':
				$scope.backColor={'background-color':'#00a652',
								 'border-color':'#00a652'};
				break;
		}
	}
	
	$scope.pageId=$scope.nota;
});