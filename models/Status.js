var mongoose=require('mongoose');

var statuSchema=new mongoose.Schema({
	id: Number,
	nombre: String,
	descripcion: String
},{collection : 'status'});

mongoose.model('Status',statuSchema);