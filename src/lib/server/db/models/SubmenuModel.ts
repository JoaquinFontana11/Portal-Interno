import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../connection';
import Page from './PageModel';
import Menu from './MenuModel';

// todos los posibles atributos de nuestro modelo
interface submenuAttributes {
	id: number;
	name: string;
	order: number;
	active: boolean;
	page_id: number;
	parent_id: number | null;
}

// Define el tipo del objeto  pasado al Model.create de sequlize
export interface submenuInput extends Optional<submenuAttributes, 'id'> {}

// Define el objeto retornado de model.create, model.update y model.findOne
export interface submenuOuput extends Required<submenuAttributes> {}

// Creamos al modelo de la base
class Submenu extends Model<submenuAttributes, submenuInput> implements submenuAttributes {
	public id!: number; // el "!" signfica que no hay problema si no es inicializada
	public name!: string;
	public order!: number;
	public active!: boolean;
	public page_id!: number;
	public parent_id!: number | null;
}

// Creamos la tabla del modelo
Submenu.init(
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
		parent_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true
		},
		page_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true
		}
	},
	{
		timestamps: false,
		sequelize: sequelizeConnection,
		freezeTableName: true // el nombre de la tabla es exactamente igual al del modelo
	}
);

// Creamos las relacion entre un menu y una pagina
Page.hasOne(Submenu, {
	foreignKey: {
		name: 'page_id',
		allowNull: true
	}
});
Submenu.belongsTo(Page, {
	foreignKey: {
		name: 'page_id'
	}
});

Menu.hasMany(Submenu, {
	foreignKey: {
		name: 'parent_id',
		allowNull: true
	}
});
Submenu.belongsTo(Menu, {
	foreignKey: {
		name: 'parent_id'
	}
});

export default Submenu;
