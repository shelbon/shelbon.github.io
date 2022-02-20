import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { SALT_WORK_FACTOR } from '../utils/constants.js';
const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});
UserSchema.pre('save', function (next) {
	let user = this;
	if (!user.isModified('password')) return next();
	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err);

		// hash the password along with our new salt
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);

			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};
export default mongoose.model('User', UserSchema);
