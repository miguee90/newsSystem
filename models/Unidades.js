var mongoose=require('mongoose');

var UnidadSchema=new mongoose.Schema({
	id: Number,
	nombre: String,
	descripcion: String
},{collection : 'unidades'});

mongoose.model('Unidades',UnidadSchema);