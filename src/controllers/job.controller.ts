import type { Request, Response } from 'express';

import {
    AllUnpaidClientJobs,  
    AllUnpaidContractorJobs
} from "../services/job.service"
import { UserRoleEnum } from '../utils/enums';
import StatusCodes from '../utils/status.codes';
import { FindContractById, PayForAJob } from '../services/contract.service';
import { Contract } from '../config/models';

export const AllUnPaidJobs = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { profile_id, user_role } = req.user
    
    const response = user_role == UserRoleEnum.CONTRACTOR ?
    await AllUnpaidContractorJobs(profile_id) : await AllUnpaidClientJobs(profile_id);
    res.status(StatusCodes.SuccessOK).json({
        status: true,
        message: 'all unpaid jobs successfully retrieved', 
        response
    });
}

export const PayForJob = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { profile_id, user_role, balance } = req.user;
        const { job_id } = req.params;
        const contract = await FindContractById(job_id) as Contract;
        if(contract == null) {
            res.status(StatusCodes.ClientErrorNotFound).json({
                status: false,
                message: `Oops! job id ${job_id} not found...`,
                data: null
            })
            return
        }
        if( balance < contract.dataValues.amount) {
            res.status(StatusCodes.ClientErrorBadRequest).json({
                status: false,
                message: 'Oops! insufficient funds to perform transaction.',
                data: null
            })
            return
        }
    await PayForAJob(job_id, profile_id, balance);
    res.status(StatusCodes.SuccessOK).json({
        status: true, 
        message: 'job payment successful',
        data: null
    })

    } catch(error) {
        res.status(StatusCodes.ClientErrorBadRequest).json({
            status: false,
            message: 'unable to make payment for job',
            data: null
        })
    }
};