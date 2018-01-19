var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var SeccionSchema=new mongoose.Schema({
	idsecciones: Number,
	nombre: String,
	especial: Number,
	seccionGeneral: Number,
	tipo: Number
},{collection : 'secciones'});

mongoose.model('Secciones',SeccionSchema);