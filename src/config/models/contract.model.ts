import { DataTypes, Model, UUIDV4 } from "sequelize";
import { v4 as uuidV4 } from 'uuid';
import sequelize from "../db";
import { ContractStatusEnum } from "../../utils/enums";


class Contract extends Model {
    public id!: string;
    public contractor!: string;
    public client!: string;
    public amount!: number;
    public isPaid: boolean
}

Contract.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidV4,
        primaryKey: true,
        allowNull: false
    },
    contractor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    client: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ContractStatusEnum.NEW
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        // defaultValue: Date.now()
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        // defaultValue: Date.now()
    }
}, {
    sequelize,
    tableName: 'contracts',
});

export default Contract;