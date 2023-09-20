const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema(
	{
		minBookingLength: {
			type: Number,
			default: 3,
			min: [3, 'Booking Length must be above 3']
		},
		maxBookingLength: {
			type: Number,
			default: 80,
			max: [80, 'Booking Length must be below 80']
		},
		maxGuestsPerBooking: {
			type: Number,
			default: 8,
			max: [8, 'Rating must be below 5.0'],
			min: [1, 'Rating must be above 1.0']
		},
		breakfastPrice: {
			type: Number,
			default: 15
		},

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

// SettingsSchema.index({ tour: 1, user: 1 }, { unique: true });
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

const Setting =
	mongoose.models.Setting || mongoose.model('Setting', SettingSchema);

module.exports = Setting;
