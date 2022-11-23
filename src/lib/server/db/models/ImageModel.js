import { Sequelize, DataTypes } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/portal_interno_db');

const Image = sequelize.define(
	'Image',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		alt: {
			type: DataTypes.STRING,
			allowNull: false
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		freezeTableName: true, // el nombre de la tabla es exactamente igual al del modelo
		timestamps: false // desactivamos las columnas createdAt y updatedAt
	}
);

export default Image;
