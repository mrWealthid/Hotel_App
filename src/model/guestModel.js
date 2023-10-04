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

// GuestSchema.index({ tour: 1, user: 1 }, { unique: true });
// reviewSchema.pre(/^find/, function (next) {
// 	// this.populate({
// 	//   path: 'user',
// 	//   select: 'name photo',
// 	// }).populate({
// 	//   path: 'tour',
// 	//   select: 'name',
// 	// });
// 	this.populate({
// 		path: 'user',
// 		select: 'name photo'
// 	});
// 	next();
// });

// reviewSchema.statics.calcAverageRatings = async function (tourId) {
// 	const stats = await this.aggregate([
// 		{ $match: { tour: tourId } },
// 		{
// 			$group: {
// 				_id: '$tour',
// 				nRating: { $sum: 1 },
// 				avgRating: { $avg: '$rating' }
// 			}
// 		}
// 	]);

// 	console.log(stats);
// 	if (stats.length > 0) {
// 		await Tour.findByIdAndUpdate(tourId, {
// 			ratingsQuantity: stats[0].nRating,
// 			ratingsAverage: stats[0].avgRating
// 		});
// 	} else {
// 		await Tour.findByIdAndUpdate(tourId, {
// 			ratingsQuantity: 0,
// 			ratingsAverage: 4.5
// 		});
// 	}
// };

// reviewSchema.post('save', function () {
// 	//points to current review
// 	this.constructor.calcAverageRatings(this.tour);
// });

// reviewSchema.pre(/^findOneAnd/, async function (next) {
// 	this.r = await this.findOne();
// 	next();
// });

// reviewSchema.post(/^findOneAnd/, async function () {
// 	await this.findOne(); //does not work here. because the query has already executed
// 	await this.r.constructor.calcAverageRatings(this.r.tour);
// });

const Guest = mongoose.models.Guest || mongoose.model('Guest', GuestSchema);
module.exports = Guest;
