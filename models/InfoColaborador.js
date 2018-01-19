var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var InfoColaSchema=new mongoose.Schema({
	id: Number,
	nombreColaborador: String,
	idUsuario: Number,
	idseccion: Number,
	diaPublicacion: Number,
	idSegmento: Number,
	biografia: String,
	idTematica: Number,
},{collection : 'infoColaborador'});

mongoose.model('InfoColaborador',InfoColaSchema);