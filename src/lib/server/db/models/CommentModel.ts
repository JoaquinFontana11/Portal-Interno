import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../connection';
import User from './UserModel';
import GalleryPhoto from './GalleryPhotoModel';

// todos los posibles atributos de nuestro modelo
interface commentAttributes {
	id: number;
	content: string;
	user_id: number;
	photo_id: number;
}

// Define el tipo del objeto  pasado al Model.create de sequlize
export interface commentInput extends Optional<commentAttributes, 'id'> {}

// Define el objeto retornado de model.create, model.update y model.findOne
export interface commentOuput extends Required<commentAttributes> {}

// Creamos al modelo de la base
class Comment extends Model<commentAttributes, commentInput> implements commentAttributes {
	public id!: number; // el "!" signfica que no hay problema si no es inicializada
	public content!: string;
	public user_id!: number;
	public photo_id!: number;
}

// Creamos la tabla del modelo
Comment.init(
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
		user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false
		},
		photo_id: {
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
User.hasOne(Comment, {
	foreignKey: 'user_id'
});
Comment.belongsTo(User, {
	foreignKey: 'user_id'
});

GalleryPhoto.hasOne(Comment, {
	foreignKey: 'photo_id'
});
Comment.belongsTo(GalleryPhoto, {
	foreignKey: 'photo_id'
});

export default Comment;
