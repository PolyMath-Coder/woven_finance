declare namespace Express {
    interface IUser {
        profile_id: string;
        email: string;
        name: string;
        user_role: string
        balance: number
    }
    export interface Request {
        user: IUser;
    }
    export interface Response {
        user: IUser;
    }
}