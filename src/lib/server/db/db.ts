import { Sequelize, Model, Optional } from 'sequelize';
// import * as dotenv from 'dotenv';

import User from './models/UserModel';
import Image from './models/ImageModel';

// dotenv.config();
// console.log(process.env.DB);

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/portal_interno_db');

const dbInit = async () => {
	try {
		// chequeamos la conexion con la base
		await sequelize.authenticate();
		// la pripiedad alter crea la tabla si esta no existe en la base, o la actualiza con las clumnas que faltan
		User.sync({ alter: true });
		Image.sync({ alter: true });

		console.log('La conexion con la base fue un exito');
	} catch (err) {
		console.error('Hubo un error conectandose con la base: ', err);
	}
};

const createOne = (Model: any) => async (data: any) => {
	const newDoc = await Model.create(data);
	return newDoc;
};

export const createUser = createOne(User);

// (async () => {
// 	await sequelize.sync({ force: true });

// 	const newUser = await User.create({
// 		name: 'test',
// 		lastname: 'test',
// 		username: 'test',
// 		email: 'test@test.com',
// 		role: 'test-role'
// 	});
// 	console.log(newUser);
// })();

export default dbInit;
