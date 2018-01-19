angular.module('globalmediaApp').controller('noticiasCtrl', function ($scope,$timeout,$http, $window, $state, Upload) {
	var usuario={};
	var banerSel={};
	var tags=[];
	$scope.formNuevoB=false;
	$scope.formNuevoG=false;
	$scope.formList=false;
	$scope.arrayBanners=[];
	$scope.screenHeight={'height': String($window.innerHeight-100)+'px'};
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
	$scope.noticiero={};
	$scope.noticiero.checked=false;
	$scope.exclusivaE={};
	$scope.exclusivaE.checked=false;
	$scope.momento={};
	$scope.momento.checked=false;
	$scope.portadaSecc={};
	$scope.portadaSecc.checked=false;
	$scope.formEdita={};
	$scope.notaEditar={};
	$scope.hora_inicio = new Date();
	$scope.hora_fin = new Date();
	$scope.hora_inicioE = new Date();
	$scope.hora_finE = new Date();
	$scope.hstep = 1;
  	$scope.mstep = 1;
	
	
	
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
		$http.post('/desactivaNota',banerSel)
			.then(function(response){
				console.log(response);
				$scope.formList=false;
			},function(response){
				alert("No se pudo eliminar");
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
		$scope.noticiero.checked=false;
		$scope.noticie="";

		//Llena de grupos el select input
		$http.get("/estados")
			.success(function (data, status) {
				 $scope.datos = {
					availableOptions: data,
					selectedOption: {_id: '57e453f58768341d48a6d409', group_name: 'San Luis Potosi', idEstados:24}
				};
			})
			.error(function (data) {
				console.error("Error con base de datos tabla grupos");
			 });
		$http.get('/seccs').then(function(data){
			$scope.dats = {
					availableOptions: data.data,
					selectedOption: {_id: 0, group_name: 'Selecciona una sección'}
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

		$http.get('/autores').then(function(data){
			$scope.datsAu = {
					availableOptions: data.data,
					selectedOption: {idUsuario: 0, nombreCompleto: 'Selecciona una sección'}
			}
		}, function(err){
			console.error(err);
		});
	};
	
	//Funcion que se ejecuta cuando se dispone a subir una nota
	$scope.subeNota=function(formulario,hora_inicio,hora_fin){
		var tipoN=5;
		var exclu=0;
		var hi=new Date(hora_inicio);
		var hf=new Date(hora_fin);
		// check to make sure the form is completely valid
		if (formulario.$valid) {
			tipoN=Number($scope.tipoNota.tei);
			
			if($scope.exclusiva.checked==false)
				exclu=0;
			else
				exclu=1;

			var notic=Number($scope.noticiero.checked==false? "0": formulario.noticie.$viewValue);
			var almomento=$scope.momento.checked;
			var numPortada=Number($scope.portadaSecc.checked==false?"0":formulario.portadaS.$viewValue);
			var status=Number($scope.apro.aprobo);

			var fechaInicioA=new Date(formulario.fecha_ini.$viewValue);
			var fechaInicio=new Date(fechaInicioA.getFullYear(),fechaInicioA.getMonth(),fechaInicioA.getDate()+1,hi.getHours(),hi.getMinutes(),0,0);
			var fechaFinA=new Date(formulario.fecha_fin.$viewValue);
			var fechaFin=new Date(fechaFinA.getFullYear(), fechaFinA.getMonth(), fechaFinA.getDate()+1, hf.getHours(), hf.getMinutes(),0,0);
			//Data sin audio ni galeria
			if(tipoN==5){
				var data= {	idEstados: formulario.estado.$viewValue.idEstados, 
							idsecciones: formulario.secciones.$viewValue.idsecciones, 
							idAutor: formulario.autor.$viewValue.idUsuario,
							fecha_inicio: fechaInicio,
							fecha_final: fechaFin,
							prioridad:formulario.pos.$viewValue,
							status: formulario.apro.$viewValue,
							titulo: formulario.titulo.$viewValue,
							resumen:formulario.resumen.$viewValue,
							notaCompleta:formulario.editor.$viewValue,
						 	tag1: formulario.tag1.$viewValue,
						 	tag2: formulario.tag2.$viewValue,
						 	tag3: formulario.tag3.$viewValue,
						 	tag4: formulario.tag4.$viewValue,
						 	tag5: formulario.tag5.$viewValue,
						 	tipoNota: tipoN,
						 	file: formulario.uploadFile.$viewValue,
						 	special: exclu,
						 	aprobado:39,
						 	capturo:usuario.idUsuario,
						 	status:status,
						 	noticiero: notic,
						 	momento: almomento,
						 	portada: numPortada
						  };
			}
			else if(tipoN==1){
				var data= {	idEstados: formulario.estado.$viewValue.idEstados, 
						  	idsecciones: formulario.secciones.$viewValue.idsecciones, 
						  	idAutor: formulario.autor.$viewValue.idUsuario,
							fecha_inicio: fechaInicio,
							fecha_final: fechaFin,
							prioridad:formulario.pos.$viewValue,
							status: formulario.apro.$viewValue,
							titulo: formulario.titulo.$viewValue,
							resumen:formulario.resumen.$viewValue,
							notaCompleta:formulario.editor.$viewValue,
					   		tag1: formulario.tag1.$viewValue,
					   		tag2: formulario.tag2.$viewValue,
					   		tag3: formulario.tag3.$viewValue,
					   		tag4: formulario.tag4.$viewValue,
					   		tag5: formulario.tag5.$viewValue,
					   		tipoNota: tipoN,
					   		file: formulario.uploadFile.$viewValue,
					   		special: exclu,
					   		audioFile:formulario.uploadAudio.$viewValue,
					   		aprobado:39,
					   		capturo:usuario.idUsuario,
					   		status:status,
					   		noticiero: notic,
						 	momento: almomento,
						 	portada: numPortada
						  };
			}
			else if(tipoN==3){
				var data= {	idEstados: formulario.estado.$viewValue.idEstados, 
						  	idsecciones: formulario.secciones.$viewValue.idsecciones, 
						  	idAutor: formulario.autor.$viewValue.idUsuario,
							fecha_inicio: fechaInicio,
							fecha_final: fechaFin,
							prioridad:formulario.pos.$viewValue,
							status: formulario.apro.$viewValue,
							titulo: formulario.titulo.$viewValue,
							resumen:formulario.resumen.$viewValue,
							notaCompleta:formulario.editor.$viewValue,
							tag1: formulario.tag1.$viewValue,
							tag2: formulario.tag2.$viewValue,
							tag3: formulario.tag3.$viewValue,
							tag4: formulario.tag4.$viewValue,
							tag5: formulario.tag5.$viewValue,
							tipoNota: tipoN,
							file: formulario.uploadFile.$viewValue,
							special: exclu,
							img1:formulario.upload1.$viewValue,
							img2:formulario.upload2.$viewValue,
							img3:formulario.upload3.$viewValue,
							img4:formulario.upload4.$viewValue,
							aprobado:39,
							capturo:usuario.idUsuario,
							status:status,
							noticiero: notic,
						 	momento: almomento,
						 	portada: numPortada
						  };
			}
			
			console.log(data);
			Upload.upload({
			  	url: '/uploadNota',
			  	data: data
			}).then(function (response) {
				$scope.formNuevoB=false;
				$scope.tituloModal="Noticia Cargada";
				$scope.mensajeModal="La nota se ha cargado exitosamente";
				$scope.enlace="http://globalmedia.mx/#!/Nota/"+response.data.idNotas+'/'+response.data.alias;
				console.log(response);
			}, function (response) {
				console.error(response);
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

	//Funcion que llama la vista de las noticias
	$scope.listN=function(){
		$scope.formNuevoG=false;
		$scope.formNuevoB=false;
		$scope.bandEdita=false;
		$scope.formList=true;
		
		//Llena con las secciones de noticias
		$http.get('/seccs').then(function(data){
			$scope.datsecc = {
					availableOptions: data.data,
					selectedOption: {_id: 0, group_name: 'Selecciona una sección'}
			}
		}, function(err){
			console.error(err);
		});
		//GET DE NOTAS DE PORTADA
		$http.get('/listPortada').success(function(data){
			$scope.arrayNotas=data;
			//GET DE NOTAS PROGRAMADAS
			$http.get('/listPortadaP').success(function(data2){
				$scope.arrayNotasP=data2;
			}).error(function(err){
				console.error(err);
			});
		}).error(function(err){
			console.error(err);
		});
	};

	$scope.cambiaPag=function(num){
		$http.get("/pagination/"+$scope.datsecc.selectedOption.idsecciones+"/"+num)
		.success(function (data, status) {
				console.log(data);
				$scope.arrayNotas=data;
			})
			.error(function (data) {
				console.error("Error con base de datos");
		 	 });
	}

	$scope.cambiaPrio=function(nota,valiu){
		var data={val:valiu, id:nota._id};
			console.log(data);
		$http.post('/updatePrio',data).then(function(response){
			alert("POSICIÓN ACTUALIZADA");
			$state.reload();
		},function(err){
			alert("OCURRIÓ UN ERROR EN LA ACTUALIZACIÓN DE PORTADA");
		});
	};
	
	$scope.cambia=function(){
  		$scope.maxSize = 4;
		$scope.bigCurrentPage = 1;
		if($scope.datsecc.selectedOption==null){
			//GET DE NOTAS DE PORTADA
			$http.get('/listPortada').success(function(data){
				$scope.arrayNotas=data;
				//GET DE NOTAS PROGRAMADAS
				$http.get('/listPortadaP').success(function(data2){
					$scope.arrayNotasP=data2;
					console.log($scope.arrayNotasP);
				}).error(function(err){
					console.error(err);
				});
			}).error(function(err){
				console.error(err);
			});
		}
		else{
			//Llena de notas la lista
			$http.get("/listNotas/"+$scope.datsecc.selectedOption.idsecciones)
				.success(function (data, status) {
					$scope.arrayNotas=data.array;
					console.log($scope.arrayNotas);
					$scope.bigTotalItems = data.total/30;
					$http.get("/listNotasP/"+$scope.datsecc.selectedOption.idsecciones)
						.success(function (data, status) {
							$scope.arrayNotasP=data.array;
							console.log($scope.arrayNotasP);
						})
						.error(function (data) {
							console.error("Error con base de datos");
			 			});
				})
				.error(function (data) {
					console.error("Error con base de datos");
			 	 });
		}
	}

	$scope.watch=function(nota){
		$scope.tituloModal=nota.titulo;
		var aux=new Date(nota.fecha_inicio);
		$scope.mensajeModal=aux.toString();
		$scope.enlace="http://globalmedia.mx/#!/Nota/"+nota.idNotas+'/'+nota.alias;
	}
	
	$scope.closeGalerie=function(){
		$scope.galeria=false;
	}
	
	//Funcion que se ejecuta cuando se dispone a subir una nota
	$scope.subeNota=function(formulario,hora_inicio,hora_fin){
		var tipoN=5;
		var exclu=0;
		var hi=new Date(hora_inicio);
		var hf=new Date(hora_fin);
		$scope.mensajeModal="Cargando...";
		// check to make sure the form is completely valid
		if (formulario.$valid) {
			tipoN=Number($scope.tipoNota.tei);
			
			if($scope.exclusiva.checked==false)
				exclu=0;
			else
				exclu=1;

			var notic=Number($scope.noticiero.checked==false? "0": formulario.noticie.$viewValue);
			var almomento=$scope.momento.checked;
			var numPortada=Number($scope.portadaSecc.checked==false?"0":formulario.portadaS.$viewValue);
			var status=Number($scope.apro.aprobo);

			var fechaInicioA=new Date(formulario.fecha_ini.$viewValue);
			var fechaInicio=new Date(fechaInicioA.getFullYear(),fechaInicioA.getMonth(),fechaInicioA.getDate()+1,hi.getHours(),hi.getMinutes(),0,0);
			var fechaFinA=new Date(formulario.fecha_fin.$viewValue);
			var fechaFin=new Date(fechaFinA.getFullYear(), fechaFinA.getMonth(), fechaFinA.getDate()+1, hf.getHours(), hf.getMinutes(),0,0);
			//Data sin audio ni galeria
			if(tipoN==5){
				var data= {	idEstados: formulario.estado.$viewValue.idEstados, 
							idsecciones: formulario.secciones.$viewValue.idsecciones, 
							idAutor: formulario.autor.$viewValue.idUsuario,
							fecha_inicio: fechaInicio,
							fecha_final: fechaFin,
							prioridad:formulario.pos.$viewValue,
							status: formulario.apro.$viewValue,
							titulo: formulario.titulo.$viewValue,
							resumen:formulario.resumen.$viewValue,
							notaCompleta:formulario.editor.$viewValue,
						 	tag1: formulario.tag1.$viewValue,
						 	tag2: formulario.tag2.$viewValue,
						 	tag3: formulario.tag3.$viewValue,
						 	tag4: formulario.tag4.$viewValue,
						 	tag5: formulario.tag5.$viewValue,
						 	tipoNota: tipoN,
						 	file: formulario.uploadFile.$viewValue,
						 	special: exclu,
						 	aprobado:39,
						 	capturo:usuario.idUsuario,
						 	status:status,
						 	noticiero: notic,
						 	momento: almomento,
						 	portada: numPortada
						  };
			}
			else if(tipoN==1){
				var data= {	idEstados: formulario.estado.$viewValue.idEstados, 
						  	idsecciones: formulario.secciones.$viewValue.idsecciones, 
						  	idAutor: formulario.autor.$viewValue.idUsuario,
							fecha_inicio: fechaInicio,
							fecha_final: fechaFin,
							prioridad:formulario.pos.$viewValue,
							status: formulario.apro.$viewValue,
							titulo: formulario.titulo.$viewValue,
							resumen:formulario.resumen.$viewValue,
							notaCompleta:formulario.editor.$viewValue,
					   		tag1: formulario.tag1.$viewValue,
					   		tag2: formulario.tag2.$viewValue,
					   		tag3: formulario.tag3.$viewValue,
					   		tag4: formulario.tag4.$viewValue,
					   		tag5: formulario.tag5.$viewValue,
					   		tipoNota: tipoN,
					   		file: formulario.uploadFile.$viewValue,
					   		special: exclu,
					   		audioFile:formulario.uploadAudio.$viewValue,
					   		aprobado:39,
					   		capturo:usuario.idUsuario,
					   		status:status,
					   		noticiero: notic,
						 	momento: almomento,
						 	portada: numPortada
						  };
			}
			else if(tipoN==3){
				var data= {	idEstados: formulario.estado.$viewValue.idEstados, 
						  	idsecciones: formulario.secciones.$viewValue.idsecciones, 
						  	idAutor: formulario.autor.$viewValue.idUsuario,
							fecha_inicio: fechaInicio,
							fecha_final: fechaFin,
							prioridad:formulario.pos.$viewValue,
							status: formulario.apro.$viewValue,
							titulo: formulario.titulo.$viewValue,
							resumen:formulario.resumen.$viewValue,
							notaCompleta:formulario.editor.$viewValue,
							tag1: formulario.tag1.$viewValue,
							tag2: formulario.tag2.$viewValue,
							tag3: formulario.tag3.$viewValue,
							tag4: formulario.tag4.$viewValue,
							tag5: formulario.tag5.$viewValue,
							tipoNota: tipoN,
							file: formulario.uploadFile.$viewValue,
							special: exclu,
							img1:formulario.upload1.$viewValue,
							img2:formulario.upload2.$viewValue,
							img3:formulario.upload3.$viewValue,
							img4:formulario.upload4.$viewValue,
							aprobado:39,
							capturo:usuario.idUsuario,
							status:status,
							noticiero: notic,
						 	momento: almomento,
						 	portada: numPortada
						  };
			}
			
			console.log(data);
			Upload.upload({
			  	url: '/uploadNota',
			  	data: data
			}).then(function (response) {
				$scope.formNuevoB=false;
				$scope.tituloModal="Noticia Cargada";
				$scope.mensajeModal="La nota se ha cargado exitosamente";
				$scope.enlace="http://globalmedia.mx/#!/Nota/"+response.data.idNotas+'/'+response.data.alias;
				console.log(response);
			}, function (response) {
				console.error(response);
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


	$scope.editar=function(nota){
		$scope.formNuevoB=false;	
		$scope.formNuevoG=false;
		$scope.formList=false;
		$scope.bandEdita=true;
		$scope.notaEditar=nota;
		console.log($scope.notaEditar);
		//Llena de grupos el select input
		$http.get("/estados")
			.success(function (data, status) {
				 $scope.datosE = {
					availableOptions: data,
					selectedOption: {idEstados: nota.idEstados}
				};
			})
			.error(function (data) {
				console.error("Error con base de datos tabla grupos");
			 });
		$http.get('/seccs').then(function(data){
			$scope.datsE = {
					availableOptions: data.data,
					selectedOption: {idsecciones: nota.idsecciones}
			}
		}, function(err){
			console.error(err);
		});
		
		$http.get('/aprobadores').then(function(data){
			$scope.datsApE = {
					availableOptions: data.data,
					selectedOption: {idUsuario: nota.aprobo}
			}
		},function(err){
			console.error(err);
		});

		$http.get('/autores').then(function(data){
			$scope.datsAuE = {
					availableOptions: data.data,
					selectedOption: {idUsuario: nota.idAutor}
			}
		}, function(err){
			console.error(err);
		});

		$http.get('/tags/'+nota.idNotas).then(function(ta){
			tags=ta.data;
			$scope.tag1=tags[0].nombre;
			$scope.tag2=tags[1].nombre;
			$scope.tag3=tags[2].nombre;
			$scope.tag4=tags[3].nombre;
			$scope.tag5=tags[4].nombre;
		}, function(err){
			console.error(err);
		});

		var fe=new Date(nota.fecha_inicio);
		var f=new Date();
		f.setHours(fe.getHours());
		f.setMinutes(fe.getMinutes());
		$scope.hora_inicioE=f;
		$scope.hora_finE=new Date(nota.fecha_final);
		$scope.fecha_ini=new Date(nota.fecha_inicio);
		$scope.fecha_fin=new Date(nota.fecha_final);
		$scope.pos=nota.prioridad.toString();
		$scope.aproE.aprobo=nota.status.toString();
		$scope.titulo=nota.titulo;
		$scope.resumen=nota.resumen;
		$scope.htmlVariable=nota.notaCompleta;
		$scope.tipoNotaE.tei=nota.tipoNota.toString();
		$scope.noticiero.checked=nota.noticiero==0?false:true;
		$scope.momento.checked=nota.momento;
		$scope.noticie=nota.noticiero.toString();
		$scope.portadaSecc.checked=nota.portada==0?false:true;
		$scope.portadaS=nota.portada.toString();
		if(nota.special==0)
			$scope.exclusivaE.checked=false;
		else
			$scope.exclusivaE.checked=true;
	}

	//Funcion que se ejecuta cuando se dispone a actualizar una nota
	$scope.actualizaNota=function(formulario, hora_inicio,hora_final){
		var tipoN=5;
		var exclu=0;
		var hi=new Date(hora_inicio);
		var hf=new Date(hora_final);
		$scope.mensajeModal="Cargando...";
		// check to make sure the form is completely valid
		if (formulario.$valid) {
			tipoN=Number($scope.tipoNotaE.tei);
			
			if($scope.exclusivaE.checked==false)
				exclu=0;
			else
				exclu=1;

			var almomento=$scope.momento.checked;
			var numPortada=Number($scope.portadaSecc.checked==false?"0":formulario.portadaS.$viewValue);
			var status=Number($scope.aproE.aprobo);
			var almomento=$scope.momento.checked;
			var numPortada=Number($scope.portadaSecc.checked==false?"0":formulario.portadaS.$viewValue);
			var fechaInicio=formulario.fecha_ini.$viewValue+' '+hi.getHours()+':'+hi.getMinutes();
			var fechaFin=formulario.fecha_fin.$viewValue+' '+hf.getHours()+':'+hf.getMinutes();
			var notic=Number($scope.noticiero.checked==false? "0": formulario.noticie.$viewValue);
			//Data sin audio ni galeria
			if(tipoN==5){
				var data= {	idEstados: formulario.estadoE.$viewValue.idEstados, 
							idsecciones: formulario.seccionesE.$viewValue.idsecciones, 
							idAutor: formulario.autor.$viewValue.idUsuario,
							fecha_inicio: fechaInicio,
							fecha_final: fechaFin,
							prioridad:formulario.pos.$viewValue,
							titulo: formulario.titulo.$viewValue,
							resumen:formulario.resumen.$viewValue,
							notaCompleta:formulario.editor.$viewValue,
							tag1: formulario.tag1.$viewValue,
							tag2: formulario.tag2.$viewValue,
							tag3: formulario.tag3.$viewValue,
							tag4: formulario.tag4.$viewValue,
							tag5: formulario.tag5.$viewValue,
							tipoNota: tipoN,
							file: formulario.uploadFile.$viewValue,
							special: exclu,
							aprobado:formulario.aprueba.$viewValue.idUsuario,
							capturo:usuario.idUsuario,
							status:status,
							idEditar:$scope.notaEditar._id,
							idNotas: $scope.notaEditar.idNotas,
							idt1:tags[0]._id,
							idt2:tags[1]._id,
							idt3:tags[2]._id,
							idt4:tags[3]._id,
							idt5:tags[4]._id,
						 	momento: almomento,
						 	portada: numPortada,
						 	noticiero: notic
						  };
			}
			else if(tipoN==1){
				var data= {idEstados: formulario.estadoE.$viewValue.idEstados, 
						  idsecciones: formulario.seccionesE.$viewValue.idsecciones, 
						  idAutor: formulario.autor.$viewValue.idUsuario,
							fecha_inicio: formulario.fecha_ini.$viewValue,
						  fecha_final: formulario.fecha_fin.$viewValue,
						  prioridad:formulario.pos.$viewValue,
						  titulo: formulario.titulo.$viewValue,
						  resumen:formulario.resumen.$viewValue,
						  notaCompleta:formulario.editor.$viewValue,
						   tag1: formulario.tag1.$viewValue,
						   tag2: formulario.tag2.$viewValue,
						   tag3: formulario.tag3.$viewValue,
						   tag4: formulario.tag4.$viewValue,
						   tag5: formulario.tag5.$viewValue,
						   tipoNota: tipoN,
						   file: formulario.uploadFile.$viewValue,
						   special: exclu,
						   audioFile:formulario.uploadAudio.$viewValue,
						   aprobado:formulario.aprueba.$viewValue.idUsuario,
						   capturo:usuario.idUsuario,
						   status:status,
						   idEditar:$scope.notaEditar._id,
						   idNotas: $scope.notaEditar.idNotas,
						   idt1:tags[0]._id,
						   idt2:tags[1]._id,
						   idt3:tags[2]._id,
						   idt4:tags[3]._id,
						   idt5:tags[4]._id,
						 	momento: almomento,
						 	portada: numPortada,
						 	noticiero: notic
						  };
			}
			else if(tipoN==3){
				var data= {idEstados: formulario.estadoE.$viewValue.idEstados, 
						  idsecciones: formulario.seccionesE.$viewValue.idsecciones, 
						  idAutor: formulario.autor.$viewValue.idUsuario,
							fecha_inicio: formulario.fecha_ini.$viewValue,
						  fecha_final: formulario.fecha_fin.$viewValue,
						  prioridad:formulario.pos.$viewValue,
						  titulo: formulario.titulo.$viewValue,
						  resumen:formulario.resumen.$viewValue,
						  notaCompleta:formulario.editor.$viewValue,
						   tag1: formulario.tag1.$viewValue,
						   tag2: formulario.tag2.$viewValue,
						   tag3: formulario.tag3.$viewValue,
						   tag4: formulario.tag4.$viewValue,
						   tag5: formulario.tag5.$viewValue,
						   tipoNota: tipoN,
						   file: formulario.uploadFile.$viewValue,
						   special: exclu,
						   img1:formulario.upload1.$viewValue,
						   img2:formulario.upload2.$viewValue,
						   img3:formulario.upload3.$viewValue,
						   img4:formulario.upload4.$viewValue,
						   aprobado:formulario.aprueba.$viewValue.idUsuario,
						   capturo:usuario.idUsuario,
						   status:status,
						   idEditar:$scope.notaEditar._id,
						   idNotas: $scope.notaEditar.idNotas,
						   idt1:tags[0]._id,
						   idt2:tags[1]._id,
						   idt3:tags[2]._id,
						   idt4:tags[3]._id,
						   idt5:tags[4]._id,
						 	momento: almomento,
						 	portada: numPortada,
						 	noticiero: notic
						  };
			}
			
			console.info(data);
			Upload.upload({
			  	url: '/updateNota',
			  	data: data
			}).then(function (response) {
				$scope.formNuevoB=false;
				$scope.bandEdita=false;
				$scope.tituloModal="Nota Editada";
				$scope.mensajeModal="La nota se ha editado exitosamente";
				$scope.enlace="http://globalmedia.mx/#/Nota/"+response.data.idNotas;
				
			}, function (response) {
				console.error(response);
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