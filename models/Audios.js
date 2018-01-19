var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var AudioSchema=new mongoose.Schema({
	idAudio: Number,
	ruta: String,
	idnotas: Number,
},{collection : 'audios'});

mongoose.model('Audios',AudioSchema);