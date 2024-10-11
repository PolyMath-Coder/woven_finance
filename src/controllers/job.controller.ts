import type { Request, Response } from 'express';

import {
    AllUnpaidClientJobs,  
    AllUnpaidContractorJobs
} from "../services/job.service"
import { UserRoleEnum } from '../utils/enums';
import StatusCodes from '../utils/status.codes';

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

