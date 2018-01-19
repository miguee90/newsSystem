var mongoose=require('mongoose');

var controleSchema=new mongoose.Schema({
	id: Number,
	dia: Date,
	horainicio: String,
	horafin: String,
	cliente: String,
	evento: String,
	direccion: String,
	estacion: Number,
	locutor: String,
	unidad: Number,
	contrato: String,
	estado: Number,
	contacto: String,
	observaciones: String,
	agenteventas: String,
	mapa: Number,
	latitud: Number,
	longitud: Number,
	entrecalles: String,
	contactotelefono: String,
	contactoemail: String,
	agenteventastelefono: String,
	cortes: Number,
	situacion: Number, 
	idusuario: Number,
	hojadatos: Number,
	fechaCaptura: Date
},{collection : 'controles'});

mongoose.model('Controles',controleSchema);