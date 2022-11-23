import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../connection';

// todos los posibles atributos de nuestro modelo
interface pageAttributes {
	id: number;
	title: string;
	body: string;
	slug: string;
	project: boolean;
}

// Define el tipo del objeto  pasado al Model.create de sequlize
export interface pageInput extends Optional<pageAttributes, 'id'> {}

// Define el objeto retornado de model.create, model.update y model.findOne
export interface pageOuput extends Required<pageAttributes> {}

// Creamos al modelo de la base
class Page extends Model<pageAttributes, pageInput> implements pageAttributes {
	public id!: number; // el "!" signfica que no hay problema si no es inicializada
	public title!: string;
	public body!: string;
	public slug!: string;
	public project!: boolean;
}

// Creamos la tabla del modelo
Page.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		body: {
			type: DataTypes.STRING,
			allowNull: false
		},
		slug: {
			type: DataTypes.STRING,
			allowNull: false
		},
		project: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	},
	{
		timestamps: false,
		sequelize: sequelizeConnection,
		freezeTableName: true // el nombre de la tabla es exactamente igual al del modelo
	}
);

export default Page;
