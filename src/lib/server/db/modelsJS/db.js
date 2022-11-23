import { Sequelize, DataTypes } from 'sequelize';
import User from '../models/UserModel.js';
import * as dotenv from 'dotenv';

dotenv.config();
console.log(process.env.DB);
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/portal_interno_db');

try {
	await sequelize.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

(async () => {
	await sequelize.sync({ force: true });

	const newUser = await User.create({
		name: 'test',
		lastname: 'test',
		username: 'test',
		email: 'test@test.com',
		role: 'test-role'
	});
	console.log(newUser);
})();
