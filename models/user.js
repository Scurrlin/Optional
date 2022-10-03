// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const SALT_ROUNDS = 6;

// const userSchema = new mongoose.Schema({
//   username: {type: String, required: true, lowercase: true, unique: true},
//   email: {type: String, required: true, lowercase: true, unique: true},
//   password: String,
  
// }, {
//   timestamps: true
// });

// userSchema.set('toJSON', {
//   transform: function(doc, ret) {
//     // remove the password property when serializing doc to JSON
//     delete ret.password;
//     return ret;
//   }
// });
// /// in controller

// // this is if you populate the user
// userSchema.set('toObject', {
//   transform: (doc, ret, opt) => {
//    delete ret.password;
//    return ret;
//   }
// });


// // DO NOT DEFINE instance methods with arrow functions, 
// // they prevent the binding of this
// userSchema.pre('save', function(next) {
//   // 'this' will be set to the current document
//   const user = this;
//   // check to see if the user has been modified, if not proceed 
//   // in the middleware chain
//   if (!user.isModified('password')) return next();
//   // password has been changed - salt and hash it
//   bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
//     if (err) return next(err);
//     // replace the user provided password with the hash
//     user.password = hash;
//     next();
//   });
// });

// userSchema.methods.comparePassword = function(tryPassword, cb) {
//     console.log(cb, ' this is cb')
//   // 'this' represents the document that you called comparePassword on
//   bcrypt.compare(tryPassword, this.password, function(err, isMatch) {
//     if (err) return cb(err);

//     cb(null, isMatch);
//   });
// };

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6; // 6 is a typical and reasonable value

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: {
			type: String,
			unique: true,
			trim: true,
			lowercase: true,
			required: true,
		},
		password: {
			type: String,
			trim: true,
			minLength: 3,
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: function (doc, ret) {
			delete ret.password;
			return ret;
		},
	}
);

userSchema.pre('save', function (next) {
	// Save the reference to the user doc
	const user = this;
	if (!user.isModified('password')) return next();
	// if password has been changed - salt and hash it
	bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
		if (err) return next(err);
		// Update the password property with the hash
		user.password = hash;
		return next();
	});
});

module.exports = mongoose.model('User', userSchema);