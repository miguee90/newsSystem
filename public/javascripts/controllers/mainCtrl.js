angular.module('globalmediaApp').controller('mainCtrl', function ($scope,$timeout,$http,$sce) {
	var INTERVAL = 10000;
	$scope.portada={};
	$scope.destacados=[];
	$scope.almomento=[];
	$scope.formula=true;
	$scope.adetalle=false;
	$scope.reporte=false;
	$scope.noche=false;
	//FORECAST

	$scope.$parent.seo = { 
	    pageTitle : 'GlobalMedia La red de noticias en San Luis Potosí #SaberEsPoder',
		pageDescription: 'Noticias de San Luis Potosí. Últimas noticias locales, nacionales e internacionales.',
		keywords: 'noticias san luis, san luis potosi, ultimas noticias san luis, noticias san luis hoy, slp hoy, slp clima, clima san luis, san luis potosi clima, noticias san luis, Erika Salgado',
		imagen: 'images/common/logo-face.jpg',
		url:'',
		type:'website'
	};

	//DEFINE PROGRAMA EN BARRA PROGRAMATICA
	/*
	if(hora>=6&&hora<10){
		$scope.progFormula={background:'url(images/estaciones/formula/formuladelamanana.jpg)'};
		$scope.progVive={background:'url(images/estaciones/vivecanal/formuladelamañana.jpg)'};
		if(hora>=6&&hora<9){
			$scope.progPop={background:'url(images/estaciones/exa/eldespapaye.jpg)'};
			$scope.progHundred={background:'url(images/estaciones/hundred/porlamañana.jpg)'};
		}
		if(hora>=9&&hora<11)
			$scope.progPop={background:'url(images/estaciones/exa/elevanton2.jpg)'};
	}
	if(hora>=10&&hora<11){
		$scope.progFormula={background:'url(images/estaciones/formula/saludybelleza.jpg)'};
		$scope.progPop={background:'url(images/estaciones/exa/elevanton2.jpg)'};
		$scope.progkebuena={background:'url(images/estaciones/kebuena/kebuenamusica.jpg)'};
	}
	if(hora>=11&&hora<13){
		$scope.progFormula={background:'url(images/estaciones/formula/todoparalamujer.jpg)'};
		//$scope.progHundred={background:'url(images/estaciones/hundred/acceso.jpg)'};
		$scope.progHundred={background:'url(images/estaciones/hundred/hundredprueba.jpg)'};
		$scope.progVive={background:'url(images/estaciones/vivecanal/quetalfernanda.jpg)'};
		if(hora<12)
			$scope.progkebuena={background:'url(images/estaciones/kebuena/kebuenamusica.jpg)'};
		else	
			$scope.progKebuena={background:'url(images/estaciones/kebuena/kebuenamusica2.jpg)'};	
	}
	if(hora>=13&&hora<15){
		$scope.progImagen={background:'url(images/estaciones/imagen/segundaemision.jpg)'};
		if(minutos>=30)
			$scope.progFormula={background:'url(images/estaciones/formula/lopezdoriga.jpg)'};
		if(hora<14){
			$scope.progkebuena={background:'url(images/estaciones/kebuena/kebuenamusica2.jpg)'};
		}
		else{
			$scope.progkebuena={background:'url(images/estaciones/kebuena/kecrees.jpg)'};
			$scope.progVive={background:'url(images/estaciones/vivecanal/reporte.jpg)'};
		}
	}
	if(hora>=15&&hora<16){
		$scope.progkebuena={background:'url(images/estaciones/kebuena/kekumbion.jpg)'};
		$scope.progVive={background:'url(images/estaciones/vivecanal/reporte.jpg)'};
	}
	if(hora>=16&&hora<17){
		$scope.progPop={background:'url(images/estaciones/exa/lasnews.jpg)'};
		$scope.progkebuena={background:'url(images/estaciones/kebuena/kebuenamusica3.jpg)'};
		$scope.progHundred={background:'url(images/estaciones/hundred/interaccion.jpg)'};
	}
	if(hora>=17&&hora<18){
		$scope.progHundred={background:'url(images/estaciones/hundred/interaccion.jpg)'};
		$scope.progPop={background:'url(images/estaciones/exa/lasnews.jpg)'};
		$scope.progFormula={background:'url(images/estaciones/formula/formulaesorvañanos.jpg)'};
		$scope.progkebuena={background:'url(images/estaciones/kebuena/kebuenamusica3.jpg)'};
	}
	if(hora>=18&&hora<20){
		$scope.progFormula={background:'url(images/estaciones/formula/josecardenas.jpg)'};
		$scope.progPop={background:'url(images/estaciones/exa/lougeroom.jpg)'};
		$scope.progkebuena={background:'url(images/estaciones/kebuena/kebuenamusica4.jpg)'};
		$scope.progVive={background:'url(images/estaciones/vivecanal/adetalle.jpg)'};
	}
	if(hora>=20&&hora<21){
		$scope.progPop={background:'url(images/estaciones/exa/nocover.jpg)'};
		$scope.progFormula={background:'url(images/estaciones/formula/formulafinanciera.jpg)'};
		$scope.progkebuena={background:'url(images/estaciones/kebuena/kerodeo.jpg)'};
	}
	if(hora>=21&&hora<22){
		$scope.progkebuena={background:'url(images/estaciones/kebuena/kebuenamusica5.jpg)'};
		$scope.progVive={background:'url(images/estaciones/vivecanal/noticiasdelanoche.jpg)'};
	}
	if(hora>=22&&hora<23){
		$scope.progkebuena={background:'url(images/estaciones/kebuena/kebuenamusica5.jpg)'};
		$scope.progFormula={background:'url(images/estaciones/formula/lamanopeluda.jpg)'};
	}
	if(hora>=23){
		$scope.progkebuena={background:'url(images/estaciones/kebuena/keromantico.jpg)'};
	}
	*/

	/***************************GET PARA SECCION MAS DESTACADO****************************/
	$http.get('/masDestacados').then(function(destacados){
		$scope.destacados=destacados.data;
	},function(err){
		console.error("ERROR EN MAS DESTACADOS");
	});

	//Obtener todos los baner que rotaran en header
	$http.get('banners/'+'Nuevo').then(function(response){
		console.log(response);
		$scope.slidesP = response.data;
	},function(response){
		console.error(response);
	});

	
	/**********************GET PARA SECCION DE PORTADA************************/
	$http.get('/portada').then(function(portada){
		$scope.portada=portada.data;
		console.log($scope.portada);
	},function(response){
		console.error("ERROR CON NOTAS EN PORTADA");
	});

	
	/********************************GET PARA NOTAS AL MOMENTO******************************/
	$http.get('/almom/'+'5').then(function(almomento){
		$scope.almomento=almomento.data;
		console.log($scope.almomento);
	}, function(err){
		console.error("ERROR AL MOMENTO NOTAS");
	});

	//Obtener todos los baner que estaran en la seccion derecha
	$http.get('banners/'+'Banner seccion derecha').then(function(response){
		$scope.slidesD = response.data;
	},function(response){
		console.error("ERROR SLIDERS SECCION DERECHA");
	});

	$timeout(function(){
		///***************GETS PARA LA SECCIONES DE NOTICIAS*************/
		//$http.get('/esNoticia').then(function(notas){
		//	console.log(notas);
		//	$scope.esNoticia=notas.data;
		//},function(response){
		//	console.error("ERROR BASE DE DATOS ES NOTICIA");
		//});
		/***************************GET PARA TACTICA********************************/
		$http.get('/seccion/'+'Deportes').then(function(tactica){
			$scope.tactica=tactica.data;
		}, function(error){
			console.error("ERRO DEPORTES");
		});
		
		
		/***************************GET PARA NACIONAL********************************/
		$http.get('/seccion/'+'Nacional').then(function(tactica){
			$scope.nacional=tactica.data;
		}, function(error){
			console.error("ERRO NACIONAL");
		});
		/***************************GET PARA INTERNACIONAL********************************/
		$http.get('/seccion/'+'Internacional').then(function(tactica){
			$scope.internacional=tactica.data;
		}, function(error){
			console.error("ERRO INTERNACIONAL");
		});
		/***************************GET PARA FARANDULA********************************/
		$http.get('/seccion/'+'Espectaculos').then(function(tactica){
			$scope.farandula=tactica.data;
		}, function(error){
			console.error("ERROR FARANDULA");
		});
		
		/******************************GET PARA EXPERTOS*************************************/
		$http.get('/expertos').then(function(expertos){
			$scope.expertos=expertos.data;
		}, function(err){
			console.error("ERROR EXPERTOS "+err);
		});
		
		//Obtener todos los mini-baner que rotaran en la seccion izquiera
		$http.get('banners/'+'mini-principal').then(function(response){
			$scope.slidesIM = response.data;
		},function(response){
			console.error(response);
		});
		
		$http.get('banners/'+'miniD1').then(function(response){
			$scope.slidesD1 = response.data;
		},function(response){
			console.error(response);
		});
		
		$http.get('banners/'+'miniD2').then(function(response){
			$scope.slidesD2 = response.data;
		},function(response){
			console.error(response);
		});
		
		$http.get('banners/'+'miniD3').then(function(response){
			$scope.slidesD3 = response.data;
		},function(response){
			console.error(response);
		});
		
		$http.get('banners/'+'miniD4').then(function(response){
			$scope.slidesD4 = response.data;
		},function(response){
			console.error(response);
		});
		
		$http.get('banners/'+'bannersMedios').then(function(response){
			$scope.slidesMD = response.data;
		},function(response){
			console.error(response);
		});
		
		$http.get('banners/'+'bannersFull').then(function(response){
			$scope.slideInves = response.data;
		},function(response){
			console.error(response);
		});
		
		$http.get('banners/'+'BannersInferiores').then(function(response){
			$scope.slidesInf = response.data;
		},function(response){
			console.error(response);
		});
		

		/******************************GET PARA VIDEO DE DENUNCIA*******************************/
		$http.get('/denuncia').then(function(video){
			$scope.videoDenuncia=video.data;
			$scope.videoDenuncia.url=$scope.videoDenuncia.url.replace("watch?v=", "v/");
		},function(err){
			console.error(err);
		});
		
		/************************GET PARA NOTAS DE LAS SECCIONES INFERIORES********************/
		/*INTERNACIONAL*/
		$http.get('/notasSeccion/'+'Internacional').then(function(notas){
			console.log(notas.data);
			$scope.notasInternacionalP=notas.data[0];
			$scope.notasInternacional=[];
			$scope.notasInternacional.push(notas.data[1]);
			$scope.notasInternacional.push(notas.data[2]);
			$scope.notasInternacional.push(notas.data[3]);
		},function(err){
			
		});
		/*SEGURIDAD*/
		$http.get('/notasSeccion/'+'Seguridad').then(function(notas){
			$scope.notasSeguridadP=notas.data[0];
			$scope.notasSeguridad=[];
			$scope.notasSeguridad.push(notas.data[1]);
			$scope.notasSeguridad.push(notas.data[2]);
			$scope.notasSeguridad.push(notas.data[3]);
		},function(err){
			
		});
		/*NACIONAL*/
		$http.get('/notasSeccion/'+'Nacional').then(function(notas){
			$scope.notasNacionalP=notas.data[0];
			$scope.notasNacional=[];
			$scope.notasNacional.push(notas.data[1]);
			$scope.notasNacional.push(notas.data[2]);
			$scope.notasNacional.push(notas.data[3]);
		},function(err){
			
		});
		/*DEPORTES*/
		$http.get('/notasSeccion/'+'Deportes').then(function(notas){
			$scope.notasTacticaP=notas.data[0];
			$scope.notasTactica=[];
			$scope.notasTactica.push(notas.data[1]);
			$scope.notasTactica.push(notas.data[2]);
			$scope.notasTactica.push(notas.data[3]);
		},function(err){
			
		});
		/*Negocios*/
		$http.get('/notasSeccion/'+'Negocios').then(function(notas){
			$scope.notasNegociosP=notas.data[0];
			$scope.notasNegocios=[];
			$scope.notasNegocios.push(notas.data[1]);
			$scope.notasNegocios.push(notas.data[2]);
			$scope.notasNegocios.push(notas.data[3]);
		},function(err){
			
		});
		/*Negocios*/
		$http.get('/notasSeccion/'+'Estados').then(function(notas){
			$scope.notasEstadosP=notas.data[0];
			$scope.notasEstados=[];
			$scope.notasEstados.push(notas.data[1]);
			$scope.notasEstados.push(notas.data[2]);
			$scope.notasEstados.push(notas.data[3]);
		},function(err){
			
		});

		/***********************GET CONTROLES PARA SLIDE NOTICIEROS**************************/
		$scope.notasNoche=[];
		$scope.notasReporte=[];
		$scope.notasAdetalle=[];
		$scope.notasFormula=[];
		
		/*PETICIONES PARA NOTAS DE NOTICIEROS*/
		$http.get('/noticieros/'+2).then(function(notas){
			$scope.notasReporte=notas.data;
		}, function(err){
			console.error(err);
		});

		$http.get('/noticieros/'+1).then(function(notas){
			$scope.notasAdetalle=notas.data;
		}, function(err){
			console.error(err);
		});

		$http.get('/noticieros/'+3).then(function(notas){
			$scope.notasFormula=notas.data;
		}, function(err){
			console.error(err);
		});

		$http.get('/noticieros/'+4).then(function(notas){
			$scope.notasNoche=notas.data;
		}, function(err){
			console.error(err);
		});

	},1000);

	$scope.formulaprev=function(){
		$scope.formula=false;
		$scope.adetalle=false;
		$scope.reporte=false;
		$scope.noche=true;		
	};
	$scope.formulanext=function(){
		$scope.formula=false;
		$scope.adetalle=true;
		$scope.reporte=false;
		$scope.noche=false;
	};
	$scope.adetalleprev=function(){
		$scope.formula=true;
		$scope.adetalle=false;
		$scope.reporte=false;
		$scope.noche=false;		
	};
	$scope.adetallenext=function(){
		$scope.formula=false;
		$scope.adetalle=false;
		$scope.reporte=true;
		$scope.noche=false;
	};
	$scope.reporteprev=function(){
		$scope.formula=false;
		$scope.adetalle=true;
		$scope.reporte=false;
		$scope.noche=false;		
	};
	$scope.reportenext=function(){
		$scope.formula=false;
		$scope.adetalle=false;
		$scope.reporte=false;
		$scope.noche=true;
	};
	$scope.nocheprev=function(){
		$scope.formula=false;
		$scope.adetalle=false;
		$scope.reporte=true;
		$scope.noche=false;		
	};
	$scope.nochenext=function(){
		$scope.formula=true;
		$scope.adetalle=false;
		$scope.reporte=false;
		$scope.noche=false;
	};


	//Manipulación de los elementos del slider1
	$scope.currentIndex = 0;
    $scope.setCurrentSlideIndex = function (index) {
        $scope.currentIndex = index;
        console.log($scope.currentIndex);
    };
    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };
	$scope.prevSlide = function () {
        console.log($scope.currentIndex);
    };
    $scope.nextSlide = function () {
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slidesP.length - 1;
		$timeout($scope.nextSlide, INTERVAL);
    };
	
	function loadSlides() {
		$timeout($scope.nextSlide, INTERVAL);
	}
	
	loadSlides();
	
	/************************SLIDER 2******************************/
	//Manipulación de los elementos del slider2
	$scope.currentIndex2 = 0;
    $scope.setCurrentSlideIndex2 = function (index) {
        $scope.currentIndex2 = index;
    };
    $scope.isCurrentSlideIndex2 = function (index) {
        return $scope.currentIndex2 === index;
    };
	$scope.prevSlide2 = function () {
        $scope.currentIndex2 = ($scope.currentIndex2 < $scope.slidesIM.length - 1) ? ++$scope.currentIndex2 : 0;
    };
    $scope.nextSlide2 = function () {
        $scope.currentIndex2 = ($scope.currentIndex2 > 0) ? --$scope.currentIndex2 : $scope.slidesIM.length - 1;
		$timeout($scope.nextSlide2, INTERVAL);
    };
	
	function loadSlides2() {
		$timeout($scope.nextSlide2, INTERVAL);
	}
	
	loadSlides2();
	
	/************************SLIDER MINI1******************************/
	//Manipulación de los elementos del slider2
	$scope.currentIndex3 = 0;
    $scope.setCurrentSlideIndex3 = function (index) {
        $scope.currentIndex3 = index;
    };
    $scope.isCurrentSlideIndex3 = function (index) {
        return $scope.currentIndex3 === index;
    };
	$scope.prevSlide3 = function () {
        $scope.currentIndex3 = ($scope.currentIndex3 < $scope.slidesD1.length - 1) ? ++$scope.currentIndex3 : 0;
    };
    $scope.nextSlide3 = function () {
        $scope.currentIndex3 = ($scope.currentIndex3 > 0) ? --$scope.currentIndex3 : $scope.slidesD1.length - 1;
		$timeout($scope.nextSlide3, INTERVAL);
    };
	
	function loadSlides3() {
		$timeout($scope.nextSlide3, INTERVAL);
	}
	
	loadSlides3();
	
	/************************SLIDER MINI2******************************/
	//Manipulación de los elementos del slider2
	$scope.currentIndex4 = 0;
    $scope.setCurrentSlideIndex4 = function (index) {
        $scope.currentIndex4 = index;
    };
    $scope.isCurrentSlideIndex4 = function (index) {
        return $scope.currentIndex4 === index;
    };
	$scope.prevSlide4 = function () {
        $scope.currentIndex4 = ($scope.currentIndex4 < $scope.slidesD2.length - 1) ? ++$scope.currentIndex4 : 0;
    };
    $scope.nextSlide4 = function () {
        $scope.currentIndex4 = ($scope.currentIndex4 > 0) ? --$scope.currentIndex4 : $scope.slidesD2.length - 1;
		$timeout($scope.nextSlide4, INTERVAL);
    };
	
	function loadSlides4() {
		$timeout($scope.nextSlide4, INTERVAL);
	}
	
	loadSlides4();
	
	/************************SLIDER MINI3******************************/
	//Manipulación de los elementos del slider2
	$scope.currentIndex5 = 0;
    $scope.setCurrentSlideIndex5 = function (index) {
        $scope.currentIndex5 = index;
    };
    $scope.isCurrentSlideIndex5 = function (index) {
        return $scope.currentIndex5 === index;
    };
	$scope.prevSlide5 = function () {
        $scope.currentIndex5 = ($scope.currentIndex5 < $scope.slidesD3.length - 1) ? ++$scope.currentIndex5 : 0;
    };
    $scope.nextSlide5 = function () {
        $scope.currentIndex5 = ($scope.currentIndex5 > 0) ? --$scope.currentIndex5 : $scope.slidesD3.length - 1;
		$timeout($scope.nextSlide5, INTERVAL);
    };
	
	function loadSlides5() {
		$timeout($scope.nextSlide5, INTERVAL);
	}
	
	loadSlides5();
	
	/************************SLIDER MINI4******************************/
	//Manipulación de los elementos del slider2
	$scope.currentIndex6 = 0;
    $scope.setCurrentSlideIndex6 = function (index) {
        $scope.currentIndex6 = index;
    };
    $scope.isCurrentSlideIndex6 = function (index) {
        return $scope.currentIndex6 === index;
    };
	$scope.prevSlide6 = function () {
        $scope.currentIndex6 = ($scope.currentIndex6 < $scope.slidesD4.length - 1) ? ++$scope.currentIndex6 : 0;
    };
    $scope.nextSlide6 = function () {
        $scope.currentIndex6 = ($scope.currentIndex6 > 0) ? --$scope.currentIndex6 : $scope.slidesD4.length - 1;
		$timeout($scope.nextSlide6, INTERVAL);
    };
	
	function loadSlides6() {
		$timeout($scope.nextSlide6, INTERVAL);
	}
	
	loadSlides6();
	
	/************************SLIDER MEDIO1******************************/
	//Manipulación de los elementos del slider
	$scope.currentIndex7 = 0;
    $scope.setCurrentSlideIndex7 = function (index) {
        $scope.currentIndex7 = index;
    };
    $scope.isCurrentSlideIndex7 = function (index) {
        return $scope.currentIndex7 === index;
    };
	$scope.prevSlide7 = function () {
        $scope.currentIndex7 = ($scope.currentIndex7 < $scope.slidesMD.length - 1) ? ++$scope.currentIndex7 : 0;
    };
    $scope.nextSlide7 = function () {
        $scope.currentIndex7 = ($scope.currentIndex7 > 0) ? --$scope.currentIndex7 : $scope.slidesMD.length - 1;
		$timeout($scope.nextSlide7, INTERVAL);
    };
	
	function loadSlides7() {
		$timeout($scope.nextSlide7, INTERVAL);
	}
	
	loadSlides7();
	
	/************************SLIDERS INFERIORES******************************/
	//Manipulación de los elementos del slider
	$scope.currentIndex8 = 0;
    $scope.setCurrentSlideIndex8 = function (index) {
        $scope.currentIndex8 = index;
    };
    $scope.isCurrentSlideIndex8 = function (index) {
        return $scope.currentIndex8 === index;
    };
	$scope.prevSlide8 = function () {
        $scope.currentIndex8 = ($scope.currentIndex8 < $scope.slidesInf.length - 1) ? ++$scope.currentIndex8 : 0;
    };
    $scope.nextSlide8 = function () {
        $scope.currentIndex8 = ($scope.currentIndex8 > 0) ? --$scope.currentIndex8 : $scope.slidesInf.length - 1;
		$timeout($scope.nextSlide8, INTERVAL);
    };
	
	function loadSlides8() {
		$timeout($scope.nextSlide8, INTERVAL);
	}
	
	loadSlides8();
	
	
	
	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	 }
	
	
	
	/******************CONTROLES PARA REPRODUCTOR DE TELE************************************/
	$scope.$on('vjsVideoReady', function (e, data) {
            data.player.on("pause", function () {
				data.player.on("play", function () {
				  data.player.load (); 
				  data.player.off("play");
				});
		  });
        });
})

.animation('.slide-animation', function () {
        return {
            enter: function (element, className, done) {
                   TweenMax.fromTo(element, 1, { opacity: 0}, {opacity: 1});
            },
            leave: function (element, className, done) {
                	TweenMax.to(element, 1, {opacity: 0 });
            }
        };
    });