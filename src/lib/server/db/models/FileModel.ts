import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

const sequelizeConnection = new Sequelize(
	'postgres://postgres:postgres@localhost:5432/portal_interno_db'
);

// todos los posibles atributos de nuestro modelo
interface fileAttributes {
	id: number;
	name: string;
	url: string;
	description: string;
}

// Define el tipo del objeto  pasado al Model.create de sequlize
export interface fileInput extends Optional<fileAttributes, 'id'> {}

// Define el objeto retornado de model.create, model.update y model.findOne
export interface fileOuput extends Required<fileAttributes> {}

// Creamos al modelo de la base
class File extends Model<fileAttributes, fileInput> implements fileAttributes {
	public id!: number; // el "!" signfica que no hay problema si no es inicializada
	public name!: string;
	public url!: string;
	public description!: string;
}

// Creamos la tabla del modelo
File.init(
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
		url: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
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

export default File;
