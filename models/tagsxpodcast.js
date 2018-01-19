var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var tagsxpodcastSchema=new mongoose.Schema({
	idTags: Number,
	idPodcast: Number
},{collection : 'tagsxpodcast'});

mongoose.model('tagsxpodcast',tagsxpodcastSchema);