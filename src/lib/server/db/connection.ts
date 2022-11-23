import { Sequelize } from 'sequelize';

export default new Sequelize('postgres://postgres:postgres@localhost:5432/portal_interno_db', {
	logging: false
});
