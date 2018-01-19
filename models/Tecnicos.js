var mongoose=require('mongoose');

var tecnicoSchema=new mongoose.Schema({
	id: Number,	
	idcontrol: Number,	
	idpersonal: Number	
},{collection : 'tecnicos'});

mongoose.model('Tecnicos',tecnicoSchema);