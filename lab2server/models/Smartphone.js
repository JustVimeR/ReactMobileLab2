const mongoose = require("mongoose");

const smartphoneSchema = new mongoose.Schema({
	manufacturer: {
		type: String,
		required: true,
	},
	model: {
		type: String,
		required: true,
	},
	screenSize: {
		type: Number,
		required: true,
	},
	warehouseAddress: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Smartphone", smartphoneSchema);
