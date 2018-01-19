var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var DenunciaSchema=new mongoose.Schema({
	idVideoDenuncia: Number,
	url: String,
	titulo: String,
	descripcion: String,
	fechaCarga: Date,
	usuarioCargo: Number
},{collection : 'videodenuncia'});

mongoose.model('VideoDenuncia',DenunciaSchema);