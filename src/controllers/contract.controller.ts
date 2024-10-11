import type { Request, Response } from 'express';

import { CreateAContract, FindContractById } from "../services/contract.service";
import StatusCodes from "../utils/status.codes";


export const CreateContract = async (
    req: Request, 
    res: Response
): Promise<void> => {

   console.log(req.user)
   const data = await CreateAContract(req.user.profile_id, req.body);
    res.status(StatusCodes.SuccessCreated).json({
        status: true,
        message: 'contract creation successful', 
        data
    })
};

export const RetrieveContract = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const contract = await FindContractById(id);
        if(contract == null) {
            res.status(StatusCodes.ClientErrorNotFound).json({
                status: false,
                message: 'Oops! contract not found...',
                data: null
            })
        }
        res.status(StatusCodes.SuccessOK).json({
            status: true,
            message: 'contract successfully retrieved', 
            contract
        })
    } catch(error) {
        res.status(StatusCodes.ClientErrorBadRequest).json({
            status: false,
            message: 'unable to retrieve contract', 
            data: null
        })
    }
   

};