var express = require('express');
var path = require('path');
var router = express.Router();
var passport= require('passport');
var localStrategy=require('passport-local').Strategy;
var mongoose = require('mongoose');
var multipart = require('connect-multiparty');
var sharp = require('sharp');
var multipartyMiddleware = multipart({ uploadDir: 'public/images/banners/' });
var multipartyMiddleware2 = multipart({ uploadDir: 'public/images/temp' });
var fs = require('fs');
var FCM = require('fcm-push');
var LLAVE='gl0b4l_M3D14_o6I0zo1b';
var Schema = mongoose.Schema;

var Audios=mongoose.model('Audios');
var Banners=mongoose.model('Banners');
var BannersApp=mongoose.model('BannersApp');
var CamarasTrafico=mongoose.model('CamarasTrafico');
var Controles=mongoose.model('Controles');
var Dispositivos=mongoose.model('Dispositivos');
var Estaciones=mongoose.model('Estaciones');
var Estados=mongoose.model('Estados');
var Grupos=mongoose.model('Grupos');
var Hits=mongoose.model('Hits');
var HitsRecurso=mongoose.model('HitsRecurso');
var HitsTrascendidos=mongoose.model('HitsTrascendidos');
var Imagenes=mongoose.model('Imagenes');
var ImgGaleria=mongoose.model('ImgGaleria');
var InfoColaborador=mongoose.model('InfoColaborador');
var Objetivos=mongoose.model('Objetivos');
var Modulos=mongoose.model('Modulos');
var mxu=mongoose.model('modulosxusuario');
var Notas=mongoose.model('Notas');
var Tecnicos=mongoose.model('Tecnicos');
var Personal=mongoose.model('Personal');
var Podcast=mongoose.model('Podcast');
var Radio=mongoose.model('Radio');
var Reportes=mongoose.model('Reportes');
var Secciones=mongoose.model('Secciones');
var Segmento=mongoose.model('Segmento');
var Status=mongoose.model('Status');
var Tags=mongoose.model('Tags');
var tagsxnotas=mongoose.model('tagsxnotas');
var tagsxpodcast=mongoose.model('tagsxpodcast');
var Tematica=mongoose.model('Tematica');
var Unidades=mongoose.model('Unidades');
var User=mongoose.model('Usuarios');
var VideoDenuncia=mongoose.model('VideoDenuncia');
var urlWeb="http://globalmedia.mx/images/multimedia/";
var fechaActual= new Date();
var fechaSinHoras=new Date();
fechaSinHoras.setHours(0,0,0,0);

function dateFormat(date){
	return date.toISOString().substring(0,19)+"Z";
}

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({
        _id: id
    }, '-password -salt', function(err, user) {
        done(err, user);
    });
});

//Estrategia para Autenticacón de usuarios
passport.use(new localStrategy(
  function(username, password, done) {
	  console.log("2 "+password);
    User.findOne({ nombreUsuario: username }, function(err, user) {
	  console.log("2 "+user);
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Nombre de usuario incorrecto.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }
      return done(null, user);
    });
  }
));

/******************************************************GET AREA*****************************************************/
/*ARREGLO DE NOTAS DE PORTADA*/
router.get('/updateHNotas', function(req,res,next){
	var cont=0;
	Hits.find().exec(function(err, hits){
		hits.forEach(function(h){
			Notas.findOneAndUpdate({idNotas:h.idNotas},{$inc:{hits:h.hits}}, function(err, resp){
				cont++;
				if(hits.length==cont){
					res.send("TERMINO");
				}
			});
		});
	});
});

/*ARREGLO DE NOTAS DE PORTADA*/
router.get('/listPortada', function(req,res,next){
	var respuesta={};
	fechaActual=new Date();
	Notas.find({prioridad:{$ne:0}}).sort({fecha_inicio:-1}).exec(function(err, notas){
		res.json(notas);
	});
});

/*ARREGLO DE NOTAS DE PORTADA PROGRAMADAS*/
router.get('/listPortadaP', function(req,res,next){
	var respuesta={};
	fechaActual=new Date();
	Notas.find({prioridad:{$ne:0},fecha_inicio:{$gte:fechaActual}}).sort({fecha_inicio:-1}).exec(function(err, notas){
		res.json(notas);
	});
});

/*GET ESTACIONES*/
router.get('/estaciones', function(req, res, next){
	Estaciones.find().exec(function(err, estaciones){
		if (err) next(err);
		
		res.json(estaciones);
	});
});

/*GET ESTACIONES*/
router.get('/status', function(req, res, next){
	Status.find().exec(function(err, stats){
		if (err) next(err);
		
		res.json(stats);
	});
});

/*GET Personal*/
router.get('/personal', function(req, res, next){
	Personal.find().exec(function(err, personal){
		if (err) next(err);
		
		res.json(personal);
	});
});

/*GET UNIDADES*/
router.get('/unidades', function(req, res, next){
	Unidades.find().exec(function(err, unidades){
		if (err) next(err);
		
		res.json(unidades);
	});
});

/*GET AUTORES*/
router.get('/autores',function(req,res,next){
	User.find({idRoles:{$in:[3,6]}}).exec(function(err, usuarios){
		if (err) next(err);
		
		res.json(usuarios);
	});
});

/*GET AUTORES*/
router.get('/aprobadores',function(req,res,next){
	User.find({idRoles: 7}).exec(function(err, usuarios){
		if (err) next(err);
		
		res.json(usuarios);
	});
});

/*GET ESTADOS*/
router.get('/estados', function(req,res, next){
	Estados.find().exec(function(err, estados){
		if(err) next(err);
		
		res.json(estados);
	});
});

/*GET TABLA SECCIONES*/
router.get('/seccs', function(req, res, next){
	Secciones.find().exec(function(err, seccs){
		if(err) next(err);
		
		res.json(seccs);
	});
});

/*GET USUARIOS*/
router.get('/usuarios', function(req,res,next){
	User.find().exec(function(err, users){
		if(err) next(err);
		
		res.json(users);
	});
});

/*GET ALL MODULOS*/
router.get('/modulos',function(req,res,next){
	Modulos.find().exec(function(err, mods){
		if(err) next(err);
		
		res.json(mods);
	});
});

/*GET DE NOTA CLICKEADA*/
router.get('/nota/:id',function(req,res,next){
	var num=req.params.id;
	var respuesta={};
	
	Notas.findOne({alias:num}).exec(function(err, nota){
		if(err) next(err);
		Imagenes.findOne({idnotas:nota.idNotas}).sort({idimagenes:-1}).exec(function(err,imagen){
			Secciones.findOne({idsecciones:nota.idsecciones}).exec(function(err, seccion){
				if(err) next(err);

				respuesta.nota=nota;
				if(respuesta.nota.tipoNota==1){
					Audios.find({idnotas:respuesta.nota.idNotas}).sort({idAudio:-1}).limit(1).exec(function(err, audio){
						if(err) next(err);
						respuesta.audio=audio;
						respuesta.imagen=imagen;
						respuesta.seccion=seccion;
						res.json(respuesta);
					});
				}
				else{
					respuesta.imagen=imagen;
					respuesta.seccion=seccion;
					res.json(respuesta);
				}
			});
		});
	});
});

/*GET DE NOTA CLICKEADA*/
router.get('/notaId/:id',function(req,res,next){
	var num=req.params.id;
	var respuesta={};
	
	Notas.findOne({idNotas:num}).exec(function(err, nota){
		if(err) next(err);
		Imagenes.findOne({idnotas:nota.idNotas}).sort({idimagenes:-1}).exec(function(err,imagen){
			Secciones.findOne({idsecciones:nota.idsecciones}).exec(function(err, seccion){
				if(err) next(err);

				respuesta.nota=nota;
				if(respuesta.nota.tipoNota==1){
					Audios.find({idnotas:respuesta.nota.idNotas}).sort({idAudio:-1}).limit(1).exec(function(err, audio){
						if(err) next(err);
						respuesta.audio=audio;
						respuesta.imagen=imagen;
						respuesta.seccion=seccion;
						res.json(respuesta);
					});
				}
				else{
					respuesta.imagen=imagen;
					respuesta.seccion=seccion;
					res.json(respuesta);
				}
			});
		});
	});
});

/*GET DE NOTA CLICKEADA*/
router.get('/cola/:id',function(req,res,next){
	var num=req.params.id;
	var respuesta={};
	
	Notas.findOne({alias:num}).exec(function(err, nota){
		if(err) next(err);
		Imagenes.findOne({idnotas:nota.idNotas}).sort({idimagenes:-1}).exec(function(err,imagen){
			Secciones.findOne({idsecciones:nota.idsecciones}).exec(function(err, seccion){
				if(err) next(err);

				respuesta.nota=nota;
				respuesta.imagen=imagen;
				respuesta.seccion=seccion;
				res.json(respuesta);
			});
		});
	});
});

/*SOBRE EL TEMA*/
router.get('/sobreTema/:id', function(req,res,next){
	var id=req.params.id;
	
	function getImagenes(notas){
		var indice=0;
		var respuestaF=[];
		notas.forEach(function(nota){
			Imagenes.findOne({idnotas:nota.idNotas}).sort({idimagenes:-1}).exec(function(err, imagen){
				Secciones.findOne({idsecciones: nota.idsecciones}).exec(function(err, secc){
					var aux={};
					aux.imagen=imagen;
					aux.nota=nota;
					aux.seccion=secc;
					respuestaF.push(aux);
					indice++;
					if(indice==notas.length){
						res.json(respuestaF);
					}
				});
			});
		});
	}
	
	tagsxnotas.find({idnotas:id}).exec(function(err, idTags){
		Tags.find({idtags:{$in:[idTags[0].idtags,idTags[1].idtags,idTags[2].idtags,idTags[3].idtags,idTags[4].idtags]}}).exec(function(err, tags){
			if (err) next(err);
			
			Tags.find({nombre:{$in:[tags[0].nombre,tags[1].nombre,tags[2].nombre,tags[3].nombre,tags[4].nombre]}}).sort({idtags:-1}).limit(5).exec(function(err,temas){
				if(err) next(err);
				
				tagsxnotas.find({idtags:{$in:[temas[0].idtags,temas[1].idtags,temas[2].idtags,temas[3].idtags,temas[4].idtags]},idnotas:{$ne:id}}).sort({idnotas:-1}).limit(3).exec(function(err, txn){
					if(err) next(err);
					
					Notas.find({idNotas:{$in:[txn[0].idnotas,txn[1].idnotas,txn[2].idnotas,]}}).exec(function(err, n){
						getImagenes(n);
					});
				});
			});
		});
	});
});

/*GET DE NOTAS PARA PORTADA*/
router.get('/portada',function(req,res,next){
	var portada={};
	var cont=0;
	fechaActual= new Date();
	function respuesta(){
		if(cont==5){
			res.json(portada);
		}
	}
	
	Notas.findOne({prioridad:1, fecha_inicio:{$lte:fechaActual}, status:1}).sort({'fecha_inicio':-1}).exec(function(err,uno){
		portada.uno=uno;
		Imagenes.find({idnotas:uno.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
			cont++;
			portada.imguno=img;
			respuesta();
		});
	});
	Notas.findOne({prioridad:2, fecha_inicio:{$lte:fechaActual}, status:1}).sort({'fecha_inicio':-1}).exec(function(err,dos){
		portada.dos=dos;
		Imagenes.find({idnotas:dos.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
			cont++;
			portada.imgdos=img;
			respuesta();
		});
	});
	Notas.findOne({prioridad:3, fecha_inicio:{$lte:fechaActual}, status:1}).sort({'fecha_inicio':-1}).exec(function(err,tres){
		portada.tres=tres;
		Imagenes.find({idnotas:tres.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
			cont++;
			portada.imgtres=img;
			respuesta();
		});
	});
	Notas.findOne({prioridad:4, fecha_inicio:{$lte:fechaActual}, status:1}).sort({'fecha_inicio':-1}).exec(function(err,cuatro){
		portada.cuatro=cuatro;
		Imagenes.find({idnotas:cuatro.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
			cont++;
			portada.imgcuatro=img;
			respuesta();
		});
	});
	Notas.findOne({prioridad:5, fecha_inicio:{$lte:fechaActual}, status:1}).sort({'fecha_inicio':-1}).exec(function(err,cinco){
		portada.cinco=cinco;
		Imagenes.find({idnotas:cinco.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
			cont++;
			portada.imgcinco=img;
			respuesta();
		});
	});
});

/*GET PARA AL MOMENTO*/
router.get('/almomento', function(req,res,next){
	fechaActual= new Date();
	Notas.find({'fecha_inicio':{$lte: fechaActual},status: 1, prioridad:0}).sort({'fecha_inicio': -1}).limit(4).exec(function (err, notas) {
		res.json(notas);
	});
});

/*GET PARA AL MOMENTO CON NUMERO*/
router.get('/almom/:id', function(req,res,next){
	var num=req.params.id;
	fechaActual= new Date();
	Notas.find({'fecha_inicio':{$lte: fechaActual},status:1,prioridad:0,momento:false}).sort({'fecha_inicio': -1}).limit(Number(num)).exec(function (err, notas) {
		res.json(notas);
	});
});

/*GET PARA MAS DESTACADAS*/
router.get('/masDestacados', function(req, res, next){
	fechaActual= new Date();
	var menosHrs=new Date();
	menosHrs.setHours(fechaActual.getHours()-4);
	Notas.find({fecha_inicio:{$gte:menosHrs, $lte:fechaActual}, prioridad:0}).sort({'fecha_inicio': -1}).exec(function (err, notas) {
		var indexDestacado=0;
	  	var respuesta=[];
		var populares=[];
		var aux={};
		var j=0;
		
		if (err) return handleError(err);
	  	
		function getSecciones(nota,img){
			
			Secciones.findOne({idsecciones: nota.idsecciones}).exec(function(err, seccion){
				j++;
				aux={};
				aux.img=img;
				aux.nota=nota;
				aux.seccion=seccion;
				populares.push(aux);
				if(j==3)
					res.json(populares);
			});
		}
		
		function ordena(){
			//Ordena
			function compare(a,b) {
			  if (a.nHits < b.nHits)
				return 1;
			  if (a.nHits > b.nHits)
				return -1;
			  return 0;
			}
			var procesadas=0;
			respuesta=respuesta.sort(compare);
			for(var i=0;i<3;i++){
				Imagenes.find({idnotas:respuesta[i].nota.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
					switch(img[0].idnotas){
						case respuesta[0].nota.idNotas:
							getSecciones(respuesta[0].nota,img);
							break;
						case respuesta[1].nota.idNotas:
							getSecciones(respuesta[1].nota,img);
							break;
						case respuesta[2].nota.idNotas:
							getSecciones(respuesta[2].nota,img);
							break;
					}
				});
			}
		}
		
		notas.forEach(function(nota){
			if (err) return handleError(err);
			
			indexDestacado+=1;
			var aux={};
			aux.nHits=nota.hits;
			aux.nota=nota;
			aux.tags=[];
			respuesta.push(aux);
			if(indexDestacado==notas.length)
				ordena();
		});
	
	});
});

