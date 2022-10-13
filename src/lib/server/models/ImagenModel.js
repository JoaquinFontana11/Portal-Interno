import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
	url: {
		type: String,
		required: [true, 'Una imagen tiene que tener una url']
	},
	alt: {
		type: String,
		required: [true, 'Una imagen tiene que tener un texto alternativo']
	},
	height: Number,
	width: Number
});

const Image = mongoose.model('imagenes', imageSchema);

export default Image;
