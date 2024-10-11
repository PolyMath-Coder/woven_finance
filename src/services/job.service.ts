import { Contract } from "../config/models";
import { ContractStatusEnum } from "../utils/enums";



export const AllUnpaidClientJobs = async (
    profile_id: string
) => {
   const jobs = await Contract.findAndCountAll({
        where: {
            client: profile_id,
            status: ContractStatusEnum.IN_PROGRESS,
            isPaid: false
        },
        attributes: [
            'id',
            'title',
            'description',
            'amount',
            'status',
            'isPaid',
            'start_date',
            'end_date'
        ]
    })
    return jobs;
}; 


export const AllUnpaidContractorJobs = async (
    profile_id: string
) => {
   const jobs = await Contract.findAndCountAll({
        where: {
            client: profile_id,
            status: ContractStatusEnum.IN_PROGRESS,
            isPaid: false
        },
        attributes: [
            'id',
            'title',
            'description',
            'amount',
            'status',
            'isPaid',
            'start_date',
            'end_date'
        ]
    })
    return jobs;
}; 