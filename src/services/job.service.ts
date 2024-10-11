import { Contract, Profile } from "../config/models";
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

export const AllClientUnpaidJobs = async (profile_id: string) => {
    const jobs = await Contract.findAll({ 
        where: {
            client: profile_id,
            isPaid: false
        }
    });
    
    return jobs;
};
export const MakeCashDeposit = async (
    profile_id: string,
    amount: number
) => {
    try {
        const client = await Profile.findByPk(profile_id);
        client!.balance  = client!.balance + amount;
        await client!.save()
    } catch(error) {
        throw new Error(`system error: ${error.message}`)
    }
};