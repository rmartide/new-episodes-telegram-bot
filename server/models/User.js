const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	chat_id: String
});

userSchema.statics.alreadyExists = async function(chat_id) {
	return User.exists({
		chat_id
	});
};

userSchema.statics.add = function(chat_id) {
	const newUser = new User({ chat_id });

	newUser.save();
};

userSchema.statics.getAll = function() {
	return User.find({});
};

const User = mongoose.model("User", userSchema);

module.exports = User;
