var mongoose=require('mongoose');

var personalSchema=new mongoose.Schema({
	id: Number,
	nombre: String,
	descripcion: String
},{collection : 'personal'});

mongoose.model('Personal',personalSchema);