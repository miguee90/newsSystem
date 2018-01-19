var mongoose=require('mongoose');

var ModuloSchema=new mongoose.Schema({
	nombre: String,
	descripcion: String,
	idModulo: Number,
	estado: String
},{collection : 'Modulos'});

mongoose.model('Modulos',ModuloSchema);