/*GET PARA ES NOTICIA*/
router.get('/esNoticia',function(req,res,next){
	var respuesta=[];
	var aux={};
	var contTags=0;
	fechaActual= new Date();
	Notas.find({fecha_inicio:{$lte:fechaActual}, status:1}).sort({'fecha_inicio': -1}).limit(80).exec(function (err, notas) {
		if (err) return handleError(err);
		var indexz=0;
		notas.forEach(function(nota){
			var arrids=[];
			tagsxnotas.find({idnotas: nota.idNotas}).exec(function(err,tags){
				if(err) reject(err);
				tags.forEach(function(t){
					arrids.push(t.idtags);
					if(arrids.length==tags.length){
						var aux={};
						aux.tags=[];
						Tags.find({idtags:{$in:arrids}}).exec(function(err,texto){
							aux.tags=texto;
							respuesta.push(aux);
							if(respuesta.length==notas.length){
								getTopics();
							}
						});
					}
				});
			});
		});			
	});
	function getTopics(){
		var nodoTopic={};
		for(var i =0; i < respuesta.length; i++){
			for(var k=0; k<respuesta[i].tags.length; k++){
				if(nodoTopic[respuesta[i].tags[k].nombre]==undefined)
					nodoTopic[respuesta[i].tags[k].nombre]=0;
				else
					nodoTopic[respuesta[i].tags[k].nombre]++;
			}
		}
		var keysSorted = Object.keys(nodoTopic).sort(function(a,b){return nodoTopic[a]-nodoTopic[b]});
		var cuatro=[];
		cuatro.push(keysSorted[keysSorted.length-1]);
		cuatro.push(keysSorted[keysSorted.length-2]);
		cuatro.push(keysSorted[keysSorted.length-3]);
		cuatro.push(keysSorted[keysSorted.length-4]);
		res.json(cuatro);  
	}
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*Get del user logeado*/
router.get('/loggedIn', function(req, res, next) {
    if (req.user) {
        res.send(req.user);
    } else {
        next();
    }
});

/*Cierra la variable de sesion en el servidor*/
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

/*Obtiene todos los modulos a los que puede acceder el usuario*/
router.get('/permisos', function(req,res,next){
	var user=req.query;
	mxu
	.find({ usuario: user.user })
	.populate('modulo')
	.exec(function (err, modulos) {
	  if (err) return handleError(err);
	  
		res.json(modulos);
	});
});

/*Obtiene los grupos de banners para alimentar la list box*/
router.get('/grupos', function(req, res, next){
	Grupos.find().sort({group_name:1}).exec(function(err, grupos){
		if (err) return handleError(err);
		
		res.json(grupos);
	});
});

/*Obtiene los banners y sus estadisticas para listarlos*/
router.get('/banners', function(req, res, next){
	Banners.find().populate('g_id').exec(function(err, banners){
		if (err) return handleError(err);
		
		res.json(banners);
	});
});

/*GET LAS COLUMNAS DE LOS COLABORADORES*/
router.get('/expertos', function(req,res,next){
	var indExpertos=0;
	var arrayAux=[];
	fechaActual= new Date();
	var finDia=new Date(fechaActual.getFullYear(),fechaActual.getMonth(),fechaActual.getDate(),0,0,0,0);

	Notas.find({idsecciones:{$gte:38},status:1, fecha_inicio:{$lte:fechaActual, $gte:finDia}}).sort({fecha_inicio:-1}).limit(7).exec(function(err, notaExperto){
		if (err) next(err);
		
		notaExperto.forEach(function(not){
			Secciones.findOne({idsecciones:not.idsecciones}).exec(function(err, seccion){
				indExpertos++;
				
				if(err)	next(err);
				var aux={};
				aux.nota=not;
				aux.seccion=seccion;
				arrayAux.push(aux);
				if(indExpertos==notaExperto.length)
					res.json(arrayAux);
			});
		});
	});
});

/*OBTIENE UNA NOTA DE UNA SECCION*/
router.get('/seccion/:id', function(req,res, next){
	var seccion=req.params.id;
	var respuesta={};
	fechaActual= new Date();
	function getImagenes(idNota){
		Imagenes.findOne({idnotas: idNota}).sort({idimagenes:-1}).exec(function(err, imagen){
			if (err) next(err);
			
			respuesta.imagen=imagen;
			res.json(respuesta);
		});
	}
	
	switch(seccion){
		case 'Deportes':
			Notas.findOne({idsecciones:5, fecha_inicio:{$lte:fechaActual}, status:1}).sort({fecha_inicio:-1}).exec(function(err, nota){
				if(err) next(err);
				
				respuesta.nota=nota;
				getImagenes(nota.idNotas);
			});
		break;
		case 'Nacional':
			Notas.findOne({idsecciones:3, fecha_inicio:{$lte:fechaActual}, status:1}).sort({fecha_inicio:-1}).exec(function(err, nota){
				if(err) next(err);
				
				respuesta.nota=nota;
				getImagenes(nota.idNotas);
			});
		break;
		case 'Internacional':
			Notas.findOne({idsecciones:4, fecha_inicio:{$lte:fechaActual}, status:1}).sort({fecha_inicio:-1}).exec(function(err, nota){
				if(err) next(err);
				
				respuesta.nota=nota;
				getImagenes(nota.idNotas);
			});
		break;
		case 'Espectaculos':
			Notas.findOne({idsecciones:10, fecha_inicio:{$lte:fechaActual}, status:1}).sort({fecha_inicio:-1}).exec(function(err, nota){
				if(err) next(err);
				
				respuesta.nota=nota;
				getImagenes(nota.idNotas);
			});
		break;
	}
});

/*GET SECCIONES*/
router.get('/secciones/:id', function(req, res, next){
	var seccion=req.params.id;
	var respuesta=[];
	fechaActual= new Date();
	function getImagenes(notas){
		var indice=0;
		notas.forEach(function(nota){
			Imagenes.findOne({idnotas:nota.idNotas}).sort({idimagenes:-1}).exec(function(err, imagen){
				var aux={};
				aux.imagen=imagen;
				aux.nota=nota;
				respuesta.push(aux);
				indice++;
				if(indice==notas.length){
					res.json(respuesta);
				}
			});
		});
	}
	
	switch(seccion){
		case 'SanLuis':
			Notas.find({idEstados:24, idsecciones:1, fecha_inicio:{$lte:fechaActual}, status: 1}).sort({fecha_inicio:-1}).limit(6).exec(function(err, notas){
				getImagenes(notas);
			});
		break;
		case 'Seguridad':
			Notas.find({idEstados:24, idsecciones:2, fecha_inicio:{$lte:fechaActual}, status: 1}).sort({fecha_inicio:-1}).limit(6).exec(function(err, notas){
				getImagenes(notas);
			});
		break;
		case 'Nacional':
			Notas.find({ idsecciones:3, fecha_inicio:{$lte:fechaActual}, status: 1}).sort({fecha_inicio:-1}).limit(6).exec(function(err, notas){
				getImagenes(notas);
			});
		break;
		case 'Internacional':
			Notas.find({idsecciones:4, fecha_inicio:{$lte:fechaActual}, status: 1}).sort({fecha_inicio:-1}).limit(6).exec(function(err, notas){
				getImagenes(notas);
			});
		break;
		case 'Farandula':
			Notas.find({idEstados:24, idsecciones:10, fecha_inicio:{$lte:fechaActual}, status: 1}).sort({fecha_inicio:-1}).limit(6).exec(function(err, notas){
				getImagenes(notas);
			});
		break;
		case 'Tactica':
			Notas.find({ idsecciones:5, fecha_inicio:{$lte:fechaActual}, status: 1}).sort({fecha_inicio:-1}).limit(6).exec(function(err, notas){
				getImagenes(notas);
			});
		break;
		case 'Negocios':
			Notas.find({idEstados:24, idsecciones:6, fecha_inicio:{$lte:fechaActual}, status: 1}).sort({fecha_inicio:-1}).limit(6).exec(function(err, notas){
				getImagenes(notas);
			});
		break;
		case 'Estados':
			Notas.find({ idsecciones:7, fecha_inicio:{$lte:fechaActual}, status: 1}).sort({fecha_inicio:-1}).limit(6).exec(function(err, notas){
				getImagenes(notas);
			});
		break;
		case 'Actualidad':
			Notas.find({ idsecciones:21, fecha_inicio:{$lte:fechaActual}, status: 1}).sort({fecha_inicio:-1}).limit(6).exec(function(err, notas){
				getImagenes(notas);
			});
		break;
		case 'Especial':
			Notas.find({idsecciones:22, fecha_inicio:{$lte:fechaActual}, status: 1}).sort({fecha_inicio:-1}).limit(4).exec(function(err, notas){
				getImagenes(notas);
			});
		break;
		case 'Informe':
			Notas.find({idsecciones:11, fecha_inicio:{$lte:fechaActual}, status: 1}).sort({fecha_inicio:-1}).limit(4).exec(function(err, notas){
				if(err) next(err);
				
				getImagenes(notas);
			});
		break;
	}
});

/*GET POPULARES DE LA SECCION*/
router.get('/popularSeccion/:id', function(req,res,next){
	var seccion=req.params.id;
	var aux={};
	var respuesta=[];
	var respuestaF=[];
	var indTop=0;
	var populares=[];
	fechaActual= new Date();

	function getImagenes(notas){
		var indice=0;
		notas.forEach(function(nota){
			Imagenes.findOne({idnotas:nota.nota.idNotas}).exec(function(err, imagen){
				var aux={};
				aux.imagen=imagen;
				aux.nota=nota.nota;
				aux.hits=nota.hits;
				respuestaF.push(aux);
				indice++;
				if(indice==notas.length){
					res.json(respuestaF);
				}
			});
		});
	}
	
	function ordena(){
			//Ordena
			function compare(a,b) {
			  if (a.hits.hits < b.hits.hits)
				return 1;
			  if (a.hits.hits > b.hits.hits)
				return -1;
			  return 0;
			}

			respuesta=respuesta.sort(compare);
			for(var i=0;i<2;i++){
				populares.push(respuesta[i]);
				if(i==1)
					getImagenes(populares);
			}
	}
	
	function getHits(notas){
		notas.forEach(function(nota){
			aux={};
			aux.nota=nota;
			aux.hits=nota.hits;
			respuesta.push(aux);
			indTop++;
			if(indTop==notas.length)
				ordena();
		});
	}
	
	switch(seccion){
		case 'SanLuis':
			Notas.find({status:1, idsecciones:1, fecha_inicio:{$lte:fechaActual}}).sort({fecha_inicio:-1}).limit(50).exec(function(err, notas){
				if(err) next(err);
				getHits(notas);
			});
		break;
		case 'Seguridad':
			Notas.find({status:1, idsecciones:2, fecha_inicio:{$lte:fechaActual}}).sort({fecha_inicio:-1}).limit(50).exec(function(err, notas){
				if(err) next(err);
				getHits(notas);
			});
		break;
		case 'Nacional':
			Notas.find({status:1, idsecciones:3, fecha_inicio:{$lte:fechaActual}}).sort({fecha_inicio:-1}).limit(50).exec(function(err, notas){
				if(err) next(err);
				getHits(notas);
			});
		break;
		case 'Internacional':
			Notas.find({status:1, idsecciones:4, fecha_inicio:{$lte:fechaActual}}).sort({fecha_inicio:-1}).limit(50).exec(function(err, notas){
				if(err) next(err);
				getHits(notas);
			});
		break;
		case 'Farandula':
			Notas.find({status:1, idsecciones:10, fecha_inicio:{$lte:fechaActual}}).sort({fecha_inicio:-1}).limit(50).exec(function(err, notas){
				if(err) next(err);
				getHits(notas);
			});
		break;
		case 'Tactica':
			Notas.find({status:1, idsecciones:5, fecha_inicio:{$lte:fechaActual}}).sort({fecha_inicio:-1}).limit(50).exec(function(err, notas){
				if(err) next(err);
				getHits(notas);
			});
		break;
		case 'Negocios':
			Notas.find({status:1, idsecciones:6, fecha_inicio:{$lte:fechaActual}}).sort({fecha_inicio:-1}).limit(50).exec(function(err, notas){
				if(err) next(err);
				getHits(notas);
			});
		break;
		case 'Estados':
			Notas.find({status:1, idsecciones:7, fecha_inicio:{$lte:fechaActual}}).sort({fecha_inicio:-1}).limit(100).exec(function(err, notas){
				if(err) next(err);
				getHits(notas);
			});
		break;
		case 'Actualidad':
			Notas.find({status:1, idsecciones:21, fecha_inicio:{$lte:fechaActual}}).sort({fecha_inicio:-1}).limit(50).exec(function(err, notas){
				if(err) next(err);
				getHits(notas);
			});
		break;
	}
});

/*OBTIENE 3 notas de cada seccion para la pagina principal*/
router.get('/notasSeccion/:id', function(req,res, next){
	var seccion=req.params.id;
	var aux={};
	var respuesta=[];
	var indNotas=0;
	fechaActual= new Date();
	function getImagenes(notas){
		notas.forEach(function(nota){
			Imagenes.findOne({idnotas: nota.idNotas}).sort({idnotas:-1}).exec(function(err, imagen){
				if (err) next(err);
				
				var aux={};
				
				aux.nota=nota;
				aux.imagen=imagen;
				respuesta.push(aux);
				indNotas++;
				if(indNotas==notas.length)
					res.json(respuesta);
			});
		});
	}
	
	switch(seccion){
		case 'Seguridad':
			Notas.find({idsecciones:2, fecha_inicio:{$lte:fechaActual}, status:1}).sort({fecha_inicio:-1}).limit(4).exec(function(err, notas){
				if(err) next(err);
				
				getImagenes(notas);
			});
		break;
		case 'Negocios':
			Notas.find({idsecciones:6, fecha_inicio:{$lte:fechaActual}, status:1}).sort({fecha_inicio:-1}).limit(4).exec(function(err, notas){
				if(err) next(err);
				
				getImagenes(notas);
			});
		break;
		case 'Deportes':
			Notas.find({idsecciones:5, fecha_inicio:{$lte:fechaActual}, status:1}).sort({fecha_inicio:-1}).limit(4).exec(function(err, notas){
				if(err) next(err);
				
				getImagenes(notas);
			});
		break;
		case 'Nacional':
			Notas.find({idsecciones:3, fecha_inicio:{$lte:fechaActual}, status:1}).sort({fecha_inicio:-1}).limit(4).exec(function(err, notas){
				if(err) next(err);
				
				getImagenes(notas);
			});
		break;
		case 'Internacional':
			Notas.find({idsecciones:4, fecha_inicio:{$lte:fechaActual}, status:1}).sort({fecha_inicio:-1}).limit(4).exec(function(err, notas){
				if(err) next(err);
				
				getImagenes(notas);
			});
		break;
		case 'Estados':
			Notas.find({idsecciones:7, fecha_inicio:{$lte:fechaActual}, status:1}).sort({fecha_inicio:-1}).limit(4).exec(function(err, notas){
				if(err) next(err);
				
				getImagenes(notas);
			});
		break;
		case 'Farandula':
			Notas.find({idsecciones:10, fecha_inicio:{$lte:fechaActual}, status:1}).sort({fecha_inicio:-1}).limit(4).exec(function(err, notas){
				if(err) next(err);
				
				getImagenes(notas);
			});
		break;
	}
});

/*Obtiene Banners por grupo especificado*/
router.get('/banners/:id', function(req, res, next){
	var grupo=req.params.id;
	var bannerRes=[];
	
	Banners.find().populate({
	  path: 'g_id',
	  match: {
		group_name: grupo
	  }
	}).exec(function(err, banners){
		if (err) return handleError(err);
		bannerRes=banners.filter(function(doc){
			return doc.g_id.length!=0;
		});
		
		res.json(bannerRes);
	});
});

router.get('/pagination/:secc/:pag', function(req, res, next){
	var seccion=req.params.secc;
	var pagina= Number(req.params.pag)-1;
	var respuesta=[];

	Notas.find({idsecciones:seccion}).skip(pagina*30).sort({fecha_inicio:-1}).limit(30).exec(function(err, notas){
		if(err) next(err);

		notas.forEach(function(nota){
			if(err) next(err);
			var aux={idNotas:nota.idNotas,h: nota.hits,titulo:nota.titulo,fecha_inicio:nota.fecha_inicio, fecha_final:nota.fecha_final, resumen:nota.resumen, notaCompleta:nota.notaCompleta, status:nota.status, prioridad:nota.prioridad, fechaCaptura:nota.fechaCaptura, autor:nota.autor, alias:nota.alias, idsecciones:nota.idsecciones, capturo:nota.capturo, aprobo:nota.aprobo, idEstados:nota.idEstados, idAutor:nota.idAutor, tipoNota:nota.tipoNota, special:nota.special};
			respuesta.push(aux);
			if(respuesta.length==notas.length){
				res.json(respuesta);
			}
		});
	});
});
/*Lista Notas en el editor de notas*/
router.get('/listNotas/:id', function(req, res, next){
	var seccion=req.params.id;
	var respuesta={};
	respuesta.array=[];
	var cont=0;
	fechaActual= new Date();
	console.log("ENTRO A NOTAS");
	Notas.find({idsecciones:seccion}).sort({fecha_inicio:-1}).limit(30).exec(function(err, notas){
		if(err) next(err);
		notas.forEach(function(nota){
			if(err) next(err);
			var aux={_id:nota._id, idNotas:nota.idNotas,momento: nota.momento==null?false:nota.momento,portada: nota.portada==null?0:nota.portada, h:nota.hits,noticiero:nota.noticiero==null?0:nota.noticiero ,titulo:nota.titulo,fecha_inicio:nota.fecha_inicio, fecha_final:nota.fecha_final, resumen:nota.resumen, notaCompleta:nota.notaCompleta, status:nota.status, prioridad:nota.prioridad, fechaCaptura:nota.fechaCaptura, autor:nota.autor, alias:nota.alias, idsecciones:nota.idsecciones, capturo:nota.capturo, aprobo:nota.aprobo, idEstados:nota.idEstados, idAutor:nota.idAutor, tipoNota:nota.tipoNota, special:nota.special};
			respuesta.array.push(aux);
			cont++;
			if(cont==notas.length){
				Notas.count({idsecciones:seccion, fecha_inicio:{$lte:fechaActual}}, function(err, num){
					respuesta.total=num;
					res.json(respuesta);
				});
			}
		});
	});
});

/*Lista Notas en el editor de notas*/
router.get('/listNotasP/:id', function(req, res, next){
	var seccion=req.params.id;
	var respuesta={};
	respuesta.array=[];
	var cont=0;
	fechaActual= new Date();

	Notas.find({idsecciones:seccion,fecha_inicio:{$gte:fechaActual}}).sort({fecha_inicio:-1}).limit(20).exec(function(err, notas){
		if(err) next(err);
		if(notas.length==0){
			respuesta={array:[], total:0};
			res.json(respuesta);
		}
		notas.forEach(function(nota){
			if(err) next(err);
			var aux={_id:nota._id, idNotas:nota.idNotas,momento: nota.momento==null?false:nota.momento,portada: nota.portada==null?0:nota.portada, h:nota.hits,noticiero:nota.noticiero==null?0:nota.noticiero ,titulo:nota.titulo,fecha_inicio:nota.fecha_inicio, fecha_final:nota.fecha_final, resumen:nota.resumen, notaCompleta:nota.notaCompleta, status:nota.status, prioridad:nota.prioridad, fechaCaptura:nota.fechaCaptura, alias:nota.alias, idsecciones:nota.idsecciones, capturo:nota.capturo, aprobo:nota.aprobo, idEstados:nota.idEstados, idAutor:nota.idAutor, tipoNota:nota.tipoNota, special:nota.special};
			respuesta.array.push(aux);
			cont++;
			if(cont==notas.length){
				Notas.count({idsecciones:seccion, fecha_inicio:{$lte:fechaActual}}, function(err, num){
					respuesta.total=num;
					res.json(respuesta);
				});
			}
		});
	});
});

router.get('/tags/:id', function(req, res, next){
	var idNota=req.params.id;
	var respuesta={};

	tagsxnotas.find({idnotas:idNota}).exec(function(err, txn){
		if(err) next(err);

		Tags.find({idtags:{$in:[txn[0].idtags,txn[1].idtags,txn[2].idtags,txn[3].idtags,txn[4].idtags]}}, function(err, tags){
			res.json(tags);
		});

	});
});

router.get('/denuncia', function(req, res, next){
	VideoDenuncia.findOne().sort({idVideoDenuncia:-1}).exec(function(err, video){
		if(err){next(err);}
		
		res.json(video);
	});
});

router.get('/denuncias', function(req, res, next){
	VideoDenuncia.find().sort({idVideoDenuncia:-1}).limit(13).exec(function(err, video){
		if(err){next(err);}
		
		res.json(video);
	});
});

router.get('/videosDen/:id', function(req, res, next){
	var respuesta={};
	var pagina=Number(req.params.id)-1;
	VideoDenuncia.find().sort({idVideoDenuncia:-1}).limit(10).skip(pagina).exec(function(err, video){
		if(err){next(err);}

		VideoDenuncia.count({}, function(err, num){
			respuesta.total=num;
			respuesta.array=video;
			res.json(respuesta);
		});
		
	});
});

router.get('/podcast/:id/:secc', function(req, res, next){
	var respuesta={};
	var pagina=Number(req.params.id)-1;
	var seccion=Number(req.params.secc);
	
	Podcast.find({idsecciones: seccion}).sort({fecha: -1}).limit(3).skip(pagina*3).exec(function(err, video){
		if(err){next(err);}

		Podcast.count({idsecciones:seccion}, function(err, num){
			respuesta.total=num;
			respuesta.array=video;
			res.json(respuesta);
		});
		
	});
});

router.get('/cargaMas/:id/:secc', function(req, res, next){
	var respuesta={};
	var nots=[];
	var pagina=Number(req.params.id);
	var seccion=Number(req.params.secc);
	
	Notas.find({idsecciones: seccion}).sort({fecha_inicio: -1}).limit(5).skip(pagina*5).exec(function(err, uno){
		if(err){next(err);}
		uno.forEach(function(noti){
			var not=noti;
			var aux={id:not.idNotas, alias:not.alias, titulo:not.titulo, resumen: not.resumen, fecha: not.fecha_inicio, tipo: not.tipoNota, special: not.special==0? false : true};
			Imagenes.findOne({idnotas:not.idNotas}).sort({idimagenes:-1}).exec(function(err, img){
				if(err) next(err);
				var images={};
				images.imagenPortada=img.imagenPortada;
				images.imgSeccionF=img.imgSeccionF;
				aux.imagenes=images;
				nots.push(aux);
				if(nots.length>=uno.length){
					respuesta.objetos=nots;
					res.json(respuesta);
				}
			});
		});
	});
});

router.get('/controles/:id', function(req, res, next){
	var respuesta={};
	var pagina=Number(req.params.id)-1;
	Controles.find().sort({id:-1}).limit(10).skip(pagina*10).exec(function(err, control){
		if(err){next(err);}

		Controles.count({}, function(err, num){
			respuesta.total=num;
			respuesta.array=control;
			res.json(respuesta);
		});
		
	});
});

router.get('/trafico',function(req, res, next){
	var aux={};
	var aux2={};
	var respuesta=[];
	var relacionadas=[];
	var final=[];
	fechaActual= new Date();
	function getImagenes(notas){
		var indice=0;
		notas.forEach(function(nota){
			Imagenes.findOne({idnotas:nota.nota.idNotas}).sort({idimagenes:-1}).exec(function(err, imagen){
				var aux={};
				aux.imagen=imagen;
				aux.nota=nota.nota;
				aux.tags=nota.tags;
				final.push(aux);
				indice++;
				if(indice==notas.length){
					res.json(final);
				}
			});
		});
	}
	
	function matches(notas){
		var cont2=0;
		
		notas.forEach(function(nota){
			nota.tags.forEach(function(tag){
				Tags.findOne({idtags:tag.idtags}).exec(function(err, ta){
					cont2++;
					if(ta.nombre=='trafico'||ta.nombre=='accidente vial'||ta.nombre=='choque'||ta.nombre=='vial'||ta.nombre=='vialidad'||ta.nombre=='internet')
					{
						relacionadas.push(nota);
						if(relacionadas.length==3||cont2==(notas.length*5))
							getImagenes(relacionadas);
					}
					else
						if(cont2==(notas.length*5))
							getImagenes(relacionadas);
				})
			});
		});
	}
	
	function getTags(notas){
		var cont=0;
		
		notas.forEach(function(nota){
			tagsxnotas.find({idnotas:nota.idNotas}).exec(function(err, tags){
				aux={};
				aux.nota=nota;
				aux.tags=tags;
				cont++;
				respuesta.push(aux);
				
				if(cont==notas.length)
					matches(respuesta);
			});
		});
	}
	
	Notas.find({fecha_inicio:{$lte:fechaActual}}).sort({fecha_inicio:-1}).limit(200).exec(function(err, notas){
		if(err) next(err);
		getTags(notas);
	});
});

router.get('/rangoControles', function(req, res, next){
	var fechas=req.query;

	Controles.find({dia:{$gte:fechas.inicio, $lte:fechas.fin}}).sort({id:-1}).exec(function(err, response){
		if(err) next(err);
		console.log(response);

		res.json(response);
	});
});

router.get('/noticieros/:id', function(req, res, next){
	var respuesta=[];
	fechaActual= new Date();
	function getImagenes(notas){
		var indNotas=0;
		if(notas.length==0)
			res.json(notas);
		notas.forEach(function(nota){
			Imagenes.findOne({idnotas: nota.idNotas}).sort({idimagenes:-1}).exec(function(err, imagen){
				if (err) next(err);
				
				var aux={};
				
				aux.nota=nota;
				aux.imagen=imagen;
				respuesta.push(aux);
				indNotas++;
				if(indNotas==notas.length)
					res.json(respuesta);
			});
		});
	}

	var noticiero=req.params.id;
	Notas.find({status:1, fecha_inicio:{$lte:fechaActual}, noticiero:noticiero}).sort({fecha_inicio:-1}).limit(3).exec(function(err, nots){
		if(err) next(err);

		getImagenes(nots);
	});
});

router.get('/busca/:id/:pag', function(req, res, next){
	var params = req.params.id;
	var pagin=req.params.pag;
	console.log("BUSQUEDA");
	var pagina=pagin==null?1:Number(pagin);
	console.log(typeof(pagina));
	var query=params==null?" ":params;
	var respuesta={};
	var auxTags=[];
	var auxTxn=[];
	var cont2=0;
	var nots=[];
	fechaActual= new Date();
	Tags.find({nombre:{$regex:query, $options:'i'}}).exec(function(err, tags){
		var i=0;
		for(i=0;i<tags.length-1;i++){
			auxTags.push(tags[i].idtags);
		}
		tagsxnotas.find({idtags:{$in:auxTags}}).sort({idnotas:-1}).limit(40).exec(function(err, txn){
			for(i=0;i<txn.length-1;i++){
				auxTxn.push(txn[i].idnotas);
			}
			Notas.find({idNotas:{$in:auxTxn}, fecha_inicio:{$lte:fechaActual}, status:1}).sort({idNotas:-1}).limit(3).skip((pagina-1)*3).exec(function(err, uno){
				console.log(uno);
				respuesta.tipoObjeto="Notas";

				uno.forEach(function(noti){
					var not=noti;
					var aux={id:not.idNotas, titulo:not.titulo, alias: not.alias,resumen: not.resumen, fecha: not.fecha_inicio, tipo: not.tipoNota, special: not.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};
					Imagenes.findOne({idnotas:not.idNotas}).sort({idimagenes:-1}).exec(function(err, img){
						if(err) next(err);
						var images={};
						images.imagenPortada=img.imagenPortada;
						images.imagenThumb=img.imagenThumb;
						images.imagenThumbWide=img.imagenThumbWide;
						images.imgSeccionF=img.imgSeccionF;
						aux.imagenes=images;
						Secciones.findOne({idsecciones: not.idsecciones}).exec(function(err, secc){
							if(err) next(err);
							aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
							User.findOne({idUsuario: not.idAutor}).exec(function(err, autor){
								if(err) next(err);
								if(autor==null)
									aux.autor={id: 0, nombre: ""};
								else
									aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
								tagsxnotas.find({idnotas: not.idNotas}).exec(function(err, txn){
									if(err) next(err);
									var auxTags=[];
									txn.forEach(function(tid){
										auxTags.push(tid.idtags);
										if(auxTags.length>=txn.length)
										{
											Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
												if(err) next(err);
												tags.forEach(function(t){
													var auxt={id:t.idtags, nombre: t.nombre};
													aux.tags.push(auxt);
													if(aux.tags.length>=tags.length){
														cont2++;
														nots.push(aux);
														//console.log(aux);
														if(cont2>=uno.length){
															respuesta.objetos=nots;
															res.json(respuesta);
														}
													}
												});
											});
										}
									});
								});
							});
						});
					});
				});
			});
		});
	});
});

/*GET DATA SISTEMA HITS*/
router.get('/objetivoMensual/:mes/:anual', function(req, res, next){
	var month = (req.params.mes-1);
	var year=req.params.anual;
	var fecha_ini=new Date(year,month,1,0,0,0,0);
	var fecha_f=new Date(year,month,30,0,0,0,0);
	var respuesta={};
	var contGlobal=0;

	function getHitSecc(seccion, nomSeccion){
		Notas.find({fecha_inicio:{$gte:fecha_ini, $lte:fecha_f}, idsecciones: seccion}).exec(function(err, notas){
			if(err) return next(err);

			if(notas.length==0){
				respuesta[nomSeccion]={total:0, nombre: nomSeccion};
				contGlobal++;
				if(contGlobal==18){
					res.json(respuesta);
				}
			}
			var cont=0;
			var totalH=0;
			notas.forEach(function(nota){
				totalH+=nota.hits;
				cont++;
				if(cont==notas.length){
					respuesta[nomSeccion]={total:totalH, nombre: nomSeccion};
					contGlobal++;
					if(contGlobal==18){
						res.json(respuesta);
					}
				}
			});
		});
	}

	function getHitCola(){
		Notas.find({fecha_inicio:{$gte:fecha_ini, $lte:fecha_f}, idsecciones: {$gte:38}}).exec(function(err, notas){
			var arrIds=[];

			if(notas.length==0){
				respuesta["Colaboraciones"]={total:0, nombre: "Colaboraciones"};
				contGlobal++;
				if(contGlobal==18){
					res.json(respuesta);
				}
			}
			var cont=0;
			var totalH=0;
			notas.forEach(function(nota){
				totalH+=nota.hits;
				cont++;
				if(cont==notas.length){
					respuesta["Colaboraciones"]={total:totalH, nombre: "Colaboraciones"};
					contGlobal++;
					if(contGlobal==18){
						res.json(respuesta);
					}
				}
			});
		});
	}

	function getHitDepL(){
		Notas.find({fecha_inicio:{$gte:fecha_ini, $lte:fecha_f}, idsecciones: 5, idEstados:24}).exec(function(err, notas){
			var arrIds=[];
			if(notas.length==0){
				respuesta["Deporteslocal"]={total:0, nombre: "Deportes local"};
				contGlobal++;
				if(contGlobal==18){
					res.json(respuesta);
				}
			}
			var cont=0;
			var totalH=0;
			notas.forEach(function(nota){
				totalH+=nota.hits;
				cont++;
				if(cont==notas.length){
					respuesta["Deporteslocal"]={total:totalH, nombre: "Deportes local"};
					contGlobal++;
					if(contGlobal==18){
						res.json(respuesta);
					}
				}
			});
		});
	}

	function getHitDepN(){
		Notas.find({fecha_inicio:{$gte:fecha_ini, $lte:fecha_f}, idsecciones: 5, idEstados:{$ne:24}}).exec(function(err, notas){
			var arrIds=[];
			if(notas.length==0){
				respuesta["Deportesnacional"]={total:0, nombre:"Deportes nacional"};
				contGlobal++;
				if(contGlobal==18){
					res.json(respuesta);
				}
			}
			var cont=0;
			var totalH=0;
			notas.forEach(function(nota){
				totalH+=nota.hits;
				cont++;
				if(cont==notas.length){
					respuesta["Deportesnacional"]={total:totalH, nombre: "Deportes nacional"};
					contGlobal++;
					if(contGlobal==18){
						res.json(respuesta);
					}
				}
			});
		});
	}

	function getHitRecurso(recurso, nomRec){
		HitsRecurso.aggregate([{ "$match":{'fecha':{"$gte":fecha_ini, "$lte": fecha_f}, 'Recurso': recurso } }, {"$group":{"_id":null , "total":{"$sum": "$hits"}} }], function(err, result){
			if(err) next(err);
			respuesta[nomRec]={total:result[0].total, nombre: nomRec};
			contGlobal++;
			if(contGlobal==18){
				res.json(respuesta);
			}
		});
	}

	function getObjetivos(){
		Objetivos.find({fecha: fecha_ini}).limit(1).exec(function(err, o){
			if(err) return next(err);
			respuesta.objetivos=o;
		});
	}

	getObjetivos();
	getHitSecc(1,"local");
	getHitSecc(22,"InvEsp");
	getHitSecc(11,"Denuncia");
	getHitSecc(6,"Negocios");
	getHitSecc(7,"Estados");
	getHitSecc(3,"Nacional");
	getHitSecc(4,"Internacional");
	getHitSecc(21,"Actualidad");
	getHitSecc(10,"Espectaculos");
	getHitCola();
	getHitDepL();
	getHitDepN();
	getHitRecurso(1000,"RMX");
	getHitRecurso(1001,"WFM");
	getHitRecurso(1002,"Imagen");
	getHitRecurso(1003,"Formula");
	getHitRecurso(1004,"KEBUENA");
	getHitRecurso(1005,"Vivecanal");
});

