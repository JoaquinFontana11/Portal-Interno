import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import Page from './PageModel';
import Image from './ImageModel';

const sequelizeConnection = new Sequelize(
	'postgres://postgres:postgres@localhost:5432/portal_interno_db'
);

// todos los posibles atributos de nuestro modelo
interface noveltyAttributes {
	id: number;
	date: Date;
	image_id: number;
	page_id: number;
}

// Define el tipo del objeto  pasado al Model.create de sequlize
export interface noveltyInput extends Optional<noveltyAttributes, 'id'> {}

// Define el objeto retornado de model.create, model.update y model.findOne
export interface noveltyOuput extends Required<noveltyAttributes> {}

// Creamos al modelo de la base
class Novelty extends Model<noveltyAttributes, noveltyInput> implements noveltyAttributes {
	public id!: number; // el "!" signfica que no hay problema si no es inicializada
	public date!: Date;
	public image_id!: number;
	public page_id!: number;
}

// Creamos la tabla del modelo
Novelty.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		image_id: {
			type: DataTypes.INTEGER.UNSIGNED,
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

Image.hasOne(Novelty, {
	foreignKey: 'image_id'
});
Novelty.belongsTo(Image, {
	foreignKey: 'image_id'
});

Page.hasOne(Novelty, {
	foreignKey: 'page_id'
});
Novelty.belongsTo(Page, {
	foreignKey: 'page_id'
});

export default Novelty;
