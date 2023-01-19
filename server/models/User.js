const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	games: [{
		type: Schema.Types.ObjectId,
		ref: 'Game'
	}]
});

UserSchema.methods.comparePassword = function (password) {
	const user = this;
	return bcrypt.compare(password, user.password).then((isMatch) => {
		if (!isMatch) {
			return Promise.reject();
		}
		return user;
	});
};


UserSchema.pre('save', function (next) {
	if (this.isModified('password')) {
		bcrypt.hash(this.password, 12)
			.then((hashedPassword) => {
				this.password = hashedPassword
				return next();
			}
			)
	} else return next();

})

module.exports = model('User', UserSchema)