var mongoose=require('mongoose');

var dispositivoSchema=new mongoose.Schema({
	token: String,
	so: String,
	ultimaConex: Date
},{collection : 'dispositivos'});

mongoose.model('Dispositivos',dispositivoSchema);