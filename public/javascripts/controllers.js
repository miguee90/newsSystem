angular.module('globalmediaApp', ['ui.router','uiRouterStyles','angulartics', 'angulartics.google.analytics','bootstrap.fileField','angularSoundManager','ngFileUpload','ngAnimate','vjs.video','slick','ngtweet','uiGmapgoogle-maps','checklist-model','textAngular','ngTouch','ui.bootstrap','ngTable'])
.run(function($rootScope, $templateCache){
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.8";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		//$rootScope.$on('$viewContentLoaded', function() {
	    //	$templateCache.removeAll();
	   	//});
})
.config(function($locationProvider, $stateProvider,$urlRouterProvider, uiGmapGoogleMapApiProvider){

	$locationProvider.hashPrefix('!');

	uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyC2AGHp6mZxpxu0bhv_11pX7cV2zhWbIXE',
			//v: '3.X', //defaults to latest 3.X anyhow
			libraries: 'weather,geometry,visualization'
		});
	
	$stateProvider.
	state('/',{
		url: '/',
		templateUrl: 'views/main/main.ejs',
		controller: 'mainCtrl',
		data: {
			css: 'stylesheets/main/main.css'
		}
	})
	.state('login',{
		controller: 'loginCtrl',
		url: '/login',
		templateUrl: 'views/login.ejs',
		data: {
			css: 'stylesheets/login/login.css'
		}
	})
	.state('adminBanner',{
		controller: 'bannerCtrl',
		url: '/administraBanners',
		templateUrl: 'views/adminBanner/adminBanner.ejs',
		data: {
			css: 'stylesheets/adminBanner/adminBanner.css'
		}
	})
	.state('SanLuis',{
		controller: 'sanluisCtrl',
		url: '/SanLuis',
		templateUrl: 'views/sanluis/sanluis.ejs',
		data: {
			css: 'stylesheets/sanluis/sanluis.css'
		}
	})
	.state('Seguridad',{
		controller: 'seguridadCtrl',
		url: '/Seguridad',
		templateUrl: 'views/seguridad/seguridad.ejs',
		data: {
			css: 'stylesheets/seguridad/seguridad.css'
		}
	})
	.state('Nacional',{
		controller: 'nacionalCtrl',
		url: '/Nacional',
		templateUrl: 'views/nacional/nacional.ejs',
		data: {
			css: 'stylesheets/nacional/nacional.css'
		}
	})
	.state('Internacional',{
		controller: 'internacionalCtrl',
		url: '/Internacional',
		templateUrl: 'views/internacional/internacional.ejs',
		data: {
			css: 'stylesheets/internacional/internacional.css'
		}
	})
	.state('Farandula',{
		controller: 'farandulaCtrl',
		url: '/Farandula',
		templateUrl: 'views/farandula/farandula.ejs',
		data: {
			css: 'stylesheets/farandula/farandula.css'
		}
	})
	.state('Tactica',{
		controller: 'tacticaCtrl',
		url: '/Tactica',
		templateUrl: 'views/tactica/tactica.ejs',
		data: {
			css: 'stylesheets/tactica/tactica.css'
		}
	})
	.state('Negocios',{
		controller: 'negociosCtrl',
		url: '/Negocios',
		templateUrl: 'views/negocios/negocios.ejs',
		data: {
			css: 'stylesheets/negocios/negocios.css'
		}
	})
	.state('Estados',{
		controller: 'estadosCtrl',
		url: '/Estados',
		templateUrl: 'views/estados/estados.ejs',
		data: {
			css: 'stylesheets/estados/estados.css'
		}
	})
	.state('Actualidad',{
		controller: 'actualidadCtrl',
		url: '/Actualidad',
		templateUrl: 'views/actualidad/actualidad.ejs',
		data: {
			css: 'stylesheets/actualidad/actualidad.css'
		}
	})
	.state('ViveCanal',{
		controller: 'vivecanalCtrl',
		url: '/ViveCanal',
		templateUrl: 'views/vivecanal/vivecanal.ejs',
		data: {
			css: 'stylesheets/vivecanal/vivecanal.css'
		}
	})
	.state('InvestigacionEspecial',{
		controller: 'investigacionEspecialCtrl',
		url: '/InvestigacionEspecial',
		templateUrl: 'views/investigacionEspecial/investigacionEspecial.ejs',
		data: {
			css: 'stylesheets/investigacionEspecial/investigacionEspecial.css'
		}
	})
	.state('busqueda',{
		controller: 'busquedaCtrl',
		url: '/Busqueda/:id/:pag',
		templateUrl: 'views/busqueda/busqueda.ejs',
		data: {
			css: 'stylesheets/busqueda/busqueda.css'
		}
	})
	.state('Denuncia',{
		controller: 'denunciaCtrl',
		url: '/Denuncia',
		templateUrl: 'views/denuncia/denuncia.ejs',
		data: {
			css: 'stylesheets/denuncia/denuncia.css'
		}
	})
	.state('Trafico',{
		controller: 'traficoCtrl',
		url: '/TraficoSanLuis',
		templateUrl: 'views/trafico/trafico.ejs',
		data: {
			css: 'stylesheets/trafico/trafico.css'
		}
	})
	.state('Trafico.Mapa',{
		url: '/Mapa',
		templateUrl: 'views/trafico/trafico.mapa.ejs'
	})
	.state('Trafico.Mosaico',{
		url: '/Mosaico',
		templateUrl: 'views/trafico/trafico.mosaico.ejs'
	})
	.state('Trafico.Reproduce',{
		url: '/EnVivo/:id',
		controller: 'playCtrl',
		templateUrl: 'views/trafico/trafico.reproduce.ejs'
	})
	.state('Acercade',{
		controller: 'acercadeCtrl',
		url: '/AcercaDe',
		templateUrl: 'views/acercade/acercade.ejs',
		data: {
			css: 'stylesheets/acercade/acercade.css'
		}
	})
	.state('noticia',{
		controller: 'noticiaCtrl',
		url: '/Nota/:id',
		templateUrl: 'views/noticia/noticia.ejs',
		data: {
			css: 'stylesheets/noticia/noticia.css'
		}
	})
	.state('noticiaId',{
		controller: 'noticiaIdCtrl',
		url: '/Nota/:id/:alias',
		templateUrl: 'views/noticiaId/noticiaId.ejs',
		data: {
			css: 'stylesheets/noticiaId/noticiaId.css'
		}
	})
	.state('colaboradores',{
		controller: 'colaboradoresCtrl',
		url: '/Colaboradores/:id',
		templateUrl: 'views/colaboradores/colaboradores.ejs',
		data: {
			css: 'stylesheets/colaboradores/colaboradores.css'
		}
	})
	.state('pop',{
		controller: 'popCtrl',
		url: '/rmx',
		templateUrl: 'views/radio/pop.ejs',
		data: {
			css: 'stylesheets/radio/pop.css'
		}
	})
	.state('los40',{
		controller: 'losCtrl',
		url: '/los40',
		templateUrl: 'views/radio/los40.ejs',
		data: {
			css: 'stylesheets/radio/los40.css'
		}
	})
	.state('formula',{
		controller: 'formulaCtrl',
		url: '/RadioFormula',
		templateUrl: 'views/radio/formula.ejs',
		data: {
			css: 'stylesheets/radio/formula.css'
		}
	})
	.state('hundred',{
		controller: 'hundredCtrl',
		url: '/wfm',
		templateUrl: 'views/radio/hundred.ejs',
		data: {
			css: 'stylesheets/radio/hundred.css'
		}
	})
	.state('kebuena',{
		controller: 'kebuenaCtrl',
		url: '/KeBuena',
		templateUrl: 'views/radio/kebuena.ejs',
		data: {
			css: 'stylesheets/radio/kebuena.css'
		}
	})
	.state('imagen',{
		controller: 'imagenCtrl',
		url: '/Imagen',
		templateUrl: 'views/radio/imagen.ejs',
		data: {
			css: 'stylesheets/radio/imagen.css'
		}
	})
	.state('dashboard',{
		controller: 'panelCtrl',
		url: '/panelControl',
		templateUrl: 'views/dashboard.ejs',
		data: {
			css: 'stylesheets/dashboard.css'
		}
	})
	.state('noticias',{
		controller: 'noticiasCtrl',
		url: '/altaNoticias',
		templateUrl: 'views/interno/noticias.ejs',
		data: {
			css: 'stylesheets/interno/noticias.css'
		}
	})
	.state('noticieros',{
		controller: 'noticierosCtrl',
		url: '/Noticieros',
		templateUrl: 'views/noticieros/noticieros.ejs',
		data: {
			css: 'stylesheets/noticieros/noticieros.css'
		}
	})
	.state('videoDenuncia',{
		controller: 'videoDenunciaCtrl',
		url: '/altaDenuncia',
		templateUrl: 'views/interno/videoDenuncia.ejs',
		data: {
			css: 'stylesheets/interno/videoDenuncia.css'
		}
	})
	.state('potcast',{
		controller: 'potcastCtrl',
		url: '/altaPotcast',
		templateUrl: 'views/potcast/potcast.ejs',
		data: {
			css: 'stylesheets/potcast/potcast.css'
		}
	})
	.state('sishits',{
		controller: 'sishitsCtrl',
		url: '/sishits',
		templateUrl: 'views/interno/sishits.ejs',
		data: {
			css: 'stylesheets/interno/sishits.css'
		}
	})
	.state('controlesRemotos',{
		controller: 'controlesCtrl',
		url: '/controlesRemotos',
		templateUrl: 'views/interno/controles.ejs',
		data: {
			css: 'stylesheets/interno/controles.css'
		}
	})
	.state('altaUsuario',{
		controller: 'altaUsuarioCtrl',
		url: '/altaUsuarios',
		templateUrl: 'views/interno/altaUsuario.ejs',
		data: {
			css: 'stylesheets/interno/altaUsuario.css'
		}
	});
	
	$urlRouterProvider.otherwise('/');
})
.controller('panelCtrl',function($scope,$http,$state){
	var usuario={};
	$scope.modulos=[];
	
	//Pregunta si el usuario esta loggeado
	$http.get("/loggedIn")
        .success(function (data, status) {
			$scope.nombre=data.nombreCompleto;
			usuario=data;
			$http.get('/permisos', {params: {user: usuario._id}})
			.success(function (data, status) {
				$scope.modulos=data;
			})
			.error(function (data) {
				
			});
      	})
        .error(function (data) {
			$state.go('login');
      });
	
	//Funcion que elimina la variable de sesion para cerrar sesion
	$scope.logout=function(){
			$http.get("/logout")
				.success(function (data, status) {
					$state.go('login');
				})
				.error(function (data) {
					$state.go('login');
			});
	};
})
.controller('bannerCtrl',function($scope,$http,$state, Upload,$window){
	var usuario={};
	var banerSel={};
	$scope.formNuevoB=false;
	$scope.formNuevoG=false;
	$scope.formList=false;
	$scope.arrayBanners=[];
	$scope.screenHeight={'height': String($window.innerHeight-100)+'px'};
	
	//Pregunta si el usuario esta loggeado
	$http.get("/loggedIn")
        .success(function (data, status) {
			$scope.nombre=data.nombreCompleto;
			usuario=data;
      	})
        .error(function (data) {
			$state.go('login');
      });
	
	//Funcion que elimina la variable de sesion para cerrar sesion
	$scope.logout=function(){
			$http.get("/logout")
				.success(function (data, status) {
					$state.go('login');
				})
				.error(function (data) {
					$state.go('login');
			});
	};
	
	$scope.elegido=function(ban){
		banerSel=ban;
		console.log(banerSel);
	};
	
	$scope.elimina=function(){
		console.info("ENTRO A ELIMINAR");
		$http.delete('/eliminaBanner/'+banerSel._id)
			.then(function(response){
				$scope.formList=false;
			},function(response){
				alert("No se pudo eliminar");
			});
	};
	
	//Funcion que llama el formulario para un banner nuevo
	$scope.nuevoB=function(){
		$scope.formNuevoB=true;	
		$scope.formNuevoG=false;
		$scope.formList=false;
		//Llena de grupos el select input
		$http.get("/grupos")
			.success(function (data, status) {
				 $scope.data = {
					availableOptions: data,
					selectedOption: {_id: 0, group_name: 'Selecciona un grupo'}
				};
			})
			.error(function (data) {
				console.error("Error con base de datos tabla grupos");
		 	 });
	};
	
	//Funcion que llama el formulario para nuevo grupo
	$scope.nuevoG=function(){
		$scope.formNuevoG=true;
		$scope.formNuevoB=false;
		$scope.formList=false;
	};
	
	//Funcion que llama la vista de los banners
	$scope.listB=function(){
		$scope.formNuevoG=false;
		$scope.formNuevoB=false;
		$scope.formList=true;
		
		//Llena de grupos el select input
		$http.get("/banners")
			.success(function (data, status) {
				console.log(data);
				$scope.arrayBanners=data;
			})
			.error(function (data) {
				alert("Error con base de datos");
		 	 });
	};
	
	$scope.watch=function(ruta){
		$scope.imagenPago=ruta.substr(6);
		console.log($scope.imagenPago);
		$scope.galeria=true;
	}
	
	$scope.closeGalerie=function(){
		$scope.galeria=false;
	}
	
	//Funcion que se ejecuta cuando se dispone a subir un banner
	$scope.subeBanner=function(formulario){
		console.log(formulario.selectGroup.$viewValue.group_name);
		console.log(formulario.selectGroup.$viewValue);
		console.log($scope.data);
		// check to make sure the form is completely valid
		if (formulario.$valid) {
			Upload.upload({
			  	url: '/upload',
			  	data: {file: formulario.uploadFile.$viewValue, nombreBanner: formulario.nombreB.$viewValue,
					   enlace: formulario.link.$viewValue, grupo: formulario.selectGroup.$viewValue.group_name, 
					   tags: formulario.tags.$viewValue, fechaIni: formulario.fecha_ini.$viewValue, 
					   fechaFin: formulario.fecha_fin.$viewValue, tipo: formulario.selTipo.$viewValue,
					  alto: formulario.alto.$viewValue, ancho: formulario.ancho.$viewValue }
			}).then(function (response) {
				console.info(response);
				$scope.formNuevoB=false;
				$scope.tituloModal="Banner cargado";
				$scope.mensajeModal="El banner se ha cargado exitosamente";
				
			}, function (response) {
			  if (response.status > 0)
				$scope.errorMsg = response.status + ': ' + response.data;
				$scope.tituloModal="Error";
				$scope.mensajeModal="Ocurrió un error en la carga del banner";
			}, function (evt) {
			  // Math.min is to fix IE which reports 200% sometimes
			  $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
		}
	};
	
	//Funcion que se ejecuta cuando se dispone a subir un grupo
	$scope.subeGrupo=function(formulario){
		// check to make sure the form is completely valid
		if (formulario.$valid) {
			var data= {group_name: formulario.nombreG.$viewValue, 
					   description: formulario.desc.$viewValue, 
					   date_e: formulario.fecha_finG.$viewValue,
					  group_height: formulario.altoG.$viewValue, group_width: formulario.anchoG.$viewValue, standard:1 };
			
			$http.post('/uploadGroup',data).then(function(response){
				console.log(response);
				$scope.formNuevoG=false;
				$scope.tituloModal="Grupo nuevo cargado";
				$scope.mensajeModal="El nuevo grupo se ha dado de alta exitosamente";
			}, function(error){
				console.log(error);
				$scope.tituloModal="Error";
				$scope.mensajeModal="Ocurrió un error en la carga del grupo";
			});
			
		}
	};	
})
.controller('mainController',function($scope,$http,$state){
	var meses=["ENERO","FEBRERO", "MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
	var date=new Date();
	$scope.fecha={dia: date.getDate(), mes: meses[date.getMonth()], ano: date.getYear(),hora: date.getHours(),minutos:date.getMinutes()};
	var hora=date.getHours();
	$scope.horaP=date.getHours()+4;
	var minutos=date.getMinutes();
	$scope.seo = {
		pageTitle : 'GlobalMedia La red de noticias en San Luis Potosí #SaberEsPoder',
		pageDescription: 'Noticias de San Luis Potosí. Últimas noticias locales, nacionales e internacionales.',
		keyword:'noticias san luis, san luis potosi, ultimas noticias san luis, noticias san luis hoy, slp hoy, slp clima, clima san luis, san luis potosi clima, noticias san luis, Erika Salgado',
		imagen: 'images/common/logo-face.jpg',
		url:'',
		type: 'website'
	}; 
	$scope.find=function(obj){
		$state.go('busqueda',{id:obj.id, pag:1});
	};

	$scope.boletin=false;

	$scope.suscribe=function(){
		$scope.boletin=true;
	};

	$scope.cierra=function(){
		$scope.boletin=false;
	};
	

	//Obtiene los datos del clima
	$http.get('http://api.openweathermap.org/data/2.5/forecast?q=SanLuisPotosi,MX&units=metric&lang=es&APPID=274ae23cbc63fbd1459f858b29a5e0a7')
	.then(function(response){
		$scope.pronostico={};
		$scope.pronostico.temp=Math.trunc(response.data.list[1].main.temp);
	}, function(response){
		console.error("Error no se puede obtener el clima");
	});

	//Obtiene los datos del clima
	$http.get('http://api.openweathermap.org/data/2.5/weather?q=SanLuisPotosi,MX&units=metric&lang=es&APPID=274ae23cbc63fbd1459f858b29a5e0a7')
	.then(function(response){
		console.log(response);
		$scope.clima={};
		$scope.clima.temp=Math.trunc(response.data.main.temp);
		$scope.clima.desc=response.data.weather[0].description;
		console.log($scope.clima);
	}, function(response){
		console.error("Error no se puede obtener el clima");
	});

	//OBTIENE TIPOS DE CAMBIO
	$http.get('http://api.fixer.io/latest')
	.then(function(response){
		$scope.euro=response.data.rates.MXN;
	}, function(response){
		console.error("Error no se puede obtener el clima");
	});

	$http.get('http://api.fixer.io/latest?base=USD')
	.then(function(response){
		$scope.dolar=response.data.rates.MXN;
	}, function(response){
		console.error("Error no se puede obtener el clima");
	});
})
.controller('loginCtrl',function($scope,$http,$state){
	$scope.mensaje="";
	
	$scope.login=function(){
		var user={username:$scope.username,password:$scope.password};
		console.log(user);
		$http.post("/login", user)
        .success(function (data, status) {
          console.info('Successful login.');
          $state.go('dashboard'); // 
      	})
        .error(function (data) {
			console.error(data);
         	$scope.mensaje="Usuario y/o contraseña invalidos."
      });
	};
});