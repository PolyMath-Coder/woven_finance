import { Op } from "sequelize";
import { Contract } from "../config/models";
import { ContractData } from "../utils/interface";
import { ContractStatusEnum } from "../utils/enums";




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
