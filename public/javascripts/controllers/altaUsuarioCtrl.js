angular.module('globalmediaApp').controller('altaUsuarioCtrl', function ($scope,$timeout,$http, $window, $state) {
	var usuario={};
	var banerSel={};
	$scope.formNuevoB=false;
	$scope.formNuevoG=false;
	$scope.formList=false;
	$scope.arrayBanners=[];
	$scope.screenHeight={'height': String($window.innerHeight-100)+'px'};
	$scope.mods=[];
	
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
	$scope.nuevoU=function(){
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
				alert("Error con base de datos tabla grupos");
		 	 });
		
		$http.get('modulos').then(function(response){
			$scope.modulos=response.data;
			console.log($scope.modulos);
		},function(err){
			console.error(err);
		});
	};
	
	//Funcion que llama la vista de los banners
	$scope.listU=function(){
		$scope.formNuevoG=false;
		$scope.formNuevoB=false;
		$scope.formList=true;
		
		//Llena de grupos el select input
		$http.get("/usuarios")
			.success(function (data, status) {
				$scope.arrayBanners=data;
			})
			.error(function (data) {
				console.error("Error con base de datos");
		 	 });
	};
	
	$scope.watch=function(ruta){
		$scope.imagenPago=ruta.substr(6);
		$scope.galeria=true;
	}
	
	$scope.closeGalerie=function(){
		$scope.galeria=false;
	}
	
	//Funcion que se ejecuta cuando se dispone a subir un banner
	$scope.subeBanner=function(formulario){
		var bandValid=false;
		var stat=false;
		
		if(formulario.status.$viewValue==2){
			stat=true;
		}
		else{
			stat=false;
		}
		if(formulario.pass1.$viewValue==formulario.pass2.$viewValue){
			bandValid=true;
		}
		// check to make sure the form is completely valid
		if (formulario.$valid && bandValid==true) {
			var data= {nombreCompleto: formulario.nombreB.$viewValue, 
					   nombreUsuario: formulario.username.$viewValue, 
					   email: formulario.email.$viewValue,
					  puesto: formulario.puesto.$viewValue, clavex: formulario.pass1.$viewValue, activo:stat, permisos: $scope.mods};
			
			console.log(data);
			
			$http.post('/uploadUser',data).then(function(response){
				console.log(response);
				$scope.formNuevoG=false;
				$scope.tituloModal="Usuario nuevo cargado";
				$scope.mensajeModal="El nuevo usuario se ha dado de alta exitosamente";
			}, function(error){
				console.error(error);
				$scope.tituloModal="Error";
				$scope.mensajeModal="Ocurrió un error en la carga del grupo";
			});
		}
		else{
			$scope.tituloModal="Error";
			$scope.mensajeModal="Verifica que las contraseñas sean iguales";
		}
	};
});