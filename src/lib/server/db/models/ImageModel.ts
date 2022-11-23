import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

const sequelizeConnection = new Sequelize(
	'postgres://postgres:postgres@localhost:5432/portal_interno_db'
);

// todos los posibles atributos de nuestro modelo
interface imageAttributes {
	id: number;
	name: string;
	alt: string;
	url: string;
}

// Define el tipo del objeto  pasado al Model.create de sequlize
export interface imageInput extends Optional<imageAttributes, 'id'> {}

// Define el objeto retornado de model.create, model.update y model.findOne
export interface imageOuput extends Required<imageAttributes> {}

// Creamos al modelo de la base
class Image extends Model<imageAttributes, imageInput> implements imageAttributes {
	public id!: number; // el "!" signfica que no hay problema si no es inicializada
	public name!: string;
	public alt!: string;
	public url!: string;
}

// Creamos la tabla del modelo
Image.init(
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
		timestamps: false,
		sequelize: sequelizeConnection,
		freezeTableName: true // el nombre de la tabla es exactamente igual al del modelo
	}
);

export default Image;
