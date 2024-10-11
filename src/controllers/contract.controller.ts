import type { Request, Response } from 'express';

import { 
    CreateAContract, 
    FindAContractById, 
    FindAllClientContracts, 
    FindAllContractorContracts, 
} from "../services/contract.service";
import StatusCodes from "../utils/status.codes";
import { UserRoleEnum } from '../utils/enums';
import { Profile } from '../config/models';


export const CreateContract = async (
    req: Request, 
    res: Response
): Promise<void> => {

   const data = await CreateAContract(req.user.profile_id, req.body);
    res.status(StatusCodes.SuccessCreated).json({
        status: true,
        message: 'contract creation successful', 
        data
    })
};

export const RetrieveContracts = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const { profile_id, user_role } = req.user;
        let response = user_role == UserRoleEnum.CLIENT ? 
        await FindAllClientContracts(profile_id, user_role) :
        await FindAllContractorContracts(profile_id, user_role);
           res.status(StatusCodes.SuccessOK).json({
              status: true,
              message: 'all contracts successfully retrieved', 
              response
          });
    } catch(error) {
        res.status(StatusCodes.ClientErrorBadRequest).json({
            status: false,
            message: 'unable to retrieve contract', 
            data: null
        })
    }
}

export const RetrieveContract = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const contract = await FindAContractById(id);
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

