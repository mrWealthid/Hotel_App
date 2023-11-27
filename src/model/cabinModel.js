const mongoose = require('mongoose');

const cabinSchema = new mongoose.Schema(
	{
		name: { type: String, required: [true, 'A cabin must have a name'] },

		maxCapacity: {
			type: Number,
			default: 0,
			max: [5, 'Rating must be below 5.0'],
			min: [1, 'Rating must be above 1.0']
		},
		regularPrice: {
			type: Number,
			default: 0
		},
		discount: {
			type: Number,
			default: 0
		},

		description: { type: String },

		image: { type: String, default: 'default.jpg' },

		createdAt: {
			type: Date,
			default: Date.now(),
			select: false
		}
	},

	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Cabin = mongoose.models.Cabin || mongoose.model('Cabin', cabinSchema);
module.exports = Cabin;
