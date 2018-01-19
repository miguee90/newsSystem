var mongoose=require('mongoose');

var EstacionesSchema=new mongoose.Schema({
	id: Number,
	nombre: String,
	descripcion: String
},{collection : 'estaciones'});

mongoose.model('Estaciones',EstacionesSchema);