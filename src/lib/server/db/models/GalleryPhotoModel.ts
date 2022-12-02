import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../connection';
import Image from './ImageModel';
import User from './UserModel';

// todos los posibles atributos de nuestro modelo
interface galleryPhotoAttributes {
	id: number;
	title: string;
	image_id: number;
	user_id: number;
}

// Define el tipo del objeto  pasado al Model.create de sequlize
export interface galleryPhotoInput extends Optional<galleryPhotoAttributes, 'id'> {}

// Define el objeto retornado de model.create, model.update y model.findOne
export interface galleryPhotoOuput extends Required<galleryPhotoAttributes> {}

// Creamos al modelo de la base
class GalleryPhoto
	extends Model<galleryPhotoAttributes, galleryPhotoInput>
	implements galleryPhotoAttributes
{
	public id!: number; // el "!" signfica que no hay problema si no es inicializada
	public title!: string;
	public image_id!: number;
	public user_id!: number;
}

// Creamos la tabla del modelo
GalleryPhoto.init(
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
		image_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false
		},
		user_id: {
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

// Creamos las relacion entre un usuario y su foto de perfil
// Una imagen de perfil solo puede pertenecer a una persona
// Un usuario solo puede tener una foto de perfil
Image.hasOne(GalleryPhoto, {
	foreignKey: 'image_id'
});
GalleryPhoto.belongsTo(Image, {
	foreignKey: 'image_id'
});

User.hasMany(GalleryPhoto, {
	foreignKey: 'user_id'
});
GalleryPhoto.belongsTo(User, {
	foreignKey: 'user_id'
});

export default GalleryPhoto;
