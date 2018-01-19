var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var HitSchema=new mongoose.Schema({
	idHits: Number,
	idNotas: Number,
	hits: {type:Number, default: 1}
},{collection : 'hits'});

mongoose.model('Hits',HitSchema);