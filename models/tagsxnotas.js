var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var tagsxnotaSchema=new mongoose.Schema({
	idtags: Number,
	idnotas: Number
},{collection : 'tagsxnotas'});

mongoose.model('tagsxnotas',tagsxnotaSchema);