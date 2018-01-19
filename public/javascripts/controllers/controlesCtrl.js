angular.module('globalmediaApp').controller('controlesCtrl', function ($scope,$timeout,$http, $window, $state, Upload, NgTableParams) {
	var usuario={};
	var banerSel={};
	var tags=[];
	var editar={};
	$scope.formNuevoB=false;
	$scope.formNuevoG=false;
	$scope.formList=false;
	$scope.arrayBanners=[];
	$scope.screenHeight={'height': String($window.innerHeight-100)+'px','width': String($window.innerWidth-200)+'px'};
	$scope.mods=[];
	$scope.apro={};
	$scope.apro.aprobo={};
	$scope.aproE={};
	$scope.aproE.aprobo={};
	$scope.tipoNota={};
	$scope.tipoNota.tei="";
	$scope.tipoNotaE={};
	$scope.tipoNotaE.tei="";
	$scope.exclusiva={};
	$scope.exclusiva.checked=false;
	$scope.exclusivaE={};
	$scope.exclusivaE.checked=false;
	$scope.formEdita={};
	$scope.notaEditar={};
	$scope.botReg=false;
	$scope.botReg2=false;
	$scope.botRea=false;
	var auxForm={};
	var auxForm2={};

	$scope.checkFecha=true;
	$scope.checkCliente=true;
	$scope.checkEvento=true;
	$scope.checkDireccion=true;
	$scope.checkEstacion=true;
	$scope.checkLocutor=true;
	$scope.checkUnidad=true;
	$scope.checkTecnicos=true;
	$scope.checkContrato=true;
	$scope.checkEstado=true;
	$scope.checkObser=true;
	$scope.checkAgente=true;
	$scope.checkHojad=true;


	$scope.sortType     = 'id'; // set the default sort type
  	$scope.sortReverse  = true;  // set the default sort order

	$scope.maxSize = 4;
	$scope.bigCurrentPage = 1;

	$scope.fecha={};
	$scope.fecha.inicio="";
	$scope.fecha.fin="";

	$scope.popup1 = {
		opened: false
	};

	$scope.popup2 = {
		opened: false
	};

	//***************************HORA******************************
	$scope.hora_ini = new Date();
	$scope.hora_fin = new Date();

	$scope.hstep = 1;
	$scope.mstep = 1;

	$scope.options = {
	    hstep: [1, 2, 3],
	    mstep: [1, 5, 10, 15, 25, 30]
	};

	$scope.ismeridian = true;
	$scope.toggleMode = function() {
	    $scope.ismeridian = ! $scope.ismeridian;
	};

	$scope.changed = function (hora) {
		$scope.hora_ini=hora;
	};
	$scope.changed2 = function (hora) {
		$scope.hora_fin=hora;
	};

	$scope.clear = function() {
	    $scope.hora = null;
	};

	$scope.open1 = function() {
		$scope.popup1.opened = true;
	};

	$scope.open2 = function() {
		$scope.popup2.opened = true;
	};


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
		editar=ban;
	};
	
	$scope.elimina=function(){
		$http.put('/updateControlC',editar)
			.then(function(response){
				$scope.formNuevoG=false;
				$scope.formNuevoB=false;
				$scope.bandEdita=false;
				$scope.formList=false;
			},function(response){
				console.error(response);
			});
	};
	
	//Funcion que llama el formulario para una nota nueva
	$scope.nuevaN=function(){
		$scope.formNuevoG=false;
		$scope.formList=false;
		$scope.bandEdita=false;
		$scope.formNuevoB=true;	

		$scope.tag1="";
		$scope.tag2="";
		$scope.tag3="";
		$scope.tag4="";
		$scope.tag5="";

		$scope.fecha_ini="";
		$scope.fecha_fin="";
		$scope.pos="";
		$scope.aproE.aprobo="";
		$scope.titulo="";
		$scope.resumen="";
		$scope.htmlVariable="";
		$scope.tipoNotaE.tei="";
		$scope.exclusivaE.checked=false;

		//Llena de grupos el select input
		$http.get("/estaciones")
			.success(function (data, status) {
				console.log(data);
				 $scope.datos = {
					availableOptions: data,
					selectedOption: {idEstados: 0, group_name: 'Selecciona estado'}
				};
			})
			.error(function (data) {
				console.error("Error con base de datos tabla grupos");
			 });

		$http.get('/unidades').then(function(data){
			$scope.dats = {
					availableOptions: data.data,
					selectedOption: {_id: 0, group_name: 'Selecciona una unidad'}
			}
		}, function(err){
			console.error(err);
		});
		
		$http.get('/aprobadores').then(function(data){
			$scope.datsAp = {
					availableOptions: data.data,
					selectedOption: {_id: 0, group_name: 'Selecciona una sección'}
			}
		},function(err){
			console.error(err);
		});

		$http.get('/personal').then(function(data){
			$scope.datsAu = {
					availableOptions: data.data,
					selectedOption: {_id: 0, nombreCompleto: 'Selecciona una sección'}
			}
		}, function(err){
			console.error(err);
		});

		$http.get('/status').then(function(data){
			$scope.datsS = {
					availableOptions: data.data,
					selectedOption: {_id: 0, nombreCompleto: 'Selecciona una sección'}
			}
		}, function(err){
			console.error(err);
		});
	};
	
	$scope.filtrar=function(ini, fin){
		var fecha={inicio:ini, fin: fin};

		if(ini==undefined || fin == undefined){
			$window.alert("Llena los dos campos de fecha");
		}else{
			console.log(fecha);
			$http.get('/rangoControles', {params: fecha}).then(function(data){
				$scope.arrayNotas=data.data;
				$scope.bigTotalItems = 1;
			}, function(err){

			});
		}
	};

	//Funcion que llama la vista de las noticias
	$scope.listN=function(){
		$scope.formNuevoG=false;
		$scope.formNuevoB=false;
		$scope.bandEdita=false;
		$scope.formList=true;
		
		//Llena de controles la lista
		$http.get("/controles/"+1)
			.success(function (data, status) {
				$scope.arrayNotas=data.array;
				$scope.bigTotalItems = data.total/10;
			})
			.error(function (data) {
				console.error("Error con base de datos");
		 	 });
		
		var datos = [{name: "Moroni", age: 50},{name: "oni", age: 5},{name: "roni", age: 500},{name: "oroni", age: 52}];
		$scope.tableParams = new NgTableParams({}, { dataset: datos});
	};

	$scope.unidades=function(num){
		switch(num){
			case 1:
				return "96.9 movil";
			break;
			case 2:
				return "105.7 Movil";
			break;
			case 4:
				return "LED 1";
			break;
			case 5:
				return "LED 2";
			break;
		}
	};

	$scope.status=function(num){
		switch(num){
			case 1:
				return "Por realizar";
			break;
			case 2:
				return "Realizado";
			break;
			case 3:
				return "Cancelado";
			break;
		}
	};

	$scope.esta=function(num){
		switch(num){
			case 1:
				return "XHOD";
			break;
			case 2:
				return "XHPM";
			break;
			case 3:
				return "XHEPO";
			break;
			case 5:
				return "XHBM";
			break;
			case 9:
				return "XHSMR";
			break;
		}
	};

	$scope.cambiaPag=function(num){
		console.log(num);
		$http.get("/controles/"+num)
		.success(function (data, status) {
				$scope.arrayNotas=data.array;
			})
			.error(function (data) {
				console.error("Error con base de datos");
		 	 });
	};

	$scope.watch=function(control){
		$scope.botRea=true;
		$scope.tituloModal="Aviso";
		$scope.mensajeModal="¿Desas cambiar el estado a Realizado?";
		$scope.enlace="";
		editar=control;
		console.log(editar);
	}

	$scope.realiza=function(){
		$http.put('/updateControlR',editar).then(function(actu){
			console.log(actu);
			botRea=false;
			$scope.formNuevoG=false;
			$scope.formNuevoB=false;
			$scope.bandEdita=false;
			$scope.formList=false;
		},function(err){
			console.error(err);
		});
	};

	//Funcion que se ejecuta cuando se dispone a subir un banner
	$scope.registra=function(){

		var formulario=auxForm;
		// check to make sure the form is completely valid
		if (formulario.$valid) {
			//Data sin audio ni galeria

			var hi=$scope.hora_ini.toLocaleTimeString();
			var hf=$scope.hora_fin.toLocaleTimeString();
			var hojadatos=Number(formulario.hojad.$viewValue);

			console.log(formulario);
			var data= {dia: formulario.fecha.$viewValue,
					  horainicio: hi, 
					  horafin: hf,
					  cliente: formulario.cliente.$viewValue,
					  evento:formulario.evento.$viewValue,
					  direccion: formulario.direccion.$viewValue,
					  estacion: formulario.estaciones.$viewValue.id,
					  locutor:formulario.locutor.$viewValue,
					  unidad:formulario.unidades.$viewValue.id,
					  tecnico: formulario.tecnico.$viewValue.id,
					  contrato: formulario.contrato.$viewValue,
					  estado: formulario.status.$viewValue.id,
					  contacto: formulario.contacto.$viewValue,
					  observaciones: formulario.observaciones.$viewValue,
					  agenteventas: formulario.agente.$viewValue,
					  hojadatos: hojadatos,
					  times: 1
			};
			
			$http.post('/uploadControl', data).then(function (response) {
				$scope.formNuevoB=false;
				$scope.tituloModal="Control cargado!";
				$scope.mensajeModal="El nuevo control se ha cargado exitosamente";
				$scope.enlace="";
				$scope.botReg=false;
			}, function (response) {
				console.error(response);
			  if (response.status > 0)
				$scope.errorMsg = response.status + ': ' + response.data;

				if(response.data[0]=="E")
				{
					$scope.tituloModal="Error";
					$scope.enlace="";
					$scope.mensajeModal=response.status + ': ' + response.data;
				}
			});
		}
		else{
			$scope.tituloModal="Error";
			$scope.mensajeModal="Llena todos los campos correctamente";
		}
	};

	//Funcion que se ejecuta cuando se dispone a subir un banner
	$scope.subeNota=function(formulario){
		// check to make sure the form is completely valid
		if (formulario.$valid) {
			//Data sin audio ni galeria
			auxForm=formulario;
			var hi=$scope.hora_ini.toLocaleTimeString();
			var hf=$scope.hora_fin.toLocaleTimeString();
			var hojadatos=Number(formulario.hojad.$viewValue);

			console.log(formulario);
			var data= {dia: formulario.fecha.$viewValue,
					  horainicio: hi, 
					  horafin: hf,
					  cliente: formulario.cliente.$viewValue,
					  evento:formulario.evento.$viewValue,
					  direccion: formulario.direccion.$viewValue,
					  estacion: formulario.estaciones.$viewValue.id,
					  locutor:formulario.locutor.$viewValue,
					  unidad:formulario.unidades.$viewValue.id,
					  tecnico: formulario.tecnico.$viewValue.id,
					  contrato: formulario.contrato.$viewValue,
					  estado: formulario.status.$viewValue.id,
					  contacto: formulario.contacto.$viewValue,
					  observaciones: formulario.observaciones.$viewValue,
					  agenteventas: formulario.agente.$viewValue,
					  hojadatos: hojadatos,
					  times:0
			};
			
			console.info(data);

			$http.post('/uploadControl', data).then(function (response) {
				$scope.formNuevoB=false;
				$scope.tituloModal="Control cargado!";
				$scope.mensajeModal="El nuevo control se ha cargado exitosamente";
				$scope.enlace="";
				$scope.botReg=false;
			}, function (response) {
				console.error(response);
			  if (response.status > 0)
				$scope.errorMsg = response.status + ': ' + response.data;

				if(response.data[0]=="E")
				{
					$scope.tituloModal="Error";
					$scope.enlace="";
					$scope.mensajeModal=response.status + ': ' + response.data;
					$scope.botReg=false;
					$scope.botReg2=false;
				}else if(response.data[0]=="A"){
					$scope.tituloModal="Advertencia";
					$scope.mensajeModal=response.status + ': ' + response.data;
					$scope.enlace="¿Quieres registrarlo de todos modos?"
					$scope.botReg=true;
				}
			});
		}
		else{
			$scope.tituloModal="Error";
			$scope.mensajeModal="Llena todos los campos correctamente";
		}
	};

	$scope.editar=function(nota){
		$scope.formNuevoB=false;	
		$scope.formNuevoG=false;
		$scope.formList=false;
		$scope.bandEdita=true;
		editar=nota;

		console.log(nota);
		//Llena de grupos el select input
		$http.get("/estaciones")
		.success(function (data, status) {
			console.log(data);
			 $scope.datos = {
				availableOptions: data,
				selectedOption: {id: nota.estacion}
			};
		})
		.error(function (data) {
			console.error("Error con base de datos tabla grupos");
		 });

		$http.get('/unidades').then(function(data){
			$scope.dats = {
					availableOptions: data.data,
					selectedOption: {id: nota.unidad}
			}
		}, function(err){
			console.error(err);
		});
		
		$http.get('/status').then(function(data){
			$scope.datsS = {
					availableOptions: data.data,
					selectedOption: {id: nota.estado}
			}
		}, function(err){
			console.error(err);
		});

		$scope.fecha=new Date(nota.dia);
		$scope.hora_ini=new Date('01/01/2011 '+nota.horainicio);
		$scope.hora_fin=new Date('01/01/2011 '+nota.horafin);
		$scope.cliente=nota.cliente;
		$scope.evento=nota.evento;
		$scope.direccion=nota.direccion;
		$scope.locutor=nota.locutor;
		$scope.contrato=nota.contrato;
		$scope.contacto=nota.contacto;
		$scope.observaciones=nota.observaciones;
		$scope.agente=nota.agenteventas;
		$scope.hojad=nota.hojadatos.toString();
	};

	//Funcion que se ejecuta cuando se dispone a actualizar una nota
	$scope.actualizaNota=function(formulario){
		console.log(formulario);
		auxForm2=formulario;
		// check to make sure the form is completely valid
		if (formulario.$valid) {
			//Data sin audio ni galeria
			auxForm=formulario;
			var hi=$scope.hora_ini.toLocaleTimeString();
			var hf=$scope.hora_fin.toLocaleTimeString();
			var hojadatos=Number(formulario.hojad.$viewValue);

			var data= {dia: formulario.fecha.$viewValue,
					  horainicio: hi, 
					  horafin: hf,
					  cliente: formulario.cliente.$viewValue,
					  evento:formulario.evento.$viewValue,
					  direccion: formulario.direccion.$viewValue,
					  estacion: formulario.estaciones.$viewValue.id,
					  locutor:formulario.locutor.$viewValue,
					  unidad:formulario.unidades.$viewValue.id,
					  contrato: formulario.contrato.$viewValue,
					  estado: formulario.status.$viewValue.id,
					  contacto: formulario.contacto.$viewValue,
					  observaciones: formulario.observaciones.$viewValue,
					  agenteventas: formulario.agente.$viewValue,
					  hojadatos: hojadatos,
					  times:0,
					  _id:editar._id
			};
			
			console.info(data);

			$http.put('/updateControl', data).then(function (response) {
				$scope.formNuevoB=false;
				$scope.tituloModal="Control actualizado!";
				$scope.mensajeModal="El control se ha actualizado exitosamente";
				$scope.enlace="";
				$scope.botReg=false;
				$scope.botReg2=false;
				$scope.botRea=false;
				$scope.formList=false;
				$scope.bandEdita=false;
			},function(response){
				if (response.status > 0)
					$scope.errorMsg = response.status + ': ' + response.data;

				if(response.data[0]=="E")
				{
					$scope.tituloModal="Error";
					$scope.enlace="";
					$scope.mensajeModal=response.status + ': ' + response.data;
					$scope.botReg=false;
					$scope.botReg2=false;
				}else if(response.data[0]=="A"){
					$scope.tituloModal="Advertencia";
					$scope.mensajeModal=response.status + ': ' + response.data;
					$scope.enlace="¿Quieres registrarlo de todos modos?"
					$scope.botReg2=true;
				}
			});
		}
		else{
			$scope.tituloModal="Error";
			$scope.mensajeModal="Llena todos los campos correctamente";
		}
	};

	$scope.modifica=function(){
		var formulario=auxForm2;
		// check to make sure the form is completely valid
		if (formulario.$valid) {
			//Data sin audio ni galeria
			auxForm=formulario;
			var hi=$scope.hora_ini.toLocaleTimeString();
			var hf=$scope.hora_fin.toLocaleTimeString();
			var hojadatos=Number(formulario.hojad.$viewValue);

			var data= {dia: formulario.fecha.$viewValue,
					  horainicio: hi, 
					  horafin: hf,
					  cliente: formulario.cliente.$viewValue,
					  evento:formulario.evento.$viewValue,
					  direccion: formulario.direccion.$viewValue,
					  estacion: formulario.estaciones.$viewValue.id,
					  locutor:formulario.locutor.$viewValue,
					  unidad:formulario.unidades.$viewValue.id,
					  contrato: formulario.contrato.$viewValue,
					  estado: formulario.status.$viewValue.id,
					  contacto: formulario.contacto.$viewValue,
					  observaciones: formulario.observaciones.$viewValue,
					  agenteventas: formulario.agente.$viewValue,
					  hojadatos: hojadatos,
					  times:1,
					  _id:editar._id
			};
			
			console.info(data);

			$http.put('/updateControl', data).then(function (response) {
				$scope.formNuevoB=false;
				$scope.tituloModal="Control actualizado!";
				$scope.mensajeModal="El control se ha actualizado exitosamente";
				$scope.enlace="";
				$scope.botReg=false;
				$scope.botReg2=false;
				$scope.botRea=false;
			},function(response){
				if (response.status > 0)
					$scope.errorMsg = response.status + ': ' + response.data;

				if(response.data[0]=="E")
				{
					$scope.tituloModal="Error";
					$scope.enlace="";
					$scope.mensajeModal=response.status + ': ' + response.data;
					$scope.botReg=false;
					$scope.botReg2=false;
				}
			});
		}
		else{
			$scope.tituloModal="Error";
			$scope.mensajeModal="Llena todos los campos correctamente";
		}
	};

	$scope.exportaE=function(){
		$('#tablaL').tableExport({type:'excel',escape:'false'});
	}
});