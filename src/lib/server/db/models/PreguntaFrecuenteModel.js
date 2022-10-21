import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
	question: {
		type: String,
		required: [true, 'Una pregunta tiene que tener una pregunta']
	},
	answer: {
		type: String,
		required: [true, 'Una pregunta tiene que tener una respuesta']
	},
	order: {
		type: Number,
		default: 99
	}
});

const Question = mongoose.model('preguntas-frecuentes', questionSchema);

export default Question;
