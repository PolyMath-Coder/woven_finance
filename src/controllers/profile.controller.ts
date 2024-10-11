import type { Request as ExpressRequest, RequestHandler, Response } from 'express';
import { Profile } from '../config/models';
import StatusCodes from '../utils/status.codes';
// import profileService from '../services/profile.service';
import { SeedAllUsers } from '../services/profile.service';

export interface Request extends ExpressRequest {
    id: string;
}

export const Create = async ( req: Request, res: Response ): Promise<void> => {
  console.log(req.user);
  res.status(StatusCodes.SuccessOK).json({ status: true, message: 'hello all',});
}


export const SeedUsers = async (req: Request, res: Response): Promise<void> => {
    const response = await SeedAllUsers()
    res.status(StatusCodes.SuccessCreated).json({
        status: true, 
        message: 'users seeded successfully.',
        response
    })
}

export const Update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { email, name } = req.body;
    const user = await Profile.findByPk(id)
    
    res.status(200).json({
        status: true,
        message: 'table update successful!',
        user
    })
}