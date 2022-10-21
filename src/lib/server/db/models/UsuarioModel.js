import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Un usuario debe tener un nombre']
	},
	lastName: {
		type: String,
		required: [true, 'Un usuario debe tener un apellido']
	},
	username: {
		type: String,
		required: [true, 'Un usuario debe tener un nombre de usuario']
	},
	password: {
		type: String,
		default: '1234'
	},
	email: {
		type: String,
		required: [true, 'Un usuario debe tener un email']
	},
	profilePhoto: {
		type: String,
		default: '#'
	},
	rol: {
		type: String,
		default: 'user',
		enum: ['user', 'admin']
	},
	birthday: Date
});

const User = mongoose.model('users', userSchema);

export default User;
