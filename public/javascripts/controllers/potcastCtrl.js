angular.module('globalmediaApp').controller('potcastCtrl', function ($scope,$timeout,$http, $window, $state, Upload) {
	var usuario={};
	var banerSel={};
	var tags=[];
	$scope.formNuevoB=false;
	$scope.formNuevoG=false;
	$scope.formList=false;
	$scope.arrayBanners=[];
	$scope.screenHeight={'height': String($window.innerHeight-100)+'px'};
	$scope.mods=[];
	$scope.notaEditar={};
	$scope.totalItems = 0;	
	
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
	};
	
	$scope.elimina=function(){
		$http.delete('/eliminaVideo/'+banerSel._id)
			.then(function(response){
				console.log(response);
				$scope.formList=false;
			},function(response){
				alert("No se pudo eliminar");
			});
	};
	
	//Funcion que llama el formulario para un video nuevo
	$scope.nuevaN=function(){
		$scope.formNuevoG=false;
		$scope.formList=false;
		$scope.bandEdita=false;
		$scope.formNuevoB=true;	

		$scope.url="";
		$scope.titulo="";
		$scope.resumen="";

	};
	
	//Funcion que llama la vista en lista de los videos
	$scope.listN=function(){
		$scope.formNuevoG=false;
		$scope.formNuevoB=false;
		$scope.bandEdita=false;
		$scope.formList=true;
		
		$scope.maxSize = 4;
		$scope.bigCurrentPage = 1;


		//Llena de notas la lista
		$http.get("/videosDen/1")
			.success(function (data, status) {
				console.log(data);
				$scope.arrayNotas=data.array;
				$scope.totalItems = data.total/10;
			})
			.error(function (data) {
				console.error("Error con base de datos");
		 	 });
	};

	$scope.cambiaPag=function(num){
		$http.get("/videosDen/"+num)
		.success(function (data, status) {
				$scope.arrayNotas=data.array;
			})
			.error(function (data) {
				console.error("Error con base de datos");
		 	 });
	}
	
	//Funcion que se ejecuta cuando se dispone a subir un banner
	$scope.subeNota=function(formulario){
		// check to make sure the form is completely valid
		if (formulario.$valid) {
			//Data sin audio ni galeria
			var data= {titulo: formulario.titulo.$viewValue,
					  resumen:formulario.resumen.$viewValue,
					  url: formulario.url.$viewValue,
					  usuarioCargo: usuario.idUsuario
					  };
			
			console.info(data);
			$http.post('/uploadVideoDenuncia', data).then(function (response) {
				$scope.formNuevoB=false;
				$scope.tituloModal="Video Cargado";
				$scope.mensajeModal="El video se ha guardado exitosamente";
				
			}, function (response) {
			  if (response.status > 0)
				$scope.errorMsg = response.status + ': ' + response.data;
				$scope.tituloModal="Error";
				$scope.mensajeModal="Ocurrió un error en la carga de la nota";
			}, function (evt) {
			  // Math.min is to fix IE which reports 200% sometimes
			  $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
		}
		else{
			$scope.tituloModal="Error";
			$scope.mensajeModal="Llena todos los campos correctamente";
		}
	}
});