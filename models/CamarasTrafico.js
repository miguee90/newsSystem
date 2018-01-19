var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var camarasTraficoSchema=new mongoose.Schema({
	id: Number,
	url: String,
	latitud: Number,
	longitud: Number,
	thumb: String,
	nombre: String,
	banner: String,
	banner_accion: String,
	tipo: Number,
	poster: String
},{collection : 'camarasTrafico'});

mongoose.model('CamarasTrafico',camarasTraficoSchema);