import mongoose from 'mongoose';

const adSchema = mongoose.Schema({
	content: {
		type: String,
		required: [true, 'Un anuncio tiene que tener un contenido']
	},
	initDate: {
		type: Date,
		required: [true, 'Un anuncio tiene que tener una fecha de inicio']
	},
	endDate: {
		type: Date,
		required: [true, 'Un anuncio tiene que tener una fecha de fin']
	},
	userClosed: [{ type: mongoose.Schema.ObjectId, ref: 'usuarios' }]
});

const User = mongoose.model('users', adSchema);

export default User;
