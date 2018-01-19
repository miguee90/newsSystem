var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var TematicaSchema=new mongoose.Schema({
	id: Number,
	tematica: String
},{collection : 'Tematica'});

mongoose.model('Tematica',TematicaSchema);