/*GET DATA SISTEMA HITS*/
router.get('/objetivoFin/:ffin', function(req, res, next){
	var fecha = new Date(req.params.ffin);
	
	function getObjetivos(){
		Objetivos.find({fecha: {$lte:fecha}}).sort({_id:-1}).exec(function(err, o){
			res.json(o);
		});
	}

	getObjetivos();
});

/*SISTEMA HITS GET INFO PARA COLABORADORES*/
router.get('/colaFiscal/:fini/:ffin', function(req, res, next){
	var inicial = new Date(req.params.fini);
	var final=new Date(req.params.ffin);
	var segmentos={};
	var contSegmentos=0;
	/*********PRUEBA  final.getFullYear()********/
	var enero = new Date(final.getFullYear(), 0, 1);
	var respuesta={};
	var contFinal=0;
	var auxLlave={};

	segmentos.erika={};
	segmentos.imagen={};
	segmentos.adetalle={};
	segmentos.noche={};
	segmentos.web={};
	respuesta.erika={};
	respuesta.imagen={};
	respuesta.adetalle={};
	respuesta.noche={};
	respuesta.web={};

	function hitBy(llave1, llave2){
		var contHs=0;
		Hits.find({idNotas: {$in: segmentos[llave1][llave2].notas}}).exec(function(err, hits){
			if(auxLlave[llave1]==undefined){
				auxLlave[llave1]={paso:true};
				contFinal++;
			}
			hits.forEach(function(h){
				if(respuesta[llave1][llave2]==null){
					respuesta[llave1][llave2]={hits:h.hits, nombre: llave2, objetivo: segmentos[llave1][llave2].objetivo};
				}
				else{
					respuesta[llave1][llave2].hits+=h.hits;	
				}
				contHs++;
				if(hits.length==contHs){
					if(contFinal==5){
						res.json(respuesta);
					}
				}
			});
		});
	}

	function getHits(segs){
		console.log(segs);
		for(var key in segs){
			for(var key2 in segs[key]){
				hitBy(key,key2);
			}
		}
	}

	//fecha_inicio:{$gte:inicial, $lte:final},
	Notas.find({fecha_inicio:{$gte:inicial, $lte:final}, idsecciones:{$gte:38}}).select({ "idNotas": 1, "fecha_inicio": 1, "idsecciones":1, "_id": 0}).sort({fecha_inicio:-1}).limit(20).exec(function(err, notas){
		notas.forEach(function(nota){
			var primerizar=new Date(nota.fecha_inicio.getFullYear(),nota.fecha_inicio.getMonth(),1,0,0,0,0);
			InfoColaborador.findOne({idseccion: nota.idsecciones}).exec(function(err, info){
				switch(info.idSegmento){
					case 1:
						if(segmentos.erika[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()]==null){
							segmentos.erika[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()]={notas:[nota.idNotas]};
							Objetivos.findOne({fecha:primerizar}).sort({_id:-1}).exec(function(err, obj){
								if(err) next(err);
								segmentos.erika[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()].objetivo=obj==null?0:obj.colaboradores
								contSegmentos++;
								if(contSegmentos==notas.length){
									getHits(segmentos);
								}
							});
						}
						else{
							segmentos.erika[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()].notas.push(nota.idNotas);
							contSegmentos++;
						}
					break;
					case 2:
						if(segmentos.imagen[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()]==null){
							segmentos.imagen[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()]={notas:[nota.idNotas]};
							Objetivos.findOne({fecha:primerizar}).sort({_id:-1}).exec(function(err, obj){
								if(err) next(err);
								segmentos.imagen[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()].objetivo=obj==null?0:obj.colaboradores
								contSegmentos++;
								if(contSegmentos==notas.length){
									getHits(segmentos);
								}
							});
						}
						else{
							segmentos.imagen[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()].notas.push(nota.idNotas);
							contSegmentos++;
						}
					break;
					case 3:
						if(segmentos.adetalle[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()]==null){
							segmentos.adetalle[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()]={notas:[nota.idNotas]};
							Objetivos.findOne({fecha:primerizar}).sort({_id:-1}).exec(function(err, obj){
								if(err) next(err);
								segmentos.adetalle[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()].objetivo=obj==null?0:obj.colaboradores
								contSegmentos++;
								if(contSegmentos==notas.length){
									getHits(segmentos);
								}
							});
						}
						else{
							segmentos.adetalle[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()].notas.push(nota.idNotas);
							contSegmentos++;
						}
					break;
					case 4:
						if(segmentos.noche[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()]==null){
							segmentos.noche[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()]={notas:[nota.idNotas]};
							Objetivos.findOne({fecha:primerizar}).sort({_id:-1}).exec(function(err, obj){
								if(err) next(err);
								segmentos.noche[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()].objetivo=obj==null?0:obj.colaboradores
								contSegmentos++;
								if(contSegmentos==notas.length){
									getHits(segmentos);
								}
							});
						}
						else{
							segmentos.noche[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()].notas.push(nota.idNotas);
							contSegmentos++;
						}
					break;
					case 5:
						if(segmentos.web[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()]==null){
							segmentos.web[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()]={notas:[nota.idNotas]};
							Objetivos.findOne({fecha:primerizar}).sort({_id:-1}).exec(function(err, obj){
								if(err) next(err);
								segmentos.web[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()].objetivo=obj==null?0:obj.colaboradores
								contSegmentos++;
								if(contSegmentos==notas.length){
									getHits(segmentos);
								}
							});
						}
						else{
							segmentos.web[Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()].notas.push(nota.idNotas);
							contSegmentos++;
						}
					break;
					case 6:
						contSegmentos++;
					break;
				}
				if(contSegmentos==notas.length){
					getHits(segmentos);
				}
			});
		});
	});
});

