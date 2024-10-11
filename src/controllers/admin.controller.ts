import { TopClientMetrics } from "../services/admin.service";
import StatusCodes from "../utils/status.codes"
import type { Request, Response } from 'express';


export const BestClientMetrics = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { startDate, endDate } = req.query;
        const limit = Number(req.query.limit);
    const start = startDate as string;
    const end = endDate as string;
    const best_client_metrics = await TopClientMetrics(start, end, +limit);
    res.status(StatusCodes.SuccessOK).json({
        status: true,
        message: 'best client metrics retrieved.', 
        best_client_metrics
    })
    } catch(error) {
        res.status(StatusCodes.ClientErrorBadRequest).json({
            status: false,
            message: 'unable to retrieve contract', 
            data: null
        })
    }
}

