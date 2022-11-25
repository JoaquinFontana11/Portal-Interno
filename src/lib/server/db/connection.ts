import { Sequelize } from 'sequelize';
import { DB } from '$env/static/private';

export default new Sequelize(DB, {
	logging: false
});
