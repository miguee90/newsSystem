var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var HitsTrascendidoSchema=new mongoose.Schema({
	idHitsT: Number,
	fecha: Date,
	vistas: Number
},{collection : 'hitsTrascendidos'});

mongoose.model('HitsTrascendidos',HitsTrascendidoSchema);