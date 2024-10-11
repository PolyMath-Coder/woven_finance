import { Op } from "sequelize";
import { Contract, Profile } from "../config/models";
import { ContractData } from "../utils/interface";
import { ContractStatusEnum } from "../utils/enums";
import { FindUserById } from "./profile.service";




export const CreateAContract = async (
   profile_id: string, 
   {
      contractor,
      title,
      description,
      amount,
      start_date,
      end_date
   }: ContractData
) => {
   const user_data = {
      contractor: contractor,
      client: profile_id,
      title: title,
      description: description,
      amount: amount,
      start_date: start_date,
      end_date: end_date
   }
   const response = await Contract.create(user_data);
   return response
};


export const FindAllClientContracts = async(
   profile_id: string,
   user_role: string
) => {
   const contracts = await Contract.findAndCountAll({
      where: {
         client: profile_id,
         status: {
            [Op.ne]: ContractStatusEnum.TERMINATED
         }
      },
      attributes: [
         'id',
         'title',
         'description',
         'amount',
         'status',
         'isPaid'
      ]
   });
   return contracts;
};

export const FindAllContractorContracts = async(
   profile_id: string,
   user_role: string
) => {
   const contracts = await Contract.findAndCountAll({
      where: {
         contractor: profile_id,
         status: {
            [Op.ne]: ContractStatusEnum.TERMINATED
         }
      },
      attributes: [
         'id',
         'title',
         'description',
         'amount',
         'status',
         'isPaid'
      ]
   })
   return contracts;
};

export const FindAContractById = async (
   contract_id: string
) => {
   try {
      const contract = await Contract.findByPk(contract_id, {
         attributes: [
            'id',
            'title',
            'description',
            'amount',
            'status',
            'start_date',
            'end_date',
         ]
      })
      if(contract == null) {
         return {
            status: false,
            message: 'Oops! contract not found.'
         }
      }
      return contract;
   } catch(error) {
   }
  
};


export const FindContractById = async (
   contract_id: string
) => {
   try {
      const contract = await Contract.findByPk(contract_id)
      return contract;
   } catch(error) {
      throw new Error(`${error.message}`)
   }
};

export const PayForAJob = async (
   job_id: string,
   profile_id: string,
   client_balance: number
) => {
   try {
   // Query database to obtain real time info of client
      const client = await Profile.findByPk(profile_id);
   
      const contract = await Contract.findByPk(job_id)

      // Debit client and update write operation to Database.
      client!.balance = client_balance - contract!.amount

      await client!.save()

      const contractor = await Profile.findByPk(contract!.contractor);
      contractor!.balance = contractor!.balance + contract!.amount;

      await contractor!.save();

      contract!.isPaid = true;
      await contract!.save()
   } catch(error) {
      throw new Error(`${error.message}`)
   }
};