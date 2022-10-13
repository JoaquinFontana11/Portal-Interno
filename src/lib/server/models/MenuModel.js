import mongoose from 'mongoose';

const menuSchema = mongoose.Schema({
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
	}
});

const Menu = mongoose.model('menus', menuSchema);

export default Menu;
