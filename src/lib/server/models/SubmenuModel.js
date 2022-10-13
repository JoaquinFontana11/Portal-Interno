import mongoose from 'mongoose';

const subMenuSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Un menu debe tener un nombre']
	},
	order: {
		type: Number,
		default: 99
	},
	slug: {
		type: String,
		default: '#'
	},
	active: {
		type: Boolean,
		default: true
	},
	parent: {
		type: mongoose.Schema.ObjectId,
		ref: 'menus',
		required: [true, 'Un submenu tiene que estar asignado a un menu']
	}
});

const SubMenu = mongoose.model('sub-menus', subMenuSchema);

export default SubMenu;
