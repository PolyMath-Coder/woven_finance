import { type Request, type Response, type NextFunction } from 'express';
import StatusCodes from '../utils/status.codes';
// import Jwt from 'jsonwebtoken';

// import config from '../config';
// import StatusCodes from '../enums/StatusCodes';
// import { type MerchantPayload } from '../utils/interfaces/auth.interface';

export const userAuthentication = (
	req: Request,
	res: Response,
	next: NextFunction
): any => {
	try {
		// const key: string = String(config.KEY.SIGNING_KEY);
		// const token: any = req.headers.authorization?.split(' ')[1];

		// if (token == null) {
		// 	return res.status(StatusCodes.ClientErrorUnauthorized).json({
		// 		status: false,
		// 		message: 'Invalid authentication data',
		// 		data: null,
		// 	});
		// }

		// const verifiedUser = Jwt.verify(String(token), key, {
		// 	algorithms: ['HS256'],
		// }) as MerchantPayload;

		// req.merchant = {
		// 	merchant_id: verifiedUser.merchant_id,
		// 	full_name: verifiedUser.full_name,
		// 	email: verifiedUser.email,
		// };

		next();
	} catch (err) {
		return res.status(StatusCodes.ClientErrorUnauthorized).json({
			status: false,
			message: 'Invalid authentication token',
			data: null,
		});
	}
};

export default userAuthentication;
