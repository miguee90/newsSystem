var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var NotaSchema=new mongoose.Schema({
	idNotas: Number,
	titulo: String,
	fecha_inicio: Date,
	fecha_final: Date,
	resumen: String,
	notaCompleta: String,
	status: Number,
	prioridad: Number,
	fechaCaptura: Date,
	alias: String,
	hits: Number,
	idsecciones: Number,
	capturo: Number,
	aprobo: Number,
	idEstados: Number,
	idAutor: Number,
	tipoNota: Number,
	special: Number,
	noticiero:Number,
	momento: Boolean,
	portada:Number
},{collection : 'notas'});

mongoose.model('Notas',NotaSchema);