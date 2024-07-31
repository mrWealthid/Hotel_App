const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: [true, 'Please tell us your name!'] },
		email: {
			type: String,
			required: [true, 'Please provide your email'],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, 'Please provide a valid email']
		},
		photo: { type: String, default: 'default.jpg' },
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user'
		},

		password: {
			type: String,
			// required: [true, 'Please provide a password'],
			minlength: 8,
			select: false
		},

		googleId: {
			type: String
		},
		createdAt: {
			type: Date,
			default: Date.now(),
			select: false
		},

		dateOfBirth: {
			type: Date
			// required: [true, 'Please add date of birth'],
		},

		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
		active: {
			type: Boolean,
			default: true,
			select: false
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

// userSchema.pre('save', function (next) {
//   this.accountNumber = generateUniqueAccountNumber();
//   next();
// });

// userSchema.virtual('imgUrl').get(function () {
// 	const env = process.env.NODE_ENV;

// 	const url = /development/i.test(env)
// 		? `${process.env.DEVELOPMENT_URL}:${process.env.PORT}`
// 		: process.env.PROD_URL;
// 	return `${url}/img/users/${this.photo}`;
// });
userSchema.pre('save', async function (next) {
	//Only run function if password was modified
	if (!this.isModified('password')) return next();

	//salting simply means its adding strings to the password so that two same passwords don't generate the same hash

	//hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 10);

	//delete the password confirm field

	next();
});

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimeStamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return JWTTimestamp < changedTimeStamp;
	}
	return false;
};

userSchema.pre('save', function (next) {
	if (!this.isModified('password') || this.isNew) return next();
	this.passwordChangedAt = Date.now() - 1000;
	//I did that substraction because the token is created faster most times before this runs...It's a quick fix
	next();
});

userSchema.methods.correctPassword = async function (
	newPassword,
	userPassword
) {
	return await bcrypt.compare(newPassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');
	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	console.log({ resetToken }, this.passwordResetToken);
	//for 10mins
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
	return resetToken;
};

userSchema.pre(/^find/, function (next) {
	// this.find({ active: false });
	this.find({ active: { $ne: false } });
	next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

//Use this if you drop the DB for indexing
// User.init().then((x) => console.log(x));
module.exports = User;
