angular.module('globalmediaApp').controller('sishitsCtrl', function ($scope,$timeout,$http, $window, $state, Upload, $q) {
	var usuario={};
	var banerSel={};
	var tags=[];
	var hoy=new Date();
	$scope.arrayBanners=[];
	$scope.screenHeight={'height': String($window.innerHeight-100)+'px'};
	$scope.mods=[];
	$scope.mensuales=false;
	$scope.altaObje=false;
	$scope.esta=false;
	$scope.fecha={};
	$scope.fecha.mes=hoy.getMonth()+1;
	$scope.fecha.ano=hoy.getFullYear();
	$scope.popup1 = {opened: false};
	$scope.popup2 = {opened: false};
	$scope.popup3 = {opened: false};
	$scope.popup4 = {opened: false};
	$scope.popup5 = {opened: false};
	$scope.popup6 = {opened: false};
	$scope.popup7 = {opened: false};
	$scope.popup8 = {opened: false};
	$scope.popup9 = {opened: false};
	$scope.popup10 = {opened: false};
	$scope.popup11 = {opened: false};
	$scope.popup12= {opened: false};
	$scope.popup13= {opened: false};
	$scope.popup14= {opened: false};
	$scope.popup15= {opened: false};
	$scope.popup16= {opened: false};
	$scope.popup17= {opened: false};
	$scope.popup18= {opened: false};
	$scope.popup19= {opened: false};
	$scope.popup20= {opened: false};
	$scope.popup21= {opened: false};
	$scope.popup22= {opened: false};
	$scope.popup23= {opened: false};
	$scope.popup24= {opened: false};
	$scope.dt1=new Date(hoy.getFullYear(),0,1,0,0,0,0);
	$scope.dt2=new Date();
	$scope.dt3=new Date(hoy.getFullYear(),0,1,0,0,0,0);
	$scope.dt4=new Date();
	$scope.dt5=new Date(hoy.getFullYear(),0,1,0,0,0,0);
	$scope.dt6=new Date();
	$scope.dt7=new Date(hoy.getFullYear(),0,1,0,0,0,0);
	$scope.dt8=new Date();
	$scope.dt9=new Date(hoy.getFullYear(),0,1,0,0,0,0);
	$scope.dt10=new Date();
	$scope.dt11=new Date(hoy.getFullYear(),0,1,0,0,0,0);
	$scope.dt12=new Date();
	$scope.dt13=new Date(hoy.getFullYear(),0,1,0,0,0,0);
	$scope.dt14=new Date();
	$scope.dt15=new Date(hoy.getFullYear(),0,1,0,0,0,0);
	$scope.dt16=new Date();
	$scope.dt17=new Date(hoy.getFullYear(),0,1,0,0,0,0);
	$scope.dt18=new Date();
	$scope.dt19=new Date(hoy.getFullYear(),0,1,0,0,0,0);
	$scope.dt20=new Date();
	$scope.dt21=new Date(hoy.getFullYear(),0,1,0,0,0,0);
	$scope.dt22=new Date();
	$scope.dt23=new Date(hoy.getFullYear(),0,1,0,0,0,0);
	$scope.dt24=new Date();



	$scope.open1 = function() {
		$scope.popup1.opened = true;
	};
	$scope.open2 = function() {
		$scope.popup2.opened = true;
	};
	$scope.open3 = function() {
		$scope.popup3.opened = true;
	};
	$scope.open4 = function() {
		$scope.popup4.opened = true;
	};
	$scope.open5 = function() {
		$scope.popup5.opened = true;
	};
	$scope.open6 = function() {
		$scope.popup6.opened = true;
	};
	$scope.open7 = function() {
		$scope.popup7.opened = true;
	};
	$scope.open8 = function() {
		$scope.popup8.opened = true;
	};
	$scope.open9 = function() {
		$scope.popup9.opened = true;
	};
	$scope.open10 = function() {
		$scope.popup10.opened = true;
	};
	$scope.open11 = function() {
		$scope.popup11.opened = true;
	};
	$scope.open12 = function() {
		$scope.popup12.opened = true;
	};
	$scope.open13 = function() {
		$scope.popup13.opened = true;
	};
	$scope.open14 = function() {
		$scope.popup14.opened = true;
	};
	$scope.open15 = function() {
		$scope.popup15.opened = true;
	};
	$scope.open16 = function() {
		$scope.popup16.opened = true;
	};
	$scope.open17 = function() {
		$scope.popup17.opened = true;
	};
	$scope.open18 = function() {
		$scope.popup18.opened = true;
	};
	$scope.open19 = function() {
		$scope.popup19.opened = true;
	};
	$scope.open20 = function() {
		$scope.popup20.opened = true;
	};
	$scope.open21 = function() {
		$scope.popup21.opened = true;
	};
	$scope.open22 = function() {
		$scope.popup22.opened = true;
	};
	$scope.open23 = function() {
		$scope.popup23.opened = true;
	};
	$scope.open24 = function() {
		$scope.popup24.opened = true;
	};

	$scope.comparaKeys=function(objeto){
		if(objeto.nombre!=null)
			return true;
		else{
			return false;
		}
	};

	$scope.getCumpli=function(objetivo,mes){
		var objetivos=(objetivo[Number(mes.nombre)].actualidad+objetivo[Number(mes.nombre)].colaboradores+
		objetivo[Number(mes.nombre)].denuncia+objetivo[Number(mes.nombre)].deportesLocal+
		objetivo[Number(mes.nombre)].deportesNacional+objetivo[Number(mes.nombre)].espectaculos+
		objetivo[Number(mes.nombre)].estados+objetivo[Number(mes.nombre)].formula+
		objetivo[Number(mes.nombre)].imagen+objetivo[Number(mes.nombre)].internacional+
		objetivo[Number(mes.nombre)].investigaciones+objetivo[Number(mes.nombre)].kebuena+
		objetivo[Number(mes.nombre)].local+objetivo[Number(mes.nombre)].nacional+
		objetivo[Number(mes.nombre)].negocios+objetivo[Number(mes.nombre)].rmx+
		objetivo[Number(mes.nombre)].vivecanal+objetivo[Number(mes.nombre)].wfm);

		var hits=mes.hits;

		return ((100*hits)/objetivos).toFixed(2);

	};

	$scope.getCumpliS=function(objetivos, m){
		var hits=m.hits;

		return ((100*hits)/objetivos[m.nombre]).toFixed(2);

	};

	$scope.getObjetivos=function(objeto){
		var total=(objeto.actualidad+objeto.colaboradores+
		objeto.denuncia+objeto.deportesLocal+
		objeto.deportesNacional+objeto.espectaculos+
		objeto.estados+objeto.formula+
		objeto.imagen+objeto.internacional+
		objeto.investigaciones+objeto.kebuena+
		objeto.local+objeto.nacional+
		objeto.negocios+objeto.rmx+
		objeto.vivecanal+objeto.wfm);
		return total;
	};

	function getObjGeneral(key){
				return $q( function(resolve,reject){
		    	var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);
		    	resolve({total:($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].actualidad+$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].colaboradores+
		    			    			    		    					$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].denuncia+$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].deportesLocal+
		    			    			    		    					$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].deportesNacional+$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].espectaculos+
		    			    			    		    					$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].estados+$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].formula+
		    			    			    		    					$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].imagen+$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].internacional+
		    			    			    		    					$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].investigaciones+$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].kebuena+
		    			    			    		    					$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].local+$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].nacional+
		    			    			    		    					$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].negocios+$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].rmx+
		    			    			    		    					$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].vivecanal+$scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].wfm)/4, key: key});
		    	});
	}

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');
        data.addRows([
        	[$scope.objetivoMensual.InvEsp.nombre, $scope.objetivoMensual.InvEsp.total,$scope.objetivoMensual.objetivos[0].investigaciones],
        	[$scope.objetivoMensual.local.nombre, $scope.objetivoMensual.local.total,$scope.objetivoMensual.objetivos[0].local],
        	[$scope.objetivoMensual.Denuncia.nombre, $scope.objetivoMensual.Denuncia.total,$scope.objetivoMensual.objetivos[0].denuncia],
        	[$scope.objetivoMensual.Colaboraciones.nombre, $scope.objetivoMensual.Colaboraciones.total,$scope.objetivoMensual.objetivos[0].colaboradores],
        	[$scope.objetivoMensual.Negocios.nombre, $scope.objetivoMensual.Negocios.total,$scope.objetivoMensual.objetivos[0].negocios],
        	[$scope.objetivoMensual.Estados.nombre, $scope.objetivoMensual.Estados.total,$scope.objetivoMensual.objetivos[0].estados],
        	[$scope.objetivoMensual.Nacional.nombre, $scope.objetivoMensual.Nacional.total,$scope.objetivoMensual.objetivos[0].nacional],
        	[$scope.objetivoMensual.Internacional.nombre, $scope.objetivoMensual.Internacional.total,$scope.objetivoMensual.objetivos[0].internacional],
        	[$scope.objetivoMensual.Actualidad.nombre, $scope.objetivoMensual.Actualidad.total,$scope.objetivoMensual.objetivos[0].actualidad],
        	[$scope.objetivoMensual.Deporteslocal.nombre, $scope.objetivoMensual.Deporteslocal.total,$scope.objetivoMensual.objetivos[0].deportesLocal],
        	[$scope.objetivoMensual.Deportesnacional.nombre, $scope.objetivoMensual.Deportesnacional.total,$scope.objetivoMensual.objetivos[0].deportesNacional],
        	[$scope.objetivoMensual.RMX.nombre, $scope.objetivoMensual.RMX.total,$scope.objetivoMensual.objetivos[0].rmx],
        	[$scope.objetivoMensual.WFM.nombre, $scope.objetivoMensual.WFM.total,$scope.objetivoMensual.objetivos[0].wfm],
        	[$scope.objetivoMensual.Imagen.nombre, $scope.objetivoMensual.Imagen.total,$scope.objetivoMensual.objetivos[0].imagen],
        	[$scope.objetivoMensual.Formula.nombre, $scope.objetivoMensual.Formula.total,$scope.objetivoMensual.objetivos[0].formula],
        	[$scope.objetivoMensual.KEBUENA.nombre, $scope.objetivoMensual.KEBUENA.total,$scope.objetivoMensual.objetivos[0].kebuena],
        	[$scope.objetivoMensual.Vivecanal.nombre, $scope.objetivoMensual.Vivecanal.tota,$scope.objetivoMensual.objetivos[0].vivecanal]
        ]);

        // Set chart options
        var options={
        				title:'Métrica mensual vs Objetivo Mensual',
        				seriesType:'bars',
        				series:{1:{type: 'line'}}
                   	};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }

    $scope.graph=function(fecha){
	    $http.get('/objetivoMensual/'+fecha.mes+'/'+fecha.ano).success(function(result){
			$scope.objetivoMensual=result;
			console.log($scope.objetivoMensual);
			google.charts.load('current', {'packages':['corechart']});
			// Set a callback to run when the Google Visualization API is loaded.
		    google.charts.setOnLoadCallback(drawChart);
		}).error(function(err){
			console.error(err);
		});
	};

    function drawChart2() {
    	var contRows=0;


        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');
        //data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
	        	getObjGeneral(key).then(function(objetivo){
	        		data.addRow([Number($scope.semanaFiscal[objetivo.key].nombre), $scope.semanaFiscal[objetivo.key].hits, objetivo.total]);
	        		contRows++;
		        	if(contRows==$scope.semanaFiscal.size){
				        // Instantiate and draw our chart, passing in some options.
				        var chart = new google.visualization.LineChart(document.getElementById('chart_div2'));
				        chart.draw(data, options);
		        	}
	        	});
        	}
        }

        // Set chart options
        var options={
        				title:'General por semana fiscal',
                   	};
    }

    $scope.graph2=function(dt1,dt2){
		$scope.hitTotales=0;
	    $http.get('/semanaFiscal/'+dt1+'/'+dt2).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawChart2);

		    for(var key in result){
		    	if(key!="objetivos"&&key!="size"){
		    		$scope.hitTotales+=result[key].hits;
		    	}
		    }

		    $http.get('/hitsMensual/'+dt2).success(function(resu){
		    	$scope.mensu=resu;
		    	console.log(resu);
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
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

/*************************************************SECCION INVESTIGACION**************************************************************/
	function drawSecc1() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].hits, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)])/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('secc_div1'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.secc1=function(dt1,dt2){
	    $http.get('/fiscalSecc/'+dt1+'/'+dt2+'/'+22).success(function(result){
			$scope.semanaFiscal=result;
		    	console.log(result);
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawSecc1);

		    $http.get('/hitsMensualS/'+dt2+'/'+22).success(function(resu){
		    	$scope.mensu1=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END SECCION INVESTIGACION***************************************************/	
/*************************************************SECCION LOCAL**************************************************************/
	function drawSecc2() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].hits, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)])/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('secc_div2'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.secc2=function(dt1,dt2){
	    $http.get('/fiscalSecc/'+dt1+'/'+dt2+'/'+1).success(function(result){
			$scope.semanaFiscal=result;
			console.log($scope.semanaFiscal);
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawSecc2);

		    $http.get('/hitsMensualS/'+dt2+'/'+1).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu2=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END SECCION LOCAL***************************************************/	
/*************************************************SECCION DENUNCIA**************************************************************/
		function drawSecc3() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].hits, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)])/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('secc_div3'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.secc3=function(dt1,dt2){
		$http.get('/fiscalSecc/'+dt1+'/'+dt2+'/'+11).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawSecc3);

		    $http.get('/hitsMensualS/'+dt2+'/'+11).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu3=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END SECCION DENUNCIA***************************************************/	
/*************************************************SECCION NEGOCIOS**************************************************************/
		function drawSecc4() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].hits, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)])/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('secc_div4'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.secc4=function(dt1,dt2){
		$http.get('/fiscalSecc/'+dt1+'/'+dt2+'/'+6).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawSecc4);

		    $http.get('/hitsMensualS/'+dt2+'/'+6).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu4=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END SECCION NEGOCIOS***************************************************/	
/*************************************************SECCION ESTADOS**************************************************************/
		function drawSecc5() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].hits, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)])/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('secc_div5'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.secc5=function(dt1,dt2){
		$http.get('/fiscalSecc/'+dt1+'/'+dt2+'/'+7).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawSecc5);

		    $http.get('/hitsMensualS/'+dt2+'/'+7).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu5=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END SECCION ESTADOS***************************************************/	
/*************************************************SECCION NACIONAL**************************************************************/
		function drawSecc6() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].hits, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)])/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('secc_div6'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.secc6=function(dt1,dt2){
		$http.get('/fiscalSecc/'+dt1+'/'+dt2+'/'+3).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawSecc6);

		    $http.get('/hitsMensualS/'+dt2+'/'+3).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu6=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END SECCION NACIONAL***************************************************/	
/*************************************************SECCION INTERNACIONAL**************************************************************/
		function drawSecc7() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].hits, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)])/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('secc_div7'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.secc7=function(dt1,dt2){
		$http.get('/fiscalSecc/'+dt1+'/'+dt2+'/'+4).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawSecc7);

		    $http.get('/hitsMensualS/'+dt2+'/'+4).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu7=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END SECCION INTERNACIONAL***************************************************/	
/*************************************************SECCION ACTUALIDAD**************************************************************/
		function drawSecc8() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].hits, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)])/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('secc_div8'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.secc8=function(dt1,dt2){
		$http.get('/fiscalSecc/'+dt1+'/'+dt2+'/'+21).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawSecc8);

		    $http.get('/hitsMensualS/'+dt2+'/'+21).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu8=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END SECCION ACTUALIDAD***************************************************/	
/*************************************************SECCION ESPECTACULOS**************************************************************/
		function drawSecc9() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].hits, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)])/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('secc_div9'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.secc9=function(dt1,dt2){
		$http.get('/fiscalSecc/'+dt1+'/'+dt2+'/'+10).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawSecc9);

		    $http.get('/hitsMensualS/'+dt2+'/'+10).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu9=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END SECCION ESPECTACULOS***************************************************/	
/*************************************************SECCION DEPORTES LOCAL**************************************************************/
		function drawSecc10() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].hits, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)])/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('secc_div10'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.secc10=function(dt1,dt2){
		$http.get('/fiscalSecc/'+dt1+'/'+dt2+'/'+2010).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawSecc10);

		    $http.get('/hitsMensualS/'+dt2+'/'+2010).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu10=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END SECCION DEPORTES LOCAL***************************************************/	
/*************************************************SECCION DEPORTES Nacional**************************************************************/
		function drawSecc13() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].hits, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)])/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('secc_div13'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.secc13=function(dt1,dt2){
		$http.get('/fiscalSecc/'+dt1+'/'+dt2+'/'+2013).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawSecc13);

		    $http.get('/hitsMensualS/'+dt2+'/'+2013).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu13=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END SECCION DEPORTES NACIONAL***************************************************/	
/*************************************************SECCION COLABORADORES**************************************************************/
	function drawSecc11() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].hits, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)])/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('secc_div11'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.secc11=function(dt1,dt2){
	    $http.get('/fiscalSeccCola/'+dt1+'/'+dt2).success(function(result){
			$scope.semanaFiscal=result;
			console.log(result);
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawSecc11);

		    $http.get('/hitsMensualCola/'+dt2).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu12=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END SECCION COLABORADORES***************************************************/	
/*************************************************RMX**************************************************************/
	function drawEsta1() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].total, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].investigaciones)/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('esta_div1'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.esta1=function(fecha){
		$scope.hitTotales=0;
	    $http.get('/fiscalEsta/'+$scope.dt1+'/'+$scope.dt2+'/'+1000).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawEsta1);

		    $http.get('/hitsMensualEsta/'+$scope.dt2+'/'+1000).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END RMX***************************************************/	
/*************************************************WFM**************************************************************/
	function drawEsta2() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].total, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].investigaciones)/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('esta_div2'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.esta2=function(fecha){
		$scope.hitTotales=0;
	    $http.get('/fiscalEsta/'+$scope.dt1+'/'+$scope.dt2+'/'+1001).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawEsta2);

		    $http.get('/hitsMensualEsta/'+$scope.dt2+'/'+1001).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END WFM***************************************************/
/*************************************************IMAGEN**************************************************************/
	function drawEsta3() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].total, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].investigaciones)/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('esta_div3'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.esta3=function(fecha){
		$scope.hitTotales=0;
	    $http.get('/fiscalEsta/'+$scope.dt1+'/'+$scope.dt2+'/'+1002).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawEsta3);

		    $http.get('/hitsMensualEsta/'+$scope.dt2+'/'+1002).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END IMAGEN***************************************************/
/*************************************************FORMULA**************************************************************/
	function drawEsta4() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].total, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].investigaciones)/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('esta_div4'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.esta4=function(fecha){
		$scope.hitTotales=0;
	    $http.get('/fiscalEsta/'+$scope.dt1+'/'+$scope.dt2+'/'+1003).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawEsta4);

		    $http.get('/hitsMensualEsta/'+$scope.dt2+'/'+1003).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END FORMULA***************************************************/
/*************************************************KEBUENA**************************************************************/
	function drawEsta5() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].total, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].investigaciones)/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('esta_div5'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.esta5=function(fecha){
		$scope.hitTotales=0;
	    $http.get('/fiscalEsta/'+$scope.dt1+'/'+$scope.dt2+'/'+1004).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawEsta5);

		    $http.get('/hitsMensualEsta/'+$scope.dt2+'/'+1004).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END KEBUENA***************************************************/
/*************************************************VIVECANAL**************************************************************/
	function drawEsta6() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal[key].nombre), $scope.semanaFiscal[key].total, ($scope.semanaFiscal.objetivos[keyObj.toString().substring(0,16)].investigaciones)/4]);
	    		contRows++;
	        	if(contRows==$scope.semanaFiscal.size){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('esta_div6'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.esta6=function(fecha){
		$scope.hitTotales=0;
	    $http.get('/fiscalEsta/'+$scope.dt1+'/'+$scope.dt2+'/'+1005).success(function(result){
			$scope.semanaFiscal=result;
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawEsta6);

		    $http.get('/hitsMensualEsta/'+$scope.dt2+'/'+1005).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END VIVECANAL***************************************************/

/*************************************************ERIKA SALGADO**********************************************************/
	function drawProg1() {
    	var contRows=0;

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Topping');
        data.addColumn('number', 'Hits');
        data.addColumn('number', 'Objetivos');

        for(var key in $scope.semanaFiscal.erika){
        	if(key!="objetivos"&&key!="size"){
        		var d = (1 + (Number(key) - 1) * 7);
		    	var fechaAux=new Date($scope.dt2.getFullYear(), 0, d);
		    	var keyObj=new Date(fechaAux.getFullYear(),fechaAux.getMonth(),1,0,0,0,0);

	    		data.addRow([Number($scope.semanaFiscal.erika[key].nombre), $scope.semanaFiscal.erika[key].hits, ($scope.semanaFiscal.erika[key].objetivo/4)]);
	    		contRows++;
	        	if(contRows==Object.keys($scope.semanaFiscal.erika).length){
			        // Instantiate and draw our chart, passing in some options.
			        var chart = new google.visualization.LineChart(document.getElementById('prog_div1'));
			        chart.draw(data, options);
	        	}
        	}
        }

        // Set chart options
        var options={
        				title:'semana fiscal',
                   	};
    }

	$scope.prog1=function(fecha){
		$scope.hitTotales=0;
	    $http.get('/colaFiscal/'+$scope.dt1+'/'+$scope.dt2).success(function(result){
			$scope.semanaFiscal=result;
			console.log($scope.semanaFiscal);
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawProg1);

		    $http.get('/hitsMensualCola/'+$scope.dt2).success(function(resu){
		    	console.log(resu);
		    	$scope.mensu=resu;
		    }).error(function(err){
		    	console.error(err);
		    });

		}).error(function(err){
			console.error(err);
		});
	};
/********************************************END ERIKA SALGADO***************************************************/

	$scope.graficaMen=function(){
		$scope.mensuales=true;
		$scope.altaObje=false;
		$scope.seccs=false;
		$scope.esta=false;
		$scope.progra=false;
	};

	$scope.programas=function(){
		$scope.mensuales=false;
		$scope.altaObje=false;
		$scope.seccs=false;
		$scope.esta=false;
		$scope.progra=true;
	};

	$scope.secciones=function(){
		$scope.mensuales=false;
		$scope.altaObje=false;
		$scope.seccs=true;
		$scope.esta=false;
		$scope.progra=false;
	};

	$scope.estaciones=function(){
		$scope.mensuales=false;
		$scope.altaObje=false;
		$scope.seccs=false;
		$scope.esta=true;
		$scope.progra=false;
	};

	$scope.altaObjetivos=function(){
		$scope.mensuales=false;
		$scope.altaObje=true;
		$scope.seccs=false;
		$scope.esta=false;
		$scope.progra=false;
		$scope.fecha.mes="";
		$scope.fecha.ano="";
	};

	$scope.subeObjs=function(formulario){
		var fecha=new Date($scope.fecha.ano,($scope.fecha.mes-1),1,0,0,0,0);
		var send={fecha: fecha, 
			investigaciones: formulario.inves.$viewValue,
			local: formulario.local.$viewValue,
			denuncia: formulario.denuncia.$viewValue,
			colaboradores: formulario.cola.$viewValue,
			negocios: formulario.negocios.$viewValue,
			estados: formulario.estados.$viewValue,
			nacional: formulario.nacional.$viewValue,
			internacional: formulario.internacional.$viewValue,
			actualidad: formulario.actualidad.$viewValue,
			espectaculos: formulario.espectaculos.$viewValue,
			deportesLocal: formulario.deplocal.$viewValue,
			deportesNacional: formulario.depint.$viewValue,
			rmx: formulario.rmx.$viewValue,
			wfm: formulario.wfm.$viewValue,
			imagen: formulario.imagen.$viewValue,
			formula: formulario.formula.$viewValue,
			kebuena: formulario.kebuena.$viewValue,
			vivecanal: formulario.vivecanal.$viewValue
		};

		$http.post('/uploadGoals',send).success(function(registro){
			$scope.mensuales=false;
			$scope.altaObje=false;
		}).error(function(err){
			console.error(err);
		});
	}
});