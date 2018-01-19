var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var SegmentoSchema=new mongoose.Schema({
	idSegmento: Number,
	segmento: String
},{collection : 'segmento'});

mongoose.model('Segmento',SegmentoSchema);