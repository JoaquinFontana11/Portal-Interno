import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Una proyecto tiene que tener un nombre']
	},
	slug: {
		type: String,
		required: [true, 'Un proyecto tiene que tener un nombre']
	}
});

const Project = mongoose.model('proyectos', projectSchema);

export default Project;
