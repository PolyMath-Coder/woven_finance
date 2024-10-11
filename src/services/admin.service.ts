import { Op } from "sequelize"
import sequelize from "../config/db"
import { Contract, Profile } from "../config/models"



export const TopClientMetrics = async (
    start: string, 
    end: string,
    limit: number
) => {
    const metrics = await Contract.findAll({
        where: {
            isPaid: true,
            createdAt: {
                [Op.between]: [new Date(start), new Date(end)],
            },
        },
        attributes: [
            'client',
            [sequelize.fn('SUM', sequelize.col('amount')), 'totalPayments']
        ],
        include: [
            {
                model: Profile,
                attributes: ['id', 'name']
            }
        ],
        order: [[sequelize.literal('amount'), 'DESC']],
        limit: limit
    });
    return metrics;
}