import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
	titulo: {
		type: String,
		required: [true, 'Una imagen de galeria tiene que tener un titulo']
	},
	imagen: {
		type: mongoose.Schema.ObjectId,
		ref: 'imagenes',
		required: [true, 'Una imagen tiene que tener... una imagen']
	},
	comments: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'comentarios'
		}
	]
});

const ImageGalery = mongoose.model('imagenes-galeria', imageSchema);

export default ImageGalery;
