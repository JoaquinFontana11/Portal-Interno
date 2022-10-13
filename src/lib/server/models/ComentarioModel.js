import mongoose from 'mongoose';

const comentSchema = mongoose.Schema({
	text: {
		type: String,
		required: [true, 'Un comentario tiene que tener un texto']
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'comentarios',
		required: [true, 'Un comentario tiene que ser hecho por un usuario']
	}
});

const Coment = mongoose.model('comentarios', comentSchema);

export default Coment;
