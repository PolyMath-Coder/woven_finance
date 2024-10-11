import {  type Request, type Response, type NextFunction } from "express";
import { FindContractById } from "../services/contract.service";
import { Contract } from "../config/models";
import StatusCodes from "../utils/status.codes";

export const viewContractAuthorization = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { contractor, client } = await FindContractById(req.params.id) as Contract;
        if(contractor === undefined && client === undefined ) {
            res.status(StatusCodes.ClientErrorNotFound).json({
                status: false,
                message: 'Oops! contract not found...',
                data: null
            })
            return
        }
        if(req.user.profile_id !== contractor && req.user.profile_id !== client ) {
            res.status(StatusCodes.ClientErrorUnauthorized).json({
                status: false,
                message: 'unauthorized access to view resource.',
                data: null
            })
            return
        }
        next()
    } catch(error) {
        res.status(StatusCodes.ClientErrorBadRequest).json({
            status: false,
            message: 'unable to retrieve contract'
        })
    }
} 