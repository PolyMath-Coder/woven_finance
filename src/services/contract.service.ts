import { Contract } from "../config/models";
import { ContractData } from "../utils/interface";




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

export const FindContractById = async (
   contract_id: string
) => {
   try {
      const contract = await Contract.findByPk(contract_id);
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
