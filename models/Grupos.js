var mongoose=require('mongoose');

var GrupoSchema=new mongoose.Schema({
	group_name: String,
	group_height: Number,
	group_width: Number,
	date_e: Date,
	standard: Number,
	description: String
},{collection : 'nx_groups'});

mongoose.model('Grupos',GrupoSchema);