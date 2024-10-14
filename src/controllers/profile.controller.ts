import type { Request as ExpressRequest, RequestHandler, Response } from 'express';
import { Profile } from '../config/models';
import StatusCodes from '../utils/status.codes';
// import profileService from '../services/profile.service';
import { SeedAllUsers } from '../services/profile.service';

export interface Request extends ExpressRequest {
    id: string;
}

export const SeedUsers = async (req: Request, res: Response): Promise<void> => {
    const response = await SeedAllUsers()
    res.status(StatusCodes.SuccessCreated).json({
        status: true, 
        message: 'users seeded successfully.',
        response
    })
}

