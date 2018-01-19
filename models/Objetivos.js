var mongoose=require('mongoose');

var ObjetivoSchema=new mongoose.Schema({
	fecha: Date,
	investigaciones: Number,
	local: Number,
	denuncia: Number,
	colaboradores: Number,
	negocios: Number,
	estados: Number,
	nacional: Number,
	internacional: Number,
	actualidad: Number,
	espectaculos: Number,
	deportesLocal: Number,
	deportesNacional: Number,
	rmx: Number,
	wfm: Number,
	imagen: Number,
	formula: Number,
	kebuena: Number,
	vivecanal: Number
},{collection : 'objetivos'});

mongoose.model('Objetivos',ObjetivoSchema);