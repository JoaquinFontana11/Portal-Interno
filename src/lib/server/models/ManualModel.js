import mongoose from 'mongoose';

const manualSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Un manual tiene que tener un titulo']
	},
	url: {
		type: String,
		required: [true, 'Un manual tiene que tener una url']
	},
	order: Number,
	date: {
		type: Date,
		default: Date.now()
	},
	sector: {
		type: String,
		enum: ['Analisis-y-Desarrollo', 'Operaciones-IT']
	}
});

const Manual = mongoose.model('manuales', manualSchema);

export default Manual;
