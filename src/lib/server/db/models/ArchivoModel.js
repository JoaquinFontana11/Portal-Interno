import mongoose from 'mongoose';

const fileSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Un archivo tiene que tener un titulo']
	},
	type: {
		type: String,
		default: 'files',
		enum: ['files', 'videos']
	},
	url: {
		type: String,
		required: [true, 'Un archivo tiene que tener una url']
	},
	order: { type: Number, default: 99 },
	date: {
		type: Date,
		default: Date.now()
	},
	sector: {
		type: String,
		enum: ['OIT', 'AYD']
	}
});

const Archivo = mongoose.model('archivos', fileSchema);

export default Archivo;
