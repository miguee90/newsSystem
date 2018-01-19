var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var BannersAppSchema=new mongoose.Schema({
	id: Number,
	urlImg: String,
	urlAccion: String
},{collection : 'bannersApp'});

mongoose.model('BannersApp',BannersAppSchema);