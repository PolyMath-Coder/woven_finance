import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import { v4 as uuidV4 } from 'uuid';


class Profile extends Model { 
    public id!: number;
    public name: string;
    public email: string;
    public user_role: string;
    public balance: number;
}

Profile.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    }
}, {
  sequelize,
  tableName: 'profiles',
});

export default Profile;