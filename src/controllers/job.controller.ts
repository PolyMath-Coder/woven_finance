import type { Request, Response } from 'express';

import {
    AllClientUnpaidJobs,
    AllUnpaidClientJobs,  
    AllUnpaidContractorJobs,
    MakeCashDeposit
} from "../services/job.service"
import { UserRoleEnum } from '../utils/enums';
import StatusCodes from '../utils/status.codes';
import { FindContractById, PayForAJob } from '../services/contract.service';
import { Contract } from '../config/models';
import { FindUserById } from '../services/profile.service';

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

export const MakeDeposit = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { userId } = req.params;
        const {amount_to_deposit } = req.body;
        const client = await FindUserById(userId);
        if(client == null) {
            res.status(StatusCodes.ClientErrorNotFound).json({
                status: false,
                message: 'Oops! client not found.'
            });
            return
        }
       const unpaid_jobs = await AllClientUnpaidJobs(userId);
       const all_unpaid_job_price = unpaid_jobs.reduce((sum, job) => sum + job.amount, 0)
       
       const max_amount = all_unpaid_job_price * 0.25
       if(amount_to_deposit > max_amount) {
            res.status(StatusCodes.ClientErrorBadRequest).json({
            status: false,
            message:  `Oops! deposit amount exceeds 25% of total outstanding jobs.`, 
            data: null
        })
        return;
       }
       await MakeCashDeposit(userId, amount_to_deposit)
       res.status(StatusCodes.SuccessOK).json({
        status: true,
        message:  `cash deposit of  #${amount_to_deposit} successful! `, 
        data: null
       });
    } catch(error) {
        res.status(StatusCodes.ClientErrorBadRequest).json({
            status: false,
            message: 'unable to make deposit', 
            data: null
        })
    }
};