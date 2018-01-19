var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var BannerSchema=new mongoose.Schema({
	id: Number,
	g_id: [{ type: Schema.Types.ObjectId, ref: 'Grupos' }],
	name: String,
	path: String,
	type: String,
	hyperlink: String,
	height: Number,
	width: Number,
	impressions: Number,
	clicks: Number,
	date_s: Date,
	date_e: Date,
	flashvar: Number,
	pixel_tracking: Number,
	tags: String,
	status: Number,
	hits: Number
},{collection : 'nx_banners'});

mongoose.model('Banners',BannerSchema);