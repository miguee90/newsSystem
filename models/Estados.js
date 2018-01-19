var mongoose=require('mongoose');

var EstadoSchema=new mongoose.Schema({
	idEstados: Number,
	nombre: String,
	abrev: String
},{collection : 'estados'});

mongoose.model('Estados',EstadoSchema);