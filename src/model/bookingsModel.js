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
			type: Boolean,
			default: false
		},
		isPaid: {
			type: Boolean,
			default: false
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

const Booking =
	mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

//Use this if you drop the DB for indexing
// Booking.init().then((x) => console.log(x));
module.exports = Booking;
