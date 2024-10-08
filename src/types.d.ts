declare namespace Express {
    interface IUser {
        profile_id: string;
        email?: string
        name?: string
    }
    export interface Request {
        user: IUser;
    }
    export interface Response {
        user: IUser;
    }
}