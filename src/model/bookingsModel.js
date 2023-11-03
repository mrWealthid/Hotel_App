const mongoose = require('mongoose');
const Guest = require('./guestModel');
const Cabin = require('./cabinModel');
const { NextResponse } = require('next/server');

const BookingSchema = new mongoose.Schema(
	{
		startDate: {
			type: Date
			// default: Date.now()
		},
		endDate: {
			type: Date
			// default: Date.now()
		},
		numNights: {
			type: Number
		},
		numGuests: {
			type: Number
		},
		cabinPrice: {
			type: Number
		},

		extrasPrice: {
			type: Number
		},
		totalPrice: {
			type: Number
		},
		checkStatus: {
			type: String,
			enum: ['CHECKED_IN', 'UNCONFIRMED', 'CHECKED_OUT'],
			default: 'UNCONFIRMED'
		},

		hasBreakfast: {
			type: Boolean
		},
		isPaid: {
			type: Boolean
		},

		observations: { type: String },

		guests: {
			type: mongoose.Schema.ObjectId,
			ref: Guest,
			required: [true, 'Booking must belong to a Guest']
		},

		cabin: {
			type: mongoose.Schema.ObjectId,
			ref: Cabin,
			required: [true, 'Booking must have a Cabin']
		},

		createdAt: {
			type: Date,
			default: Date.now()
		}
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// function generateUniqueAccountNumber() {
//   const timestamp = Date.now();
//   const randomDigits = +crypto.randomBytes(2).readUInt16BE(0).toString();
//   const result = timestamp + randomDigits;
//   return Number(result.toString().slice(-7));
// }

// BookingSchema.pre('save', function (NextResponse) {
// 	this.totalPrice = this.cabinPrice + this.extrasPrice;
// 	NextResponse.next();
// });

////DOCUMENT MIDDLEWARE: runs before .save() and .create() not on .insertMany
// tourSchema.pre('save', function (next) {
// 	this.slug = slugify(this.name, { lower: true });
// 	next();
// });

// BookingSchema.virtual('imgUrl').get(function () {
// 	const env = process.env.NODE_ENV;

// 	const url = /development/i.test(env)
// 		? `${process.env.DEVELOPMENT_URL}:${process.env.PORT}`
// 		: process.env.PROD_URL;
// 	return `${url}/img/Bookings/${this.photo}`;
// });
// BookingSchema.pre('save', async function (next) {
// 	//Only run function if password was modified
// 	if (!this.isModified('password')) return next();

// 	//salting simply means its adding strings to the password so that two same passwords don't generate the same hash

// 	//hash the password with cost of 12
// 	this.password = await bcrypt.hash(this.password, 10);

// 	//delete the password confirm field

// 	next();
// });

// BookingSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
// 	if (this.passwordChangedAt) {
// 		const changedTimeStamp = parseInt(
// 			this.passwordChangedAt.getTime() / 1000,
// 			10
// 		);
// 		return JWTTimestamp < changedTimeStamp;
// 	}

// 	return false;
// };

// BookingSchema.pre('save', function (next) {
// 	if (!this.isModified('password') || this.isNew) return next();
// 	this.passwordChangedAt = Date.now() - 1000;

// 	//I did that substraction because the token is created faster most times before this runs...It's a quick fix
// 	next();
// });

// BookingSchema.methods.correctPassword = async function (
// 	candidatePassword,
// 	BookingPassword
// ) {
// 	return await bcrypt.compare(candidatePassword, BookingPassword);
// };

// BookingSchema.methods.createPasswordResetToken = function () {
// 	const resetToken = crypto.randomBytes(32).toString('hex');
// 	this.passwordResetToken = crypto
// 		.createHash('sha256')
// 		.update(resetToken)
// 		.digest('hex');

// 	console.log({ resetToken }, this.passwordResetToken);
// 	//for 10mins
// 	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

// 	return resetToken;
// };

// BookingSchema.pre(/^find/, function (next) {
// 	// this.find({ active: false });
// 	this.find({ active: { $ne: false } });
// 	next();
// });

// BookingSchema.pre(/^find/, function (next) {
// 	this.populate({
// 		path: 'guides',
// 		select: '-__v -passwordChangedAt'
// 	});
// 	next();
// });

const Booking =
	mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

//Use this if you drop the DB for indexing
// Booking.init().then((x) => console.log(x));
module.exports = Booking;
