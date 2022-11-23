import { Sequelize, DataTypes } from 'sequelize';
import * as dotenv from 'dotenv';
import Image from './ImageModel.js';

dotenv.config();

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/portal_interno_db');

const User = sequelize.define(
	'User',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		freezeTableName: true, // el nombre de la tabla es exactamente igual al del modelo
		timestamps: false // desactivamos las columnas createdAt y updatedAt
	}
);

User.hasOne(Image, {
	foreignKey: 'photo_id'
});

export default User;