/*SISTEMA HITS GRAFICA POR OBJETIVOS MENSUALES*/
router.get('/semanaFiscal/:fini/:ffin', function(req, res, next){
	var inicial = new Date(req.params.fini);
	var final=new Date(req.params.ffin);
	var respuesta={};
	var respuestaFinal={};
	var contGlobal=0;
	var contNotas=0;
	var contRecurso=0;
	var semanas=0;
	var semanas2=0;
	var numSemana="";
	var enero = new Date(final.getFullYear(), 0, 1);

	var week_ini=Math.ceil( (((inicial - enero) / 86400000) + enero.getDay() + 1) / 7 );
	var week_end=Math.ceil( (((final - enero) / 86400000) + enero.getDay() + 1) / 7 );

	function getHitSecc(){
		Notas.find({fecha_inicio:{$gte:inicial, $lte:final}}).exec(function(err, notas){
			if(err) return next(err);
			var arrIds=[];

			if(notas.length==0){
				respuestaFinal[Math.ceil( (((final - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()]={total:0, nombre: Math.ceil( (((final - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()};
				sumaRecursos(respuestaFinal);
			}
			notas.forEach(function(nota){
				contNotas++;
				numSemana=Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString();
				if(respuesta[numSemana]==undefined){
					respuesta[numSemana]={hits:nota.hits, nombre: numSemana};
					semanas++;
				}
				else{
					respuesta[numSemana].hits+=nota.hits;	
				}
				if(contNotas==notas.length){
					sumaRecursos(respuesta);
				}
			});
		});
	}

	function sumaRecursos(sumar){
		HitsRecurso.aggregate([{ "$match":{'fecha':{"$gte":inicial, "$lte": final} } }, {"$group":{"_id":{"semana":{"$week": "$fecha"} } , "total":{"$sum": "$hits"}} }], function(err, result){
			if(err) next(err);
			result.forEach(function(semana){
				if(sumar[semana._id.semana]==undefined){
					sumar[semana._id.semana.toString()]={hits: semana.total, nombre: semana._id.semana.toString()};
					semanas++;
					contRecurso++;
				}
				else{
					sumar[semana._id.semana.toString()].hits=sumar[semana._id.semana.toString()].hits+semana.total;
					contRecurso++;
				}
				if(contRecurso==result.length){
					getObjetivos(sumar);
				}
			});
		});
	}

	function getObjetivos(sumar){
		var objetivosIni = new Date(inicial.getFullYear(), inicial.getMonth(), 1,0,0,0,0);
		var objetivosFin = new Date(final.getFullYear(), final.getMonth(), 1,0,0,0,0);
		var resObj={};
		var contObjes=0;

		Objetivos.find({fecha: {$gte:objetivosIni, $lte:objetivosFin} }).sort({_id:-1}).exec(function(err, o){
			if(err) return next(err);

			o.forEach(function(objet){
				contObjes++;
				if(resObj[objet.fecha.toString().substring(0,16)]==undefined){
					resObj[objet.fecha.toString().substring(0,16)]=objet;
				}
				if(contObjes==o.length){
					sumar.objetivos=resObj;
					sumar.size=semanas;
					res.json(sumar);
				}
			});
		});
	}

	getHitSecc();
});

router.get('/fiscalSecc/:fini/:ffin/:secc', function(req, res, next){
	var inicial = new Date(req.params.fini);
	var final=new Date(req.params.ffin);
	var seccion=req.params.secc;
	var respuesta={};
	var respuestaFinal={};
	var contGlobal=0;
	var contNotas=0;
	var contRecurso=0;
	var semanas=0;
	var semanas2=0;
	var numSemana="";
	var enero = new Date(final.getFullYear(), 0, 1);

	var week_ini=Math.ceil( (((inicial - enero) / 86400000) + enero.getDay() + 1) / 7 );
	var week_end=Math.ceil( (((final - enero) / 86400000) + enero.getDay() + 1) / 7 );


	function getHitSecc(){
		switch(seccion){
			case '2010':
				Notas.find({fecha_inicio:{$gte:inicial, $lte:final}, idsecciones:5, idEstados:24}).exec(function(err, notas){
					if(err) return next(err);
					var arrIds=[];

					if(notas.length==0){
						respuestaFinal[Math.ceil( (((final - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()]={total:0, nombre: Math.ceil( (((final - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()};
						sumaRecursos(respuestaFinal);
					}
					notas.forEach(function(nota){
						contNotas++;
						numSemana=Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString();
						if(respuesta[numSemana]==undefined){
							respuesta[numSemana]={hits:nota.hits, nombre: numSemana};
							semanas++;
						}
						else{
							respuesta[numSemana].hits+=nota.hits;	
						}
						if(contNotas==notas.length){
							getObjetivos(respuesta);
						}
					});
				});
			break;
			case '2013':
				Notas.find({fecha_inicio:{$gte:inicial, $lte:final}, idsecciones:5, idEstados:{$ne:24}}).exec(function(err, notas){
					if(err) return next(err);
					var arrIds=[];

					if(notas.length==0){
						respuestaFinal[Math.ceil( (((final - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()]={total:0, nombre: Math.ceil( (((final - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()};
						sumaRecursos(respuestaFinal);
					}
					notas.forEach(function(nota){
						contNotas++;
						numSemana=Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString();
						if(respuesta[numSemana]==undefined){
							respuesta[numSemana]={hits:nota.hits, nombre: numSemana};
							semanas++;
						}
						else{
							respuesta[numSemana].hits+=nota.hits;	
						}
						if(contNotas==notas.length){
							getObjetivos(respuesta);
						}
					});
				});
			break;
			default:
				Notas.find({fecha_inicio:{$gte:inicial, $lte:final}, idsecciones:seccion}).exec(function(err, notas){
					if(err) return next(err);
					var arrIds=[];

					if(notas.length==0){
						respuestaFinal[Math.ceil( (((final - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()]={total:0, nombre: Math.ceil( (((final - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()};
						sumaRecursos(respuestaFinal);
					}
					notas.forEach(function(nota){
						contNotas++;
						numSemana=Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString();
						if(respuesta[numSemana]==undefined){
							respuesta[numSemana]={hits:nota.hits, nombre: numSemana};
							semanas++;
						}
						else{
							respuesta[numSemana].hits+=nota.hits;	
						}
						if(contNotas==notas.length){
							getObjetivos(respuesta);
						}
					});
				});
		}
	}

	function getObjetivos(sumar){
		var objetivosIni = new Date(inicial.getFullYear(), inicial.getMonth(), 1,0,0,0,0);
		var objetivosFin = new Date(final.getFullYear(), final.getMonth(), 1,0,0,0,0);
		var resObj={};
		var contObjes=0;

		Objetivos.find({fecha: {$gte:objetivosIni, $lte:objetivosFin} }).sort({_id:-1}).exec(function(err, o){
			if(err) return next(err);

			o.forEach(function(objet){
				contObjes++;
				if(resObj[objet.fecha.toString().substring(0,16)]==undefined){
					switch(Number(seccion)){
						case 22:
							resObj[objet.fecha.toString().substring(0,16)]=objet.investigaciones;
						break;
						case 1:
							resObj[objet.fecha.toString().substring(0,16)]=objet.local;
						break;
						case 11:
							resObj[objet.fecha.toString().substring(0,16)]=objet.denuncia;
						break;
						case 6:
							resObj[objet.fecha.toString().substring(0,16)]=objet.negocios;
						break;
						case 7:
							resObj[objet.fecha.toString().substring(0,16)]=objet.estados;
						break;
						case 3:
							resObj[objet.fecha.toString().substring(0,16)]=objet.nacional;
						break;
						case 4:
							resObj[objet.fecha.toString().substring(0,16)]=objet.internacional;
						break;
						case 21:
							resObj[objet.fecha.toString().substring(0,16)]=objet.actualidad;
						break;
						case 10:
							resObj[objet.fecha.toString().substring(0,16)]=objet.espectaculos;
						break;
						case 2010:
							resObj[objet.fecha.toString().substring(0,16)]=objet.deportesLocal;
						break;
						case 2013:
							resObj[objet.fecha.toString().substring(0,16)]=objet.deportesNacional;
						break;
					}
				}
				if(contObjes==o.length){
					sumar.objetivos=resObj;
					sumar.size=semanas;
					res.json(sumar);
				}
			});
		});
	}

	getHitSecc();
});

router.get('/fiscalSeccCola/:fini/:ffin', function(req, res, next){
	var inicial = new Date(req.params.fini);
	var final=new Date(req.params.ffin);
	var respuesta={};
	var respuestaFinal={};
	var contGlobal=0;
	var contNotas=0;
	var contRecurso=0;
	var semanas=0;
	var semanas2=0;
	var numSemana="";
	var enero = new Date(final.getFullYear(), 0, 1);

	var week_ini=Math.ceil( (((inicial - enero) / 86400000) + enero.getDay() + 1) / 7 );
	var week_end=Math.ceil( (((final - enero) / 86400000) + enero.getDay() + 1) / 7 );

	function getHitSecc(){
		Notas.find({fecha_inicio:{$gte:inicial, $lte:final}, idsecciones:{$gte:38}}).exec(function(err, notas){
			if(err) return next(err);
			var arrIds=[];

			if(notas.length==0){
				respuestaFinal[Math.ceil( (((final - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()]={total:0, nombre: Math.ceil( (((final - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString()};
				sumaRecursos(respuestaFinal);
			}
			notas.forEach(function(nota){
				contNotas++;
				numSemana=Math.ceil( (((nota.fecha_inicio - enero) / 86400000) + enero.getDay() + 1) / 7 ).toString();
				if(respuesta[numSemana]==undefined){
					respuesta[numSemana]={hits:nota.hits, nombre: numSemana};
					semanas++;
				}
				else{
					respuesta[numSemana].hits+=nota.hits;	
				}
				if(contNotas==notas.length){
					getObjetivos(respuesta);
				}
			});
		});
	}

	function getObjetivos(sumar){
		var objetivosIni = new Date(inicial.getFullYear(), inicial.getMonth(), 1,0,0,0,0);
		var objetivosFin = new Date(final.getFullYear(), final.getMonth(), 1,0,0,0,0);
		var resObj={};
		var contObjes=0;

		Objetivos.find({fecha: {$gte:objetivosIni, $lte:objetivosFin} }).sort({_id:-1}).exec(function(err, o){
			if(err) return next(err);

			o.forEach(function(objet){
				contObjes++;
				if(resObj[objet.fecha.toString().substring(0,16)]==undefined){
					resObj[objet.fecha.toString().substring(0,16)]=objet.colaboradores;
				}
				if(contObjes==o.length){
					sumar.objetivos=resObj;
					sumar.size=semanas;
					res.json(sumar);
				}
			});
		});
	}

	getHitSecc();
});

router.get('/fiscalEsta/:fini/:ffin/:rec', function(req, res, next){
	var inicial = new Date(req.params.fini);
	var final=new Date(req.params.ffin);
	var seccion=req.params.rec;
	var respuesta={};
	var respuestaFinal={};
	var contGlobal=0;
	var contNotas=0;
	var contRecurso=0;
	var semanas=0;
	var semanas2=0;
	var enero = new Date(final.getFullYear(), 0, 1);

	var week_ini=Math.ceil( (((inicial - enero) / 86400000) + enero.getDay() + 1) / 7 );
	var week_end=Math.ceil( (((final - enero) / 86400000) + enero.getDay() + 1) / 7 );
	function sumaRecursos(sumar){
			console.log(typeof(seccion));
		HitsRecurso.aggregate([{ "$match":{'fecha':{"$gte":inicial, "$lte": final}, 'Recurso': Number(seccion) } }, {"$group":{"_id":{"semana":{"$week": "$fecha"} } , "total":{"$sum": "$hits"}} }], function(err, result){
			console.log(result);
			if(err) next(err);
			result.forEach(function(semana){
				if(sumar[semana._id.semana]==undefined){
					sumar[semana._id.semana.toString()]={total: semana.total, nombre: semana._id.semana.toString()};
					semanas++;
					contRecurso++;
				}
				else{
					sumar[semana._id.semana.toString()].total=sumar[semana._id.semana.toString()].total+semana.total;
					contRecurso++;
				}
				if(contRecurso==result.length){
					getObjetivos(sumar);
				}
			});
		});
	}

	function getObjetivos(sumar){
		var objetivosIni = new Date(inicial.getFullYear(), inicial.getMonth(), 1,0,0,0,0);
		var objetivosFin = new Date(final.getFullYear(), final.getMonth(), 1,0,0,0,0);
		var resObj={};
		var contObjes=0;

		Objetivos.find({fecha: {$gte:objetivosIni, $lte:objetivosFin} }).sort({_id:-1}).exec(function(err, o){
			o.forEach(function(objet){
				contObjes++;
				if(resObj[objet.fecha.toString().substring(0,16)]==undefined){
					resObj[objet.fecha.toString().substring(0,16)]=objet;
				}
				if(contObjes==o.length){
					respuestaFinal.objetivos=resObj;
					respuestaFinal.size=semanas;
					res.json(respuestaFinal);
				}
			});
		});
	}

	sumaRecursos(respuestaFinal);
});

router.get('/hitsMensualEsta/:ffin/:esta', function(req, res, next){
	var final=new Date(req.params.ffin);
	var mes=final.getMonth();
	var estacion=req.params.esta;
	var auxMes=final.getMonth()+1;
	var contFinal=0;

	for(var i=mes; i>=0; i--){
		var fecha1=new Date(final.getFullYear(),i,1,0,0,0,0);	
		var fecha2=new Date(final.getFullYear(),i,30,0,0,0,0);	
		var semanas=0;
		var contRecurso=0;
		var contNotas=0;
		var contGlobal=0;
		var arrayFinal=[];
		var respuestaFinal={};
		var respuesta={};

		function sumaRecursos(sumar){
			HitsRecurso.aggregate([{ "$match":{'fecha':{"$gte":fecha1, "$lte": fecha2}, 'Recurso': Number(estacion) } }, {"$group":{"_id":{"mes":{"$month": "$fecha"} } , "total":{"$sum": "$hits"}} }], function(err, result){
				if(err) next(err);
				console.log(result);
				result.forEach(function(semana){
					if(sumar[(semana._id.mes-1).toString()]==undefined){
						sumar[(semana._id.mes-1).toString()]={total: semana.total, nombre: (semana._id.mes-1).toString()};
						semanas++;
						contRecurso++;
					}
					else{
						sumar[(semana._id.mes-1).toString()].total=sumar[(semana._id.mes-1).toString()].total+semana.total;
						contRecurso++;
					}
					if(contRecurso==result.length){
						getObjetivos(sumar);
					}
				});
			});
		}

		function getObjetivos(sumar){
			var resObj={};
			var contObjes=0;

			Objetivos.find({fecha: fecha1 }).sort({_id:-1}).limit(1).exec(function(err, o){
				respuestaFinal.objetivos=o;
				respuestaFinal.size=auxMes;
				respuestaFinal.nombre=fecha1.getMonth();
				contFinal++;
				arrayFinal.push(respuestaFinal);
				if(contFinal==auxMes){
					res.json(arrayFinal);
				}
			});
		}

		sumaRecursos(respuestaFinal);
	}
});

router.get('/hitsMensualCola/:ffin', function(req, res, next){
	var final=new Date(req.params.ffin);
	var mes=final.getMonth();
	var auxMes=final.getMonth()+1;
	var contFinal=0;
	var fecha1=new Date(final.getFullYear(),0,1,0,0,0,0);	
	var fecha2=new Date(final.getFullYear(),final.getMonth(),30,0,0,0,0);	
	var semanas=0;
	var contRecurso=0;
	var contNotas=0;
	var contGlobal=0;
	var arrayFinal=[];
	var respuestaFinal={};
	var respuesta={};

	function getHitSecc(){
		Notas.find({fecha_inicio:{$gte:fecha1, $lte:fecha2},idsecciones:{$gte:38}}).exec(function(err, notas){
			if(err) return next(err);
			var arrIds=[];

			if(notas.length==0){
				respuestaFinal[fecha1.getMonth().toString()]={total:0, nombre: fecha1.getMonth().toString()};
				sumaRecursos(respuestaFinal);
			}
			notas.forEach(function(nota){
				contNotas++;
				if(respuesta[nota.fecha_inicio.getMonth().toString()]==undefined){
					respuesta[nota.fecha_inicio.getMonth().toString()]={hits:nota.hits, nombre: nota.fecha_inicio.getMonth().toString()};
					semanas++;
				}
				else{
					respuesta[nota.fecha_inicio.getMonth().toString()].hits+=nota.hits;	
				}
				if(contNotas==notas.length){
					getObjetivos(respuesta);
				}
			});
		});
	}

	function getObjetivos(sumar){
		var resObj={};
		var contObjes=0;

		Objetivos.find({fecha: {$gte:fecha1, $lte:fecha2}}).exec(function(err, o){
			if(err) next(err);
			sumar.size=auxMes;
			sumar.objetivos={};
			o.forEach(function(objMes){
				sumar.objetivos[objMes.fecha.getMonth().toString()]=objMes.espectaculos;
				contObjes++;
				if(contObjes>=o.length)
					res.json(sumar);
			});
		});
	}

	getHitSecc();
});

router.get('/hitsDiarios/:fini/:ffin', function(req, res, next){
	var inicial = new Date(req.params.fini);
	var final=new Date(req.params.ffin);
	var respuestaFinal={};
	var contNotas=0;
	var respuesta={};
	var semanas=0;
	var contGlobal=0;

	//var contRecurso=0;
	//var semanas2=0;
	//var enero = new Date(final.getFullYear(), 0, 1);
	//var week_ini=Math.ceil( (((inicial - enero) / 86400000) + enero.getDay() + 1) / 7 );
	//var week_end=Math.ceil( (((final - enero) / 86400000) + enero.getDay() + 1) / 7 );

	function getHitSecc(){
		Notas.find({fecha_inicio:{$gte:inicial, $lte:final}}).select({ "idNotas": 1, "fecha_inicio": 1, "_id": 0}).exec(function(err, notas){
			var arrIds=[];

			if(notas.length==0){
				respuestaFinal["0"]={total:0, nombre: "0"};
				sumaRecursos(respuestaFinal);
			}
			notas.forEach(function(nota){
				contNotas++;
				//Mes no existe
				if(respuesta[nota.fecha_inicio.getMonth()]==undefined){
					respuesta[nota.fecha_inicio.getMonth()]={dias:{} };
					if(respuesta[nota.fecha_inicio.getMonth()].dias[nota.fecha_inicio.getDate()]==undefined){
						respuesta[nota.fecha_inicio.getMonth()].dias[nota.fecha_inicio.getDate()]={notas:[], nombre: nota.fecha_inicio.getDate()};
						respuesta[nota.fecha_inicio.getMonth()].dias[nota.fecha_inicio.getDate()].notas.push(nota.idNotas);
						semanas++;
					}
				}
				else{
					if(respuesta[nota.fecha_inicio.getMonth()].dias[nota.fecha_inicio.getDate()]==undefined){
						respuesta[nota.fecha_inicio.getMonth()].dias[nota.fecha_inicio.getDate()]={notas:[], nombre: nota.fecha_inicio.getDate()};
						respuesta[nota.fecha_inicio.getMonth()].dias[nota.fecha_inicio.getDate()].notas.push(nota.idNotas);
						semanas++;
					}else{
						respuesta[nota.fecha_inicio.getMonth()].dias[nota.fecha_inicio.getDate()].notas.push(nota.idNotas);	
					}
				}
				if(contNotas==notas.length){
					//Recorre Meses
					for (var key in respuesta) {
						for(var key2 in respuesta[key].dias){
							Hits.find({idNotas:{$in:respuesta[key].dias[key2].notas}}).exec(function(err, resp){
								var totalH=0;
								var cont=0;
											console.log(key);
											console.log(key2);
								resp.forEach(function(h){
									totalH+=h.hits;
									cont++;
									if(cont==resp.length){
										if(respuestaFinal[key]==undefined){
											respuestaFinal[key]={dias:{}, nombreMes:key};
										}
										respuestaFinal[key].dias[key2]={total:totalH, nombre: key2};
										contGlobal++;
										if(contGlobal==semanas){
											console.log(respuestaFinal);
											//sumaRecursos(respuestaFinal);
										}
									}
								});
							});
						}
					}
				}
			});
		});
	}

	function sumaRecursos(sumar){
		HitsRecurso.aggregate([{ "$match":{'fecha':{"$gte":inicial, "$lte": final} } }, {"$group":{"_id":{"semana":{"$week": "$fecha"} } , "total":{"$sum": "$hits"}} }], function(err, result){
			if(err) next(err);
			result.forEach(function(semana){
				if(sumar[semana._id.semana]==undefined){
					sumar[semana._id.semana.toString()]={total: semana.total, nombre: semana._id.semana.toString()};
					semanas++;
					contRecurso++;
				}
				else{
					sumar[semana._id.semana.toString()].total=sumar[semana._id.semana.toString()].total+semana.total;
					contRecurso++;
				}
				if(contRecurso==result.length){
					getObjetivos(sumar);
				}
			});
		});
	}

	function getObjetivos(sumar){
		var objetivosIni = new Date(inicial.getFullYear(), inicial.getMonth(), 1,0,0,0,0);
		var objetivosFin = new Date(final.getFullYear(), final.getMonth(), 1,0,0,0,0);
		var resObj={};
		var contObjes=0;

		Objetivos.find({fecha: {$gte:objetivosIni, $lte:objetivosFin} }).sort({_id:-1}).exec(function(err, o){
			o.forEach(function(objet){
				contObjes++;
				if(resObj[objet.fecha.toString().substring(0,16)]==undefined){
					resObj[objet.fecha.toString().substring(0,16)]=objet;
				}
				if(contObjes==o.length){
					respuestaFinal.objetivos=resObj;
					respuestaFinal.size=semanas;
					res.json(respuestaFinal);
				}
			});
		});
	}

	getHitSecc();
});

router.get('/hitsMensual/:ffin', function(req, res, next){
	var final=new Date(req.params.ffin);
	var mes=final.getMonth();
	var auxMes=final.getMonth()+1;
	var contFinal=0;
	var fecha1=new Date(final.getFullYear(),0,1,0,0,0,0);	
	var fecha2=new Date(final.getFullYear(),final.getMonth(),30,0,0,0,0);	
	var semanas=0;
	var contRecurso=0;
	var contNotas=0;
	var contGlobal=0;
	var arrayFinal=[];
	var respuestaFinal={};
	var respuesta={};

	function getHitSecc(){
		Notas.find({fecha_inicio:{$gte:fecha1, $lte:fecha2}}).exec(function(err, notas){
			if(err) return next(err);
			var arrIds=[];

			if(notas.length==0){
				respuestaFinal[fecha1.getMonth().toString()]={total:0, nombre: fecha1.getMonth().toString()};
				sumaRecursos(respuestaFinal);
			}
			notas.forEach(function(nota){
				contNotas++;
				if(respuesta[nota.fecha_inicio.getMonth().toString()]==undefined){
					respuesta[nota.fecha_inicio.getMonth().toString()]={hits:nota.hits, nombre: nota.fecha_inicio.getMonth().toString()};
					semanas++;
				}
				else{
					respuesta[nota.fecha_inicio.getMonth().toString()].hits+=nota.hits;	
				}
				if(contNotas==notas.length){
					sumaRecursos(respuesta);
				}
			});
		});
	}
	function sumaRecursos(sumar){
		contRecurso=0;
		HitsRecurso.aggregate([{ "$match":{'fecha':{"$gte":fecha1, "$lte": fecha2} } }, {"$group":{"_id":{"mes":{"$month": "$fecha"} } , "total":{"$sum": "$hits"}} }], function(err, result){
			if(err) return next(err);
			result.forEach(function(semana){
				if(sumar[(semana._id.mes-1).toString()]==undefined){
					sumar[(semana._id.mes-1).toString()]={hits: semana.total, nombre: (semana._id.mes-1).toString()};
					semanas++;
					contRecurso++;
				}
				else{
					sumar[(semana._id.mes-1).toString()].hits+=semana.total;
					contRecurso++;
				}
				if(contRecurso==result.length){
					getObjetivos(sumar);
				}
			});
		});
	}

	function getObjetivos(sumar){
		var resObj={};
		var contObjes=0;

		Objetivos.find({fecha: {$gte:fecha1, $lte:fecha2}}).exec(function(err, o){
			if(err) next(err);
			sumar.size=auxMes;
			sumar.objetivos={};
			o.forEach(function(objMes){
				sumar.objetivos[objMes.fecha.getMonth().toString()]=objMes;
				contObjes++;
				if(contObjes>=o.length)
					res.json(sumar);
			});
		});
	}

	getHitSecc();
});

router.get('/hitsMensualS/:ffin/:secc', function(req, res, next){

	var final=new Date(req.params.ffin);
	var seccion=req.params.secc;
	var mes=final.getMonth();
	var auxMes=final.getMonth()+1;
	var contFinal=0;
	var fecha1=new Date(final.getFullYear(),0,1,0,0,0,0);	
	var fecha2=new Date(final.getFullYear(),final.getMonth(),30,0,0,0,0);	
	var semanas=0;
	var contRecurso=0;
	var contNotas=0;
	var contGlobal=0;
	var arrayFinal=[];
	var respuestaFinal={};
	var respuesta={};

	function getHitSecc(){
		switch(seccion){
			case'2010':
				Notas.find({fecha_inicio:{$gte:fecha1, $lte:fecha2},idsecciones:5, idEstados:24}).exec(function(err, notas){
					if(err) return next(err);
					var arrIds=[];

					if(notas.length==0){
						respuestaFinal[fecha1.getMonth().toString()]={total:0, nombre: fecha1.getMonth().toString()};
						sumaRecursos(respuestaFinal);
					}
					notas.forEach(function(nota){
						contNotas++;
						if(respuesta[nota.fecha_inicio.getMonth().toString()]==undefined){
							respuesta[nota.fecha_inicio.getMonth().toString()]={hits:nota.hits, nombre: nota.fecha_inicio.getMonth().toString()};
							semanas++;
						}
						else{
							respuesta[nota.fecha_inicio.getMonth().toString()].hits+=nota.hits;	
						}
						if(contNotas==notas.length){
							getObjetivos(respuesta);
						}
					});
				});
			break;
			case'2013':
				Notas.find({fecha_inicio:{$gte:fecha1, $lte:fecha2},idsecciones:5, idEstados:{$ne:24}}).exec(function(err, notas){
					if(err) return next(err);
					var arrIds=[];

					if(notas.length==0){
						respuestaFinal[fecha1.getMonth().toString()]={total:0, nombre: fecha1.getMonth().toString()};
						sumaRecursos(respuestaFinal);
					}
					notas.forEach(function(nota){
						contNotas++;
						if(respuesta[nota.fecha_inicio.getMonth().toString()]==undefined){
							respuesta[nota.fecha_inicio.getMonth().toString()]={hits:nota.hits, nombre: nota.fecha_inicio.getMonth().toString()};
							semanas++;
						}
						else{
							respuesta[nota.fecha_inicio.getMonth().toString()].hits+=nota.hits;	
						}
						if(contNotas==notas.length){
							getObjetivos(respuesta);
						}
					});
				});
			break;
			default:
				Notas.find({fecha_inicio:{$gte:fecha1, $lte:fecha2},idsecciones:seccion}).exec(function(err, notas){
					if(err) return next(err);
					var arrIds=[];

					if(notas.length==0){
						respuestaFinal[fecha1.getMonth().toString()]={total:0, nombre: fecha1.getMonth().toString()};
						sumaRecursos(respuestaFinal);
					}
					notas.forEach(function(nota){
						contNotas++;
						if(respuesta[nota.fecha_inicio.getMonth().toString()]==undefined){
							respuesta[nota.fecha_inicio.getMonth().toString()]={hits:nota.hits, nombre: nota.fecha_inicio.getMonth().toString()};
							semanas++;
						}
						else{
							respuesta[nota.fecha_inicio.getMonth().toString()].hits+=nota.hits;	
						}
						if(contNotas==notas.length){
							getObjetivos(respuesta);
						}
					});
				});
		}
	}

	function getObjetivos(sumar){
		var resObj={};
		var contObjes=0;

		Objetivos.find({fecha: {$gte:fecha1, $lte:fecha2}}).exec(function(err, o){
			if(err) next(err);
			sumar.size=auxMes;
			sumar.objetivos={};
			o.forEach(function(objMes){
				
				switch(Number(seccion)){
						case 22:
							sumar.objetivos[objMes.fecha.getMonth().toString()]=objMes.investigaciones;
						break;
						case 1:
							sumar.objetivos[objMes.fecha.getMonth().toString()]=objMes.local;
						break;
						case 11:
							sumar.objetivos[objMes.fecha.getMonth().toString()]=objMes.denuncia;
						break;
						case 6:
							sumar.objetivos[objMes.fecha.getMonth().toString()]=objMes.negocios;
						break;
						case 7:
							sumar.objetivos[objMes.fecha.getMonth().toString()]=objMes.estados;
						break;
						case 3:
							sumar.objetivos[objMes.fecha.getMonth().toString()]=objMes.nacional;
						break;
						case 4:
							sumar.objetivos[objMes.fecha.getMonth().toString()]=objMes.internacional;
						break;
						case 21:
							sumar.objetivos[objMes.fecha.getMonth().toString()]=objMes.actualidad;
						break;
						case 10:
							sumar.objetivos[objMes.fecha.getMonth().toString()]=objMes.espectaculos;
						break;
						case 2010:
							sumar.objetivos[objMes.fecha.getMonth().toString()]=objMes.deportesLocal;
						break;
						case 2013:
							sumar.objetivos[objMes.fecha.getMonth().toString()]=objMes.deportesNacional;
						break;
				}				
				contObjes++;
				if(contObjes>=o.length)
					res.json(sumar);
				});
		});
	}

	getHitSecc();
});
/*END GET DATA SISTEMA HITS*/
/************************************POST AREA************************************************/
/*LOGIN*/
router.post('/login', function(req, res, next) {	
  passport.authenticate('local', function(err, user, info) {
	  	console.log(err);
	  	console.log(user);
	  	console.log(info);
	  	if (err) { return next(info); }
	  
	  	if (!user) { return next(info); }
    	req.logIn(user, function(err) {
      		if (err) { return next(err); }
			
			return res.send(user);
		});	  
  })(req, res, next)
});
// Carga la imagen
router.post('/upload', multipartyMiddleware, function(req,res, next){
    var file = req.files;
	var data={};
	var formulario=req.body;
	
	Grupos.find({group_name: formulario.grupo}).exec(function(err, grupo){
		if (err) return handleError(err);
		
		data.g_id=grupo[0]._id;
		data.id=0;
		data.name=formulario.nombreBanner;
		data.path=file.file.path;
		data.type="image";
		data.hyperlink=formulario.enlace;
		data.height=Number(formulario.alto);
		data.width=Number(formulario.ancho);
		data.impressions=0;
		data.clicks=0;
		data.date_s=formulario.fechaIni;
		data.date_e=formulario.fechaFin;
		data.flashvar=0;
		data.pixel_tracking=0;
		data.tags=formulario.tags;
		data.status=1;
		data.hits=0;

		var ban=new Banners(data);
		
		ban.save(function(err, baner){
			if (err) next(err);
			
			var dateObj = new Date();
			var month = dateObj.getUTCMonth() + 1;
			var year = dateObj.getUTCFullYear();
			
			var dataRep={b_id: baner._id, month: 0, clicks: 0, year: year, month: month};
			var rep=new Reportes(dataRep);
			
			rep.save(function(err, repo){
				res.json(baner);
			});
			
		});
	});
});

// Carga la nota
router.post('/uploadNota', multipartyMiddleware2, function(req,res, next){
    var files = req.files;
	var data={};
	var formulario=req.body;
	var date=new Date();
	var lastId=0;
	var registroNota={};
	var registroImagenes={};
	var tempPath=files.file.path;
	var month = (date.getMonth()+1)<10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
	var day = date.getDate()<10 ? '0'+date.getDate() : ''+date.getDate();

	
	var resizeImages=function(tempPath,targetPathImg){
		sharp(tempPath)
		.resize(780,316)
		.toFile(targetPathImg+'portada.jpg',function(err, info){
			if (err) next(err);
		});
		sharp(tempPath)
		.resize(764,422)
		.toFile(targetPathImg+'artprincipal.jpg',function(err, info){
			if (err) next(err);
		});
		sharp(tempPath)
		.resize(385,316)
		.toFile(targetPathImg+'seccion1.jpg',function(err, info){
			if (err) next(err);

		});
		sharp(tempPath)
		.resize(85,68)
		.toFile(targetPathImg+'seccion4.jpg',function(err, info){
			if (err) next(err);

		});
		sharp(tempPath)
		.resize(216,113)
		.toFile(targetPathImg+'seccion2.jpg',function(err, info){
			if (err) next(err);
		});
		sharp(tempPath)
		.resize(72,58)
		.toFile(targetPathImg+'seccion3.jpg',function(err, info){
			if (err) next(err);
		});
		sharp(tempPath)
		.resize(282,272)
		.toFile(targetPathImg+'seccion_thumb.jpg',function(err, info){
			if (err) next(err);
		});
		sharp(tempPath)
		.resize(700,333)
		.toFile(targetPathImg+'secciones.jpg',function(err, info){
			if (err) next(err);
		});

		setTimeout(function(){ fs.unlinkSync(tempPath); }, 1000);	
	}

	var resizeGalery=function(tempPath,targetPathImg){
		sharp(tempPath)
		.resize(764,422)
		.toFile(targetPathImg+'main.jpg',function(err, info){
			if (err) next(err);
		});
		sharp(tempPath)
		.resize(72,58)
		.toFile(targetPathImg+'thumb.jpg',function(err, info){
			if (err) next(err);
		});

		setTimeout(function(){ fs.unlinkSync(tempPath); }, 200);	
	}

	var saveAudio=function(tempPath,targetPathAudio,idNota){
		var pathr=targetPathAudio+'/'+idNota.toString()+'_nota.mp3';

		fs.rename(tempPath, pathr);
	}

	var inserTags=function(idNota){
		Tags.findOne().sort({idtags:-1}).exec(function(err,idT){
			var cont=1;
			Tags.findOne({nombre:formulario.tag1}).sort({idtags:-1}).exec(function(err, tag){
				if(tag===null){
					var Tag1=new Tags({nombre:formulario.tag1,idtags:idT.idtags+cont});
					cont++;
					Tag1.save(function(err, t1){
						if(err) next(err);
						var txn=new tagsxnotas({idnotas:idNota, idtags : t1.idtags});
						txn.save(function(err, tpn){ if(err) next(err);});
					});
				}else{
					var txn=new tagsxnotas({idnotas:idNota, idtags : tag.idtags});
					txn.save(function(err, tpn){ if(err) next(err);});
				}
			});
			Tags.findOne({nombre:formulario.tag2}).sort({idtags:-1}).exec(function(err, tag){
				if(tag===null){
					var Tag2=new Tags({nombre:formulario.tag2,idtags:idT.idtags+cont});
					cont++;
					Tag2.save(function(err, t2){
						if(err) next(err);
						var txn=new tagsxnotas({idnotas:idNota, idtags : t2.idtags});
						txn.save(function(err, tpn){ if(err) next(err);});
					});
				}else{
					var txn=new tagsxnotas({idnotas:idNota, idtags : tag.idtags});
					txn.save(function(err, tpn){ if(err) next(err);});
				}
			});
			Tags.findOne({nombre:formulario.tag3}).sort({idtags:-1}).exec(function(err, tag){
				if(tag===null){
					var Tag3=new Tags({nombre:formulario.tag3,idtags:idT.idtags+cont});
					cont++;
					Tag3.save(function(err, t3){
						if(err) next(err);
						var txn=new tagsxnotas({idnotas:idNota, idtags : t3.idtags});
						txn.save(function(err, tpn){ if(err) next(err);});
					});
				}else{
					var txn=new tagsxnotas({idnotas:idNota, idtags : tag.idtags});
					txn.save(function(err, tpn){ if(err) next(err);});
				}
			});
			Tags.findOne({nombre:formulario.tag4}).sort({idtags:-1}).exec(function(err, tag){
				if(tag===null){
					var Tag4=new Tags({nombre:formulario.tag4,idtags:idT.idtags+cont});
					cont++;
					Tag4.save(function(err, t4){
						if(err) next(err);
						var txn=new tagsxnotas({idnotas:idNota, idtags : t4.idtags});
						txn.save(function(err, tpn){ if(err) next(err);});
					});
				}else{
					var txn=new tagsxnotas({idnotas:idNota, idtags : tag.idtags});
					txn.save(function(err, tpn){ if(err) next(err);});
				}
			});
			Tags.findOne({nombre:formulario.tag5}).sort({idtags:-1}).exec(function(err, tag){
				if(tag===null){
					var Tag5=new Tags({nombre:formulario.tag5,idtags:idT.idtags+cont});
					cont++;
					Tag5.save(function(err, t5){
						if(err) next(err);
						var txn=new tagsxnotas({idnotas:idNota, idtags : t5.idtags});
						txn.save(function(err, tpn){ if(err) next(err);});
					});
				}else{
					var txn=new tagsxnotas({idnotas:idNota, idtags : tag.idtags});
					txn.save(function(err, tpn){ if(err) next(err);});
				}
			});

			/*
			var Tag1=new Tags({nombre:formulario.tag1,idtags:idT.idtags+1});
			var Tag2=new Tags({nombre:formulario.tag2,idtags:idT.idtags+2});
			var Tag3=new Tags({nombre:formulario.tag3,idtags:idT.idtags+3});
			var Tag4=new Tags({nombre:formulario.tag4,idtags:idT.idtags+4});
			var Tag5=new Tags({nombre:formulario.tag5,idtags:idT.idtags+5});

			Tag1.save(function(err, t1){
				if(err) next(err);
				var txn=new tagsxnotas({idnotas:idNota, idtags : t1.idtags});
				txn.save(function(err, tpn){ if(err) next(err);});
			});
			Tag2.save(function(err, t2){
				if(err) next(err);
				var txn=new tagsxnotas({idnotas:idNota, idtags:t2.idtags});
				txn.save(function(err, tpn){ if(err) next(err);});
			});
			Tag3.save(function(err, t3){
				if(err) next(err);
				var txn=new tagsxnotas({idnotas:idNota, idtags:t3.idtags});
				txn.save(function(err, tpn){ if(err) next(err);});
			});
			Tag4.save(function(err, t4){
				if(err) next(err);
				var txn=new tagsxnotas({idnotas:idNota, idtags:t4.idtags});
				txn.save(function(err, tpn){ if(err) next(err);});
			});
			Tag5.save(function(err, t5){
				if(err) next(err);
				var txn=new tagsxnotas({idnotas:idNota, idtags:t5.idtags});
				txn.save(function(err, tpn){ if(err) next(err);});
			});
			*/
		});
	}

	var inserImage=function(path,idNota){
		var pathr=path.substring(27);
		Imagenes.findOne().sort({idimagenes:-1}).exec(function(err, idI){
			var registroImagen={
				idimagenes: idI.idimagenes+1,
				imagenMain: pathr+'artprincipal.jpg',
				imagenArticulo: pathr+'portada.jpg',
				imagenPortada: pathr + 'seccion1.jpg',
				imagenThumb: pathr + 'seccion2.jpg',
				imagenThumbWide: pathr + 'seccion3.jpg',
				imagenSlider: pathr + 'seccion4.jpg',
				imagenMenu: '',
				idnotas: idNota,
				imgSeccionF: pathr + 'secciones.jpg',
				imgSeccionT: pathr + 'seccion_thumb.jpg'
			};

			var regImg=new Imagenes(registroImagen);

			regImg.save(function(err,reg){
				if(err) return next(err);
			});
		});
	}

	var inserGal=function(path,idNota,i){
		var pathr=path.substring(27);
		ImgGaleria.findOne().sort({idImgGaleria:-1}).exec(function(err, idI){
			var registroImgGal={
				idImgGaleria: idI.idImgGaleria+i,
				rutaImagen: pathr+'main.jpg',
				rutaThumb: pathr + 'thumb.jpg',
				idNotas: idNota
			};
			var regImg=new ImgGaleria(registroImgGal);

			regImg.save(function(err,reg){
				if(err) next(err);
			});
		});
	}

	var inserAudio=function(path, idNota){
		var pathr=path.substring(27);
		pathr+=idNota.toString()+'_nota.mp3';
		console.log("AUDIO");
		Audios.findOne().sort({idAudio:-1}).exec(function(err, idI){
			if(err) return next(err);
			var registroAudio={
				idAudio: idI.idAudio+1,
				ruta: pathr,
				idnotas: idNota,
			};

			var regAu=new Audios(registroAudio);

			regAu.save(function(err,reg){
				console.log(err);
				if(err) return next(err);
			});
		});
	}

	if(formulario.tipoNota == 5 ){
		//Obtiene el ultimo id de la tabla notas
		Notas.findOne().sort({idNotas:-1}).exec(function(err,img){
			lastId=img.idNotas+1;
			var targetPathImg='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/imagenes/'+lastId.toString()+'_'+day+'-'+month+'-'+date.getFullYear()+'_';
			var yearDir='./public/images/multimedia/'+date.getFullYear()+'-'+month;
			var dayDir='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day;
			var imageDir='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/imagenes';

			if(!fs.existsSync(yearDir)){
				fs.mkdirSync(yearDir);
			}
			if(!fs.existsSync(dayDir)){
				fs.mkdirSync(dayDir);
			}
			if(!fs.existsSync(imageDir)){
				fs.mkdirSync(imageDir);
			}

			resizeImages(tempPath,targetPathImg);


			if(formulario.aprobado==null)
				var aprobado=0;
			else
				var aprobado=Number(formulario.aprobado);

			var prioridad=Number(formulario.prioridad);
			var alias= formulario.titulo.replace(/\s/g, "-");
			var secciones=Number(formulario.idsecciones);
			var idUsuario=Number(formulario.capturo);
			var estado=Number(formulario.idEstados);
			var autor=Number(formulario.idAutor);
			var tipoNota=Number(formulario.tipoNota);
			var spec=Number(formulario.special);
			var stat=Number(formulario.status);
			var not=Number(formulario.noticiero);
			var mome=formulario.momento;
			var porta=Number(formulario.portada);

			registroNota={
				idNotas:lastId,
				titulo: formulario.titulo,
				fecha_inicio: formulario.fecha_inicio,
				fecha_final: formulario.fecha_final,
				resumen: formulario.resumen,
				notaCompleta: formulario.notaCompleta,
				status: aprobado,
				prioridad: prioridad,
				fechaCaptura: date,
				alias:alias,
				hits:0,
				idsecciones:secciones,
				capturo:idUsuario,
				aprobo: aprobado,
				idEstados: estado,
				Origen: 0,
				linkVideo: "",
				idAutor: autor,
				fechaAprobacion:"",
				fechaPublicacion:"",
				tipoNota:tipoNota,
				special: spec,
				status: stat,
				noticiero: not,
				momento: mome,
				portada: porta
			};

			console.log(registroNota);
			var nuevaNota=new Notas(registroNota);
			nuevaNota.save(function(err,registro){
					if(err) return next(err);
					
					inserImage(targetPathImg, registroNota.idNotas);
					inserTags(registroNota.idNotas);
					res.send(registroNota);
			});
		});
	}else if(formulario.tipoNota == 3){

		//Obtiene el ultimo id de la tabla notas
		Notas.findOne().sort({idNotas:-1}).exec(function(err,img){
			lastId=img.idNotas+1;
			var targetPathImg='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/imagenes/'+lastId.toString()+'_'+day+'-'+month+'-'+date.getFullYear()+'_';
			var yearDir='./public/images/multimedia/'+date.getFullYear()+'-'+month;
			var dayDir='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day;
			var imageDir='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/imagenes';
			var galDir = './public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/galeria';

			if(!fs.existsSync(yearDir)){
				fs.mkdirSync(yearDir);
			}
			if(!fs.existsSync(dayDir)){
				fs.mkdirSync(dayDir);
			}
			if(!fs.existsSync(imageDir)){
				fs.mkdirSync(imageDir);
			}
			if(!fs.existsSync(galDir)){
				fs.mkdirSync(galDir);
			}

			resizeImages(tempPath,targetPathImg);

			var i=0;	
			for (var key in files) {
				if(key!="file"){
					var targetPathGal= './public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/galeria/gal_'+lastId.toString()+'_'+i.toString()+'_'+day+'-'+month+'-'+date.getFullYear()+'_';
					i++;
				  	resizeGalery(files[key].path,targetPathGal);
				  	inserGal(targetPathGal,lastId,i);
				}
			}
			if(formulario.aprobado==null)
				var aprobado=0;
			else
				var aprobado=Number(formulario.aprobado);

			var prioridad=Number(formulario.prioridad);
			var alias= formulario.titulo.replace(/\s/g, "-");
			var secciones=Number(formulario.idsecciones);
			var idUsuario=Number(formulario.capturo);
			var estado=Number(formulario.idEstados);
			var autor=Number(formulario.idAutor);
			var tipoNota=Number(formulario.tipoNota);
			var spec=Number(formulario.special);
			var stat=Number(formulario.status);
			var not=Number(formulario.noticiero);
			var mome=formulario.momento;
			var porta=Number(formulario.portada);

			registroNota={
				idNotas:lastId,
				titulo: formulario.titulo,
				fecha_inicio: formulario.fecha_inicio,
				fecha_final: formulario.fecha_final,
				resumen: formulario.resumen,
				notaCompleta: formulario.notaCompleta,
				status: aprobado,
				prioridad: prioridad,
				fechaCaptura: date,
				alias:alias,
				hits:0,
				idsecciones:secciones,
				capturo:idUsuario,
				aprobo: aprobado,
				idEstados: estado,
				Origen: 0,
				linkVideo: "",
				idAutor: autor,
				fechaAprobacion:"",
				fechaPublicacion:"",
				tipoNota:tipoNota,
				special: spec,
				status: stat,
				noticiero: not,
				momento: mome,
				portada: porta
			};

			var nuevaNota=new Notas(registroNota);
			nuevaNota.save(function(err,registro){
					if(err) return next(err);
					console.log(err);
					inserImage(targetPathImg, registroNota.idNotas);
					inserTags(registroNota.idNotas);
					res.json(registro);
			});
		});
	}else if(formulario.tipoNota == 1){
		//Obtiene el ultimo id de la tabla notas
		Notas.findOne().sort({idNotas:-1}).exec(function(err,img){
			lastId=img.idNotas+1;
			var targetPathImg='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/imagenes/'+lastId.toString()+'_'+day+'-'+month+'-'+date.getFullYear()+'_';
			var yearDir='./public/images/multimedia/'+date.getFullYear()+'-'+month;
			var dayDir='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day;
			var imageDir='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/imagenes';
			var audioDir = './public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/audios';

			if(!fs.existsSync(yearDir)){
				fs.mkdirSync(yearDir);
			}
			if(!fs.existsSync(dayDir)){
				fs.mkdirSync(dayDir);
			}
			if(!fs.existsSync(imageDir)){
				fs.mkdirSync(imageDir);
			}
			if(!fs.existsSync(audioDir)){
				fs.mkdirSync(audioDir);
			}

			resizeImages(tempPath,targetPathImg);
			saveAudio(files.audioFile.path, audioDir,lastId);

			if(formulario.aprobado==null)
				var aprobado=0;
			else
				var aprobado=Number(formulario.aprobado);

			var prioridad=Number(formulario.prioridad);
			var alias= formulario.titulo.replace(/\s/g, "-");
			var secciones=Number(formulario.idsecciones);
			var idUsuario=Number(formulario.capturo);
			var estado=Number(formulario.idEstados);
			var autor=Number(formulario.idAutor);
			var tipoNota=Number(formulario.tipoNota);
			var spec=Number(formulario.special);
			var stat=Number(formulario.status);
			var not=Number(formulario.noticiero);
			var mome=formulario.momento;
			var porta=Number(formulario.portada);

			registroNota={
				idNotas:lastId,
				titulo: formulario.titulo,
				fecha_inicio: formulario.fecha_inicio,
				fecha_final: formulario.fecha_final,
				resumen: formulario.resumen,
				notaCompleta: formulario.notaCompleta,
				status: aprobado,
				prioridad: prioridad,
				fechaCaptura: date,
				alias:alias,
				hits:0,
				idsecciones:secciones,
				capturo:idUsuario,
				aprobo: aprobado,
				idEstados: estado,
				Origen: 0,
				linkVideo: "",
				idAutor: autor,
				fechaAprobacion:"",
				fechaPublicacion:"",
				tipoNota:tipoNota,
				special: spec,
				status: stat,
				noticiero: not,
				momento: mome,
				portada: porta
			};

			var nuevaNota=new Notas(registroNota);
			nuevaNota.save(function(err,registro){
					if(err) return next(err);

					inserImage(targetPathImg, registroNota.idNotas);
					inserTags(registroNota.idNotas);
					inserAudio(audioDir,lastId);
					res.json(registro);
			});
		});
	}
});

//Update de la nota
router.post('/updateNota', multipartyMiddleware2, function(req,res, next){
    var files = req.files;
	var data={};
	var formulario=req.body;
	var date=new Date();
	var lastId=0;
	var registroNota={};
	var registroImagenes={};
	if(files.file != null)
		var tempPath=files.file.path;
	var month = (date.getMonth()+1)<10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
	var day = date.getDate()<10 ? '0'+date.getDate() : ''+date.getDate();

	
	var resizeImages=function(tempPath,targetPathImg){
		sharp(tempPath)
		.resize(780,316)
		.toFile(targetPathImg+'portada.jpg',function(err, info){
			if (err) next(err);
		});
		sharp(tempPath)
		.resize(764,422)
		.toFile(targetPathImg+'artprincipal.jpg',function(err, info){
			if (err) next(err);
		});
		sharp(tempPath)
		.resize(385,316)
		.toFile(targetPathImg+'seccion1.jpg',function(err, info){
			if (err) next(err);

		});
		sharp(tempPath)
		.resize(85,68)
		.toFile(targetPathImg+'seccion4.jpg',function(err, info){
			if (err) next(err);

		});
		sharp(tempPath)
		.resize(216,113)
		.toFile(targetPathImg+'seccion2.jpg',function(err, info){
			if (err) next(err);
		});
		sharp(tempPath)
		.resize(72,58)
		.toFile(targetPathImg+'seccion3.jpg',function(err, info){
			if (err) next(err);
		});
		sharp(tempPath)
		.resize(282,272)
		.toFile(targetPathImg+'seccion_thumb.jpg',function(err, info){
			if (err) next(err);
		});
		sharp(tempPath)
		.resize(700,333)
		.toFile(targetPathImg+'secciones.jpg',function(err, info){
			if (err) next(err);
		});

		setTimeout(function(){ fs.unlinkSync(tempPath); }, 1000);	
	}

	var resizeGalery=function(tempPath,targetPathImg){
		sharp(tempPath)
		.resize(764,422)
		.toFile(targetPathImg+'main.jpg',function(err, info){
			if (err) next(err);
		});
		sharp(tempPath)
		.resize(72,58)
		.toFile(targetPathImg+'thumb.jpg',function(err, info){
			if (err) next(err);
		});

		setTimeout(function(){ fs.unlinkSync(tempPath); }, 200);	
	}

	var saveAudio=function(tempPath,targetPathAudio,idNota){
		var pathr=targetPathAudio+'/'+idNota.toString()+'_nota.mp3';
		fs.rename(tempPath, pathr);
	}

	var inserTags=function(idNota){
		Tags.update({_id:formulario.idt1},{$set:{nombre:formulario.tag1}}, function(err, tag){ if(err) next(err); });
		Tags.update({_id:formulario.idt2},{$set:{nombre:formulario.tag2}}, function(err, tag){ if(err) next(err); });
		Tags.update({_id:formulario.idt3},{$set:{nombre:formulario.tag3}}, function(err, tag){ if(err) next(err); });
		Tags.update({_id:formulario.idt4},{$set:{nombre:formulario.tag4}}, function(err, tag){ if(err) next(err); });
		Tags.update({_id:formulario.idt5},{$set:{nombre:formulario.tag5}}, function(err, tag){ if(err) next(err); });
	}

	var inserImage=function(path,idNota){
		var pathr=path.substring(27);
		Imagenes.findOne().sort({idimagenes:-1}).exec(function(err, idI){
			var registroImagen={
				idimagenes: idI.idimagenes+1,
				imagenMain: pathr+'artprincipal.jpg',
				imagenArticulo: pathr+'portada.jpg',
				imagenPortada: pathr + 'seccion1.jpg',
				imagenThumb: pathr + 'seccion2.jpg',
				imagenThumbWide: pathr + 'seccion3.jpg',
				imagenSlider: pathr + 'seccion4.jpg',
				imagenMenu: '',
				idnotas: idNota,
				imgSeccionF: pathr + 'secciones.jpg',
				imgSeccionT: pathr + 'seccion_thumb.jpg'
			};

			var regImg=new Imagenes(registroImagen);

			regImg.save(function(err,reg){
				if(err) next(err);
			});
		});
	}

	var inserGal=function(path,idNota,i){
		var pathr=path.substring(27);
		ImgGaleria.findOne().sort({idImgGaleria:-1}).exec(function(err, idI){
			var registroImgGal={
				idImgGaleria: idI.idImgGaleria+i,
				rutaImagen: pathr+'main.jpg',
				rutaThumb: pathr + 'thumb.jpg',
				idNotas: idNota
			};
			var regImg=new ImgGaleria(registroImgGal);

			regImg.save(function(err,reg){
				if(err) next(err);
			});
		});
	}

	var inserAudio=function(path, idNota){
		console.log("AUDIO");
		var pathr=path.substring(27)+'/';
		pathr+=idNota.toString()+'_nota.mp3';
		Audios.findOne().sort({idAudio:-1}).exec(function(err, idI){
			var registroAudio={
				idAudio: idI.idAudio+1,
				ruta: pathr,
				idnotas: idNota,
			};
			console.log(registroAudio);

			var regAu=new Audios(registroAudio);

			regAu.save(function(err,reg){
				if(err) next(err);
			});
		});
	}

	if(formulario.tipoNota == 5 ){
		//Obtiene el ultimo id de la tabla notas
		Notas.findOne().sort({idNotas:-1}).exec(function(err,img){
			lastId=img.idNotas+1;
			var targetPathImg='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/imagenes/'+lastId.toString()+'_'+day+'-'+month+'-'+date.getFullYear()+'_';
			var yearDir='./public/images/multimedia/'+date.getFullYear()+'-'+month;
			var dayDir='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day;
			var imageDir='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/imagenes';

			if(!fs.existsSync(yearDir)){
				fs.mkdirSync(yearDir);
			}
			if(!fs.existsSync(dayDir)){
				fs.mkdirSync(dayDir);
			}
			if(!fs.existsSync(imageDir)){
				fs.mkdirSync(imageDir);
			}
			console.log(files);
			if(files.file != null)
				resizeImages(tempPath,targetPathImg);


			if(formulario.aprobado == null)
				var aprobado=0;
			else
				var aprobado=Number(formulario.aprobado);

			var prioridad=Number(formulario.prioridad);
			var alias= formulario.titulo.replace(/\s/g, "-");
			var secciones=Number(formulario.idsecciones);
			var idUsuario=Number(formulario.capturo);
			var estado=Number(formulario.idEstados);
			var autor=Number(formulario.idAutor);
			var tipoNota=Number(formulario.tipoNota);
			var spec=Number(formulario.special);
			var stat=Number(formulario.status);
			var idE=mongoose.Types.ObjectId(formulario.idEditar);
			var not=Number(formulario.noticiero);
			var mome=formulario.momento;
			var porta=Number(formulario.portada);

			registroNota={
				titulo: formulario.titulo,
				fecha_inicio: formulario.fecha_inicio,
				fecha_final: formulario.fecha_final,
				resumen: formulario.resumen,
				notaCompleta: formulario.notaCompleta,
				status: aprobado,
				prioridad: prioridad,
				fechaCaptura: date,
				alias:alias,
				idsecciones:secciones,
				capturo:idUsuario,
				aprobo: aprobado,
				idEstados: estado,
				Origen: 0,
				linkVideo: "",
				idAutor: autor,
				fechaAprobacion:"",
				fechaPublicacion:"",
				tipoNota:tipoNota,
				special: spec,
				status: stat,
				noticiero: not,
				momento: mome,
				portada: porta
			};

			Notas.update({ _id : idE},{$set:registroNota}, function(err,registro){
					if(err) next(err);
					if(files.file!=null)
						inserImage(targetPathImg, formulario.idEditar);
					inserTags(formulario.idEditar);
					res.json(registro);
			});
		});
	}else if(formulario.tipoNota == 3){

		//Obtiene el ultimo id de la tabla notas
		Notas.findOne().sort({idNotas:-1}).exec(function(err,img){
			lastId=img.idNotas+1;
			var targetPathImg='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/imagenes/'+lastId.toString()+'_'+day+'-'+month+'-'+date.getFullYear()+'_';
			var yearDir='./public/images/multimedia/'+date.getFullYear()+'-'+month;
			var dayDir='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day;
			var imageDir='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/imagenes';
			var galDir = './public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/galeria';

			if(!fs.existsSync(yearDir)){
				fs.mkdirSync(yearDir);
			}
			if(!fs.existsSync(dayDir)){
				fs.mkdirSync(dayDir);
			}
			if(!fs.existsSync(imageDir)){
				fs.mkdirSync(imageDir);
			}
			if(!fs.existsSync(galDir)){
				fs.mkdirSync(galDir);
			}

			if(files.file != null)
				resizeImages(tempPath,targetPathImg);

			if(files.img1 != null || files.img2 != null || files.img3 != null || files.img4 != null || files.img5 != null){
				var i=0;	
				for (var key in files) {
					if(key!="file"){
						var targetPathGal= './public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/galeria/gal_'+lastId.toString()+'_'+i.toString()+'_'+day+'-'+month+'-'+date.getFullYear()+'_';
						i++;
					  	resizeGalery(files[key].path,targetPathGal);
					  	inserGal(targetPathGal,formulario.idEditar,i);
					}
				}
			}
			if(formulario.aprobado==null)
				var aprobado=0;
			else
				var aprobado=Number(formulario.aprobado);

			var prioridad=Number(formulario.prioridad);
			var alias= formulario.titulo.replace(/\s/g, "-");
			var secciones=Number(formulario.idsecciones);
			var idUsuario=Number(formulario.capturo);
			var estado=Number(formulario.idEstados);
			var autor=Number(formulario.idAutor);
			var tipoNota=Number(formulario.tipoNota);
			var spec=Number(formulario.special);
			var stat=Number(formulario.status);
			var idE=mongoose.Types.ObjectId(formulario.idEditar);
			var not=Number(formulario.noticiero);
			var mome=formulario.momento;
			var porta=Number(formulario.portada);

			registroNota={
				titulo: formulario.titulo,
				fecha_inicio: formulario.fecha_inicio,
				fecha_final: formulario.fecha_final,
				resumen: formulario.resumen,
				notaCompleta: formulario.notaCompleta,
				status: aprobado,
				prioridad: prioridad,
				fechaCaptura: date,
				alias:alias,
				idsecciones:secciones,
				capturo:idUsuario,
				aprobo: aprobado,
				idEstados: estado,
				Origen: 0,
				linkVideo: "",
				idAutor: autor,
				fechaAprobacion:"",
				fechaPublicacion:"",
				tipoNota:tipoNota,
				special: spec,
				status: stat,
				noticiero: not,
				momento: mome,
				portada: porta
			};

			Notas.update({_id:formulario.idE},{$set:registroNota}, function(err,registro){
					if(err) next(err);
					
					if(files.file!=null)
						inserImage(targetPathImg, formulario.idEditar);

					inserTags(formulario.idEditar);
					res.json(registro);
			});
		});
	}else if(formulario.tipoNota == 1){
		//Obtiene el ultimo id de la tabla notas
		Notas.findOne().sort({idNotas:-1}).exec(function(err,img){
			lastId=img.idNotas+1;
			var targetPathImg='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/imagenes/'+lastId.toString()+'_'+day+'-'+month+'-'+date.getFullYear()+'_';
			var yearDir='./public/images/multimedia/'+date.getFullYear()+'-'+month;
			var dayDir='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day;
			var imageDir='./public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/imagenes';
			var audioDir = './public/images/multimedia/'+date.getFullYear()+'-'+month+'/'+day+'/audios';

			if(!fs.existsSync(yearDir)){
				fs.mkdirSync(yearDir);
			}
			if(!fs.existsSync(dayDir)){
				fs.mkdirSync(dayDir);
			}
			if(!fs.existsSync(imageDir)){
				fs.mkdirSync(imageDir);
			}
			if(!fs.existsSync(audioDir)){
				fs.mkdirSync(audioDir);
			}

			if(files.file != null)
				resizeImages(tempPath,targetPathImg);

			if(files.audioFile != null ){
				saveAudio(files.audioFile.path, audioDir,formulario.idNotas);
			}

			if(formulario.aprobado==null)
				var aprobado=0;
			else
				var aprobado=Number(formulario.aprobado);

			var prioridad=Number(formulario.prioridad);
			var alias= formulario.titulo.replace(/\s/g, "-");
			var secciones=Number(formulario.idsecciones);
			var idUsuario=Number(formulario.capturo);
			var estado=Number(formulario.idEstados);
			var autor=Number(formulario.idAutor);
			var tipoNota=Number(formulario.tipoNota);
			var spec=Number(formulario.special);
			var stat=Number(formulario.status);
			var idE=mongoose.Types.ObjectId(formulario.idEditar);
			var not=Number(formulario.noticiero);
			var mome=formulario.momento;
			var porta=Number(formulario.portada);

			registroNota={
				titulo: formulario.titulo,
				fecha_inicio: formulario.fecha_inicio,
				fecha_final: formulario.fecha_final,
				resumen: formulario.resumen,
				notaCompleta: formulario.notaCompleta,
				status: aprobado,
				prioridad: prioridad,
				fechaCaptura: date,
				alias:alias,
				idsecciones:secciones,
				capturo:idUsuario,
				aprobo: aprobado,
				idEstados: estado,
				Origen: 0,
				linkVideo: "",
				idAutor: autor,
				fechaAprobacion:"",
				fechaPublicacion:"",
				tipoNota:tipoNota,
				special: spec,
				status: stat,
				noticiero: not,
				momento: mome,
				portada: porta
			};

			Notas.update({_id:formulario.idEditar},{$set:registroNota}, function(err,registro){
					if(err)  return next(err);
					
					if(files.file!=null)
						inserImage(targetPathImg, formulario.idEditar);

					if(files.audioFile != null){
						inserAudio(audioDir,formulario.idNotas);
					}

					inserTags(formulario.idEditar);
					res.json(registro);
			});
		});
	}
});

// Carga la imagen
router.post('/uploadGroup', multipartyMiddleware, function(req,res, next){
	var grupo=req.body;
	var nuevoGrupo=new Grupos(grupo);
	
	nuevoGrupo.save(function(err, grup){
		if(err) next(err);

		res.json(grup);
	});
});

// Update rapido de nota.prioridad
router.post('/updatePrio', function(req,res, next){
	var grupo=req.body;
	Notas.findByIdAndUpdate(grupo.id,{$set: {prioridad: grupo.val}},function(err, updateado){
		if(err) return next(err);
		res.json(updateado);
	});
});

// Carga video denuncia
router.post('/uploadVideoDenuncia', function(req,res, next){
	var video=req.body;
	fechaActual=new Date();

	VideoDenuncia.findOne().sort({idVideoDenuncia:-1}).exec(function(err, vide){
		if(err) next(err);

		var id=Number(vide.idVideoDenuncia)+1;

		var data={titulo: video.titulo,
			url: video.url,
			descripcion:video.resumen,
			usuarioCargo: video.usuarioCargo,
			idVideoDenuncia:id,
			fechaCarga: fechaActual
		};
		var vd=new VideoDenuncia(data);

		vd.save(function(err, grup){
			if(err) next(err);

			res.json(grup);
		});
	});
});

router.post('/uploadGoals', function(req,res,next){
	var data=req.body;
	var nuevoObj=new Objetivos(data);
	var cont=0;
	
	nuevoObj.save(function(err, user){
		if(err) next(err);
		res.json(user);
	});
});

router.post('/uploadUser', function(req,res,next){
	var data=req.body;
	var usuario={nombreCompleto: data.nombreCompleto, nombreUsuario: data.nombreUsuario, puesto: data.puesto, email:data.email, clavex: data.clavex};
	var nuevoUsuario=new User(usuario);
	var cont=0;
	
	nuevoUsuario.save(function(err, user){
		if(err) next(err);
		
		data.permisos.forEach(function(permiso){
			var moduloxusuario=mxu({usuario:user._id, modulo: permiso._id});
			
			moduloxusuario.save(function(err, inser){
				if(err) next(err);
				
				cont++;
				if(cont==data.permisos.length)
					res.json(user);
			});
		});
	});
});

router.post('/uploadControl', function(req, res, next){
	var data=req.body;
	var idTecnico=data.tecnico;
	delete data["tecnico"];
	var fecha=new Date(data.dia);
	var fechai=new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate()+1,0,0,0,0);
	var fechaf=new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate()+1,23,59,59,0);

	var horai=new Date('01/01/2011 '+data.horainicio);
	var horaf=new Date('01/01/2011 '+data.horafin);

	//VALIDA QUE EL MISMO CONTROL NO ESTE AGENDADO A LA MISMA HORA EN OTRO CONTROL , horainicio:data.horainicio,
	Controles.find({dia:{$gte:fechai, $lte:fechaf}, unidad: data.unidad, estado:{$ne : 3} }).exec(function(err, repe){
		
		if(err) next(err);

		repe.forEach(function(control){
			if((data.horainicio>=control.horainicio&&data.horafin<=control.horafin)||
				(data.horafin<=control.horafin&&data.horafin>=control.horainicio)||
				(data.horainicio>=control.horainicio&&data.horainicio<=control.horafin))
			{
				res.status(500).send('Error, ya existe el mismo control remoto asignado a la misma hora el mismo dia!');
			}
			if(data.times==0){
				var coni=new Date('01/01/2011 '+control.horainicio);
				var conf=new Date('01/01/2011 '+control.horafin);

				var antes=coni.getHours()-horaf.getHours();
				var despues= horai.getHours()-conf.getHours();

				if(antes==1)
					if((60-horaf.getMinutes())<50)
						res.status(500).send('Advertencia, este control tiene menos de una hora de diferencia con otro ya registrado');

				if(despues==0)
					res.status(500).send('Advertencia, este control tiene menos de una hora de diferencia con otro ya registrado');
			}
		});

		//INSERTA EL CONTROL
		Controles.findOne().sort({id:-1}).exec(function(err, last){
			if(err) next(err);

			data.id=last.id+1;
			data.mapa=0;
			data.latitud=0;
			data.longitud=0;
			data.entrecalles="";
			data.contactotelefono="";
			data.contactoemail="";
			data.agenteventastelefono="";
			data.cortes=0;
			data.situacion=0;
			data.idusuario=0;
			data.fechaCaptura=new Date();
			delete data["times"];

			console.log(data);
			var nuevoControl=new Controles(data);

			nuevoControl.save(function(err, cont){
				if(err) next(err);

				Tecnicos.findOne().sort({id:-1}).exec(function(err,ul){
					var regTec={
						id:ul.id+1,
						idControl: cont.id,
						idpersonal: idTecnico
					};

					var nuevoTec=new Tecnicos(regTec);

					nuevoTec.save(function(err, fin){
						res.json(cont);
					});
				});

			})
		});
	});
});

router.post('/desactivaNota', function(req,res,next){
	var data=req.body;

	Notas.update({_id:data._id}, {$set:{status:0}}, function(err, nota){
		if(err) next(err);

		res.json(nota);
	});
});

router.post('/plusHitNota', function(req, res, next){
	var id=req.body;

	Notas.findOneAndUpdate({idNotas: id.id},{ $inc:{hits:1}}, function(err, obj){
		res.json(obj);
	});
});

router.post('/plusHitRecurso', function(req, res, next){
	fechaActual=new Date();
	var id=req.body;
	var month = (fechaActual.getMonth()+1)<10 ? '0'+(fechaActual.getMonth()+1) : (fechaActual.getMonth()+1);
	var day = fechaActual.getDate()<10 ? '0'+fechaActual.getDate() : ''+fechaActual.getDate();
	var cont=Number(id.id.toString()+fechaActual.getFullYear()+month+day);
	HitsRecurso.findOne({idHits:cont}).then(function(obj){
	console.log(cont);
		if(obj==null){
			var aux={idHits: cont, Recurso: id.id, fecha: fechaSinHoras, hits:1};
			var recurso=new HitsRecurso(aux);

			recurso.save(function(err, ins){
				if(err) next(err);

				res.json(ins);
			});
		}else{
			HitsRecurso.findByIdAndUpdate(obj._id, {$inc:{hits:1}}, function(err, mod){
				if(err) next(err);
				console.log("MOD");
				console.log(mod);
				res.json(mod);
			});
		}
	}, function(err){
		res.status(400).send(err);
	});
});

/*****************************************UPDATE AREA******************************************************/
router.put('/updateControlR', function(req, res, next){
		var params=req.body;

		Controles.findByIdAndUpdate(params._id,{$set: {estado: 2}},function(err, updateado){
			res.json(updateado);
		});
});

router.put('/updateControlC', function(req, res, next){
		var params=req.body;

		Controles.findByIdAndUpdate(params._id,{$set: {estado: 3}},function(err, updateado){
			res.json(updateado);
		});
});

router.put('/updateControl',function(req, res, next){
	var data=req.body;
	var fecha=new Date(data.dia);
	var fechai=new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate()+1,0,0,0,0);
	var fechaf=new Date(fecha.getFullYear(),fecha.getMonth(),fecha.getDate()+1,23,59,59,0);

	var horai=new Date('01/01/2011 '+data.horainicio);
	var horaf=new Date('01/01/2011 '+data.horafin);

	//VALIDA QUE EL MISMO CONTROL NO ESTE AGENDADO A LA MISMA HORA EN OTRO CONTROL , horainicio:data.horainicio,
	Controles.find({dia:{$gte:fechai, $lte:fechaf}, unidad: data.unidad, estado:{$ne : 3}, _id:{$ne: data._id} }).exec(function(err, repe){
		
		if(err) next(err);

		repe.forEach(function(control){
			if((data.horainicio>=control.horainicio&&data.horafin<=control.horafin)||
				(data.horafin<=control.horafin&&data.horafin>=control.horainicio)||
				(data.horainicio>=control.horainicio&&data.horainicio<=control.horafin))
			{
				res.status(500).send('Error, ya existe el mismo control remoto asignado a la misma hora el mismo dia!');
			}
			if(data.times==0){
				var coni=new Date('01/01/2011 '+control.horainicio);
				var conf=new Date('01/01/2011 '+control.horafin);

				var antes=coni.getHours()-horaf.getHours();
				var despues= horai.getHours()-conf.getHours();

				if(antes==1)
					if((60-horaf.getMinutes())<50)
						res.status(500).send('Advertencia, este control tiene menos de una hora de diferencia con otro ya registrado');

				if(despues==0)
					res.status(500).send('Advertencia, este control tiene menos de una hora de diferencia con otro ya registrado');
			}
		});

		//INSERTA EL CONTROL
		Controles.findOne().sort({id:-1}).exec(function(err, last){
			if(err) next(err);

			data.id=last.id+1;
			data.mapa=0;
			data.latitud=0;
			data.longitud=0;
			data.entrecalles="";
			data.contactotelefono="";
			data.contactoemail="";
			data.agenteventastelefono="";
			data.cortes=0;
			data.situacion=0;
			data.idusuario=0;
			var idC=data._id;
			delete data["times"];
			delete data["_id"];

			console.log(idC);

			Controles.findByIdAndUpdate(idC,{$set: data}, function(err, cont){
				if(err) next(err);

				res.json(cont);
			})
		});
	});
});

/*****************************************DELETE AREA******************************************************/
router.delete('/eliminaBanner/:id', function(req,res,next){
	Banners.findByIdAndRemove(req.params.id,function(err,data){
		if(err) next(err);
		
		res.json(data);
	});
});

router.delete('/eliminaVideo/:id', function(req,res,next){
	VideoDenuncia.findByIdAndRemove(req.params.id,function(err,data){
		if(err) next(err);
		
		res.json(data);
	});
});

/***************************************API AREA******************************************************/
router.post('/API/v1/dispositivo', function(req, res, next){
	var params=req.body;
	var respuesta={};
	fechaActual=new Date();

	if(params.token==null || params.so==null)
	{
		respuesta={};
		respuesta.error=true;
		respuesta.message="Parámetros requeridos no existen";
		res.status(400).send(respuesta);
	}
	var tkn=params.token;
	var sop=params.so;

	Dispositivos.find({token:tkn, so:sop}).exec(function(err, dis){
		if(err) next(err);

		if(dis.length>0)
		{
			Dispositivos.findByIdAndUpdate(dis[0]._id, {$set:{ultimaConex: fechaActual}},function(err, updated){
				if(err){
					respuesta["error_code"] = 401;
		            respuesta["message"] = "Error de conexion";
		            return res.status(400).send(respuesta);
				}else{
					respuesta={};
					respuesta.code = 201;
		            respuesta.message = "Dispositivo Actualizado";
		            res.json(respuesta);
				}
			});
		}else{
			var registro={token: tkn, so: sop, ultimaConex: fechaActual};

			var dispo=new Dispositivos(registro);

			dispo.save(function(err, data){
					if(err){
					respuesta["error_code"] = 401;
		            respuesta["message"] = "Error de conexion";
		            return res.status(400).send(respuesta);
				}

					respuesta={};
					respuesta["code"] = 201;
		            respuesta["message"] = "Se añadio nuevo dispositivo";
		            res.status(200).send(respuesta);
			});
		}	
	});
});

router.post('/API/v1/notificacion', function(req, res, next){
	var params=req.body;
	var respuesta={};
	var data={};

	if(params.key==null || params.mensaje==null || params.titulo==null){
		respuesta.error_code = 401;
        respuesta.message = "Faltan parametros";
        res.status(400).send(respuesta);
	}
	if(params.idNota!=null)
		data.notaid=params.idNota;
	if(params.url!=null)
		data.url=params.url;
	if(params.camara!=null)
		data.camara=params.camara;

	if(params.key==LLAVE){
		var serverKey = 'AIzaSyC4HlJYNj53aqOAPBoX0zMeaPC9BE2uBk4';
		var fcm = new FCM(serverKey);

		var message = {
		    to: '/topics/default', // required fill with device token or topics
		    data: data,
		    priority: 'high',
		    notification: {
		        title: params.titulo,
		        body: params.mensaje
		    }
		};

		//callback style
		fcm.send(message, function(err, response){
		    if (err) {
		        console.log("Something has gone wrong!");
		    } else {
		    	respuesta.tipoObjeto="notificacion";
		    	respuesta.objetos=response;
		        console.log("Successfully sent with response: ", response);
		    }
		});

	}else{
		respuesta.error_code = 401;
        respuesta.message = "Key no valida";
        res.status(400).send(respuesta);
	}
});

router.get('/API/v1/home', function(req, res, next){
	var respuesta={};
	var params=req.body;

	respuesta.tipoObjeto="Home";
	principales().then(function(p){
		respuesta.principales=p;
		trascendentes1().then(function(t){
			respuesta.trascendente=t;
			masvistas().then(function(m){
				respuesta.masVistas=m;
				denuncia().then(function(v){
					respuesta.denunciaGlobal=v;
					banner(1).then(function(b1){
						respuesta.banners=b1;
						banner(3).then(function(b2){
							respuesta.bannerEspecial=b2;
							expertos().then(function(e){
								respuesta.opinionExpertos=e;
								res.json(respuesta);
							}, function(err){
								respuesta={};
								respuesta.error_code = 401;
						        respuesta.message = "No hay notas para mostrar";
								res.status(400).send(respuesta);
							});
						}, function(err){
							respuesta={};
							respuesta.error_code = 401;
					        respuesta.message = "No hay notas para mostrar";
							res.status(400).send(respuesta);
						});
					}, function(err){
						respuesta={};
						respuesta.error_code = 401;
				        respuesta.message = "No hay notas para mostrar";
						res.status(400).send(respuesta);
					});
				}, function(err){
					respuesta={};
					respuesta.error_code = 401;
			        respuesta.message = "No hay notas para mostrar";
					res.status(400).send(respuesta);
				});
			}, function(err){
				respuesta={};
				respuesta.error_code = 401;
		        respuesta.message = "No hay notas para mostrar";
				res.status(400).send(respuesta);
			});
		}, function(err){
			respuesta={};
			respuesta.error_code = 401;
	        respuesta.message = "No hay notas para mostrar";
			res.status(400).send(respuesta);
		});
	},function(err){
		respuesta={};
		respuesta.error_code = 401;
        respuesta.message = "No hay notas para mostrar";
		res.status(400).send(respuesta);
	});
});

router.get('/API/v1/categorias', function(req, res, next){
	var params = req.query;
	var respuesta={};
	fechaActual= new Date();
	switch(params.tipo){
		case 'principales':
			var secciones=[];
			respuesta.tipoObjeto="Categorias";
			Secciones.find({especial: 0, seccionGeneral: 1, tipo: 0, idsecciones:{$nin:[5,12]}}).exec(function(err, seccs){
				seccs.forEach(function(seccion){
					var aux={id: seccion.idsecciones, nombre: seccion.nombre};

					secciones.push(aux);
					if(secciones.length>=seccs.length)
					{
						respuesta.objetos=secciones;
						res.json(respuesta);
					}
				});
			});
		break;
		case 'misNoticias':
			var secciones=[];
			respuesta.tipoObjeto="Categorias";

			Secciones.find({especial: 0, seccionGeneral: 1, tipo: 0, idsecciones:{$nin:[13,12]}}).exec(function(err, seccs){
				seccs.forEach(function(seccion){
					var aux={id: seccion.idsecciones, nombre: seccion.nombre};
					secciones.push(aux);
					if(secciones.length>=seccs.length)
					{
						Secciones.find({especial: 1, seccionGeneral: 1, tipo: 0, idsecciones:{$nin:[13,12]}}).exec(function(err, seccs2){
							seccs2.forEach(function(seccion){
								var aux={id: seccion.idsecciones, nombre: seccion.nombre};
								secciones.push(aux);
								if(secciones.length>=(seccs.length+seccs2.length))
								{
									respuesta.objetos=secciones;
									res.json(respuesta);
								}
							});
						});
					}
				});
			});
		break;
		case 'podcast':
			var secciones=[];
			respuesta.tipoObjeto="Categorias Podcast";

			Secciones.find({especial: 2, seccionGeneral: 2, tipo: 0}).exec(function(err, seccs){
				seccs.forEach(function(seccion){
					switch(seccion.idsecciones){
						case 15:
							var aux={id: seccion.idsecciones, nombre: "A Detalle con Claudio García", img: "http://globalmedia.mx/img/app/ADETALLE.jpg"};
							secciones.push(aux);
						break;
						case 17:
							var aux={id: seccion.idsecciones, nombre: "Fórmula de la mañana con Erika Salgado", img: "http://globalmedia.mx/img/app/FORMULA.jpg"};
							secciones.push(aux);
						break;
						case 19:
							var aux={id: seccion.idsecciones, nombre: "Reporte 100.1 con Eva María Camacho", img: "http://globalmedia.mx/img/app/REPORTE.jpg"};
							secciones.push(aux);
						break;
						case 35:
							var aux={id: seccion.idsecciones, nombre: "Noticias de la Noche con Héctor Trejo", img: "http://globalmedia.mx/img/app/NOTICIAS.jpg"};
							secciones.push(aux);
						break;
					}
					
					if(secciones.length>=(seccs.length-2))
					{
						respuesta.objetos=secciones;
						res.json(respuesta);
					}
				});
			});
		break;
	}
});

router.get('/API/v1/categorias/:id/notas', function(req, res, next){
	var params = req.query;
	var id=req.params.id;
	var arrId=id.split(",").map(function(item){
		return parseInt(item,10);
	});
	var pagina=params.pagina==null?1:params.pagina;
	var limite=params.limite==null?15:params.limite;
	var cont2=0;
	var nots=[];
	var respuesta={};
	fechaActual= new Date();

	Notas.find({status:1, fecha_inicio: {$lte:fechaActual}, idsecciones:{$in:arrId}}).sort({fecha_inicio:-1}).limit(limite).skip(limite*(pagina-1)).exec(function(err, uno){
		respuesta.tipoObjeto="Notas";

		uno.forEach(function(noti){
			var not=noti;
			var aux={id:not.idNotas, titulo:not.titulo, resumen: not.resumen, fecha: not.fecha_inicio.toString(), nota: not.notaCompleta, tipo: not.tipoNota, special: not.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};
			Imagenes.findOne({idnotas:not.idNotas}).sort({idimagenes:-1}).exec(function(err, img){
				if(err) next(err);
				var images={};
				images.imgMain=urlWeb+img.imagenMain;
				images.imgArticulo=urlWeb+img.imagenArticulo;
				images.imagenPortada=urlWeb+img.imagenPortada;
				images.imagenThumb=urlWeb+img.imagenThumb;
				images.imagenThumbWide=urlWeb+img.imagenThumbWide;
				images.imagenSlider=urlWeb+img.imagenSlider;
				images.imagenMenu=urlWeb+img.imagenMenu;
				images.imgSeccionF=urlWeb+img.imgSeccionF;
				images.imgSeccionT=urlWeb+img.imgSeccionT;
				aux.imagenes=images;
				Secciones.findOne({idsecciones: not.idsecciones}).exec(function(err, secc){
					if(err) next(err);
					aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
					User.findOne({idUsuario: not.idAutor}).exec(function(err, autor){
						if(err) next(err);
						if(autor==null)
							aux.autor={id: 0, nombre: ""};
						else
							aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
						tagsxnotas.find({idnotas: not.idNotas}).exec(function(err, txn){
							if(err) next(err);
							var auxTags=[];
							txn.forEach(function(tid){
								auxTags.push(tid.idtags);
								if(auxTags.length>=txn.length)
								{
									Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
										if(err) next(err);
										tags.forEach(function(t){
											var auxt={id:t.idtags, nombre: t.nombre};
											aux.tags.push(auxt);
											if(aux.tags.length>=tags.length){
												cont2++;
												nots.push(aux);
												if(cont2>=uno.length){
													respuesta.objetos=nots;
													res.json(respuesta);
												}
											}
										});
									});
								}
							});
						});
					});
				});
			});
		});
	});
});

router.get('/API/v1/categorias/:id/podcasts', function(req, res, next){
	var params = req.query;
	var id=req.params.id;
	var arrId=id.split(",").map(function(item){
		return parseInt(item,10);
	});
	var pagina=params.pagina==null?1:params.pagina;
	var limite=params.limite==null?15:params.limite;
	var cont2=0;
	var nots=[];
	var respuesta={};
	fechaActual= new Date();

	Podcast.find({status:1, fecha: {$lte:fechaActual}, idsecciones:{$in:arrId}}).sort({fecha:-1}).limit(limite).skip(limite*(pagina-1)).exec(function(err, uno){
		respuesta.tipoObjeto="Podcasts";
		uno.forEach(function(noti){
			var not=noti;
			var aux={id:not.idPodcast, titulo:not.titulo, fecha: not.fecha, url: urlWeb+not.ruta, tipo: not.tipo, categoria:{}, autor:{}, tags:[]};
			Secciones.findOne({idsecciones: not.idsecciones}).exec(function(err, secc){
				if(err) next(err);
				aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
				aux.autor=null;
				tagsxpodcast.find({idPodcast: not.idPodcast}).exec(function(err, txn){
					if(err) next(err);
					var auxTags=[];
					if(txn.length==0){
						cont2++;
						nots.push(aux);
						if(cont2>=uno.length){
							respuesta.objetos=nots;
							res.json(respuesta);
						}
					}
					txn.forEach(function(tid){
						auxTags.push(tid.idTags);
						if(auxTags.length>=txn.length)
						{
							Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
								if(err) next(err);
								tags.forEach(function(t){
									var auxt={id:t.idtags, nombre: t.nombre};
									aux.tags.push(auxt);
									if(aux.tags.length>=tags.length){
										cont2++;
										nots.push(aux);
										if(cont2>=uno.length){
											respuesta.objetos=nots;
											res.json(respuesta);
										}
									}
								});
							});
						}
					});
				});
			});
		});
	});
});

router.get('/API/v1/banner', function(req, res, next){
	var params = req.query;
	var respuesta={};
	switch(params.tipo){
		case '2':
			var secciones=[];
			respuesta.tipoObjeto="Banners";
			
			banner(2).then(function(b){
				respuesta.objetos=b;
				res.json(respuesta);
			}, function(err){
				respuesta={};
				respuesta.error_code = 401;
		        respuesta.message = "No hay banners para mostrar";
		        res.status(400).send(respuesta);
			});
		break;
	}
});

router.get('/API/v1/deportes', function(req, res, next){
	var params = req.query;
	var respuesta={};
	var pagina=params.pagina==null?1:params.pagina;
	var limite=params.limite==null?20:params.limite;
	fechaActual= new Date();

	switch(params.cat){
		case 'locales':
			var cont=0;
			var nots=[];
			respuesta.tipoObjeto="Notas";
			Notas.find({fecha_inicio:{$lte:fechaActual}, status:1, idsecciones:5, idEstados:24}).sort({idNotas:-1}).limit(limite).skip((pagina-1)*limite).exec(function(err, uno){
				if(err) next(err);
					uno.forEach(function(noti){
						var not=noti;
						var aux={id:not.idNotas, titulo:not.titulo, resumen: not.resumen, fecha: not.fecha_inicio, nota: not.notaCompleta, tipo: not.tipoNota, special: not.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};
						Imagenes.findOne({idnotas:not.idNotas}).sort({idimagenes:-1}).exec(function(err, img){
							if(err) next(err);
							var images={};
							images.imgMain=urlWeb+img.imagenMain;
							images.imgArticulo=urlWeb+img.imagenArticulo;
							images.imagenPortada=urlWeb+img.imagenPortada;
							images.imagenThumb=urlWeb+img.imagenThumb;
							images.imagenThumbWide=urlWeb+img.imagenThumbWide;
							images.imagenSlider=urlWeb+img.imagenSlider;
							images.imagenMenu=urlWeb+img.imagenMenu;
							images.imgSeccionF=urlWeb+img.imgSeccionF;
							images.imgSeccionT=urlWeb+img.imgSeccionT;
							aux.imagenes=images;
							Secciones.findOne({idsecciones: not.idsecciones}).exec(function(err, secc){
								if(err) next(err);
								aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
								User.findOne({idUsuario: not.idAutor}).exec(function(err, autor){
									if(err) next(err);
									aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
									tagsxnotas.find({idnotas: not.idNotas}).exec(function(err, txn){
										if(err) next(err);
										var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
										Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
											if(err) next(err);
											tags.forEach(function(t){
												var auxt={id:t.idtags, nombre: t.nombre};
												aux.tags.push(auxt);
												if(aux.tags.length>=tags.length){
													cont++;
													nots.push(aux);
													if(cont>=uno.length){
														respuesta.objetos=nots;
														res.json(respuesta);
													}
												}
											});
										});
									});
								});
							});
						});
					});
			});
		break;
		case 'internacionales':
			var cont=0;
			var nots=[];
			respuesta.tipoObjeto="Notas";
			Notas.find({fecha_inicio:{$lte:fechaActual}, status:1, idsecciones:5, idEstados:{$ne:24}}).sort({idNotas:-1}).limit(limite).skip((pagina-1)*limite).exec(function(err, uno){
				if(err) next(err);
					uno.forEach(function(noti){
						var not=noti;
						var aux={id:not.idNotas, titulo:not.titulo, resumen: not.resumen, fecha: not.fecha_inicio, nota: not.notaCompleta, tipo: not.tipoNota, special: not.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};
						Imagenes.findOne({idnotas:not.idNotas}).sort({idimagenes:-1}).exec(function(err, img){
							if(err) next(err);
							var images={};
							images.imgMain=urlWeb+img.imagenMain;
							images.imgArticulo=urlWeb+img.imagenArticulo;
							images.imagenPortada=urlWeb+img.imagenPortada;
							images.imagenThumb=urlWeb+img.imagenThumb;
							images.imagenThumbWide=urlWeb+img.imagenThumbWide;
							images.imagenSlider=urlWeb+img.imagenSlider;
							images.imagenMenu=urlWeb+img.imagenMenu;
							images.imgSeccionF=urlWeb+img.imgSeccionF;
							images.imgSeccionT=urlWeb+img.imgSeccionT;
							aux.imagenes=images;
							Secciones.findOne({idsecciones: not.idsecciones}).exec(function(err, secc){
								if(err) next(err);
								aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
								User.findOne({idUsuario: not.idAutor}).exec(function(err, autor){
									if(err) next(err);
									aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
									tagsxnotas.find({idnotas: not.idNotas}).exec(function(err, txn){
										if(err) next(err);
										var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
										Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
											if(err) next(err);
											tags.forEach(function(t){
												var auxt={id:t.idtags, nombre: t.nombre};
												aux.tags.push(auxt);
												if(aux.tags.length>=tags.length){
													cont++;
													nots.push(aux);
													if(cont>=uno.length){
														respuesta.objetos=nots;
														res.json(respuesta);
													}
												}
											});
										});
									});
								});
							});
						});
					});
			});
		break;
	}
});

router.get('/API/v1/notas/:id/relacionadas', function(req, res, next){
	var params = req.query;
	var id=req.params.id;
	var resultTags=[];
	var cont=0;
	var cont2=0;
	var respuesta={};
	fechaActual= new Date();
	var nots=[];
	function getNotas(array){
		Notas.find({idNotas:{$in:array}}).exec(function(err, uno){
			if(err) next(err);
			respuesta.tipoObjeto="Notas";
			uno.forEach(function(noti){
				var not=noti;
				var aux={id:not.idNotas, titulo:not.titulo, resumen: not.resumen, fecha: not.fecha_inicio, nota: not.notaCompleta, tipo: not.tipoNota, special: not.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};
				Imagenes.findOne({idnotas:not.idNotas}).sort({idimagenes:-1}).exec(function(err, img){
					if(err) next(err);
					var images={};
					images.imgMain=urlWeb+img.imagenMain;
					images.imgArticulo=urlWeb+img.imagenArticulo;
					images.imagenPortada=urlWeb+img.imagenPortada;
					images.imagenThumb=urlWeb+img.imagenThumb;
					images.imagenThumbWide=urlWeb+img.imagenThumbWide;
					images.imagenSlider=urlWeb+img.imagenSlider;
					images.imagenMenu=urlWeb+img.imagenMenu;
					images.imgSeccionF=urlWeb+img.imgSeccionF;
					images.imgSeccionT=urlWeb+img.imgSeccionT;
					
					aux.imagenes=images;
					Secciones.findOne({idsecciones: not.idsecciones}).exec(function(err, secc){
						if(err) next(err);
						aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
						User.findOne({idUsuario: not.idAutor}).exec(function(err, autor){
							if(err) next(err);
							aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
							tagsxnotas.find({idnotas: not.idNotas}).exec(function(err, txn){
								if(err) next(err);
								var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
								Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
									if(err) next(err);
									tags.forEach(function(t){
										var auxt={id:t.idtags, nombre: t.nombre};
										aux.tags.push(auxt);
										if(aux.tags.length>=tags.length){
											cont2++;
											nots.push(aux);
											if(cont2>=uno.length){
												respuesta.objetos=nots;
												res.json(respuesta);
											}
										}
									});
								});
							});
						});
					});
				});
			});
		});
	};

	tagsxnotas.find({idnotas:id}).exec(function(err, txn){
		var tarr=[txn[0].idtags,txn[1].idtags,txn[2].idtags,txn[3].idtags,txn[4].idtags];
		tagsxnotas.find({idtags:{$in:tarr},idnotas:{$ne:id}}).sort({idnotas:-1}).limit(20).exec(function(err, txn2){
			if(err) next(err);

			txn2.forEach(function(nots){
				if(resultTags.indexOf(nots.idnotas)==-1){
					resultTags.push(nots.idnotas);
					cont++;
					if(cont==5){
						getNotas(resultTags);
					}
				}
			});
		});
	});
});

router.get('/API/v1/columnas', function(req, res, next){
	var params=req.query;
	var cont=0;
	var tipo=params.tipo==null ? 'simple' : params.tipo;
	var respuesta={};
	var cols=[];
	fechaActual= new Date();

	switch(tipo){
		case 'full':
			Notas.find({idsecciones:{$gte:38}, fecha_inicio:{$lte:fechaActual}, status:1}).sort({fecha_inicio:-1}).limit(30).exec(function(err, uno){
				respuesta.tipoObjeto="Columnas";
				uno.forEach(function(noti){
						var not=noti;
						var aux={id:not.idNotas, titulo:not.titulo, resumen: not.resumen, fecha: not.fecha_inicio, nota: not.notaCompleta, tipo: not.tipoNota, special: not.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};
						Imagenes.findOne({idnotas:not.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
							if(err) reject(err);
							var images={};
							images.imgMain=urlWeb+img.imagenMain;
							images.imgArticulo=urlWeb+img.imagenArticulo;
							images.imagenPortada=urlWeb+img.imagenPortada;
							images.imagenThumb=urlWeb+img.imagenThumb;
							images.imagenThumbWide=urlWeb+img.imagenThumbWide;
							images.imagenSlider=urlWeb+img.imagenSlider;
							images.imagenMenu=urlWeb+img.imagenMenu;
							images.imgSeccionF=urlWeb+img.imgSeccionF;
							images.imgSeccionT=urlWeb+img.imgSeccionT;
							aux.imagenes=images;
							Secciones.findOne({idsecciones: not.idsecciones}).exec(function(err, secc){
								if(err) reject(err);
								aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
								User.findOne({idUsuario: not.idAutor}).exec(function(err, autor){
									if(err) reject(err);
									aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
									tagsxnotas.find({idnotas: not.idNotas}).exec(function(err, txn){
										if(err) reject(err);
										var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
										Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
											if(err) reject(err);
											tags.forEach(function(t){
												var auxt={id:t.idtags, nombre: t.nombre};
												aux.tags.push(auxt);
												if(aux.tags.length>=tags.length){
													cont++;
													cols.push(aux);
													if(cont==uno.length){
														respuesta.objetos=cols;
														res.json(respuesta);
													}
												}
											});
										});
									});
								});
							});
						});
					});
			});
	}
});

router.get('/API/v1/radio', function(req, res, next){
	var respuesta={};
	var estaciones=[];
	Radio.find().exec(function(err, r){
		if(err) next(err);
		respuesta.tipoObjeto="Estaciones";
		r.forEach(function(esta){
			var aux={id: esta.id, nombre: esta.nombre, img1: esta.img1, img2: esta.img2, urlAndroid: esta.urlAndroid, urlIOS: esta.urliOS};
			estaciones.push(aux);
			if(estaciones.length==r.length){
				respuesta.objetos=estaciones;
				res.json(respuesta);
			}
		});
	});
});

router.get('/API/v1/tv', function(req, res, next){
	camarasTrafico(0).then(function(response){
		var respuesta={};
		respuesta.tipoObjeto="TV";
		respuesta.objeto=response[0];
		res.json(respuesta);
	}, function(err){
		var respuesta={};
		respuesta.error_code = 401;
        respuesta.message = "No hay TV para mostrar";
        res.status(400).send(respuesta);
	});
});

router.get('/API/v1/camaras', function(req, res, next){
	camarasTrafico(1).then(function(response){
		var respuesta={};
		respuesta.tipoObjeto="Camaras Trafico";
		respuesta.objetos=response;
		res.json(respuesta);
	}, function(err){
		var respuesta={};
		respuesta.error_code = 401;
        respuesta.message = "No hay camaras para mostrar";
        res.status(400).send(respuesta);
	});
});

router.get('/API/v1/notas/:id', function(req, res, next){
	var id=req.params.id;
	var respuesta={};
	fechaActual= new Date();
	Notas.findOne({idNotas:id}).exec(function(err, uno){
		var aux={id:uno.idNotas, titulo:uno.titulo, resumen: uno.resumen, fecha: uno.fecha_inicio, nota: uno.notaCompleta, tipo: uno.tipoNota, special: uno.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};

			Imagenes.findOne({idnotas:uno.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
				if(err) reject(err);
				var images={};
				images.imgMain=urlWeb+img.imagenMain;
				images.imgArticulo=urlWeb+img.imagenArticulo;
				images.imagenPortada=urlWeb+img.imagenPortada;
				images.imagenThumb=urlWeb+img.imagenThumb;
				images.imagenThumbWide=urlWeb+img.imagenThumbWide;
				images.imagenSlider=urlWeb+img.imagenSlider;
				images.imagenMenu=urlWeb+img.imagenMenu;
				images.imgSeccionF=urlWeb+img.imgSeccionF;
				images.imgSeccionT=urlWeb+img.imgSeccionT;
				aux.imagenes=images;
				Secciones.findOne({idsecciones: uno.idsecciones}).exec(function(err, secc){
					if(err) reject(err);
					aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
					User.findOne({idUsuario: uno.idAutor}).exec(function(err, autor){
						if(err) reject(err);
						aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
						tagsxnotas.find({idnotas: uno.idNotas}).exec(function(err, txn){
							if(err) reject(err);
							var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
							Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
								if(err) reject(err);
								tags.forEach(function(t){
									var auxt={id:t.idtags, nombre: t.nombre};
									aux.tags.push(auxt);
									if(aux.tags.length>=tags.length){
										respuesta.tipoObjeto="Nota";
										respuesta.objeto=aux;
										res.json(respuesta);
									}
								});
							});
						});
					});
				});
			});
	});
});

router.get('/API/v1/busqueda', function(req, res, next){
	var params = req.query;
	var pagina=params.pagina==null?1:params.pagina;
	var limite=params.limite==null?15:params.limite;
	var query=params.q==null?" ":params.q;
	var respuesta={};
	var auxTags=[];
	var auxTxn=[];
	var cont2=0;
	var nots=[];
	fechaActual= new Date();

	Tags.find({nombre:{$regex:query, $options:'i'}}).exec(function(err, tags){
		var i=0;
		for(i=0;i<tags.length-1;i++){
			auxTags.push(tags[i].idtags);
		}
		tagsxnotas.find({idtags:{$in:auxTags}}).sort({idnotas:-1}).limit(limite+20).exec(function(err, txn){
			for(i=0;i<txn.length-1;i++){
				auxTxn.push(txn[i].idnotas);
			}
			Notas.find({idNotas:{$in:auxTxn}, fecha_inicio:{$lte:fechaActual}, status:1}).sort({idNotas:-1}).limit(limite).skip((pagina-1)*limite).exec(function(err, uno){
				respuesta.tipoObjeto="Notas";

				uno.forEach(function(noti){
					var not=noti;
					var aux={id:not.idNotas, titulo:not.titulo, resumen: not.resumen,nota:not.notaCompleta, fecha: dateFormat(not.fecha_inicio), tipo: not.tipoNota, special: not.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};
					Imagenes.findOne({idnotas:not.idNotas}).sort({idimagenes:-1}).exec(function(err, img){
						if(err) next(err);
						var images={};

						images.imgMain=urlWeb+img.imagenMain;
						images.imgArticulo=urlWeb+img.imagenArticulo;
						images.imagenPortada=urlWeb+img.imagenPortada;
						images.imagenThumb=urlWeb+img.imagenThumb;
						images.imagenThumbWide=urlWeb+img.imagenThumbWide;
						images.imagenSlider=urlWeb+img.imagenSlider;
						images.imagenMenu=urlWeb+img.imagenMenu;
						images.imgSeccionF=urlWeb+img.imgSeccionF;
						images.imgSeccionT=urlWeb+img.imgSeccionT;

						aux.imagenes=images;
						Secciones.findOne({idsecciones: not.idsecciones}).exec(function(err, secc){
							if(err) next(err);
							aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
							User.findOne({idUsuario: not.idAutor}).exec(function(err, autor){
								if(err) next(err);
								if(autor==null)
									aux.autor={id: 0, nombre: ""};
								else
									aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
								tagsxnotas.find({idnotas: not.idNotas}).exec(function(err, txn){
									if(err) next(err);
									var auxTags=[];
									txn.forEach(function(tid){
										auxTags.push(tid.idtags);
										if(auxTags.length>=txn.length)
										{
											Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
												if(err) next(err);
												tags.forEach(function(t){
													var auxt={id:t.idtags, nombre: t.nombre};
													aux.tags.push(auxt);
													if(aux.tags.length>=tags.length){
														cont2++;
														nots.push(aux);
														//console.log(aux);
														if(cont2>=uno.length){
															respuesta.objetos=nots;
															res.json(respuesta);
														}
													}
												});
											});
										}
									});
								});
							});
						});
					});
				});
			});
		});
	});
});

function principales(){
	fechaActual= new Date();
	return new Promise(function(resolve,reject){

		var principales=[];
		var portada={};
		var cont=0;

		function respuesta(nota){
			principales.push(nota);
			if(cont==5){
				principales.sort(function(a,b){
					return parseInt(a.prioridad)-parseInt(b.prioridad);
				});
				resolve(principales);
			}
		}

		Notas.findOne({prioridad:1, fecha_inicio:{$lte:fechaActual}, status:1}).sort({'fecha_inicio':-1}).exec(function(err,uno){
			if(err) reject(err);
			//uno.fecha_inicio.toISOString().substring(0,19)+"Z"
			var aux={id:uno.idNotas,status: uno.status , titulo:uno.titulo, resumen: uno.resumen, fecha: dateFormat(uno.fecha_inicio), nota: uno.notaCompleta, tipo: uno.tipoNota, special: uno.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};

			Imagenes.findOne({idnotas:uno.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
				if(err) reject(err);
				var images={};
				images.imgMain=urlWeb+img.imagenMain;
				images.imgArticulo=urlWeb+img.imagenArticulo;
				images.imagenPortada=urlWeb+img.imagenPortada;
				images.imagenThumb=urlWeb+img.imagenThumb;
				images.imagenThumbWide=urlWeb+img.imagenThumbWide;
				images.imagenSlider=urlWeb+img.imagenSlider;
				images.imagenMenu=urlWeb+img.imagenMenu;
				images.imgSeccionF=urlWeb+img.imgSeccionF;
				images.imgSeccionT=urlWeb+img.imgSeccionT;
				aux.imagenes=images;
				Secciones.findOne({idsecciones: uno.idsecciones}).exec(function(err, secc){
					if(err) reject(err);
					aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
					User.findOne({idUsuario: uno.idAutor}).exec(function(err, autor){
						if(err) reject(err);
						aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
						tagsxnotas.find({idnotas: uno.idNotas}).exec(function(err, txn){
							if(err) reject(err);
							var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
							Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
								if(err) reject(err);
								tags.forEach(function(t){
									var auxt={id:t.idtags, nombre: t.nombre};
									aux.tags.push(auxt);
									if(aux.tags.length>=tags.length){
										aux.prioridad=1;
										cont++;
										respuesta(aux);
									}
								});
							});
						});
					});
				});
			});
		});
		Notas.findOne({prioridad:2, fecha_inicio:{$lte:fechaActual}, status:1}).sort({'fecha_inicio':-1}).exec(function(err,dos){
			if(err) reject(err);
			var aux={id:dos.idNotas, titulo:dos.titulo, status: dos.status, resumen: dos.resumen, fecha: dos.fecha_inicio.toISOString().substring(0,19)+"Z", nota: dos.notaCompleta, tipo: dos.tipoNota, special: dos.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};

			Imagenes.findOne({idnotas:dos.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
				if(err) reject(err);
				var images={};
				images.imgMain=urlWeb+img.imagenMain;
				images.imgArticulo=urlWeb+img.imagenArticulo;
				images.imagenPortada=urlWeb+img.imagenPortada;
				images.imagenThumb=urlWeb+img.imagenThumb;
				images.imagenThumbWide=urlWeb+img.imagenThumbWide;
				images.imagenSlider=urlWeb+img.imagenSlider;
				images.imagenMenu=urlWeb+img.imagenMenu;
				images.imgSeccionF=urlWeb+img.imgSeccionF;
				images.imgSeccionT=urlWeb+img.imgSeccionT;
				aux.imagenes=images;
				Secciones.findOne({idsecciones: dos.idsecciones}).exec(function(err, secc){
					if(err) reject(err);
					aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
					User.findOne({idUsuario: dos.idAutor}).exec(function(err, autor){
						if(err) reject(err);
						aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
						tagsxnotas.find({idnotas: dos.idNotas}).exec(function(err, txn){
							if(err) reject(err);
							var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
							Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
								if(err) reject(err);
								tags.forEach(function(t){
									var auxt={id:t.idtags, nombre: t.nombre};
									aux.tags.push(auxt);
									if(aux.tags.length>=tags.length){
										aux.prioridad=2;
										cont++;
										respuesta(aux);
									}
								});
							});
						});
					});
				});
			});
		});
		Notas.findOne({prioridad:3, fecha_inicio:{$lte:fechaActual}, status:1}).sort({'fecha_inicio':-1}).exec(function(err,tres){
			if(err) reject(err);
			var aux={id:tres.idNotas, titulo:tres.titulo, status: tres.status, resumen: tres.resumen, fecha: tres.fecha_inicio.toISOString().substring(0,19)+"Z", nota: tres.notaCompleta, tipo: tres.tipoNota, special: tres.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};

			Imagenes.findOne({idnotas:tres.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
				if(err) reject(err);
				var images={};
				images.imgMain=urlWeb+img.imagenMain;
				images.imgArticulo=urlWeb+img.imagenArticulo;
				images.imagenPortada=urlWeb+img.imagenPortada;
				images.imagenThumb=urlWeb+img.imagenThumb;
				images.imagenThumbWide=urlWeb+img.imagenThumbWide;
				images.imagenSlider=urlWeb+img.imagenSlider;
				images.imagenMenu=urlWeb+img.imagenMenu;
				images.imgSeccionF=urlWeb+img.imgSeccionF;
				images.imgSeccionT=urlWeb+img.imgSeccionT;
				aux.imagenes=images;
				Secciones.findOne({idsecciones: tres.idsecciones}).exec(function(err, secc){
					if(err) reject(err);
					aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
					User.findOne({idUsuario: tres.idAutor}).exec(function(err, autor){
						if(err) reject(err);
						aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
						tagsxnotas.find({idnotas: tres.idNotas}).exec(function(err, txn){
							if(err) reject(err);
							var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
							Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
								if(err) reject(err);
								tags.forEach(function(t){
									var auxt={id:t.idtags, nombre: t.nombre};
									aux.tags.push(auxt);
									if(aux.tags.length>=tags.length){
										aux.prioridad=3;
										cont++;
										respuesta(aux);
									}
								});
							});
						});
					});
				});
			});
		});
		Notas.findOne({prioridad : 4, fecha_inicio:{$lte:fechaActual}, status:1}).sort({'fecha_inicio':-1}).exec(function(err,cuatro){
			if(err) reject(err);
			var aux={id:cuatro.idNotas, titulo:cuatro.titulo, status: cuatro.status, resumen: cuatro.resumen, fecha: cuatro.fecha_inicio.toISOString().substring(0,19)+"Z", nota: cuatro.notaCompleta, tipo: cuatro.tipoNota, special: cuatro.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};

			Imagenes.findOne({idnotas:cuatro.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
				if(err) reject(err);
				var images={};
				images.imgMain=urlWeb+img.imagenMain;
				images.imgArticulo=urlWeb+img.imagenArticulo;
				images.imagenPortada=urlWeb+img.imagenPortada;
				images.imagenThumb=urlWeb+img.imagenThumb;
				images.imagenThumbWide=urlWeb+img.imagenThumbWide;
				images.imagenSlider=urlWeb+img.imagenSlider;
				images.imagenMenu=urlWeb+img.imagenMenu;
				images.imgSeccionF=urlWeb+img.imgSeccionF;
				images.imgSeccionT=urlWeb+img.imgSeccionT;
				aux.imagenes=images;
				Secciones.findOne({idsecciones: cuatro.idsecciones}).exec(function(err, secc){
					if(err) reject(err);
					aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
					User.findOne({idUsuario: cuatro.idAutor}).exec(function(err, autor){
						if(err) reject(err);
						aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
						tagsxnotas.find({idnotas: cuatro.idNotas}).exec(function(err, txn){
							if(err) reject(err);
							var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
							Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
								if(err) reject(err);
								tags.forEach(function(t){
									var auxt={id:t.idtags, nombre: t.nombre};
									aux.tags.push(auxt);
									if(aux.tags.length>=tags.length){
										aux.prioridad=4;
										cont++;
										respuesta(aux);
									}
								});
							});
						});
					});
				});
			});
		});
		Notas.findOne({prioridad:5, fecha_inicio:{$lte:fechaActual}, status:1}).sort({'fecha_inicio':-1}).exec(function(err,cinco){
			if(err) reject(err);
			var aux={id:cinco.idNotas, titulo:cinco.titulo, resumen: cinco.resumen, status: cinco.status, fecha: cinco.fecha_inicio.toISOString().substring(0,19)+"Z", nota: cinco.notaCompleta, tipo: cinco.tipoNota, special: cinco.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};

			Imagenes.findOne({idnotas:cinco.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
				if(err) reject(err);
				var images={};
				images.imgMain=urlWeb+img.imagenMain;
				images.imgArticulo=urlWeb+img.imagenArticulo;
				images.imagenPortada=urlWeb+img.imagenPortada;
				images.imagenThumb=urlWeb+img.imagenThumb;
				images.imagenThumbWide=urlWeb+img.imagenThumbWide;
				images.imagenSlider=urlWeb+img.imagenSlider;
				images.imagenMenu=urlWeb+img.imagenMenu;
				images.imgSeccionF=urlWeb+img.imgSeccionF;
				images.imgSeccionT=urlWeb+img.imgSeccionT;
				aux.imagenes=images;
				Secciones.findOne({idsecciones: cinco.idsecciones}).exec(function(err, secc){
					if(err) reject(err);
					aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
					User.findOne({idUsuario: cinco.idAutor}).exec(function(err, autor){
						if(err) reject(err);
						aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
						tagsxnotas.find({idnotas: cinco.idNotas}).exec(function(err, txn){
							if(err) reject(err);
							var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
							Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
								if(err) reject(err);
								tags.forEach(function(t){
									var auxt={id:t.idtags, nombre: t.nombre};
									aux.tags.push(auxt);
									if(aux.tags.length>=tags.length){
										aux.prioridad=5;
										cont++;
										respuesta(aux);
									}
								});
							});
						});
					});
				});
			});
		});
	});
};

function trascendentes1(){
	var cont=0;
	var trascendentes=[];
	fechaActual=new Date();

	return new Promise(function(resolve, reject){
		function respuesta(tras){
			trascendentes.push(tras);
			if(cont==10){
				resolve(trascendentes);
			}
			if(cont==5){
				Notas.find({prioridad:0, fecha_inicio:{$lte:fechaActual}, status:1, idsecciones:1}).sort({'fecha_inicio':-1}).limit(5).exec(function(err,uno){
					if(err) reject(err);
					uno.forEach(function(noti){
						var not=noti;
						var aux={id:not.idNotas, titulo:not.titulo, resumen: not.resumen, fecha: not.fecha_inicio.toISOString().substring(0,19)+"Z", nota: not.notaCompleta, tipo: not.tipoNota, special: not.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};
						Imagenes.findOne({idnotas:not.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
							if(err) reject(err);
							var images={};
							images.imgMain=urlWeb+img.imagenMain;
							images.imgArticulo=urlWeb+img.imagenArticulo;
							images.imagenPortada=urlWeb+img.imagenPortada;
							images.imagenThumb=urlWeb+img.imagenThumb;
							images.imagenThumbWide=urlWeb+img.imagenThumbWide;
							images.imagenSlider=urlWeb+img.imagenSlider;
							images.imagenMenu=urlWeb+img.imagenMenu;
							images.imgSeccionF=urlWeb+img.imgSeccionF;
							images.imgSeccionT=urlWeb+img.imgSeccionT;
							aux.imagenes=images;
							Secciones.findOne({idsecciones: not.idsecciones}).exec(function(err, secc){
								if(err) reject(err);
								aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
								User.findOne({idUsuario: not.idAutor}).exec(function(err, autor){
									if(err) reject(err);
									if(autor==null){
										aux.autor={id: 1, nombre: " "};
									}else
										aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
									tagsxnotas.find({idnotas: not.idNotas}).exec(function(err, txn){
										if(err) reject(err);
										var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
										Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
											if(err) reject(err);
											tags.forEach(function(t){
												var auxt={id:t.idtags, nombre: t.nombre};
												aux.tags.push(auxt);
												if(aux.tags.length>=tags.length){
													cont++;
													respuesta(aux);
												}
											});
										});
									});
								});
							});
						});
					});
				});
			}
			
		}
		Notas.find({prioridad:0, fecha_inicio:{$lte:fechaActual}, status:1, idsecciones:3}).sort({'fecha_inicio':-1}).limit(5).exec(function(err,uno){
			if(err) reject(err);
			uno.forEach(function(noti){
				var not=noti;
				var aux={id:not.idNotas, titulo:not.titulo, resumen: not.resumen, fecha: not.fecha_inicio.toISOString().substring(0,19)+"Z", nota: not.notaCompleta, tipo: not.tipoNota, special: not.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};
				Imagenes.findOne({idnotas:not.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
					if(err) reject(err);
					var images={};
					images.imgMain=urlWeb+img.imagenMain;
					images.imgArticulo=urlWeb+img.imagenArticulo;
					images.imagenPortada=urlWeb+img.imagenPortada;
					images.imagenThumb=urlWeb+img.imagenThumb;
					images.imagenThumbWide=urlWeb+img.imagenThumbWide;
					images.imagenSlider=urlWeb+img.imagenSlider;
					images.imagenMenu=urlWeb+img.imagenMenu;
					images.imgSeccionF=urlWeb+img.imgSeccionF;
					images.imgSeccionT=urlWeb+img.imgSeccionT;
					aux.imagenes=images;
					Secciones.findOne({idsecciones: not.idsecciones}).exec(function(err, secc){
						if(err) reject(err);
						aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
						User.findOne({idUsuario: not.idAutor}).exec(function(err, autor){
							if(err) reject(err);
							aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
							tagsxnotas.find({idnotas: not.idNotas}).exec(function(err, txn){
								if(err) reject(err);
								var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
								Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
									if(err) reject(err);
									tags.forEach(function(t){
										var auxt={id:t.idtags, nombre: t.nombre};
										aux.tags.push(auxt);
										if(aux.tags.length>=tags.length){
											cont++;
											respuesta(aux);
										}
									});
								});
							});
						});
					});
				});
			});
		});
	});
};

function masvistas(){
	var conti=0;
	var masV=[];
	fechaActual= new Date();

	return new Promise(function(resolve, reject){
		function respuesta(tras){
			masV.push(tras);
			
			if(conti==6){
				resolve(masV);
			}
		}

		/*******************************************INTERNACIONAL***********************************************/
		Notas.find({fecha_inicio:{$lte:fechaActual}, status:1, idsecciones:4}).sort({'fecha_inicio':-1}).limit(15).exec(function(err,mv){
			if(err) reject(err);
			var cont=0;
			var auxhit={};
			auxhit.hits=0;
			mv.sort(function(a, b) {
			    return parseFloat(a.hits) - parseFloat(b.hits);
			});
						Notas.findOne({idNotas: mv[0].idNotas}).exec(function(err,uno){
							if(err) reject(err);
							var aux={id:uno.idNotas, titulo:uno.titulo, resumen: uno.resumen, fecha: dateFormat(uno.fecha_inicio), nota: uno.notaCompleta, tipo: uno.tipoNota, special: uno.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};

							Imagenes.findOne({idnotas:uno.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
								if(err) reject(err);
								var images={};
								images.imgMain=urlWeb+img.imagenMain;
								images.imgArticulo=urlWeb+img.imagenArticulo;
								images.imagenPortada=urlWeb+img.imagenPortada;
								images.imagenThumb=urlWeb+img.imagenThumb;
								images.imagenThumbWide=urlWeb+img.imagenThumbWide;
								images.imagenSlider=urlWeb+img.imagenSlider;
								images.imagenMenu=urlWeb+img.imagenMenu;
								images.imgSeccionF=urlWeb+img.imgSeccionF;
								images.imgSeccionT=urlWeb+img.imgSeccionT;
								aux.imagenes=images;
								Secciones.findOne({idsecciones: uno.idsecciones}).exec(function(err, secc){
									if(err) reject(err);
									aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
									User.findOne({idUsuario: uno.idAutor}).exec(function(err, autor){
										if(err) reject(err);
										aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
										tagsxnotas.find({idnotas: uno.idNotas}).exec(function(err, txn){
											if(err) reject(err);
											var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
											Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
												if(err) reject(err);
												tags.forEach(function(t){
												var auxt={id:t.idtags, nombre: t.nombre};
												aux.tags.push(auxt);
												if(aux.tags.length>=tags.length){
													conti++;
													respuesta(aux);
												}
											});
											});
										});
									});
								});
							});
						});

		});

		/***********************************DEPORTES***************************************/
		Notas.find({fecha_inicio:{$lte:fechaActual}, status:1, idsecciones:5}).sort({'fecha_inicio':-1}).limit(15).exec(function(err,mv){
			if(err) reject(err);
			var cont=0;
			var auxhit={};
			var penultimo={};
			penultimo.hits=0;
			auxhit.hits=0;
			mv.sort(function(a, b) {
			    return parseFloat(a.hits) - parseFloat(b.hits);
			});
						Notas.findOne({idNotas: mv[0].idNotas}).exec(function(err,uno){
							if(err) reject(err);
							var aux={id:uno.idNotas, titulo:uno.titulo, resumen: uno.resumen, fecha: dateFormat(uno.fecha_inicio), nota: uno.notaCompleta, tipo: uno.tipoNota, special: uno.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};

							Imagenes.findOne({idnotas:uno.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
								if(err) reject(err);
								var images={};
								images.imgMain=urlWeb+img.imagenMain;
								images.imgArticulo=urlWeb+img.imagenArticulo;
								images.imagenPortada=urlWeb+img.imagenPortada;
								images.imagenThumb=urlWeb+img.imagenThumb;
								images.imagenThumbWide=urlWeb+img.imagenThumbWide;
								images.imagenSlider=urlWeb+img.imagenSlider;
								images.imagenMenu=urlWeb+img.imagenMenu;
								images.imgSeccionF=urlWeb+img.imgSeccionF;
								images.imgSeccionT=urlWeb+img.imgSeccionT;
								aux.imagenes=images;
								Secciones.findOne({idsecciones: uno.idsecciones}).exec(function(err, secc){
									if(err) reject(err);
									aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
									User.findOne({idUsuario: uno.idAutor}).exec(function(err, autor){
										if(err) reject(err);
										aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
										tagsxnotas.find({idnotas: uno.idNotas}).exec(function(err, txn){
											if(err) reject(err);
											var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
											Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
												if(err) reject(err);
												tags.forEach(function(t){
													var auxt={id:t.idtags, nombre: t.nombre};
													aux.tags.push(auxt);
													if(aux.tags.length>=tags.length){
														conti++;
														respuesta(aux);
													}
												});
											});
										});
									});
								});
							});
						});
						
						Notas.findOne({idNotas: mv[1].idNotas}).exec(function(err,uno){
							if(err) reject(err);
							var aux={id:uno.idNotas, titulo:uno.titulo, resumen: uno.resumen, fecha: dateFormat(uno.fecha_inicio), nota: uno.notaCompleta, tipo: uno.tipoNota, special: uno.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};

							Imagenes.findOne({idnotas:uno.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
								if(err) reject(err);
								var images={};
								images.imgMain=urlWeb+img.imagenMain;
								images.imgArticulo=urlWeb+img.imagenArticulo;
								images.imagenPortada=urlWeb+img.imagenPortada;
								images.imagenThumb=urlWeb+img.imagenThumb;
								images.imagenThumbWide=urlWeb+img.imagenThumbWide;
								images.imagenSlider=urlWeb+img.imagenSlider;
								images.imagenMenu=urlWeb+img.imagenMenu;
								images.imgSeccionF=urlWeb+img.imgSeccionF;
								images.imgSeccionT=urlWeb+img.imgSeccionT;
								aux.imagenes=images;
								Secciones.findOne({idsecciones: uno.idsecciones}).exec(function(err, secc){
									if(err) reject(err);
									aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
									User.findOne({idUsuario: uno.idAutor}).exec(function(err, autor){
										if(err) reject(err);
										aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
										tagsxnotas.find({idnotas: uno.idNotas}).exec(function(err, txn){
											if(err) reject(err);
											var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
											Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
												if(err) reject(err);
												tags.forEach(function(t){
													var auxt={id:t.idtags, nombre: t.nombre};
													aux.tags.push(auxt);
													if(aux.tags.length>=tags.length){
														conti++;
														respuesta(aux);
													}
												});
											});
										});
									});
								});
							});
						});
		});

		/*******************************************SEGURIDAD***********************************************/
		Notas.find({fecha_inicio:{$lte:fechaActual}, status:1, idsecciones:2}).sort({'fecha_inicio':-1}).limit(10).exec(function(err,mv){
			if(err) reject(err);
			var cont=0;
			var auxhit={};
			auxhit.hits=0;
			mv.sort(function(a, b) {
			    return parseFloat(a.hits) - parseFloat(b.hits);
			});
						Notas.findOne({idNotas: mv[0].idNotas}).exec(function(err,uno){
							if(err) reject(err);
							var aux={id:uno.idNotas, titulo:uno.titulo, resumen: uno.resumen, fecha: dateFormat(uno.fecha_inicio), nota: uno.notaCompleta, tipo: uno.tipoNota, special: uno.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};

							Imagenes.findOne({idnotas:uno.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
								if(err) reject(err);
								var images={};
								images.imgMain=urlWeb+img.imagenMain;
								images.imgArticulo=urlWeb+img.imagenArticulo;
								images.imagenPortada=urlWeb+img.imagenPortada;
								images.imagenThumb=urlWeb+img.imagenThumb;
								images.imagenThumbWide=urlWeb+img.imagenThumbWide;
								images.imagenSlider=urlWeb+img.imagenSlider;
								images.imagenMenu=urlWeb+img.imagenMenu;
								images.imgSeccionF=urlWeb+img.imgSeccionF;
								images.imgSeccionT=urlWeb+img.imgSeccionT;
								aux.imagenes=images;
								Secciones.findOne({idsecciones: uno.idsecciones}).exec(function(err, secc){
									if(err) reject(err);
									aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
									User.findOne({idUsuario: uno.idAutor}).exec(function(err, autor){
										if(err) reject(err);
										if(autor==null)
											aux.autor={id: 0, nombre: "Desconocido"};
										else
											aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
										tagsxnotas.find({idnotas: uno.idNotas}).exec(function(err, txn){
											if(err) reject(err);
											var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
											Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
												if(err) reject(err);
												tags.forEach(function(t){
													var auxt={id:t.idtags, nombre: t.nombre};
													aux.tags.push(auxt);
													if(aux.tags.length>=tags.length){
														conti++;
														respuesta(aux);
													}
												});
											});
										});
									});
								});
							});
						});
		});

		/***********************************ESTADOS***************************************/
		Notas.find({fecha_inicio:{$lte:fechaActual}, status:1, idsecciones:7}).sort({'fecha_inicio':-1}).limit(10).exec(function(err,mv){
			if(err) reject(err);
			var cont=0;
			var auxhit={};
			var penultimo={};
			penultimo.hits=0;
			auxhit.hits=0;

			mv.sort(function(a, b) {
			    return parseFloat(a.hits) - parseFloat(b.hits);
			});

						Notas.findOne({idNotas: mv[0].idNotas}).exec(function(err,uno){
							if(err) reject(err);
							var aux={id:uno.idNotas, titulo:uno.titulo, resumen: uno.resumen, fecha: dateFormat(uno.fecha_inicio), nota: uno.notaCompleta, tipo: uno.tipoNota, special: uno.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};

							Imagenes.findOne({idnotas:uno.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
								if(err) reject(err);
								var images={};
								images.imgMain=urlWeb+img.imagenMain;
								images.imgArticulo=urlWeb+img.imagenArticulo;
								images.imagenPortada=urlWeb+img.imagenPortada;
								images.imagenThumb=urlWeb+img.imagenThumb;
								images.imagenThumbWide=urlWeb+img.imagenThumbWide;
								images.imagenSlider=urlWeb+img.imagenSlider;
								images.imagenMenu=urlWeb+img.imagenMenu;
								images.imgSeccionF=urlWeb+img.imgSeccionF;
								images.imgSeccionT=urlWeb+img.imgSeccionT;
								aux.imagenes=images;
								Secciones.findOne({idsecciones: uno.idsecciones}).exec(function(err, secc){
									if(err) reject(err);
									aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
									User.findOne({idUsuario: uno.idAutor}).exec(function(err, autor){
										if(err) reject(err);
										aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
										tagsxnotas.find({idnotas: uno.idNotas}).exec(function(err, txn){
											if(err) reject(err);
											var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
											Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
												if(err) reject(err);
												tags.forEach(function(t){
													var auxt={id:t.idtags, nombre: t.nombre};
													aux.tags.push(auxt);
													if(aux.tags.length>=tags.length){
														conti++;
														respuesta(aux);
													}
												});
											});
										});
									});
								});
							});
						});

						Notas.findOne({idNotas: mv[1].idNotas}).exec(function(err,uno){
							if(err) reject(err);
							var aux={id:uno.idNotas, titulo:uno.titulo, resumen: uno.resumen, fecha: dateFormat(uno.fecha_inicio), nota: uno.notaCompleta, tipo: uno.tipoNota, special: uno.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};

							Imagenes.findOne({idnotas:uno.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
								if(err) reject(err);
								var images={};
								images.imgMain=urlWeb+img.imagenMain;
								images.imgArticulo=urlWeb+img.imagenArticulo;
								images.imagenPortada=urlWeb+img.imagenPortada;
								images.imagenThumb=urlWeb+img.imagenThumb;
								images.imagenThumbWide=urlWeb+img.imagenThumbWide;
								images.imagenSlider=urlWeb+img.imagenSlider;
								images.imagenMenu=urlWeb+img.imagenMenu;
								images.imgSeccionF=urlWeb+img.imgSeccionF;
								images.imgSeccionT=urlWeb+img.imgSeccionT;
								aux.imagenes=images;
								Secciones.findOne({idsecciones: uno.idsecciones}).exec(function(err, secc){
									if(err) reject(err);
									aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
									User.findOne({idUsuario: uno.idAutor}).exec(function(err, autor){
										if(err) reject(err);
										aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
										tagsxnotas.find({idnotas: uno.idNotas}).exec(function(err, txn){
											if(err) reject(err);
											var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
											Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
												if(err) reject(err);
												tags.forEach(function(t){
													var auxt={id:t.idtags, nombre: t.nombre};
													aux.tags.push(auxt);
													if(aux.tags.length>=tags.length){
														conti++;
														respuesta(aux);
													}
												});
											});
										});
									});
								});
							});
						});
		});
	});
};

