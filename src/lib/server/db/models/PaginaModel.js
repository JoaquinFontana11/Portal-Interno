import mongoose from 'mongoose';

const pageSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Una pagina tiene que tener un titulo']
	},
	body: {
		type: String,
		default: ''
	},
	slug: {
		type: String,
		required: [true, 'Una pagina tiene que tener una slug']
	},
	isNovelty: {
		type: Boolean,
		default: false
	},
	image: {
		type: String,
		default: '#'
	},
	banner: {
		type: String,
		default: '#'
	},
	date: {
		type: Date,
		default: Date.now()
	},
	questionsActive: {
		type: Boolean,
		default: false
	},
	questions: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'preguntas-frecuentes'
		}
	]
});

const Page = mongoose.model('pages', pageSchema);

export default Page;
