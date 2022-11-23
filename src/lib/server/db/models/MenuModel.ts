import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import Page from './PageModel';

const sequelizeConnection = new Sequelize(
	'postgres://postgres:postgres@localhost:5432/portal_interno_db'
);

// todos los posibles atributos de nuestro modelo
interface menuAttributes {
	id: number;
	name: string;
	order: number;
	active: boolean;
	page_id: number;
}

// Define el tipo del objeto  pasado al Model.create de sequlize
export interface menuInput extends Optional<menuAttributes, 'id'> {}

// Define el objeto retornado de model.create, model.update y model.findOne
export interface menuOuput extends Required<menuAttributes> {}

// Creamos al modelo de la base
class Menu extends Model<menuAttributes, menuInput> implements menuAttributes {
	public id!: number; // el "!" signfica que no hay problema si no es inicializada
	public name!: string;
	public order!: number;
	public active!: boolean;
	public page_id!: number;
}

// Creamos la tabla del modelo
Menu.init(
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
		order: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		page_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false
		}
	},
	{
		timestamps: false,
		sequelize: sequelizeConnection,
		freezeTableName: true // el nombre de la tabla es exactamente igual al del modelo
	}
);

// Creamos las relacion entre un menu y una pagina
Page.hasOne(Menu, {
	foreignKey: 'page_id'
});
Menu.belongsTo(Page, {
	foreignKey: 'page_id'
});

export default Menu;
