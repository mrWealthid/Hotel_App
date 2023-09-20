const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
	name: { type: String, required: [true, 'Please tell us your name!'] },

	accountNumber: {
		type: Number,
		minlength: 7
	},

	createdAt: {
		type: Date,
		default: Date.now(),
		select: false
	}
});

const Beneficiary =
	mongoose.models.Beneficiary ||
	mongoose.model('Beneficiary', beneficiarySchema);

// const User = mongoose.models.users || mongoose.model('users', userSchema);
// Beneficiary.init().then((x) => console.log(x));
module.exports = Beneficiary;
