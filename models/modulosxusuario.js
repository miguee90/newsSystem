var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var mxuSchema=new mongoose.Schema({
	usuario: [{ type: Schema.Types.ObjectId, ref: 'Usuarios' }],
	modulo: [{ type: Schema.Types.ObjectId, ref: 'Modulos' }]
},{collection : 'modulosxusuario'});

mongoose.model('modulosxusuario',mxuSchema);