function denuncia(){
	var denunciaGlobal=[];
	var cont=0;
	return new Promise(function(resolve, reject){
		VideoDenuncia.find().sort({idVideoDenuncia:-1}).limit(10).exec(function(err, vids){
			if(err){reject(err);} 
			vids.forEach(function(item){
				if(item.fechaCarga==null){
					var auxDate=new Date();
					var fecha=auxDate.toISOString().substring(0,19)+"Z";
				}
				else{
					var fecha=item.fechaCarga.toISOString().substring(0,19)+"Z";
				}

				var auxil={id:item.idVideoDenuncia, url:item.url, titulo: item.titulo, fecha: fecha, descripcion: item.descripcion};
				cont++;
				denunciaGlobal.push(auxil);
				if(cont>=vids.length)
					resolve(denunciaGlobal);
			});
		});
	});
};

function banner(tipoB){
	var respuesta=[];
	return new Promise(function(resolve, reject){
		BannersApp.find({tipo: tipoB}, {urlImg:1, urlAccion:1, _id:0}).exec(function(err, ban){
			if(err) reject(err);

			var x = Math.floor((Math.random() * ban.length) + 1);
			respuesta.push(ban[x-1])
			resolve(respuesta);
		});
	});
};

function expertos(){
	var cont=0;
	var expertos=[];

	return new Promise(function(resolve, reject){
		function respuesta(n){
			expertos.push(n);

			if(cont>=5)
				resolve(expertos);
		};

		Notas.find({fecha_inicio:{$lte:fechaActual}, status:1, idsecciones:{$gte:38}}).sort({'fecha_inicio':-1}).limit(5).exec(function(err,uno){
			if(err) reject(err);
			uno.forEach(function(noti){
				var not=noti;
				var aux={id:not.idNotas, titulo:not.titulo, resumen: not.resumen, fecha: dateFormat(noti.fecha_inicio), nota: not.notaCompleta, tipo: not.tipoNota, special: not.special==0? false : true, imagenes:{}, categoria:{}, autor:{}, tags:[]};
				Imagenes.findOne({idnotas:not.idNotas}).sort({idimagenes:-1}).exec(function(err,img){
					if(err) reject(err);
					var images={};
					images.imgMain=urlWeb+img.imagenMain;
					images.imgArticulo=urlWeb+img.imagenArticulo;
					images.imagenPortada=urlWeb+img.imagenPortada;
					images.imagenThumb=urlWeb+img.imagenThumb;
					images.imagenThumbWide=urlWeb+img.imagenThumbWide;
					images.imagenSlider=urlWeb+img.imagenSlider;
					images.imagenMenu=urlWeb+img.imagenMenu;
					images.imgSeccionF=urlWeb+img.imgSeccionF;
					images.imgSeccionT=urlWeb+img.imgSeccionT;
					aux.imagenes=images;
					Secciones.findOne({idsecciones: not.idsecciones}).exec(function(err, secc){
						if(err) reject(err);
						aux.categoria={id:secc.idsecciones, nombre: secc.nombre};
						User.findOne({idUsuario: not.idAutor}).exec(function(err, autor){
							if(err) reject(err);
							aux.autor={id: autor.idUsuario, nombre: autor.nombreCompleto};
							tagsxnotas.find({idnotas: not.idNotas}).exec(function(err, txn){
								if(err) reject(err);
								var auxTags=[txn[0].idtags, txn[1].idtags, txn[2].idtags, txn[3].idtags, txn[4].idtags];
								Tags.find({idtags: {$in:auxTags}}).exec(function(err, tags){
									if(err) reject(err);
									tags.forEach(function(t){
										var auxt={id:t.idtags, nombre: t.nombre};
										aux.tags.push(auxt);
										if(aux.tags.length>=tags.length){
											cont++;
											respuesta(aux);
										}
									});
								});
							});
						});
					});
				});
			});
		});
	});
};

function camarasTrafico(tipo){
	return new Promise(function(resolve, reject){
		CamarasTrafico.find({tipo: tipo}).sort({nombre: 1}).exec(function(err, cams){
			if(err) reject(err);

			resolve(cams);
		});
	});
};
/***************************************FIN API AREA**************************************************/

module.exports = router;
