import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../connection';
import User from './UserModel';
import Announcement from './AnnouncementModel';

// todos los posibles atributos de nuestro modelo
interface userCloseAnnouncementAttributes {
	id: number;
	announcement_id: number;
	user_id: number;
}

// Define el tipo del objeto  pasado al Model.create de sequlize
export interface userCloseAnnouncementInput
	extends Optional<userCloseAnnouncementAttributes, 'id'> {}

// Define el objeto retornado de model.create, model.update y model.findOne
export interface userCloseAnnouncementOuput extends Required<userCloseAnnouncementAttributes> {}

// Creamos al modelo de la base
class UserCloseAnnouncement
	extends Model<userCloseAnnouncementAttributes, userCloseAnnouncementInput>
	implements userCloseAnnouncementAttributes
{
	public id!: number; // el "!" signfica que no hay problema si no es inicializada
	public announcement_id!: number;
	public user_id!: number;
}

// Creamos la tabla del modelo
UserCloseAnnouncement.init(
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
		announcement_id: {
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

User.hasOne(UserCloseAnnouncement, {
	foreignKey: 'user_id'
});
UserCloseAnnouncement.belongsTo(User, {
	foreignKey: 'user_id'
});

Announcement.hasOne(UserCloseAnnouncement, {
	foreignKey: 'announcement_id'
});
UserCloseAnnouncement.belongsTo(Announcement, {
	foreignKey: 'announcement_id'
});

export default UserCloseAnnouncement;
