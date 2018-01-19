var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var RadioSchema=new mongoose.Schema({
	id: Number,
	nombre: String,
	img1: String,
	img2: String,
	urlAndroid: String,
	urliOS: String
},{collection : 'radio'});

mongoose.model('Radio',RadioSchema);