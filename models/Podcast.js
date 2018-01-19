var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var PodcastSchema=new mongoose.Schema({
	idPodcast: Number,
	titulo: String,
	alias: String,
	fecha: Date,
	ruta: String,
	entrevistado: Number,
	tipo: Number,
	idsecciones: Number,
	idEstados: Number,
	status: Number,
	idUsuario: Number,
	descripcion: String
},{collection : 'Podcast'});

mongoose.model('Podcast',PodcastSchema);