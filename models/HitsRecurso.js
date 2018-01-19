var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var HitsRecursoSchema=new mongoose.Schema({
	idHits: Number,
	Recurso: Number,
	fecha: Date,
	hits: Number
},{collection : 'hitsRecurso'});

mongoose.model('HitsRecurso',HitsRecursoSchema);