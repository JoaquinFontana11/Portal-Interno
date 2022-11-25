import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../connection';

// todos los posibles atributos de nuestro modelo
interface announcementAttributes {
	id: number;
	content: string;
	init_date: Date;
	end_date: Date;
	title: string;
}

// Define el tipo del objeto  pasado al Model.create de sequlize
export interface announcementInput extends Optional<announcementAttributes, 'id'> {}

// Define el objeto retornado de model.create, model.update y model.findOne
export interface announcementOuput extends Required<announcementAttributes> {}

// Creamos al modelo de la base
class Announcement
	extends Model<announcementAttributes, announcementInput>
	implements announcementAttributes
{
	public id!: number; // el "!" signfica que no hay problema si no es inicializada
	public content!: string;
	public init_date!: Date;
	public end_date!: Date;
	public title: string;
}

// Creamos la tabla del modelo
Announcement.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		init_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		end_date: {
			type: DataTypes.DATE,
			allowNull: false
		}
	},
	{
		timestamps: false,
		sequelize: sequelizeConnection,
		freezeTableName: true // el nombre de la tabla es exactamente igual al del modelo
	}
);

export default Announcement;
