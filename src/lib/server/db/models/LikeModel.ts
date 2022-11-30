import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../connection';
import User from './UserModel';
import GalleryPhoto from './GalleryPhotoModel';

// todos los posibles atributos de nuestro modelo
interface likeAttributes {
	id: number;
	user_id: number;
	photo_id: number;
}

// Define el tipo del objeto  pasado al Model.create de sequlize
export interface likeInput extends Optional<likeAttributes, 'id'> {}

// Define el objeto retornado de model.create, model.update y model.findOne
export interface likeOuput extends Required<likeAttributes> {}

// Creamos al modelo de la base
class Like extends Model<likeAttributes, likeInput> implements likeAttributes {
	public id!: number; // el "!" signfica que no hay problema si no es inicializada
	public user_id!: number;
	public photo_id!: number;
}

// Creamos la tabla del modelo
Like.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true
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
User.hasOne(Like, {
	foreignKey: 'user_id'
});
Like.belongsTo(User, {
	foreignKey: 'user_id'
});

GalleryPhoto.hasMany(Like, {
	foreignKey: 'photo_id'
});
Like.belongsTo(GalleryPhoto, {
	foreignKey: 'photo_id'
});

export default Like;
