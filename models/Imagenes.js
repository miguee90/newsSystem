var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var ImagenSchema=new mongoose.Schema({
	idimagenes: Number,
	imagenMain: String,
	imagenArticulo: String,
	imagenPortada: String,
	imagenThumb: String,
	imagenThumbWide: String,
	imagenSlider: String,
	imagenMenu: String,
	idnotas: Number,
	imgSeccionF: String,
	imgSeccionT: String	
},{collection : 'imagenes'});

mongoose.model('Imagenes',ImagenSchema);