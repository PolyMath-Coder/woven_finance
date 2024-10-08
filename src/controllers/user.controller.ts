import type { Request as ExpressRequest, RequestHandler, Response } from 'express';
import { Profile } from '../config/models';

export interface Request extends ExpressRequest {
    id: string;
}

export const Create = async ( req: Request, res: Response ): Promise<void> => {
    console.log(req.body);
  //  const data = req.body

   const data = await Profile.create({ name: req.body.name, email: req.body.email})
   console.log(data);
  res.status(200).json({ status: true, message: 'hello all', data});
}

export const Update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { email, name } = req.body;
    const user = await Profile.findByPk(id)
    //const response = user?.update({ name, email })
    res.status(200).json({
        status: true,
        message: 'table update successful!',
        user
    })
}