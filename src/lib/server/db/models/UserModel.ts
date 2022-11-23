import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import Image from './ImageModel';

const sequelizeConnection = new Sequelize(
	'postgres://postgres:postgres@localhost:5432/portal_interno_db'
);

// todos los posibles atributos de nuestro modelo
interface userAttributes {
	id: number;
	name: string;
	lastname: string;
	username: string;
	email: string;
	role: string;
	photo_id?: number;
}

// Define el tipo del objeto  pasado al Model.create de sequlize
export interface userInput extends Optional<userAttributes, 'id'> {}

// Define el objeto retornado de model.create, model.update y model.findOne
export interface userOuput extends Required<userAttributes> {}

// Creamos al modelo de la base
class User extends Model<userAttributes, userInput> implements userAttributes {
	public id!: number; // el "!" signfica que no hay problema si no es inicializada
	public name!: string;
	public lastname!: string;
	public username!: string;
	public email!: string;
	public role!: string;
	public photo_id!: number;
}

// Creamos la tabla del modelo
User.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		},
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
		timestamps: false,
		sequelize: sequelizeConnection,
		freezeTableName: true // el nombre de la tabla es exactamente igual al del modelo
	}
);

// Creamos las relacion entre un usuario y su foto de perfil
// Una imagen de perfil solo puede pertenecer a una persona
// Un usuario solo puede tener una foto de perfil
Image.hasOne(User, {
	foreignKey: 'photo_id'
});
User.belongsTo(Image, {
	foreignKey: 'photo_id'
});

export default User;
