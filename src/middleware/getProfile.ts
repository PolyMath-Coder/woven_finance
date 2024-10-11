import { type Request, type Response, type NextFunction } from 'express';
import StatusCodes from '../utils/status.codes';
import { FindUserById } from '../services/profile.service';
import { Profile } from '../config/models';
import { ProfileInfo } from '../utils/interface';
// import { type MerchantPayload } from '../utils/interfaces/auth.interface';

export const userAuthentication = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	try {
		
		 const profile_id: any  = req.headers.profile_id;
		 if(profile_id == null || profile_id == undefined) {
				return res.status(StatusCodes.ClientErrorUnauthorized).json({
				status: false,
				message: 'Invalid authentication data',
				data: null,
			});
		 }
		 if(typeof profile_id === 'string') {
			const profile = await FindUserById(profile_id) as ProfileInfo
			req.user = {
				profile_id: profile_id,
				name: profile.name,
				email: profile.email,
				user_role: profile.user_role,
				balance: profile.balance
			}
			next();
		 }
	} catch (err) {
		return res.status(StatusCodes.ClientErrorUnauthorized).json({
			status: false,
			message: 'Invalid authentication token',
			data: null,
		});
	}
};

export default userAuthentication;
