var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var TagSchema=new mongoose.Schema({
	idtags: Number,
	nombre: String
},{collection : 'tags'});

mongoose.model('Tags',TagSchema);