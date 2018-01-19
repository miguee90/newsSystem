var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var ReporteSchema=new mongoose.Schema({
	b_id: [{ type: Schema.Types.ObjectId, ref: 'Banners' }],
	year: String,
	month: String,
	impressions: Number,
	clicks: Number
},{collection : 'nx_reports'});

mongoose.model('Reportes',ReporteSchema);