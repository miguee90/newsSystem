var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var ImgGaleriaSchema=new mongoose.Schema({
	idImgGaleria: Number,
	rutaImagen: String,
	rutaThumb: String,
	idNotas: Number,
},{collection : 'imgGaleria'});

mongoose.model('ImgGaleria',ImgGaleriaSchema);