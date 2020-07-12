const mongoose = require("mongoose");

const episodeSchema = mongoose.Schema({
	title: String,
	number: String
});

episodeSchema.statics.alreadyExists = async function({ title, number }) {
	return Episode.exists({
		title,
		number
    });
};

episodeSchema.statics.add = function(episode) {
	const newEpisode = new Episode(episode);
	newEpisode.save();
};

const Episode = mongoose.model("Episode", episodeSchema);

module.exports = Episode;
