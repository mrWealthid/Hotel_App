const mongoose = require('mongoose');
const validator = require('validator');

const GuestSchema = new mongoose.Schema(
	{
		name: { type: String, required: [true, 'A Guest must have a name'] },

		email: {
			type: String,
			required: [true, 'Please provide your email'],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, 'Please provide a valid email']
		},

		nationalId: {
			type: String,
			required: [true, 'A Guest must have a national Identification']
		},
		nationality: {
			type: String,
			required: [true, 'A Guest must have a nationality']
		},
		countryFlag: { type: String },
		countryFlag: { type: String },

		createdAt: {
			type: Date,
			default: Date.now(),
			select: false
		}

		// tour: {
		// 	type: mongoose.Schema.ObjectId,
		// 	ref: 'Tour',
		// 	required: [true, 'Review must belong to a tour.']
		// },

		// user: {
		// 	type: mongoose.Schema.ObjectId,
		// 	ref: 'User',
		// 	required: [true, 'Review must belong to a user.']
		// }
	},

	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Guest = mongoose.models.Guest || mongoose.model('Guest', GuestSchema);
module.exports = Guest;
